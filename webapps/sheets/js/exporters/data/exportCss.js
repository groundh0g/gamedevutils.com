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

function CssExporter(name, isDefault) {
	BaseDataExporter.call(this, "CSS");
	var self = this;
	this.version = "0.1.0";

	// a valid, do-nothing placeholder method
	var doNothing = function () { };
	
	this.DoInit = function() {
		// TODO: init exporter
	};
	
	this.DoExport = function(data) {
		var result = 
		
		"/* ----------------------------------------------------\n" +
		"   Created with " + data.application.name + ", v" + data.application.version + "\n" +
		"   " + data.application.url + "\n" +
		"\n" +
		"   Packer: " + data.packer.name + ", v" + data.packer.version + "\n" +
		"   " + data.packer.stats + "\n" +
		"\n" +
		"   Exporter (Data): " + data.dataExporter.name + ", v" + data.dataExporter.version + "\n" +
		"   Exporter (Image): " + data.imageExporter.name + ", v" + data.imageExporter.version + "\n" +
		"   " + data.dataExporter.exportedOn + "\n" +
		"   ----------------------------------------------------\n" +
		"   usage: <i class=\"sprite [spritename]\"></i>\n" +
		"          where [spritename] is the sprite you would like to show\n" +
		"   ----------------------------------------------------\n";

		var numRotation = 0;
		var numTrim = 0;
		var numPadding = 0;
		$(data.sprites).each(function(index, sprite){ 
			if(sprite.r) { numRotation++; }
			if(sprite.trimOWidth) { numTrim++; }
			if(sprite.padding) { numPadding++; }
		});
		if(numPadding || numRotation || numTrim) {
			if(numRotation) { 
				result += "   WARNING: rotation is not supported for CSS exports\n";
				result += "            [rotation is used by " + numRotation + " sprite(s)]\n";
			}
			if(numTrim) { 
				result += "   WARNING: trim is not supported for CSS exports\n";
				result += "            [trim is used by " + numTrim + " sprite(s)]\n";
			}
			if(numPadding) { 
				result += "   WARNING: inner padding is not supported for CSS exports ... yet\n";
				result += "            [inner padding is used by " + numPadding + " sprite(s)]\n";
			}
			result += "   ----------------------------------------------------\n";
		}

		result += 
		"*/\n" +
		"\n" +
		".sprite {display:inline-block; overflow:hidden; background-repeat: no-repeat;background-image:url(" + data.packer.filename + ");}\n" +
		"\n";
		
		$(data.sprites).each(function(index, sprite){
			result += 
				"." + sprite.name + " { " + 
				"width:" + sprite.w +  "px; " + 
				"height:" + sprite.h +  "px; " + 
				"background-position: -" + sprite.x +  "px -" + sprite.y +  "px " + 
				"}\n";
		});
		
		return result;
	};
	
	this.$formatName = function(name) {
		return name;
	}
}

(new CssExporter()).register();
