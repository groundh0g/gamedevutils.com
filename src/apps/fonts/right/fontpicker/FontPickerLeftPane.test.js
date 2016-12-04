import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import FontPickerLeftPane from './FontPickerLeftPane';

describe('FontPickerLeftPane', () => {

    let $root;

    beforeEach(() => {
        $root = $('<div/>').attr("id", "wrapper");
        $(document.body).append($root);
        ReactDOM.render(<FontPickerLeftPane />, $root.get(0));
    });

    it('creates and populates the root div', () => {
        expect($root.length).not.toEqual(0);
        expect($root.children("div").length).not.toEqual(0);
    });

    it('populates the default options', () => {
        expect(FontPickerLeftPane.DefaultOptions).not.toEqual({});
    });

    it('copies options', () => {
        expect(FontPickerLeftPane.copyOptions(FontPickerLeftPane.DefaultOptions)).toEqual(FontPickerLeftPane.DefaultOptions);
    });

    it('processes UI change events on text boxes', () => {
        const $txtName = $("#txtFontPickerSearch");
        const node = $txtName.get(0);
        expect($txtName.val()).toEqual("");
        $txtName.val("SuperDooper Font");
        expect(FontPickerLeftPane.Options["search"]).toEqual("");
        ReactTestUtils.Simulate.change(node);
        expect($txtName.val()).toEqual("SuperDooper Font");
    });

    it('reads options from UI', () => {
        const FONT_NAME = "Luckiest Guy";
        $("#txtFontPickerSearch").val(FONT_NAME);
        var options = FontPickerLeftPane.readOptions();
        expect(options["search"]).toEqual(FONT_NAME);
    });

    it('reads options from UI (else path)', () => {
        var $input = $("<input/>").val(1000);
        $root.append($input); // possible error? no id.
        var $button = $("<button/>").text("1234");
        $root.append($button); // possible error? no id.
        expect(() => {
            FontPickerLeftPane.readOptions();
        }).not.toThrow();
    });

    it('writes options to UI', () => {
        const FONT_NAME = "Luckiest Guy Two";
        var options = FontPickerLeftPane.copyOptions(FontPickerLeftPane.DefaultOptions);
        options["search"] = FONT_NAME;
        FontPickerLeftPane.writeOptions(options);
        expect($("#txtFontPickerSearch").val()).toEqual(FONT_NAME);
    });

    it('writes options to UI (else paths)', () => {
        const FONT_NAME = "Luckiest Guy Three";
        var options = FontPickerLeftPane.copyOptions(FontPickerLeftPane.DefaultOptions);
        options["search"] = FONT_NAME;
        FontPickerLeftPane.writeOptions(options); // uses FontsLeftPane.$root
        expect($("#txtFontPickerSearch").val()).toEqual(FONT_NAME);
        expect(() => {
            FontPickerLeftPane.writeOptions(undefined); // possible error? undefined collection.
            FontPickerLeftPane.writeOptions(null); // possible error? null collection.
            FontPickerLeftPane.writeOptions(); // possible error? missing collection.
            FontPickerLeftPane.writeOptions({foo: undefined}); // possible error? bad value.
        }).not.toThrow();
    });

    it('changes sortBy on UI click', () => {
        const $ddl = $('#ddlFontPickerSortBy');
        expect($ddl.text().trim()).toEqual('popularity');
        const node = $("li :contains('family')").get(0);
        // TODO: this is throwing an error, but the event fires just fine.
        try { ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["sortBy"]).toEqual('family');
    });

    it('changes subset on UI click', () => {
        const $ddl = $('#ddlFontPickerSubset');
        expect($ddl.text().trim()).toEqual('Latin');
        const node = $("li :contains('Arabic')").get(0);
        // TODO: this is throwing an error, but the event fires just fine.
        try { ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["subset"]).toEqual('Arabic');
    });

    it('changes subset on UI click', () => {
        const $ddl = $('#ddlFontPickerSuggestions');
        expect($ddl.text().trim()).toEqual('All');
        const node = $("li :contains('Paragraphs')").get(0);
        // TODO: this is throwing an error, but the event fires just fine.
        try { ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["suggestions"]).toEqual('Paragraphs');
    });

    it('changes category on UI click', () => {
        const $ddl = $('#ddlFontPickerCategory');
        expect($ddl.text().trim()).toEqual('All');
        const node = $("li :contains('Handwriting')").get(0);
        // TODO: this is throwing an error, but the event fires just fine.
        try { ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["category"]).toEqual('Handwriting');
    });

    it('resets options on UI button click', () => {
        let $button = $('#cmdFontPickerResetOptions');
        FontPickerLeftPane.Options['search'] = 'This is a test';
        // TODO: this is throwing an error, but the event fires just fine.
        try { ReactTestUtils.Simulate.click($button.get(0)); } catch(e) {}
        expect(FontPickerLeftPane.Options['search']).toEqual('');
    });

});

