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
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { FontsRightPane } from './FontsRightPane';
import ConsoleTab from '../../../widgets/ConsoleTab';

describe('FontsRightPane', () => {

    const statusId = "#paneRightTabs-tab-2";

    let root;
    let $consoleTabContent;

    beforeEach(() => {
        root = document.createElement('div');
        ReactDOM.render(<FontsRightPane />, root);
        $consoleTabContent = $(root).find("div.consoleTabContent").first();
        ConsoleTab.$statusLabel = $(root).find(statusId).first();
    });

    it('updates the message counts in the tab text', () => {
        let $status = $(root).find(statusId);
        ConsoleTab.clear();
        expect($status.text()).toEqual("Console (0)");
        ConsoleTab.debug("this is a debug test");
        expect($status.text()).toEqual("Console (1)");
        ConsoleTab.warning("this is a warning test");
        expect($status.text()).toEqual("Console (2)");
        ConsoleTab.info("this is an info test");
        expect($status.text()).toEqual("Console (3)");
        ConsoleTab.error("this is an error test");
        expect($status.text()).toEqual("Console (4)");
    });
});
