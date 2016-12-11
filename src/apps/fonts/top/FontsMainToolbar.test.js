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
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import { FontsMainToolbar } from './FontsMainToolbar';
import App from '../../../App';

describe('Font List', () => {

    let $root;
    let $toolbar;

    const BUTTON_PROJECT_NEW = 0;
    const BUTTON_PROJECT_OPEN = 1;
    const BUTTON_PROJECT_SAVE = 2;
    const BUTTON_PROJECT_REFRESH = 3;
    const BUTTON_PROJECT_PUBISH = 4;
    const BUTTON_PROJECT_SETTINGS = 5;

    beforeEach(() => {
        $root = $(document.createElement('div')).attr("id", "wrapper");
        App.Location = { hash: "", search: "?app=fonts"};
        ReactDOM.render(<App />, $root.get(0));
        $toolbar = $root.find("#mainFontsToolbar");
        FontsMainToolbar.$testRoot = $root;
    });

    it('resizes the workspace on settings toggle', () => {
        ReactTestUtils.Simulate.click($toolbar.find("button").get(BUTTON_PROJECT_SETTINGS));
        expect($root.find('#workspaceToolbar').css('left')).toEqual('0px');
        expect($root.find('#paneWorkspace').css('left')).toEqual('0px');
        expect($root.find('#paneLeft').css('display')).toEqual('none');
        ReactTestUtils.Simulate.click($toolbar.find("button").get(BUTTON_PROJECT_SETTINGS));
        expect($root.find('#workspaceToolbar').css('left')).toEqual('200px');
        expect($root.find('#paneWorkspace').css('left')).toEqual('200px');
        expect($root.find('#paneLeft').css('display')).toEqual('block');
        ReactTestUtils.Simulate.click($toolbar.find("button").get(BUTTON_PROJECT_SETTINGS));
        expect($root.find('#workspaceToolbar').css('left')).toEqual('0px');
        expect($root.find('#paneWorkspace').css('left')).toEqual('0px');
        expect($root.find('#paneLeft').css('display')).toEqual('none');
    });
});
