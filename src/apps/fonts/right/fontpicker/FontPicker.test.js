import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import FontPicker from './FontPicker';
import { GoogleFonts } from '../../GoogleFonts';
import FontsTab from '../FontsTab';
import FontPickerLeftPane from '../fontpicker/FontPickerLeftPane';
import FontPickerRightPane from '../fontpicker/FontPickerRightPane';
import MyModal from '../../../../widgets/MyModal';

describe('FontPicker', () => {

    let $root;

    let SampleData = {"kind":"webfonts#webfontList","items":[
        {"kind":"webfonts#webfont","family":"Roboto","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","500","500italic","700","700italic","900","900italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v15","lastModified":"2016-10-05","files":{"100":"http://fonts.gstatic.com/s/roboto/v15/7MygqTe2zs9YkP0adA9QQQ.ttf","300":"http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf","500":"http://fonts.gstatic.com/s/roboto/v15/Uxzkqj-MIMWle-XP2pDNAA.ttf","700":"http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf","900":"http://fonts.gstatic.com/s/roboto/v15/H1vB34nOKWXqzKotq25pcg.ttf","100italic":"http://fonts.gstatic.com/s/roboto/v15/T1xnudodhcgwXCmZQ490TPesZW2xOQ-xsNqO47m55DA.ttf","300italic":"http://fonts.gstatic.com/s/roboto/v15/iE8HhaRzdhPxC93dOdA056CWcynf_cDxXwCLxiixG1c.ttf","regular":"http://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf","italic":"http://fonts.gstatic.com/s/roboto/v15/hcKoSgxdnKlbH5dlTwKbow.ttf","500italic":"http://fonts.gstatic.com/s/roboto/v15/daIfzbEw-lbjMyv4rMUUTqCWcynf_cDxXwCLxiixG1c.ttf","700italic":"http://fonts.gstatic.com/s/roboto/v15/owYYXKukxFDFjr0ZO8NXh6CWcynf_cDxXwCLxiixG1c.ttf","900italic":"http://fonts.gstatic.com/s/roboto/v15/b9PWBSMHrT2zM5FgUdtu0aCWcynf_cDxXwCLxiixG1c.ttf"},"popularity":0,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Open Sans","category":"sans-serif","variants":["300","300italic","regular","italic","600","600italic","700","700italic","800","800italic"],"subsets":["greek","cyrillic","greek-ext","latin","cyrillic-ext","latin-ext","vietnamese"],"version":"v13","lastModified":"2016-10-05","files":{"300":"http://fonts.gstatic.com/s/opensans/v13/DXI1ORHCpsQm3Vp6mXoaTS3USBnSvpkopQaUR-2r7iU.ttf","600":"http://fonts.gstatic.com/s/opensans/v13/MTP_ySUJH_bn48VBG8sNSi3USBnSvpkopQaUR-2r7iU.ttf","700":"http://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf","800":"http://fonts.gstatic.com/s/opensans/v13/EInbV5DfGHOiMmvb1Xr-hi3USBnSvpkopQaUR-2r7iU.ttf","300italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxi9-WlPSxbfiI49GsXo3q0g.ttf","regular":"http://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf","italic":"http://fonts.gstatic.com/s/opensans/v13/O4NhV7_qs9r9seTo7fnsVKCWcynf_cDxXwCLxiixG1c.ttf","600italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxpZ7xm-Bj30Bj2KNdXDzSZg.ttf","700italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxne1Pd76Vl7zRpE7NLJQ7XU.ttf","800italic":"http://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxg89PwPrYLaRFJ-HNCU9NbA.ttf"},"popularity":1,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Lato","category":"sans-serif","variants":["100","100italic","300","300italic","regular","italic","700","700italic","900","900italic"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-11-01","files":{"100":"http://fonts.gstatic.com/s/lato/v11/Upp-ka9rLQmHYCsFgwL-eg.ttf","300":"http://fonts.gstatic.com/s/lato/v11/Ja02qOppOVq9jeRjWekbHg.ttf","700":"http://fonts.gstatic.com/s/lato/v11/iX_QxBBZLhNj5JHlTzHQzg.ttf","900":"http://fonts.gstatic.com/s/lato/v11/8TPEV6NbYWZlNsXjbYVv7w.ttf","100italic":"http://fonts.gstatic.com/s/lato/v11/zLegi10uS_9-fnUDISl0KA.ttf","300italic":"http://fonts.gstatic.com/s/lato/v11/dVebFcn7EV7wAKwgYestUg.ttf","regular":"http://fonts.gstatic.com/s/lato/v11/h7rISIcQapZBpei-sXwIwg.ttf","italic":"http://fonts.gstatic.com/s/lato/v11/P_dJOFJylV3A870UIOtr0w.ttf","700italic":"http://fonts.gstatic.com/s/lato/v11/WFcZakHrrCKeUJxHA4T_gw.ttf","900italic":"http://fonts.gstatic.com/s/lato/v11/draWperrI7n2xi35Cl08fA.ttf"},"popularity":2,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Slabo 27px","category":"serif","variants":["regular"],"subsets":["latin","latin-ext"],"version":"v3","lastModified":"2016-10-27","files":{"regular":"http://fonts.gstatic.com/s/slabo27px/v3/gC0o8B9eU21EafNkXlRAfPesZW2xOQ-xsNqO47m55DA.ttf"},"popularity":3,"loaded":true,"defaultStyle":"regular"},
        {"kind":"webfonts#webfont","family":"Oswald","category":"sans-serif","variants":["300","regular","700"],"subsets":["latin","latin-ext"],"version":"v11","lastModified":"2016-07-31","files":{"300":"http://fonts.gstatic.com/s/oswald/v11/y3tZpCdiRD4oNRRYFcAR5Q.ttf","700":"http://fonts.gstatic.com/s/oswald/v11/7wj8ldV_5Ti37rHa0m1DDw.ttf","regular":"http://fonts.gstatic.com/s/oswald/v11/uLEd2g2vJglLPfsBF91DCg.ttf"},"popularity":4,"loaded":true,"defaultStyle":"regular"},
    ]};

    beforeEach(() => {
        $root = $(document.createElement('div')).attr("id", "wrapper");
        ReactDOM.render(<FontPicker />, $root.get(0));
        GoogleFonts.FontList = SampleData;
        FontPickerLeftPane.Options['search'] = '';
        FontPickerLeftPane.Options['sortBy'] = 'popularity';
    });

    it('does not crash when showing and closing the dialog', () => {
        let oldShow = MyModal.Show;
        MyModal.Show = jest.fn(() => {});

        FontPicker.Show();
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 0);
        }).then((data) => {
            expect(MyModal.Show).toBeCalled();
            MyModal.Show = oldShow;
        });
    });

    it('does not crash when showing and closing the dialog', () => {
        expect(() => {
            FontPicker.Show();
            FontPicker.Close();
        }).not.toThrow();
    });

    it('adds font list items', () => {
        let oldLoadFont = GoogleFonts.LoadFont;
        GoogleFonts.LoadFont = jest.fn(() => { return SampleData.items[0]; });

        FontPicker.ClearFontListItems();
        FontPicker.AddFontListItem('foo', 'n4', {loaded: false});
        FontPicker.AddFontListItem('foo', 'n4', {loaded: false, defaultStyle: "normal"}, true);
        // won't get added, onlyDefault = true
        FontPicker.AddFontListItem('Roboto', 'n4', undefined, true);
        expect($("#divFontListItems").find("div.list-group-item").length).toEqual(2);

        GoogleFonts.LoadFont = oldLoadFont;
    });

    it('clears font list items', () => {
        let oldLoadFont = GoogleFonts.LoadFont;
        GoogleFonts.LoadFont = jest.fn(() => { return SampleData.items[0]; });

        FontPicker.ClearFontListItems();
        expect($("#divFontListItems").find("div.list-group-item").length).toEqual(0);
        FontPicker.AddFontListItem('foo', 'n4', {loaded: false});
        expect($("#divFontListItems").find("div.list-group-item").length).toEqual(1);
        FontPicker.ClearFontListItems();
        expect($("#divFontListItems").find("div.list-group-item").length).toEqual(0);

        GoogleFonts.LoadFont = oldLoadFont;
    });

    it('populates list items', () => {
        let oldLoadFont = GoogleFonts.LoadFont;
        GoogleFonts.LoadFont = jest.fn(() => { return SampleData.items[0]; });

        FontPicker.ClearFontListItems();
        FontPicker.PopulateFontListItems();
        expect($("#divFontListItems").find("div.list-group-item").length).toEqual(SampleData.items.length);

        GoogleFonts.LoadFont = oldLoadFont;
    });

    it('toggles dark and light preview', () => {
        let $button = $('#cmdFontPickerToggleDark');
        let $div = $('#divFontListItems');

        expect($div.hasClass('dark')).toEqual(false);
        ReactTestUtils.Simulate.click($button.get(0));
        expect($div.hasClass('dark')).toEqual(true);
        ReactTestUtils.Simulate.click($button.get(0));
        expect($div.hasClass('dark')).toEqual(false);
    });

    it('adds selected font to FontsTab', () => {
        const THE_FONT = {family:'Foo'};
        let origFunction = FontsTab.addFont;
        FontsTab.addFont = jest.fn();
        FontPickerRightPane.addFontListItem(THE_FONT);
        let $buttons = $('#fontPickerRightPane div.list-group div.list-group-item').last().find('div.list-group-item-text button');
        ReactTestUtils.Simulate.click($buttons.get(1));
        expect(FontsTab.addFont).toBeCalled();
        expect(FontsTab.addFont.mock.calls[0][0].family).toEqual(THE_FONT.family);
        FontsTab.addFont = origFunction;
    });

    it('filters the right pane based on options in left pane', () => {
        FontPickerLeftPane.Options["search"] = "open";
        FontPickerLeftPane.Options['category'] = "Sans-Serif";
        FontPickerLeftPane.Options['suggestions'] = "Paragraphs";
        FontPicker.FilterFontListItems();
        expect(FontPicker.FilteredFontListItems.length).toEqual(1);
        expect(FontPicker.FilteredFontListItems[0].family).toEqual('Open Sans');
    });

    it('does not filter when default options are used', () => {
        FontPickerLeftPane.Options = FontPickerLeftPane.copyOptions(FontPickerLeftPane.DefaultOptions);
        FontPicker.FilterFontListItems();
        expect(FontPicker.FilteredFontListItems).toEqual(undefined);
    });

    it('filters font list on UI search', () => {
        let $search = $('#txtFontPickerSearch');
        $search.val('oswald');
        ReactTestUtils.Simulate.change($search.get(0));
        expect(FontPicker.FilteredFontListItems.length).toEqual(1);
        expect(FontPicker.FilteredFontListItems[0].family).toEqual('Oswald');
    });

    it('sorts font list on sortBy changed', () => {
        FontPickerLeftPane.Options['sortBy'] = 'family';
        FontPicker.handleOptionsChanged('ddlFontPickerSortBy', 'sortBy');
        expect(FontPicker.FilteredFontListItems).toEqual(undefined);
        expect(GoogleFonts.FontList.items[0].family).toEqual('Lato');
    });

});

