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

function Options(copy) {
	copy = copy || {};

	this.name = copy.name || "Untitled";
	this.imageFormat = copy.imageFormat || "PNG";
	this.dataFormat = copy.dataFormat || "JSON";
	this.nameInSheet = copy.nameInSheet || "Strip Extension";
	
	this.doStripExtensions = function() { return this.nameInSheet === "Strip Extension"; };
	
	this.spritePacker = copy.spritePacker || "Joe";
	this.sortBy = copy.sortBy || "AREA_DESC";
	this.allowRotate = copy.allowRotate || "No";
	
	this.doAllowRotate = function() { return this.allowRotate === "Yes"; };

	this.width = copy.width || 1024;
	this.height = copy.height || 1024;
	this.sizeMode = copy.sizeMode || "Max Size";
	this.constraint = copy.constraint || "Power of Two";
	this.forceSquare = copy.forceSquare || "No";
	this.includeAt2x = copy.includeAt2x || "No";
	
	this.doFixedSize   = function() { return this.sizeMode === "Fixed Size"; };
	this.doForcePowOf2 = function() { return this.constraint === "Power of Two"; };
	this.doForceSquare = function() { return this.forceSquare === "Yes"; };
	this.doIncludeAt2x = function() { return this.includeAt2x === "Yes"; };

	this.borderPadding = copy.borderPadding || 2;
	this.shapePadding = copy.shapePadding || 2;
	this.innerPadding = copy.innerPadding || 0;
	
	this.cleanAlpha = copy.cleanAlpha || "No";
	this.colorMask = copy.colorMask || "No";
	this.aliasSprites = copy.aliasSprites || "No";
	this.debugMode = copy.debugMode || "No";
	this.trimMode = copy.trimMode || "None";
	this.trimThreshold = copy.trimThreshold || 1;

	this.doCleanAlpha = function() { return this.cleanAlpha === "Yes"; };
	this.doColorMask = function() { return this.colorMask === "Yes"; };
	this.doAliasSprites = function() { return this.aliasSprites === "Yes"; };
	this.doDebug = function() { return this.debugMode === "Yes"; };
	this.doTrim = function() { return this.trimMode === "Trim" && this.trimThreshold > 0; };
	
	this.animatedGif = copy.animatedGif || "Use First Frame";
	this.compressProject = copy.compressProject || "No";
	
	this.doAnimatedGifExpand = function() { return this.animatedGif === "Extract Frames"; };
	this.doCompressProject = function() { return this.compressProject === "Yes"; };
	
	this.read = function(obj) {
		var opts = {};
		if(obj && Object.prototype.toString.call(obj) === "[object String]") {
			// read from JSON
			var opts = $.parseJSON(obj);
		} else if(obj && obj.name) {
			// copy from another Options instance
			opts = obj;
		} else {
			// read from UI
			opts["name"] = $("#txtName").val();
			opts["imageFormat"] = $("#ddlImageFormat").text();
			opts["dataFormat"]  = $("#ddlDataFormat").text();
			opts["nameInSheet"] = $("#ddlNameInSheet").text();

			opts["spritePacker"]  = $("#ddlSpritePacker").text();
			opts["sortBy"]  = $("#ddlSortBy").text();
			opts["allowRotate"]  = $("#ddlAllowRotate").text();
	
			opts["width"]  = parseInt($("#txtWidth").val(),10);
			opts["height"] = parseInt($("#txtHeight").val(),10);
			opts["sizeMode"]  = $("#ddlSizeMode").text();
			opts["constraint"]  = $("#ddlConstraint").text();
			opts["forceSquare"]  = $("#ddlForceSquare").text();
			opts["includeAt2x"]  = $("#ddlIncludeAt2x").text();
		
			opts["borderPadding"] = parseInt($("#txtBorderPadding").val(),10);
			opts["shapePadding"] = parseInt($("#txtShapePadding").val(),10);
			opts["innerPadding"] = parseInt($("#txtInnerPadding").val(),10);

			opts["cleanAlpha"]  = $("#ddlCleanAlpha").text();
			opts["colorMask"]  = $("#ddlColorMask").text();
			opts["aliasSprites"]  = $("#ddlAliasSprites").text();
			opts["debugMode"]  = $("#ddlDebugMode").text();
			opts["trimMode"]  = $("#ddlTrimMode").text();
			opts["trimThreshold"] = parseInt($("#txtTrimThreshold").val(),10);

			opts["animatedGif"]  = $("#ddlAnimatedGif").text();
			opts["compressProject"]  = $("#ddlCompressProject").text();
		}
	
		this.name = $.trim(opts.name || this.name);
		this.imageFormat = $.trim(opts.imageFormat || this.imageFormat);
		this.dataFormat = $.trim(opts.dataFormat || this.dataFormat);
		this.nameInSheet = $.trim(opts.nameInSheet || this.nameInSheet);

		this.spritePacker = $.trim(opts.spritePacker || this.spritePacker);
		this.sortBy = $.trim(opts.sortBy || this.sortBy);
		this.allowRotate = $.trim(opts.allowRotate || this.allowRotate);

		this.width = $.isNumeric(opts.width) ? opts.width : this.width;
		this.height = $.isNumeric(opts.height) ? opts.height : this.width;
		this.sizeMode = $.trim(opts.sizeMode || this.sizeMode);
		this.constraint = $.trim(opts.constraint || this.constraint);
		this.forceSquare = $.trim(opts.forceSquare || this.forceSquare);
		this.includeAt2x = $.trim(opts.includeAt2x || this.includeAt2x);

		this.borderPadding = $.isNumeric(opts.borderPadding) ? opts.borderPadding : this.borderPadding;
		this.shapePadding  = $.isNumeric(opts.shapePadding) ? opts.shapePadding : this.shapePadding;
		this.innerPadding  = $.isNumeric(opts.innerPadding) ? opts.innerPadding : this.innerPadding;

		this.cleanAlpha = $.trim(opts.cleanAlpha || this.cleanAlpha);
		this.colorMask = $.trim(opts.colorMask || this.colorMask);
		this.aliasSprites = $.trim(opts.aliasSprites || this.aliasSprites);
		this.debugMode = $.trim(opts.debugMode || this.debugMode);
		this.trimMode = $.trim(opts.trimMode || this.trimMode);
		this.trimThreshold = $.isNumeric(opts.trimThreshold) ? opts.trimThreshold : this.trimThreshold;
		
		this.animatedGif = $.trim(opts.animatedGif || this.animatedGif);
		this.compressProject = $.trim(opts.compressProject || this.compressProject);
		
		return this;
	};
	
	this.write = function() {
		return JSON.stringify(this, null, 2);
	};

	this.updateUI = function() {
		// refresh UI
		$("#txtName").val(this["name"]);
		$("#ddlImageFormat").text(this["imageFormat"]);
		$("#ddlDataFormat").text(this["dataFormat"]);
		$("#ddlNameInSheet").text(this["nameInSheet"]);

		$("#ddlSpritePacker").text(this["spritePacker"]);
		$("#ddlSortBy").text(this["sortBy"]);
		$("#ddlAllowRotate").text(this["allowRotate"]);
		
		$("#txtWidth").val(this["width"]);
		$("#txtHeight").val(this["height"]);
		$("#ddlSizeMode").text(this["sizeMode"]);
		$("#ddlConstraint").text(this["constraint"]);
		$("#ddlForceSquare").text(this["forceSquare"]);
		$("#ddlIncludeAt2x").text(this["includeAt2x"]);
	
		$("#txtBorderPadding").val(this["borderPadding"]);
		$("#txtShapePadding").val(this["shapePadding"]);
		$("#txtInnerPadding").val(this["innerPadding"]);

		$("#ddlCleanAlpha").text(this["cleanAlpha"]);
		$("#ddlColorMask").text(this["colorMask"]);
		$("#ddlAliasSprites").text(this["aliasSprites"]);
		$("#ddlDebugMode").text(this["debugMode"]);
		$("#ddlTrimMode").text(this["trimMode"]);
		$("#txtTrimThreshold").val(this["trimThreshold"]);

		$("#ddlAnimatedGif").text(this["animatedGif"]);
		$("#ddlCompressProject").text(this["compressProject"]);
	};
	
	this.equals = function(obj1, obj2) {
		var result = false;

		if(obj1 == null && obj2 == null) {
			// compare self values to UI values
			var opts = new Options();
			opts.read();
			result = this.equals(this, opts);
		} else if(obj1 && obj1.name && obj2 == null) {
			// compare self values to obj1 values
			result = this.equals(this, obj1);
		} else if(obj1 && obj1.name && obj2 && obj2.name) {
			// compare obj1 values to obj2 values
			result = 
				$.trim(obj1.name) === $.trim(obj2.name) &&
				$.trim(obj1.imageFormat) === $.trim(obj2.imageFormat) &&
				$.trim(obj1.dataFormat) === $.trim(obj2.dataFormat) &&
				$.trim(obj1.nameInSheet) === $.trim(obj2.nameInSheet) &&

				$.trim(obj1.spritePacker) === $.trim(obj2.spritePacker) &&
				$.trim(obj1.sortBy) === $.trim(obj2.sortBy) &&
				$.trim(obj1.allowRotate) === $.trim(obj2.allowRotate) &&

				$.trim(obj1.width) === $.trim(obj2.width) &&
				$.trim(obj1.height) === $.trim(obj2.height) &&
				$.trim(obj1.sizeMode) === $.trim(obj2.sizeMode) &&
				$.trim(obj1.constraint) === $.trim(obj2.constraint) &&
				$.trim(obj1.forceSquare) === $.trim(obj2.forceSquare) &&
				$.trim(obj1.includeAt2x) === $.trim(obj2.includeAt2x) &&

				$.trim(obj1.borderPadding) === $.trim(obj2.borderPadding) &&
				$.trim(obj1.shapePadding) === $.trim(obj2.shapePadding) &&
				$.trim(obj1.innerPadding) === $.trim(obj2.innerPadding) &&

				$.trim(obj1.cleanAlpha) === $.trim(obj2.cleanAlpha) &&
				$.trim(obj1.colorMask) === $.trim(obj2.colorMask) &&
				$.trim(obj1.aliasSprites) === $.trim(obj2.aliasSprites) &&
				$.trim(obj1.debugMode) === $.trim(obj2.debugMode) &&
				$.trim(obj1.trimMode) === $.trim(obj2.trimMode) &&
				$.trim(obj1.trimThreshold) === $.trim(obj2.trimThreshold) &&

				$.trim(obj1.animatedGif) === $.trim(obj2.animatedGif) &&
				$.trim(obj1.compressProject) === $.trim(obj2.compressProject);
		}

		return result;
	};
}
