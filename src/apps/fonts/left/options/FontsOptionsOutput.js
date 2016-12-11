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
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../../widgets/Widgets';
import { FontsLeftPane } from '../FontsLeftPane';

export class FontsOptionsOutput extends React.Component {

    render() {
        return (
            <div id="paneLeftOutput">
                <OptionLabel group text="Output" />

                <OptionLabel text="Project Name" />
                <OptionTextbox id="txtProjectName" defaultValue="Untitled" placeholder="Project Name" onChange={FontsLeftPane.handleChange} />

                <OptionLabel text="Image Format" />
                <OptionDropdown id="ddlProjectImageFormat" fullWidth onChange={FontsLeftPane.handleChange} tooltip="<span>Hello!</span>">
                    <li>GIF</li>
                    <li>JPG</li>
                    <li default>PNG</li>
                </OptionDropdown>

                <OptionLabel text="Data Format" />
                <OptionDropdown id="ddlProjectDataFormat" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>CSS</li>
                    <li>JSON</li>
                    <li default>XML</li>
                </OptionDropdown>

                <OptionLabel text="Zip Project" />
                <OptionDropdown id="ddlProjectCompressProject" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}