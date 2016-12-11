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
import './SheetsRightPane.css';
import $ from 'jquery';
import { Tabs, Tab } from 'react-bootstrap';
import SpritesTab from './SpritesTab';
import ConsoleTab from '../../../widgets/ConsoleTab';
// import FontPicker from './fontpicker/FontPicker';

export class SheetsRightPane extends React.Component {

    componentDidMount() {
        SpritesTab.$statusLabel = $("#paneRightTabs-tab-1");
        ConsoleTab.$statusLabel = $("#paneRightTabs-tab-2");
    }

    render() {
        return (
            <div id="paneRight">
                <Tabs defaultActiveKey={1} id="paneRightTabs">
                    <Tab eventKey={1} title="Sprites (0)">
                        <div id="divTabContentSheets" className="spritesTabWrapper">
                            <SpritesTab />
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Console (0)">
                        <div id="divTabContentConsole" className="consoleTabWrapper">
                            <ConsoleTab />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

// export default SheetsRightPane;