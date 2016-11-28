import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import FontPickerRightPane from './FontPickerRightPane';
import FontsTab from '../FontsTab';

describe('FontPickerRightPane', () => {

    let $root;

    beforeEach(() => {
        $root = $(document.createElement('div')).attr("id", "wrapper");
        ReactDOM.render(<FontPickerRightPane />, $root.get(0));
        FontPickerRightPane.$root = $root;
    });

    it('creates and populates the root div', () => {
        expect($root.length).not.toEqual(0);
        expect($root.children("div").length).not.toEqual(0);
    });

    it('adds selected font to FontsTab', () => {
        const THE_FONT = {family:'Foo'};
        var origFunction = FontsTab.addFont;
        FontsTab.addFont = jest.fn();
        FontPickerRightPane.addFontListItem(THE_FONT);
        var $buttons = $root.find('div.list-group').find('div.list-group-item').first().find('div.list-group-item-text button');
        ReactTestUtils.Simulate.click($buttons.get(1));
        expect(FontsTab.addFont).toBeCalled();
        expect(FontsTab.addFont.mock.calls[0][0].family).toEqual(THE_FONT.family);
        FontsTab.addFont = origFunction;
    });
});

