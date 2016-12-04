import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FontPickerRightPane from './FontPickerRightPane';

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
});

