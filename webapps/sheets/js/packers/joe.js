/*
Copyright (c) 2016 Joseph B. Hall [@groundh0g]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Based on the Public Domain MaxRectsBinPack.cpp source by Jukka Jylänki
 	https://github.com/juj/RectangleBinPack/
*/

var packers = packers || {};

function JoePacker() {
	BasePacker.call(this, "JoeRects", true); // Default Packer
	var self = this;
	this.defaultSortBy = "AREA_DESC";
	this.version = "0.1.0";

	this.DoInit = function() { };
	
	var REALLY_BIG = 1000000000;

	this.DoPack = function () {
		if(self.DoPack_MaxFramesProcessed === 0) {
			// TODO: first call
			self.DoPack_FramesProcessed = 0;
			self.ImageIndex = 0;
			self.FrameIndex = 0;
			self.$init();
		}
		
		// place sprite
		var image = self.DoPack_Images[self.DoPack_ImageKeys[self.ImageIndex]];
		var frame = image.frames[self.FrameIndex];
		var newRect = $placeRect(self.makeRect(frame.width, frame.height));
		
		if(!self.isEmptyRect(newRect)) {
			// was placed
			frame.rectSprite = newRect;
		} else {
			// resize canvas
			var newWidth  = self.width  * 2; //  /* Math.max(self.width,  frame.rectSprite.x + frame.rectSprite.width ) */ + self.paddingBorder * 2;
			var newHeight = self.height * 2; //  /* Math.max(self.height, frame.rectSprite.y + frame.rectSprite.height) */ + self.paddingBorder * 2;

			if(self.Resize(newWidth, newHeight)) {
				// exit loop and start over
				self.DoPack_MaxFramesProcessed = 0;
				self.DoPack_FramesProcessed = 0;
				return; 
			} else {
				// we have a problem; won't fit; stop trying
				self.addError("Image '" + image.filename + "' with index [" + self.ImageIndex + "][" + self.FrameIndex + "] won't fit specified constraints. [" + self.MAX_WIDTH + ", " + self.MAX_HEIGHT + "]");
				self.DoPack_FramesProcessed = self.DoPack_FrameCount;
				return;
			}
		}
		
		self.DoPack_FramesProcessed++;

		self.FrameIndex++;
		if(self.FrameIndex >= (self.DoPack_AllOptions.doAnimatedGifExpand() ? image.frameCount : 1)) {
			self.ImageIndex++;
			self.FrameIndex = 0;
		}
	};
	
	this.$freeRects = [];

	this.$init = function() {
		var borderPadding = Math.max(self.paddingBorder, self.paddingBorder);
		self.$freeRects = [ self.normalizeRect({ 
			x: borderPadding,
			y: borderPadding,
			w: self.width  - borderPadding * 2,
			h: self.height - borderPadding * 2,
			r:false
		}) ];
	}
	
	var $placeRect = function(rect) {
		var padding = self.paddingShape + self.paddingInner;
		var paddedWidth  = rect.width  + padding * 2;
		var paddedHeight = rect.height + padding * 2;
		var result = self.makeRect(paddedWidth, paddedHeight);
		var scores = { score1: REALLY_BIG, score2: REALLY_BIG };

		switch(self.DoPack_Options["heuristic"]) {
			case "RectBestShortSideFit": // short side of a free rectangle
				result = $placeByBSS(result, scores);
				break;
			case "BestLongSideFit":      // long side of free rectangle
				result = $placeByBLS(result, scores);
				break;
			case "BottomLeftRule":       // "Tetris" placement
				result = $placeByBLR(result, scores);
				break;
			case "ContactPointRule":     // rectangle touches other rects as much as possible
				result = $placeByCPR(result, scores);
				break;
			case "BestAreaFit":          // smallest free rect
			default:
				result = $placeByBAF(result, scores);
				break;
		}

		if (!self.isEmptyRect(result)) {
			var rectsToProcess = self.$freeRects.length;
			for(var i = 0; i < rectsToProcess; i++) {
				if ($splitFreeRects(self.$freeRects[i], result)) {
					self.$freeRects.splice(i,1);
					i = 0;
					i--;
					rectsToProcess--;
				}
			}
			$pruneFreeRects();
		}
 
		result.x += padding;
		result.y += padding;
		result.width  -= padding * 2;
		result.height -= padding * 2;
		return self.normalizeRect(result);
	};
	
	var $pruneFreeRects = function() {
		for(var i = 0; i < self.$freeRects.length; i++) {
			for(var j = i+1; j < self.$freeRects.length; j++) {
				if (self.isEmptyRect(self.$freeRects[i]) || self.containedInRect(self.$freeRects[i], self.$freeRects[j])) {
					self.$freeRects.splice(i,1);
					i--;
					break;
				}
				if (self.isEmptyRect(self.$freeRects[j]) || self.containedInRect(self.$freeRects[j], self.$freeRects[i])) {
					self.$freeRects.splice(j,1);
					j--;
				}
			}
		}
	};

	var $splitFreeRects = function(freeRect, rect) {
		self.normalizeRect(freeRect);
		self.normalizeRect(rect);
 
		if (rect.x >= freeRect.right  || 
			rect.right  <= freeRect.x ||
			rect.y >= freeRect.bottom || 
			rect.bottom <= freeRect.y) {
			return false;
		}
		
		if (rect.x < freeRect.right && rect.right > freeRect.x) {
			if (rect.y > freeRect.y && rect.y < freeRect.bottom) {
				var newRect = self.copyRect(freeRect);
				newRect.height = rect.y - freeRect.y;
				self.$freeRects.push(self.normalizeRect(newRect));
			}
			if (rect.bottom < freeRect.bottom) {
				var newRect = self.copyRect(freeRect);
				newRect.y = rect.bottom;
				newRect.height = freeRect.bottom - rect.bottom;
				self.$freeRects.push(self.normalizeRect(newRect));
			}
		}

		if (rect.y < freeRect.bottom && rect.bottom > freeRect.y) {
			if (rect.x > freeRect.x && rect.x < freeRect.right) {
				var newRect = self.copyRect(freeRect);
				newRect.width = rect.x - freeRect.x;
				self.$freeRects.push(self.normalizeRect(newRect));
			}
 
			if (rect.right < freeRect.right) {
				var newRect = self.copyRect(freeRect);
				newRect.x = rect.right;
				newRect.width = freeRect.right - rect.right;
				self.$freeRects.push(self.normalizeRect(newRect));
			}
		}
 
		return true;
	};

	var $placeByBSS = function(rect, scores) {
		return self.makeRect();
		
// 		Rect bestNode = new Rect();
// 		//memset(&bestNode, 0, sizeof(Rect));
//  
// 		bestShortSideFit = int.MaxValue;
//  
// 		for(int i = 0; i < freeRectangles.Count; ++i) {
// 			// Try to place the rectangle in upright (non-flipped) orientation.
// 			if (freeRectangles[i].width >= width && freeRectangles[i].height >= height) {
// 				int leftoverHoriz = Mathf.Abs((int)freeRectangles[i].width - width);
// 				int leftoverVert = Mathf.Abs((int)freeRectangles[i].height - height);
// 				int shortSideFit = Mathf.Min(leftoverHoriz, leftoverVert);
// 				int longSideFit = Mathf.Max(leftoverHoriz, leftoverVert);
//  
// 				if (shortSideFit < bestShortSideFit || (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit)) {
// 					bestNode.x = freeRectangles[i].x;
// 					bestNode.y = freeRectangles[i].y;
// 					bestNode.width = width;
// 					bestNode.height = height;
// 					bestShortSideFit = shortSideFit;
// 					bestLongSideFit = longSideFit;
// 				}
// 			}
//  
// 			if (allowRotations && freeRectangles[i].width >= height && freeRectangles[i].height >= width) {
// 				int flippedLeftoverHoriz = Mathf.Abs((int)freeRectangles[i].width - height);
// 				int flippedLeftoverVert = Mathf.Abs((int)freeRectangles[i].height - width);
// 				int flippedShortSideFit = Mathf.Min(flippedLeftoverHoriz, flippedLeftoverVert);
// 				int flippedLongSideFit = Mathf.Max(flippedLeftoverHoriz, flippedLeftoverVert);
//  
// 				if (flippedShortSideFit < bestShortSideFit || (flippedShortSideFit == bestShortSideFit && flippedLongSideFit < bestLongSideFit)) {
// 					bestNode.x = freeRectangles[i].x;
// 					bestNode.y = freeRectangles[i].y;
// 					bestNode.width = height;
// 					bestNode.height = width;
// 					bestShortSideFit = flippedShortSideFit;
// 					bestLongSideFit = flippedLongSideFit;
// 				}
// 			}
// 		}
// 		return bestNode;
	};
	
	var $placeByBLS = function(rect, scores) {
		return self.makeRect();

// 		Rect bestNode = new Rect();
// 		//memset(&bestNode, 0, sizeof(Rect));
//  
// 		bestLongSideFit = int.MaxValue;
//  
// 		for(int i = 0; i < freeRectangles.Count; ++i) {
// 			// Try to place the rectangle in upright (non-flipped) orientation.
// 			if (freeRectangles[i].width >= width && freeRectangles[i].height >= height) {
// 				int leftoverHoriz = Mathf.Abs((int)freeRectangles[i].width - width);
// 				int leftoverVert = Mathf.Abs((int)freeRectangles[i].height - height);
// 				int shortSideFit = Mathf.Min(leftoverHoriz, leftoverVert);
// 				int longSideFit = Mathf.Max(leftoverHoriz, leftoverVert);
//  
// 				if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
// 					bestNode.x = freeRectangles[i].x;
// 					bestNode.y = freeRectangles[i].y;
// 					bestNode.width = width;
// 					bestNode.height = height;
// 					bestShortSideFit = shortSideFit;
// 					bestLongSideFit = longSideFit;
// 				}
// 			}
//  
// 			if (allowRotations && freeRectangles[i].width >= height && freeRectangles[i].height >= width) {
// 				int leftoverHoriz = Mathf.Abs((int)freeRectangles[i].width - height);
// 				int leftoverVert = Mathf.Abs((int)freeRectangles[i].height - width);
// 				int shortSideFit = Mathf.Min(leftoverHoriz, leftoverVert);
// 				int longSideFit = Mathf.Max(leftoverHoriz, leftoverVert);
//  
// 				if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
// 					bestNode.x = freeRectangles[i].x;
// 					bestNode.y = freeRectangles[i].y;
// 					bestNode.width = height;
// 					bestNode.height = width;
// 					bestShortSideFit = shortSideFit;
// 					bestLongSideFit = longSideFit;
// 				}
// 			}
// 		}
// 		return bestNode;
	};
	
	var $placeByBLR = function(rect, scores) {
		return self.makeRect();

// 		Rect bestNode = new Rect();
// 		//memset(bestNode, 0, sizeof(Rect));
//  
// 		bestY = int.MaxValue;
//  
// 		for(int i = 0; i < freeRectangles.Count; ++i) {
// 			// Try to place the rectangle in upright (non-flipped) orientation.
// 			if (freeRectangles[i].width >= width && freeRectangles[i].height >= height) {
// 				int topSideY = (int)freeRectangles[i].y + height;
// 				if (topSideY < bestY || (topSideY == bestY && freeRectangles[i].x < bestX)) {
// 					bestNode.x = freeRectangles[i].x;
// 					bestNode.y = freeRectangles[i].y;
// 					bestNode.width = width;
// 					bestNode.height = height;
// 					bestY = topSideY;
// 					bestX = (int)freeRectangles[i].x;
// 				}
// 			}
// 			if (allowRotations && freeRectangles[i].width >= height && freeRectangles[i].height >= width) {
// 				int topSideY = (int)freeRectangles[i].y + width;
// 				if (topSideY < bestY || (topSideY == bestY && freeRectangles[i].x < bestX)) {
// 					bestNode.x = freeRectangles[i].x;
// 					bestNode.y = freeRectangles[i].y;
// 					bestNode.width = height;
// 					bestNode.height = width;
// 					bestY = topSideY;
// 					bestX = (int)freeRectangles[i].x;
// 				}
// 			}
// 		}
// 		return bestNode;
	};
	
	var $placeByCPR = function(rect, scores) {
		return self.makeRect();
		
// 		Rect bestNode = new Rect();
// 		//memset(&bestNode, 0, sizeof(Rect));
//  
// 		bestContactScore = -1;
//  
// 		for(int i = 0; i < freeRectangles.Count; ++i) {
// 			// Try to place the rectangle in upright (non-flipped) orientation.
// 			if (freeRectangles[i].width >= width && freeRectangles[i].height >= height) {
// 				int score = ContactPointScoreNode((int)freeRectangles[i].x, (int)freeRectangles[i].y, width, height);
// 				if (score > bestContactScore) {
// 					bestNode.x = (int)freeRectangles[i].x;
// 					bestNode.y = (int)freeRectangles[i].y;
// 					bestNode.width = width;
// 					bestNode.height = height;
// 					bestContactScore = score;
// 				}
// 			}
// 			if (allowRotations && freeRectangles[i].width >= height && freeRectangles[i].height >= width) {
// 				int score = ContactPointScoreNode((int)freeRectangles[i].x, (int)freeRectangles[i].y, height, width);
// 				if (score > bestContactScore) {
// 					bestNode.x = (int)freeRectangles[i].x;
// 					bestNode.y = (int)freeRectangles[i].y;
// 					bestNode.width = height;
// 					bestNode.height = width;
// 					bestContactScore = score;
// 				}
// 			}
// 		}
// 		return bestNode;
	};

// 	int ContactPointScoreNode(int x, int y, int width, int height) {
// 		int score = 0;
//  
// 		if (x == 0 || x + width == binWidth)
// 			score += height;
// 		if (y == 0 || y + height == binHeight)
// 			score += width;
//  
// 		for(int i = 0; i < usedRectangles.Count; ++i) {
// 			if (usedRectangles[i].x == x + width || usedRectangles[i].x + usedRectangles[i].width == x)
// 				score += CommonIntervalLength((int)usedRectangles[i].y, (int)usedRectangles[i].y + (int)usedRectangles[i].height, y, y + height);
// 			if (usedRectangles[i].y == y + height || usedRectangles[i].y + usedRectangles[i].height == y)
// 				score += CommonIntervalLength((int)usedRectangles[i].x, (int)usedRectangles[i].x + (int)usedRectangles[i].width, x, x + width);
// 		}
// 		return score;
// 	}

// 	int CommonIntervalLength(int i1start, int i1end, int i2start, int i2end) {
// 		if (i1end < i2start || i2end < i1start)
// 			return 0;
// 		return Mathf.Min(i1end, i2end) - Mathf.Max(i1start, i2start);
// 	}
	
	var $placeByBAF = function(rect, scores) {
		var result = self.makeRect();
		var bestAreaFit = REALLY_BIG;
		var bestShortSideFit = REALLY_BIG;
				
		for(var i = 0; i < self.$freeRects.length; i++) {
			var freeRect = self.$freeRects[i]; // self.normalizeRect(self.$freeRects[i]);
			var areaFit = 
				freeRect.width * freeRect.height -
				rect.width * rect.height;
				
			if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
				var leftoverHoriz = Math.abs(freeRect.width - rect.width);
				var leftoverVert = Math.abs(freeRect.height - rect.height);
				var shortSideFit = Math.min(leftoverHoriz, leftoverVert);
 
 				var favorTop = (self.height >= self.width && freeRect.y < result.y);
 				var favorLeft = (self.height <= self.width && freeRect.x < result.x);
 				
				if (areaFit < bestAreaFit || (areaFit == bestAreaFit && (shortSideFit < bestShortSideFit || favorTop || favorLeft))) {
					result.x = freeRect.x;
					result.y = freeRect.y;
					result.w = rect.width;
					result.h = rect.height;
					result.r = false;
					self.normalizeRect(result);
					bestShortSideFit = shortSideFit;
					bestAreaFit = areaFit;
				}
			}
			
// 			if(self.allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
// 				var leftoverHoriz = Math.abs(freeRect.width - rect.height);
// 				var leftoverVert = Math.abs(freeRect.height - rect.width);
// 				var shortSideFit = Math.min(leftoverHoriz, leftoverVert);
//  
// 				if (areaFit < bestAreaFit || (areaFit == bestAreaFit && (shortSideFit < bestShortSideFit || freeRect.x < result.x  || freeRect.y < result.y))) {
// 					result.x = freeRect.x;
// 					result.y = freeRect.y;
// 					result.w = rect.height;
// 					result.h = rect.width;
// 					result.r = true;
// 					self.normalizeRect(result);
// 					bestShortSideFit = shortSideFit;
// 					bestAreaFit = areaFit;
// 				}
// 			}
		}
		return result;
 	};
}

(new JoePacker()).register();