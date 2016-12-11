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

export class FontsOptionsDimensions extends React.Component {

    render() {
        return (
            <div id="paneLeftDimensions">
                <OptionLabel group text="Dimensions" />

                <OptionLabel text="Width" />
                <OptionDropdown id="ddlProjectWidth" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>16</li>
                    <li>32</li>
                    <li>64</li>
                    <li>128</li>
                    <li>256</li>
                    <li>512</li>
                    <li default>1024</li>
                    <li>2048</li>
                    <li>4096</li>
                    <li>8192</li>
                    <li>16384</li>
                </OptionDropdown>

                <OptionLabel text="Height" />
                <OptionDropdown id="ddlProjectHeight" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>16</li>
                    <li>32</li>
                    <li>64</li>
                    <li>128</li>
                    <li>256</li>
                    <li>512</li>
                    <li default>1024</li>
                    <li>2048</li>
                    <li>4096</li>
                    <li>8192</li>
                    <li>16384</li>
                </OptionDropdown>

                <OptionLabel text="Size Mode" />
                <OptionDropdown id="ddlProjectSizeMode" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Fixed Size</li>
                    <li default>Max Size</li>
                </OptionDropdown>

                <OptionLabel text="Constraint" />
                <OptionDropdown id="ddlProjectSizeConstraint" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Any Size</li>
                    <li default>Power of Two</li>
                </OptionDropdown>

                <OptionLabel text="Force Square" />
                <OptionDropdown id="ddlProjectForceSquareSize" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Include @2x" />
                <OptionDropdown id="ddlProjectIncludeAt2x" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}