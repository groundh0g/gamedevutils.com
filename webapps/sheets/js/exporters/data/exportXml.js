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

function XmlExporter(name, isDefault) {
	BaseDataExporter.call(this, "XML", true); // Default Exporter
	var self = this;
	this.version = "0.1.0";

	// a valid, do-nothing placeholder method
	var doNothing = function () { };
	
	this.DoInit = function() {
		// TODO: init exporter
	};
	
	this.DoExport = function(data) {
		var result = 
		"<?xml version='1.0' encoding='UTF-8'?>\n" +
		"<!-- Created with " + data.application.name + ", v" + data.application.version + " -->\n" +
		"<!-- " + data.application.url + " -->\n" +
		"\n" +
		"<!-- Packer: " + data.packer.name + ", v" + data.packer.version + " -->\n" +
		"<!-- " + data.packer.stats + " -->\n" +
		"\n" +
		"<!-- Exporter (Data): " + data.dataExporter.name + ", v" + data.dataExporter.version + " -->\n" +
		"<!-- Exporter (Image): " + data.imageExporter.name + ", v" + data.imageExporter.version + " -->\n" +
		"<!-- " + data.dataExporter.exportedOn + " -->\n" +
		"\n" +
		"<!--\n" +
		"  Format:\n" +
		"    n  = name of sprite\n" +
		"    x  = sprite x position in texture\n" +
		"    y  = sprite y position in texture\n" +
		"    w  = sprite width (may be trimmed)\n" +
		"    h  = sprite height (may be trimmed)\n" +
		"    r  = 'y' if sprite is rotated\n" +
		"    p  = sprite padding (if any)\n" +
		"    oX = offset x (if trimmed)\n" +
		"    oY = offset y (if trimmed)\n" +
		"    oW = original width (if trimmed)\n" +
		"    oH = original width (if trimmed)\n" +
		"-->\n" +
		"<TextureAtlas imagePath=\"" + data.packer.filename + "\" width=\"" + data.packer.width + "\" height=\"" + data.packer.height + "\">" + "\n";
		
		$(data.sprites).each(function(index, sprite){
			result += "    <sprite " +
				"n=\"" + sprite.name +  "\" " +
				"x=\"" + sprite.x +  "\" " +
				"y=\"" + sprite.y +  "\" " +
				"w=\"" + sprite.w +  "\" " +
				"h=\"" + sprite.h +  "\" ";
			if(sprite.r)       { result += "r=\"y\" "; }
			if(sprite.padding) { result += "p=\"" + sprite.padding +  "\" "; }
			if(sprite.trimOWidth) { 
				result += 
				"oX=\"" + sprite.trimLeft    +  "\" " +
				"oY=\"" + sprite.trimTop     +  "\" " +
				"oW=\"" + sprite.trimOWidth  +  "\" " +
				"oH=\"" + sprite.trimOHeight +  "\" ";
			}
			result += "/>\n";
		});
		
		result += "</TextureAtlas>" + "\n";
		
		return result;
	};
}

(new XmlExporter()).register();
