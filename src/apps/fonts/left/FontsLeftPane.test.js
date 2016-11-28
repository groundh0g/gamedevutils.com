import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import { FontsLeftPane } from './FontsLeftPane';

describe('FontsLeftPane', () => {

    let root;

    beforeEach(() => {
        root = document.createElement('div');
        ReactDOM.render(<FontsLeftPane />, root);
        FontsLeftPane.$root = $(root);
    });

    it('creates and populates the root div', () => {
        expect(root).not.toBeUndefined();
        expect($(root).children("div").length).not.toEqual(0);
    });

    it('copies options', () => {
        expect(FontsLeftPane.copyOptions(FontsLeftPane.DefaultOptions)).toEqual(FontsLeftPane.DefaultOptions);
    });

    it('processes UI change events on text boxes', () => {
        const $txtName = $(root).find("#txtProjectName");
        const node = $txtName.get(0);
        expect($txtName.val()).toEqual("Untitled");
        $txtName.val("SuperDooperProject");
        expect(FontsLeftPane.Options["name"]).toEqual("Untitled");
        ReactTestUtils.Simulate.change(node);
        expect($txtName.val()).toEqual("SuperDooperProject");
    });

    it('processes UI click events on dropdowns with text', () => {
        expect($(root).find("#ddlProjectImageFormat").text().trim()).toEqual("PNG");
        const node = $(root).find("li :contains('GIF')").get(0);
        ReactTestUtils.Simulate.click(node);
        expect($(root).find("#ddlProjectImageFormat").text().trim()).toEqual("GIF");
    });

    it('processes UI click events on dropdowns with numbers', () => {
        expect($(root).find("#ddlProjectWidth").text().trim()).toEqual("1024");
        const node = $(root).find("li :contains('2048')").get(0);
        ReactTestUtils.Simulate.click(node);
        expect($(root).find("#ddlProjectWidth").text().trim()).toEqual("2048"); // string in DOM
        expect(FontsLeftPane.Options["width"]).toEqual(2048); // number in FontsLeftPane.Options
    });

    it('reads options from UI', () => {
        const PROJ_NAME = "Test Project Name";
        $(root).find("#txtProjectName").val(PROJ_NAME);
        var options = FontsLeftPane.readOptions($(root));
        expect(options["name"]).toEqual(PROJ_NAME);
    });

    it('reads options from UI (else path)', () => {
        const PROJ_NAME = "Test Project Name";
        var $input = $("<input/>").val(1000);
        $(root).append($input); // possible error? no id.
        var $button = $("<button/>").text("1234");
        $(root).append($button); // possible error? no id.
        expect(() => {
            FontsLeftPane.readOptions($(root));
        }).not.toThrow();
    });

    it('writes options to UI', () => {
        const PROJ_NAME = "Test Project Name Two";
        var options = FontsLeftPane.copyOptions(FontsLeftPane.DefaultOptions);
        options["name"] = PROJ_NAME;
        FontsLeftPane.writeOptions(options, $(root));
        expect($(root).find("#txtProjectName").val()).toEqual(PROJ_NAME);
    });

    it('writes options to UI (else paths)', () => {
        const PROJ_NAME = "Test Project Name Three";
        var options = FontsLeftPane.copyOptions(FontsLeftPane.DefaultOptions);
        options["name"] = PROJ_NAME;
        FontsLeftPane.writeOptions(options); // uses FontsLeftPane.$root
        expect($(root).find("#txtProjectName").val()).toEqual(PROJ_NAME);
        expect(() => {
            FontsLeftPane.writeOptions(undefined); // possible error? undefined collection.
            FontsLeftPane.writeOptions(null); // possible error? null collection.
            FontsLeftPane.writeOptions(); // possible error? missing collection.
            FontsLeftPane.writeOptions({foo: undefined}); // possible error? bad value.
        }).not.toThrow();
    });

    it('converts id to key', () => {
        expect(FontsLeftPane.getOptionKeyFromControlId("txtProjectFooBarBaz")).toEqual("fooBarBaz");
        expect(FontsLeftPane.getOptionKeyFromControlId("ddlProjectFooBarBip")).toEqual("fooBarBip");
        expect(FontsLeftPane.getOptionKeyFromControlId("ddlFooBarBip")).toEqual("ddlFooBarBip");
        expect(FontsLeftPane.getOptionKeyFromControlId()).toBeUndefined();
        expect(FontsLeftPane.getOptionKeyFromControlId(null)).toBeNull();
    });
});