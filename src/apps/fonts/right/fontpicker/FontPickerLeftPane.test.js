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
import FontPickerLeftPane from './FontPickerLeftPane';
import ConsoleTab from '../../../../widgets/ConsoleTab';
import { GoogleFonts } from '../../GoogleFonts';

describe('FontPickerLeftPane', () => {

    let $root;

    let SampleData = {"kind":"webfonts#webfontList","items":[
        {"kind":"webfonts#webfont","family":"Roboto","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","900","900italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v15","lastModified":"2016-10-05","files":{"100":"http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf","300":"http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf","500":"http://fonts.gstatic.com/s/roboto/v15/Uxzkqj-MIMWle-XP2pDNAA.ttf","700":"http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf","900":"http://fonts.gstatic.com/s/roboto/v15/H1vB34nOKWXqzKotq25pcg.ttf","100italic":"http://fonts.gstatic.com/s/roboto/v15/T1xnudodhcgwXCmZQ490TPesZW2xOQ-xsNqO47m55DA.ttf","300italic":"http://fonts.gstatic.com/s/roboto/v15/iE8HhaRzdhPxC93dOdA056CWcynf_cDxXwCLxiixG1c.ttf","regular":"http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf","italic":"http://fonts.gstatic.com/s/roboto/v15/hcKoSgxdnKlbH5dlTwKbow.ttf","500italic":"http://fonts.gstatic.com/s/roboto/v15/daIfzbEw-lbjMyv4rMUUTqCWcynf_cDxXwCLxiixG1c.ttf","700italic":"http://fonts.gstatic.com/s/roboto/v15/owYYXKukxFDFjr0ZO8NXh6CWcynf_cDxXwCLxiixG1c.ttf","900italic":"http://fonts.gstatic.com/s/roboto/v15/b9PWBSMHrT2zM5FgUdtu0aCWcynf_cDxXwCLxiixG1c.ttf"},"popularity":0,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Open Sans","category":"sans-serif","variants":["300","300italic","regular","italic","600","600italic","700","700italic","800","800italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v13","lastModified":"2016-10-05","files":{"300":"http://fonts.gstatic.com/s/opensans/v13/DXI1ORHCpsQm3Vp6mXoaTS3USBnSvpkopQaUR-2r7iU.ttf","600":"http://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf","700":"http://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf","800":"http://fonts.gstatic.com/s/opensans/v13/EInbV5DfGHOiMmvb1Xr-hi3USBnSvpkopQaUR-2r7iU.ttf","300italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxi9-WlPSxbfiI49GsXo3q0g.ttf","regular":"http://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf","italic":"http://fonts.gstatic.com/s/opensans/v13/O4NhV7_qs9r9seTo7fnsVKCWcynf_cDxXwCLxiixG1c.ttf","600italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxpZ7xm-Bj30Bj2KNdXDzSZg.ttf","700italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxne1Pd76Vl7zRpE7NLJQ7XU.ttf","800italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxg89PwPrYLaRFJ-HNCU9NbA.ttf"},"popularity":1,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Lato","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","700","700italic","900","900italic"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-11-01","files":{"100":"http://fonts.gstatic.com/s/lato/v11/Upp-ka9rLQmHYCsFgwL-eg.ttf","300":"http://fonts.gstatic.com/s/lato/v11/Ja02qOppOVq9jeRjWekbHg.ttf","700":"http://fonts.gstatic.com/s/lato/v11/iX_QxBBZLhNj5JHlTzHQzg.ttf","900":"http://fonts.gstatic.com/s/lato/v11/8TPEV6NbYWZlNsXjbYVv7w.ttf","100italic":"http://fonts.gstatic.com/s/lato/v11/zLegi10uS_9-fnUDISl0KA.ttf","300italic":"http://fonts.gstatic.com/s/lato/v11/dVebFcn7EV7wAKwgYestUg.ttf","regular":"http://fonts.gstatic.com/s/lato/v11/h7rISIcQapZBpei-sXwIwg.ttf","italic":"http://fonts.gstatic.com/s/lato/v11/P_dJOFJylV3A870UIOtr0w.ttf","700italic":"http://fonts.gstatic.com/s/lato/v11/WFcZakHrrCKeUJxHA4T_gw.ttf","900italic":"http://fonts.gstatic.com/s/lato/v11/draWperrI7n2xi35Cl08fA.ttf"},"popularity":2,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Slabo 27px","category":"serif","variants":["regular"],"subsets":["latin","latin-ext"],"version":"v3","lastModified":"2016-10-27","files":{"regular":"http://fonts.gstatic.com/s/slabo27px/v3/gC0o8B9eU21EafNkXlRAfPesZW2xOQ-xsNqO47m55DA.ttf"},"popularity":3,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Oswald","category":"sans-serif","variants":["300","regular","700"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-07-31","files":{"300":"http://fonts.gstatic.com/s/oswald/v11/y3tZpCdiRD4oNRRYFcAR5Q.ttf","700":"http://fonts.gstatic.com/s/oswald/v11/7wj8ldV_5Ti37rHa0m1DDw.ttf","regular":"http://fonts.gstatic.com/s/oswald/v11/uLEd2g2vJglLPfsBF91DCg.ttf"},"popularity":4,"loaded":true,"defaultStyle":"regular"},
    ]};

    beforeEach(() => {
        $root = $('<div/>').attr("id", "wrapper");
        $(document.body).append($root);
        ReactDOM.render(<FontPickerLeftPane />, $root.get(0));
        GoogleFonts.FontList = SampleData;
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
        let oldFn = ConsoleTab.debug;
        ConsoleTab.debug = jest.fn();
        const $ddl = $('#ddlFontPickerSortBy');
        expect($ddl.text().trim()).toEqual('popularity');
        const node = $("li :contains('family')").get(0);
        // TODO: throw exception, but fires events just fine. May need to move test to FontPicker.test.js?
        try{ ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["sortBy"]).toEqual('family');
        expect(ConsoleTab.debug).not.toBeCalled();
        ConsoleTab.debug = oldFn;
    });

    it('changes subset on UI click', () => {
        let oldFn = ConsoleTab.debug;
        ConsoleTab.debug = jest.fn();
        const $ddl = $('#ddlFontPickerSubset');
        expect($ddl.text().trim()).toEqual('Latin');
        const node = $("li :contains('Arabic')").get(0);
        // TODO: throw exception, but fires events just fine. May need to move test to FontPicker.test.js?
        try{ ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["subset"]).toEqual('Arabic');
        expect(ConsoleTab.debug).not.toBeCalled();
        ConsoleTab.debug = oldFn;
    });

    it('changes subset on UI click', () => {
        let oldFn = ConsoleTab.debug;
        ConsoleTab.debug = jest.fn();
        const $ddl = $('#ddlFontPickerSuggestions');
        expect($ddl.text().trim()).toEqual('All');
        const node = $("li :contains('Paragraphs')").get(0);
        // TODO: throw exception, but fires events just fine. May need to move test to FontPicker.test.js?
        try{ ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["suggestions"]).toEqual('Paragraphs');
        expect(ConsoleTab.debug).not.toBeCalled();
        ConsoleTab.debug = oldFn;
    });

    it('changes category on UI click', () => {
        let oldFn = ConsoleTab.debug;
        ConsoleTab.debug = jest.fn();
        const $ddl = $('#ddlFontPickerCategory');
        expect($ddl.text().trim()).toEqual('All');
        const node = $("li :contains('Handwriting')").get(0);
        // TODO: throw exception, but fires events just fine. May need to move test to FontPicker.test.js?
        try{ ReactTestUtils.Simulate.click(node); } catch(e) {}
        expect(FontPickerLeftPane.Options["category"]).toEqual('Handwriting');
        expect(ConsoleTab.debug).not.toBeCalled();
        ConsoleTab.debug = oldFn;
    });

    it('resets options on UI button click', () => {
        let oldFn = ConsoleTab.debug;
        ConsoleTab.debug = jest.fn();
        const $button = $('#cmdFontPickerResetOptions');
        FontPickerLeftPane.Options['search'] = 'This is a test';
        ReactTestUtils.Simulate.click($button.get(0));
        expect(FontPickerLeftPane.Options['search']).toEqual('');
        expect(ConsoleTab.debug).not.toBeCalled();
        ConsoleTab.debug = oldFn;
    });

});

