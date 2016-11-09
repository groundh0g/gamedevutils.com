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

var isNullOrUndefined = function(obj) {
	return obj === null || typeof obj === "undefined";
};

// http://stackoverflow.com/questions/109023/how-to-count-the-number-of-set-bits-in-a-32-bit-integer#109025
// ----------------------------------------------------------------------------------
// This implementation is taken from a C/C++ example. Javascript supports integers in 
// the range +/-2^53. The >> operator in Javascript operates on 32-bit numbers, so
// this should be fine. I don't think the canvas would support sizes as large as 
// 1 << 31 anyway. =) 
// -- @groundh0g
// ----------------------------------------------------------------------------------
var countBits = function (i) {
	i = parseInt(i);
    i = i - ((i >> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
    return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
};

// ----------------------------------
// [VERY] simple helper -- @groundh0g
// ----------------------------------
var isPowerOfTwo = function (i) { 
    return countBits(i) === 1; 
};

// http://www.hackersdelight.org/hdcodetxt/clp2.c.txt
// ----------------------------------------------------
// Round up if not Po2, Same value if Po2 -- @groundh0g
// ----------------------------------------------------
var roundUpToPowerOfTwo = function (x) { 
    x = parseInt(x) - 1;
    x = x | (x >> 1);
    x = x | (x >> 2);
    x = x | (x >> 4);
    x = x | (x >> 8);
    x = x | (x >>16);
    return x + 1;
};
