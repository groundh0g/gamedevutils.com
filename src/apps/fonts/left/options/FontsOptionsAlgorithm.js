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
import { OptionLabel, OptionDropdown } from '../../../../widgets/Widgets';
import { FontsLeftPane } from '../FontsLeftPane';

export class FontsOptionsAlgorithm extends React.Component {

    render() {
        return (
            <div id="paneLeftAlgorithm">
                <OptionLabel group text="Algorithm" />

                <OptionLabel text="Sprite Packer" />
                <OptionDropdown id="ddlProjectSpritePacker" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Basic</li>
                    <li default>Encoded</li>
                    <li>JoeRects</li>
                </OptionDropdown>

                <OptionLabel text="Sort By" />
                <OptionDropdown id="ddlProjectSortBy" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Area</li>
                    <li>Area Descending</li>
                    <li default>Glyph</li>
                    <li>Glyph Descending</li>
                    <li>Height</li>
                    <li>Height Descending</li>
                    <li>Width</li>
                    <li>Width Descending</li>
                </OptionDropdown>

                <OptionLabel text="Allow Rotate" />
                <OptionDropdown id="ddlProjectAllowRotate" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}