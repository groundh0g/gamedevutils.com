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

class SheetsFeatures extends React.Component {
    static $name;

    constructor(props) {
        super(props);
        SheetsFeatures.$name = this.constructor.name;
    }

    render() {
        let body = (
            <div>
                <h3>Current Features:</h3>
                <div style={{paddingLeft:'10px'}}><p>
                    <Glyphicon glyph="check"/> Import web-friendly image formats<br/>
                    <Glyphicon glyph="check"/> <em>Extract animated GIF frames!</em><br/>
                    <Glyphicon glyph="check"/> Export images as PNG, GIF, or JPG<br/>
                    <Glyphicon glyph="check"/> Export data as XML or JSON<br/>
                    <Glyphicon glyph="check"/> Export data as CSS<br/>
                    <Glyphicon glyph="check"/> Trim &amp; crop unused pixels<br/>
                    <Glyphicon glyph="check"/> Heuristic mapping (chroma key)<br/>
                    <Glyphicon glyph="check"/> Basic rects (shelf) texture packing<br/>
                    <Glyphicon glyph="check"/> MaxRects texture packing<br/>
                    <Glyphicon glyph="check"/> Alpha (transparent) cleaning (aids compression)<br/>
                    <Glyphicon glyph="check"/> Debug mode (show sprite outlines)
                </p></div>
                <h3>Planned Features:</h3>
                <div style={{paddingLeft:'10px'}}><p>
                    <Glyphicon glyph="wrench"/> Import non-web image formats<br/>
                    <Glyphicon glyph="wrench"/> Export optimized images<br/>
                    <Glyphicon glyph="wrench"/> Allow sprite rotate within sheet<br/>
                    <Glyphicon glyph="wrench"/> Alias duplicate sprites<br/>
                    <Glyphicon glyph="wrench"/> DropBox (et. al.) support
                </p></div>
            </div>
        );
        return (
            <div>
                <MyModal id={this.constructor.name} title="Sheets App Features" body={body} />
            </div>
        );
    }

    static Show() { MyModal.Show(SheetsFeatures.$name); }
    static Close() { MyModal.Close(SheetsFeatures.$name); }
}

export default SheetsFeatures;