var GifParser = function(options, callback) {
	var self = this;
	
	var doNothing = function() { };
	
	this.options = options || {};
	this.callback = callback || doNothing;
	
	var source = null;
	var frame = null;
	var frames = [];
	
	this.getFrames = function() { return frames; }
	this.getFrame = function(i) { return frames[i]; }

	var transparency = null;
	var delay = null;
	var disposalMethod = null;
	var disposalRestoreFromIdx = 0;
	var lastDisposalMethod = null;
	var lastImg = null;

	var ctx_scaled = false;
	
	var canvas = document.createElement('canvas');
	canvas.width = "50px";
	canvas.height = "50px";
	var ctx = canvas.getContext('2d');
	var tmpCanvas = document.createElement('canvas');

	var clear = function () {
		transparency = null;
		delay = null;
		lastDisposalMethod = disposalMethod;
		disposalMethod = null;
		frame = null;
	};
	
	var setSizes = function(w, h) {
		canvas.width = w * get_canvas_scale();
		canvas.height = h * get_canvas_scale();

		tmpCanvas.width = w;
		tmpCanvas.height = h;
		tmpCanvas.style.width = w + 'px';
		tmpCanvas.style.height = h + 'px';
		tmpCanvas.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
	};

	var get_canvas_scale = function() { return 1; }
	
	var pushFrame = function () {
		if (!frame) return;
		frames.push({
			data: frame.getImageData(0, 0, hdr.width, hdr.height),
			delay: delay
		});
	};
	
	var handler = {
		hdr: function (_hdr) {
			hdr = _hdr;
			setSizes(hdr.width, hdr.height)
		},
		gce: function (gce) {
			pushFrame();
			clear();
			transparency = gce.transparencyGiven ? gce.transparencyIndex : null;
			delay = gce.delayTime;
			disposalMethod = gce.disposalMethod;
		},
		com: doNothing,
		app: {
			NETSCAPE: doNothing
		},
		img: function (img) {
			if (!frame) frame = tmpCanvas.getContext('2d');

			var currIdx = frames.length;

			//ct = color table, gct = global color table
			var ct = img.lctFlag ? img.lct : hdr.gct; // TODO: What if neither exists?

			/*
			Disposal method indicates the way in which the graphic is to
			be treated after being displayed.

			Values :    0 - No disposal specified. The decoder is
							not required to take any action.
						1 - Do not dispose. The graphic is to be left
							in place.
						2 - Restore to background color. The area used by the
							graphic must be restored to the background color.
						3 - Restore to previous. The decoder is required to
							restore the area overwritten by the graphic with
							what was there prior to rendering the graphic.

							Importantly, "previous" means the frame state
							after the last disposal of method 0, 1, or 2.
			*/
			if (currIdx > 0) {
				if (lastDisposalMethod === 3) {
					// Restore to previous
					frame.putImageData(frames[disposalRestoreFromIdx].data, 0, 0);
				} else {
					disposalRestoreFromIdx = currIdx - 1;
				}

				if (lastDisposalMethod === 2) {
					// Restore to background color
					// Browser implementations historically restore to transparent; we do the same.
					// http://www.wizards-toolkit.org/discourse-server/viewtopic.php?f=1&t=21172#p86079
					frame.clearRect(lastImg.leftPos, lastImg.topPos, lastImg.width, lastImg.height);
				}
			}
			// else, Undefined/Do not dispose.
			// frame contains final pixel data from the last frame; do nothing

			//Get existing pixels for img region after applying disposal method
			var imgData = frame.getImageData(img.leftPos, img.topPos, img.width, img.height);

			//apply color table colors
			var cdd = imgData.data;
			img.pixels.forEach(function (pixel, i) {
				// imgData.data === [R,G,B,A,R,G,B,A,...]
				if (pixel !== transparency) {
					cdd[i * 4 + 0] = ct[pixel][0];
					cdd[i * 4 + 1] = ct[pixel][1];
					cdd[i * 4 + 2] = ct[pixel][2];
					cdd[i * 4 + 3] = 255; // Opaque.
				}
			});
			imgData.data = cdd;

			frame.putImageData(imgData, img.leftPos, img.topPos);

			if (!ctx_scaled) {
				ctx.scale(get_canvas_scale(),get_canvas_scale());
				ctx_scaled = true;
			}

			// We could use the on-page canvas directly, except that we draw a progress
			// bar for each image chunk (not just the final image).
			ctx.drawImage(tmpCanvas, 0, 0);

			lastImg = img;
		},
		eof: function (block) {
			pushFrame();
			//console.log(new Date());
		},
		callback: function() {}
	};

	this.loadFromURL = function(url, callback) {
		var request = new XMLHttpRequest();
		request.overrideMimeType('text/plain; charset=x-user-defined');
		request.filename = url;
		request.filetype = "image/gif";
		request.onload = function(e) {
			var stream = new Stream(request.responseText);
			stream.sourcePath = this.filename;
			stream.sourceType = this.filetype;
			stream.loadMethod = "loadFromURL";
			self.loadFromStream(stream, callback);
		};
		request.onerror = function() { 
			throw "ERROR: Unable to retrieve image at '" + this.filename + "'.";
		};
		request.open('GET', url, true);
		request.send();
	};
	
	this.loadFromFile = function(files, callback) {
		var file = null;
		
		if(files && files.length && files[0].name) {
			file = files[0];
		} else if(files && files.name) {
			file = files;
		} else {
			throw "ERROR: Parameter 'files' must be a valid file object or an array of file obects(from <INPUT type='file' ... />).";
		}
		
		var reader = new FileReader();
		reader.filename = file.name;
		reader.filetype = file.type;
		reader.onload = function(e) {
			var stream = new Stream(e.target.result);
			stream.sourcePath = this.filename;
			stream.sourceType = this.filetype;
			stream.loadMethod = "loadFromFile";
			self.loadFromStream(stream, callback);
		};
		reader.readAsBinaryString(file);
	};

	var URI_PREAMBLE_ANIMATED_GIF = "data:image/gif;base64,"
	this.loadFromDataUri = function(uri, callback) {
		if(uri.startsWith(URI_PREAMBLE_ANIMATED_GIF)) {
			var stream = new Stream(base64.decode(uri.substring(URI_PREAMBLE_ANIMATED_GIF.length)));
			stream.sourcePath = URI_PREAMBLE_ANIMATED_GIF + "...";
			stream.sourceType = "image/gif";
			stream.loadMethod = "loadFromDataUri";
			self.loadFromStream(stream, callback);
		} else {
			throw "ERROR: URI must begin with '" + URI_PREAMBLE_ANIMATED_GIF + "'.";
		}
	};

	this.loadFromStream = function(stream, callback) {
		parseGIF(stream, handler);
		(callback || self.callback || doNothing)();
		return false;
	};

};
