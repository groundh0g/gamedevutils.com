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
import { SheetsLeftPane } from '../SheetsLeftPane';

export class SheetsOptionsFilters extends React.Component {

    render() {
        return (
            <div id="paneLeftFilters">
                <OptionLabel group text="Filters" />

                <OptionLabel text="Clean Alpha" />
                <OptionDropdown id="ddlProjectFilterCleanAlpha" fullWidth onChange={SheetsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Color Mask" />
                <OptionDropdown id="ddlProjectFilterColorMask" fullWidth onChange={SheetsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Alias Sprites" />
                <OptionDropdown id="ddlProjectFilterAliasSprites" fullWidth onChange={SheetsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Debug Mode" />
                <OptionDropdown id="ddlProjectFilterDebugMode" fullWidth onChange={SheetsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Trim Mode" />
                <OptionDropdown id="ddlProjectFilterTrimMode" fullWidth onChange={SheetsLeftPane.handleChange}>
                    <li default>None</li>
                    <li>Trim</li>
                </OptionDropdown>

                <OptionLabel text="Trim Threshold" />
                <OptionTextbox id="txtProjectFilterTrimThreshold" defaultValue="1" placeholder="Trim Threshold" icon="resize-vertical" onChange={SheetsLeftPane.handleChange} />
            </div>
        );
    }
}