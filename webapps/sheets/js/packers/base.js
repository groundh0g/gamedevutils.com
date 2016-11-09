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
*/

var packers = packers || {};

function BasePacker(name, isDefault) {
	var self = this;
	this.name = name || "Null";
	this.defaultSortBy = "NAME";
	this.isDefault = isDefault || false;
	this.version = "0.1.0";

	// collections of messages, cleared again in init()
 	this.msgErrors = [];
 	this.msgWarnings = [];
 	this.msgInfos = [];

	// a valid, do-nothing placeholder method
	var doNothing = function () { };
	
	// likely unused, but called for all packers at start of pack()
	// sets warnings and error messages, if any. inits DoPack params
	// this might be useful for checking browser compatibility?
	var init = function(completeCallback, statusCallback) { 
		// clear messages
		self.msgErrors = [];
		self.msgWarnings = [];
		self.msgInfos = [];
		
		// task variables rather than passing as params N times per pack frame
		self.DoPack_FrameCount = 0;
		self.DoPack_ImageKeys = [];
		self.DoPack_Images = {};
		self.DoPack_Options = {};
		self.DoPack_AllOptions = {};
		self.DoPack_CompleteCallback = completeCallback || self.DoPack_CompleteCallback || doNothing;
		self.DoPack_StatusCallback   = statusCallback   || self.DoPack_StatusCallback   || doNothing;
		self.DoPack_FramesProcessed = 0;
		self.DoPack_MaxFramesProcessed = 0;
		
		if(self.DoInit && typeof self.DoInit === "function") { self.DoInit(); }
	};
	
	// Accepts an array of image pool entities (a collection of zero or more ImageItem 
	// objects) and the set of options from the left sidebar. 
	// Marks each image pool entity with their location & rotation within the sheet. 
	// Return value to callbackComplete includes a "success" boolean property. 
	// This is an asynchronous call.
	this.pack = function(images, options, completeCallback, statusCallback) { 

		init(completeCallback, statusCallback); // all the self.DoPack_XXX variables are initialized here

		// if callbacks were specified, use them
		var fnComplete = completeCallback || self.DoPack_CompleteCallback || doNothing;
		var fnStatus   = statusCallback   || self.DoPack_StatusCallback   || doNothing;
		
		if(images && Object.keys(images).length) {
			ImageItem.reloadImagePoolFrames(images, function() {
				packCallback(images, options, fnComplete, fnStatus);
			});
		} else {
			packCallback(images, options, fnComplete, fnStatus);
		}
	};

	var packCallback = function(images, options, completeCallback, statusCallback) { 
		// hand self.DoPack() the subset of options that it cares about
		self.DoPack_Options = trimOptions(options);
		self.DoPack_AllOptions = options;
		
		// count frames of animated GIFs, or just use first frame?
		var extractGifFrames = 
			options &&
			options.doAnimatedGifExpand &&
			options.doAnimatedGifExpand();

		// count frames to process; order of ImageItem keys is irrelevant
		var imageKeys = Object.keys(images);
		for(var i = 0; i < imageKeys.length; i++) {
			if(extractGifFrames) {
				self.DoPack_FrameCount += images[imageKeys[i]].frameCount;
			} else {
				self.DoPack_FrameCount++;
			}
			$(images[imageKeys[i]].frames).each(function(ndx2,frame) {
				if(frame.rectSprite) delete frame["rectSprite"];
				if(frame.hash1)      delete frame["hash1"];
				if(frame.hash2)      delete frame["hash2"];
				if(frame.trim)       delete frame["trim"];
				if(frame.padding)    delete frame["padding"];
			});
		}
		
		// sanity check total frame count
		if(self.DoPack_FrameCount < 1) {
			// if there aren't any frames, ignore call to pack()
			self.addInfo("No sprites have been loaded. Nothing to do.");
			completeCallback( { success: true } );
			return;
		} else {
			// report frame count, which may be greater than image count
			self.addInfo("Discovered " + self.DoPack_FrameCount + " frame(s) in " + imageKeys.length + " image(s).");
		}

		// no errors were set in self.DoInit() or trimOptions(); start processing frames
		if(self.msgErrors.length === 0) {
			if(self.DoPack && typeof self.DoPack === "function") {
				// start packing!
				var widthInit = 1;
				var widthMax = parseInt(options.width || 1);
				var heightInit = 1;
				var heightMax = parseInt(options.height || 1);
				
				if(widthMax < widthInit) {
					self.addWarning("Width [" + widthMax + "] cannot be less than 1. Setting value to [1024].");
					widthMax = 1024;
				} else if(heightMax < heightInit) {
					self.addWarning("Height [" + heightMax + "] cannot be less than 1. Setting value to [1024].");
					heightMax = 1024;
				}
				
				if(options.doForcePowOf2()) {
					var widthPo2 = roundUpToPowerOfTwo(widthMax);
					if(widthMax !== widthPo2) {
						self.addWarning("Power of Two is specified, but width [" + widthMax + "] does not conform. Setting value to [" + widthPo2 + "].");
						widthMax = widthPo2;
					}
					var heightPo2 = roundUpToPowerOfTwo(heightMax);
					if(heightMax !== heightPo2) {
						self.addWarning("Power of Two is specified, but height [" + heightMax + "] does not conform. Setting value to [" + heightPo2 + "].");
						heightMax = heightPo2;
					}
				}
				
				if(options.doForceSquare()) {
					if(widthMax != heightMax) {
						var maxSize = Math.max(widthMax, heightMax);
						self.addWarning("Force Square is specified, but width [" + widthMax + "] and height [" + heightMax + "] are different. Setting both to largest value [" + maxSize + "].");
						widthMax = heightMax = maxSize;
					}
				}
				
				if(options.doFixedSize()) {
					widthInit = widthMax;
					heightInit = heightMax;
				}
				
				self.width           = widthInit;
				self.MAX_WIDTH       = widthMax;
				self.height          = heightInit;
				self.MAX_HEIGHT      = heightMax;
				self.forcePowerOfTwo = options.doForcePowOf2() || false;
				self.forceSquare     = options.doForceSquare() || false;
				self.paddingShape    = Math.max(0, parseInt(options.shapePadding  || 0));
				self.paddingBorder   = Math.max(0, parseInt(options.borderPadding || 0));
				self.paddingInner    = Math.max(0, parseInt(options.innerPadding  || 0));
				self.allowRotate     = options.doAllowRotate() || false;
				self.doTrim          = options.doTrim() || false;
				self.trimThreshold   = parseInt(options.trimThreshold || 0);
				if(self.doTrim) {
					if(extractGifFrames) {
						self.addWarning("Trim Mode of 'Trim' and Animated GIF of 'Extract Frames' are incompatible. Disabling Trim.");
						self.doTrim = false;
					} else if(self.trimThreshold > 254) {
						self.addWarning("Trimming was enabled, but the threshold is too high [" + self.trimThreshold + "]. All pixels would be trimmed. Setting threshold to [254].");
						self.trimThreshold = 254;
					} else if(self.trimThreshold < 0) {
						self.addWarning("Trimming was enabled, but the threshold is too low [" + self.trimThreshold + "]. No pixels would be trimmed. Setting threshold to [0].");
						self.trimThreshold = 0;
					}
				}
				
				self.doAliasSprites = options.doAliasSprites() || false;
				
				self.DoPack_Images = images;
				
				// run postProcess BEFORE sorting; likely affects results
				$(Object.keys(images)).each(function(index, key) {
					images[key].postProcess(null, self);
				});

				self.DoPack_ImageKeys = BasePacker.SortBy[options["sortBy"]](images, self);
				
				setTimeout(doPackTask, 0);
			} else {
				// oops. not sure what to do. packer isn't implemented.
				self.addError("DoPack() not yet implemented in this packer.");
				completeCallback( { success: false } );
			}
		// errors were set in self.DoInit() or trimOptions(); don't process frames
		} else {
			completeCallback( { success: false } );
		}
	};

	// handle the pseudo-threading tasks for self.DoPack()
	var doPackTask = function() {
		// have we made forward progress? previous frames may be revisited!
		if(self.DoPack_MaxFramesProcessed < self.DoPack_FramesProcessed) {
			self.DoPack_MaxFramesProcessed = self.DoPack_FramesProcessed;
		}
		
		// let UI know what we're up to
		// report how far we've progressed, ignoring revisited frames
		// (I don't want the progress bar jumping back and forth, so use max frame count)
		self.DoPack_StatusCallback(self.DoPack_MaxFramesProcessed);

		// holy bat crap - we're done!
		if(self.DoPack_MaxFramesProcessed === self.DoPack_FrameCount) {
			self.DoPack_CompleteCallback({ success: true });
			return;
		}
		
		// repeatedly call self.DoPack() until all sprite frames have been placed
		self.DoPack();
		setTimeout(doPackTask, 10); // TODO: drop timeout to zero or one; I just want to see it working for now
	};

	// some options are handled globally, some are handled by the packer implementation
	var trimOptions = function(options) {
		var opts = {}; // the packer-specific options
		
		// sift options into global or packer-specific collections
		var keys = Object.keys(options);
		for(var i = 0; i < keys.length; i++) {
			var key = keys[i];
			if(typeof options[key] === "function") {
				// ignore functions, only interested in values
			} else {
				switch(key) {
					// ignore these, they're handled by main app
					case "name":
					case "dataFormat":
					case "nameInSheet":
					case "includeAt2x":
					case "cleanAlpha":
					case "colorMask":
					case "debugMode":
					case "trimMode":
					case "trimThreshold":
					case "animatedGif":
					case "compressProject":
					case "aliasSprites":
						switch(key) {
							case "aliasSprites": 
								// was sprite aliasing requested?
								if(options.doAliasSprites()) {
									self.addWarning("Alias Sprites not yet implemented.");
								}
								break;
							case "includeAt2x":
								// was @2x requested?
								if(options.doIncludeAt2x()) {
									self.addWarning("Include @2x not yet implemented.");
								}
								break;
						}
						break;
					
					// these are the packer-specific settings
					case "spritePacker":
					case "sortBy":
					case "allowRotate":
					case "width":
					case "height":
					case "sizeMode":
					case "constraint":
					case "forceSquare":
					case "borderPadding":
					case "shapePadding":
					case "innerPadding":
					case "imageFormat":
						switch(key) {
							case "spritePacker":
								// are we using the right packer?
								if(self.name != options[key]) {
									self.addError("Sprite packer mismatch. Expected '" + options[key] + "', found '" + self.name + "'.");
								}
								break;
							case "sortBy":
								// does sort method exist?
								if(typeof BasePacker.SortBy[options[key]] !== "function") {
									self.addError("Unknown sort method, '" + options[key] + "'.");
								}
								break;
							case "allowRotate":
								// was rotation requested?
								if(options.doAllowRotate()) {
									self.addWarning("Allow Rotate not yet implemented.");
								}
								break;
						}
						opts[key] = options[key];
						break;

					// include future options that we can't know about today
					default:
						// if unused in packer, throw warning message? Maybe? Maybe not?
						self.addInfo("Unknown option, '" + key + "'. Passing to packer, but it may not be used.");
						opts[key] = options[key];
						break;
				}
			}
		}
		return opts;
	};

	// handle resizing; assumes pack (and, therefore, init) have been called
	this.Resize = function(minWidth, minHeight) {
		var wOrig = self.width;
		var hOrig = self.height;
		minWidth  = parseInt(minWidth  || (self.width  + 16));
		minHeight = parseInt(minHeight || (self.height + 16));
		if(self.width >= self.height && hOrig < self.MAX_HEIGHT) {
			// increase height
			self.height = minHeight;
			if(self.forcePowerOfTwo) { 
				self.height = Math.min(self.MAX_HEIGHT, roundUpToPowerOfTwo(self.height)); 
			}

			if(self.forceSquare) {
				self.width = Math.min(self.MAX_WIDTH, self.height);
			}
		} else {
			// increase width
			self.width = minWidth;
			if(self.forcePowerOfTwo) { 
				self.width = Math.min(self.MAX_WIDTH, roundUpToPowerOfTwo(self.width)); 
			}

			if(self.forceSquare) {
				self.height = Math.min(self.MAX_HEIGHT, self.width);
			}
		}
		
		return (wOrig != self.width || hOrig != self.height);
	};
	
	this.normalizeRect = function(r) {
		r.w = r.width  = (r.width  || r.w || 0);
		r.h = r.height = (r.height || r.h || 0);
		r.right  = r.x + r.width;
		r.bottom = r.y + r.height;
		r.r = r.rotate = (r.r || r.rotate || false);
		return r;
	};
	
	this.intersectsRect = function(r1, r2) {
		self.normalizeRect(r1);
		self.normalizeRect(r2);
		
		return !(
			r2.x > r1.right  ||
			r2.right < r1.x  ||
			r2.y > r1.bottom ||
			r2.bottom < r1.y
		);
	};
	
	this.containedInRect = function(r2, r1) {
		return self.containsRect(r1, r2);
	};
	
	this.containsRect = function(r1, r2) {
		self.normalizeRect(r1);
		self.normalizeRect(r2);
		
		return (
			r2.x >= r1.x &&
			r2.y >= r1.y &&
			r2.right  <= r1.right &&
			r2.bottom <= r1.bottom
		);
	};
	
	this.isEmptyRect = function(r) {
		self.normalizeRect(r);
		return (r.w <= 0 || r.h <= 0);
	};
	
	this.makeRect = function(width, height, rotate) {
		return self.normalizeRect({ 
			x:0,
			y:0,
			width:width   || 0,
			height:height || 0,
			r:rotate || false 
		});
	};

	this.copyRect = function(r) {
		return self.normalizeRect({ 
			x:r.x || 0,
			y:r.y || 0,
			w:r.w || r.width  || 0,
			h:r.h || r.height || 0,
			r:r.r || r.rotate || false 
		});
	};
	
	// manage the various types of messages
	this.addWarning = function(msg) { self.msgWarnings.push(msg); };
	this.addError   = function(msg) { self.msgErrors.push(msg); };
	this.addInfo    = function(msg) { self.msgInfos.push(msg); };

	// add this packer instance to the list of available packers
	this.register = function() { packers[self.name] = self; };
}

