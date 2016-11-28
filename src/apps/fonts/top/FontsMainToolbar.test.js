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
