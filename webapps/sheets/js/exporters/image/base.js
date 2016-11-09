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

var imageExporters = imageExporters || {};

function BaseImageExporter(name, isDefault) {
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
	
	// manage the various types of messages
	this.addWarning = function(msg) { self.msgWarnings.push(msg); };
	this.addError   = function(msg) { self.msgErrors.push(msg); };
	this.addInfo    = function(msg) { self.msgInfos.push(msg); };

	// add this packer instance to the list of available packers
	this.register = function() { imageExporters[self.name] = self; };
}
