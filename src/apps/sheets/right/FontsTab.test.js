import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import FontsTab from './FontsTab';

describe('Font List', () => {

    let $root;
    let $fontsTabToolbar;
    let $fontsTabContent;

    const BUTTON_SELECT_ALL = 0;
    const BUTTON_SELECT_NONE = 1;
    const BUTTON_ADD_FONT = 2;
    const BUTTON_REMOVE_FONT = 3;
    // const BUTTON_DELETE_ALL = 4;

    beforeEach(() => {
        var $status = $("<span/>").attr("id", "status");
        var $content = $("<div/>").attr("id", "content");
        $root = $(document.createElement('div')).attr("id", "wrapper");
        $root.append($status);
        $root.append($content);
        ReactDOM.render(<FontsTab />, $root.find("#content").get(0));
        $fontsTabContent = $root.find("div.consoleTabContent");
        $fontsTabToolbar = $root.find("div.consoleTabToolbar");
        FontsTab.$statusLabel = $root.find("#status");
        FontsTab.clear();
    });

    it('populates and clears the fonts list data and UI', () => {
        FontsTab.addFont({family:"Foo Bar"});
        FontsTab.addFont({family:"Foo Bar Two"});
        FontsTab.addFont({family:"OMG"});
        FontsTab.addFont({family:"This is Only a Test"});
        expect(FontsTab.FontList.length).toEqual(4);
        expect($root.find(".list-group-item").length).toEqual(4);
        FontsTab.clear();
        expect(FontsTab.FontList.length).toEqual(0);
        expect($fontsTabContent.find(".list-group-item").length).toEqual(0);
    });

    it('populates and clears the fonts list data and UI (else path)', () => {
        FontsTab.addFont({family: null});
        FontsTab.addFont({family: undefined});
        expect(FontsTab.FontList.length).toEqual(2);
        expect($root.find(".list-group-item").length).toEqual(2);
    });

    it('populates and clears the fonts list status UI', () => {
        FontsTab.addFont({family:"Foo Bar"});
        FontsTab.addFont({family:"OMG"});
        expect(FontsTab.$statusLabel.text()).toEqual("Fonts (2)");
        FontsTab.clear();
        expect(FontsTab.$statusLabel.text()).toEqual("Fonts (0)");
    });

    it('selects and deselects fonts in list on click', () => {
        FontsTab.addFont({family:"Foo Bar"});
        FontsTab.addFont({family:"OMG"});
        FontsTab.addFont({family:"Test 42"});
        expect($root.find(".list-group-item").length).toEqual(3);
        expect($root.find(".list-group-item-warning").length).toEqual(0);

        ReactTestUtils.Simulate.click($root.find(".list-group-item").get(0));
        ReactTestUtils.Simulate.click($root.find(".list-group-item").get(2));
        expect($root.find(".list-group-item-warning").length).toEqual(2);

        ReactTestUtils.Simulate.click($root.find(".list-group-item").get(0));
        ReactTestUtils.Simulate.click($root.find(".list-group-item").get(1));
        expect($root.find(".list-group-item-warning").length).toEqual(2);
    });

    it('selects, deselects, and deletes all fonts in list on toolbar button click', () => {
        FontsTab.addFont({family:"Foo Bar"});
        FontsTab.addFont({family:"OMG"});
        FontsTab.addFont({family:"Test 42"});
        expect($root.find(".list-group-item-warning").length).toEqual(0);

        ReactTestUtils.Simulate.click($root.find(".fontsTabToolbar").find("button").get(BUTTON_SELECT_ALL));
        expect($root.find(".list-group-item-warning").length).toEqual(3);
        expect($root.find(".list-group-item").length).toEqual(3);

        ReactTestUtils.Simulate.click($root.find(".fontsTabToolbar").find("button").get(BUTTON_SELECT_NONE));
        expect($root.find(".list-group-item-warning").length).toEqual(0);
        expect($root.find(".list-group-item").length).toEqual(3);

        // TODO: test add font button
        // TODO: test remove selected font(s) button

        // TODO: kill detele all button in UI, in favor of select all and remove selected (2 steps)
        // ReactTestUtils.Simulate.click($root.find(".fontsTabToolbar").find("button").get(BUTTON_DELETE_ALL));
        // expect($root.find(".list-group-item").length).toEqual(0);
        // expect(FontsTab.FontList.length).toEqual(0);
    });

});