BasePacker.SortBy = {};
BasePacker.SortByDefault = "NAME";

BasePacker.SortBy["NAME"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;
	});
};

BasePacker.SortBy["NAME_DESC"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		return (a.toUpperCase() < b.toUpperCase()) ? 1 : (a.toUpperCase() > b.toUpperCase()) ? -1 : 0;
	});
};

BasePacker.SortBy["WIDTH"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		var width_a = images[a].width;
		var width_b = images[b].width;
		if(packer && packer["doTrim"]) {
			width_a = images[a].frames[0].width;
			width_b = images[b].frames[0].width;
		}
		return (width_a < width_b) ? -1 : (width_a > width_b) ? 1 :
			// if width is same, use key to sort
			((a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0);
	});
};

BasePacker.SortBy["WIDTH_DESC"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		var width_a = images[a].width;
		var width_b = images[b].width;
		if(packer && packer["doTrim"]) {
			width_a = images[a].frames[0].width;
			width_b = images[b].frames[0].width;
		}
		return (width_a < width_b) ? 1 : (width_a > width_b) ? -1 :
			// if width is same, use key to sort
			((a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0);
	});
};

BasePacker.SortBy["HEIGHT"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		var height_a = images[a].height;
		var height_b = images[b].height;
		if(packer && packer["doTrim"]) {
			height_a = images[a].frames[0].height;
			height_b = images[b].frames[0].height;
		}
		return (height_a < height_b) ? -1 : (height_a > height_b) ? 1 : 
			// if height is same, use key to sort
			((a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0);
	});
};

