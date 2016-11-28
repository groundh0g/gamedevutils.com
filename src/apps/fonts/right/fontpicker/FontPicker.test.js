import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import FontPicker from './FontPicker';

describe('FontPickerLeftPane', () => {

    let $root;

    beforeEach(() => {
        $root = $(document.createElement('div')).attr("id", "wrapper");
        ReactDOM.render(<FontPicker />, $root.get(0));
    });

    it('does not crash when showing and closing the dialog', () => {
        expect(() => {
            FontPicker.Show();
            FontPicker.Close();
        }).not.toThrow();
    });
});

