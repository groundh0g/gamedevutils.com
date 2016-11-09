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

var dataExporters = dataExporters || {};

function BaseDataExporter(name, isDefault) {
	var self = this;
	this.name = name || "Null";
	this.isDefault = isDefault || false;
	this.version = "0.1.0";

	// collections of messages, cleared again in init()
 	this.msgErrors = [];
 	this.msgWarnings = [];
 	this.msgInfos = [];

	// a valid, do-nothing placeholder method
	var doNothing = function () { };
	
	// likely unused, but called for all exporters at start of export()
	// sets warnings and error messages, if any. inits params
	// this might be useful for checking browser compatibility?
	var init = function() { 
		// clear messages
		self.msgErrors = [];
		self.msgWarnings = [];
		self.msgInfos = [];
		
		if(self.DoInit && typeof self.DoInit === "function") { self.DoInit(); }
	};
	
// 	var URI_PREAMBLE = {
// 		"gif" : "data:image/gif;base64,",
// 		"jpg" : "data:image/jpeg;base64,",
// 		"png" : "data:image/png;base64,",
// 	};
	
	var DetectImageType = function(packer) {
		// TODO: detect type ...
		return packer.bufferDataExt || "png";
	};
	
	var DetectDataType = function(atlas_data) {
		// TODO: detect type ...
		return "txt";
	};
	
	var PaddWithLeadingZeros = function(value, expectedLength) {
		var result = "00000000000000000000" + value;
		return result.substr(result.length - expectedLength);
	};
	
	var SplitFilenameFromExtension = function(filename) {
		var result = { filename: filename, extension: "" };
		var index = filename.lastIndexOf(".");
		if(index > 0) {
			result.filename = filename.substr(0, index);
			result.extension = filename.substr(index); // incl. "."
		}
		return result;
	};

	var packer = null;

	// Accepts a packer and a full set of options from the left sidebar. 
	// Return value to callbackComplete includes a "success" boolean property. 
	// This is a synchronous call. (for now)
	this.export = function(images, options, completeCallback, statusCallback) { 
		packer = CurrentPacker || {};
		var imageExporter = CurrentImageExporter || {};
		
		
		init(completeCallback, statusCallback);

		// if callbacks were specified, use them
		var fnComplete = completeCallback || doNothing;
		var fnStatus   = doNothing; // statusCallback   || doNothing;
		
		// no errors were set in self.DoInit() or trimOptions(); start processing frames
		if(self.msgErrors.length === 0) {
			if(self.DoExport && typeof self.DoExport === "function") {
				if(packer && packer.width && packer.height) {

					// TODO: Publish
					var data = {
						application: { 
							name:    FannyPack_SpriteSheet_AppName || "Unknown",
							version: FannyPack_SpriteSheet_Version || "Unknown",
							url:     FannyPack_SpriteSheet_URL || "Unknown"
						},
						packer: {
							name:     packer.name || "Unknown",
							version:  packer.version || "Unknown",
							stats:    packer.StatsMessage || "No Stats",
							width:    packer.width,
							height:   packer.height,
							filename: ""
						},
						dataExporter: {
							name:       self.name || "Unknown",
							version:    self.version || "Unknown",
							exportedOn: new Date().toString()
						},
						imageExporter: {
							name:       imageExporter.name || "Unknown",
							version:    imageExporter.version || "Unknown",
							exportedOn: new Date().toString()
						},
						sprites: []
					};
					
					var trimName = options.doStripExtensions();
					
					$(Object.keys(images)).each(function(index, imageKey) {
						var frames = images[imageKey].frames;
						var multiFrame = (frames.length > 1);
						var name = trimName ? SplitFilenameFromExtension(imageKey).filename : imageKey;
						var expectedLength = ("" + frames.length).length;
						for(var i = 0; i < frames.length; i++) {
							var frameNumber = multiFrame ? "-[" + PaddWithLeadingZeros(i, expectedLength) + "]" : "";
							var frame = images[imageKey].frames[i];
							var rectSprite = frame.rectSprite;
							var rect = {
								name: name + frameNumber,
								x: rectSprite.x,
								y: rectSprite.y,
								w: rectSprite.w,
								h: rectSprite.h,
								r: rectSprite.r
							};
							
							if(frame.padding) {
								rect.padding = frame.padding;
							}
							if(frame.trim) {
								rect.trimLeft    = frame.trim.left;
								rect.trimTop     = frame.trim.top;
								rect.trimOWidth  = frame.trim.origWidth;
								rect.trimOHeight = frame.trim.origHeight;
							}
							data.sprites.push(rect);
						}
					});
					
					var filename = options["name"] || "untitled";
					
// 					var imageFormat = (options["imageFormat"] || DetectImageType(packer)).toLowerCase();
// 					var imagePreamble = URI_PREAMBLE[imageFormat];
// 					var image_data = (packer.exportImageDataURL || packer.bufferDataURL).split(",")[1]; // base64.decode(packer.bufferDataURL.substring(imagePreamble.length));
// 					data.packer.filename = filename + "." + imageFormat;

					var imageFormat = (imageExporter.imageFormat || options["imageFormat"] || "png").toLowerCase();
					var imagePreamble = imageExporter.URI_PREAMBLE || "data:image/png;base64,";
					var image_data = null;
					if(imageExporter && imageExporter.getImageData && typeof imageExporter.getImageData === "function") {
						image_data = imageExporter.getImageData(packer);

					}
					image_data = (image_data || packer.exportImageDataURL || packer.bufferDataURL).split(",")[1]; // base64.decode(packer.bufferDataURL.substring(imagePreamble.length));
					data.packer.filename = filename + "." + imageFormat;
					
					var atlas_data = self.DoExport(data);
					var dataFormat  = (options["dataFormat"]  || DetectDataType(atlas_data)).toLowerCase();

					
					if(imageFormat === "jpg") { self.addInfo("JPG images don't support transparency."); }
					
					var zip = new JSZip();
					zip.file(filename + "." + dataFormat, atlas_data);
					zip.file(filename + "." + imageFormat, image_data, {base64: true});
					saveAs(
						zip.generate({type:"blob", compression:"DEFLATE"}), 
						filename + ".zip"
					);

					fnComplete( { success: true } );
				} else {
					self.addError("This appears to be an empty project. Nothing to do.");
					fnComplete( { success: true } );
				}
			} else {
				// oops. not sure what to do. exporter isn't implemented.
				self.addError("DoExport() not yet implemented in this exporter.");
				fnComplete( { success: false } );
			}
		} else {
			// errors were set in self.DoInit(); don't process frames
			fnComplete( { success: false } );
		}
	};
	
	// manage the various types of messages
	this.addWarning = function(msg) { self.msgWarnings.push(msg); };
	this.addError   = function(msg) { self.msgErrors.push(msg); };
	this.addInfo    = function(msg) { self.msgInfos.push(msg); };

	// add this packer instance to the list of available packers
	this.register = function() { dataExporters[self.name] = self; };
}