BasePacker.SortBy["HEIGHT_DESC"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		var height_a = images[a].height;
		var height_b = images[b].height;
		if(packer && packer["doTrim"]) {
			height_a = images[a].frames[0].height;
			height_b = images[b].frames[0].height;
		}
		return (height_a < height_b) ? 1 : (height_a > height_b) ? -1 :
			// if height is same, use key to sort
			((a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0);
	});
};

BasePacker.SortBy["AREA"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		var area_a = images[a].width * images[a].height;
		var area_b = images[b].width * images[b].height;
		if(packer && packer["doTrim"]) {
			area_a = images[a].frames[0].width * images[a].height;
			area_b = images[b].frames[0].width * images[b].height;
		}
		return (area_a < area_b) ? -1 : (area_a > area_b) ? 1 :
			// if area is same, use key to sort
			((a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0);
	});
};

BasePacker.SortBy["AREA_DESC"] = function(images, packer) {
	return Object.keys(images).sort(function(a,b) {
		var area_a = images[a].width * images[a].height;
		var area_b = images[b].width * images[b].height;
		if(packer && packer["doTrim"]) {
			area_a = images[a].frames[0].width * images[a].height;
			area_b = images[b].frames[0].width * images[b].height;
		}
		return (area_a < area_b) ? 1 : (area_a > area_b) ? -1 :
			// if area is same, use key to sort
			((a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0);
	});
};
