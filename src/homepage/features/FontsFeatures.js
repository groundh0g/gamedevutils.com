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

import React from 'react';
import MyModal from '../../widgets/MyModal';
import { Glyphicon } from 'react-bootstrap';

class FontsFeatures extends React.Component {
    static $name;

    constructor(props) {
        super(props);
        FontsFeatures.$name = this.constructor.name;
    }

    render() {
        let body = (
            <div>
                <h3>Current Features:</h3>
                <div style={{paddingLeft:'10px'}}><p>
                    <Glyphicon glyph="check"/> Select from a library of 2000+ fonts<br/>
                    <Glyphicon glyph="check"/> Export images as PNG, GIF, or JPG<br/>
                    <Glyphicon glyph="check"/> Export data as XML or JSON<br/>
                    <Glyphicon glyph="check"/> Trim &amp; crop unused pixels (smaller files)<br/>
                    <Glyphicon glyph="check"/> Kerning (deduced)<br/>
                    <Glyphicon glyph="check"/> Metrics (deduced)<br/>
                    <Glyphicon glyph="check"/> Specify included characters<br/>
                    <Glyphicon glyph="check"/> Filter included characters from sample text<br/>
                    <Glyphicon glyph="check"/> Debug mode (show font metrics as outlines)
                </p></div>
                <h3>Planned Features:</h3>
                <div style={{paddingLeft:'10px'}}><p>
                    <Glyphicon glyph="wrench"/> Import your own TTF/OTF fonts<br/>
                    <Glyphicon glyph="wrench"/> Kerning (inspect font data)<br/>
                    <Glyphicon glyph="wrench"/> Metrics (inspect font data)<br/>
                    <Glyphicon glyph="wrench"/> Embedded bounds data in image (no separate atlas)<br/>
                    <Glyphicon glyph="wrench"/> Export optimized images<br/>
                    <Glyphicon glyph="wrench"/> Alias duplicate glyphs<br/>
                    <Glyphicon glyph="wrench"/> DropBox support
                </p></div>
            </div>
        );
        return (
            <div>
                <MyModal id={this.constructor.name} title="Fonts App Features" body={body} />
            </div>
        );
    }

    static Show() { MyModal.Show(FontsFeatures.$name); }
    static Close() { MyModal.Close(FontsFeatures.$name); }
}

export default FontsFeatures;