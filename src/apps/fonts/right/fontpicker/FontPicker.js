import React from 'react';
import $ from 'jquery';
import MyModal from '../../../../widgets/MyModal';
import FontPickerLeftPane from './FontPickerLeftPane';
import FontPickerRightPane from './FontPickerRightPane';
import { GoogleFonts } from '../../GoogleFonts';
import './FontPicker.css';

class FontPicker extends React.Component {
    static FontListItemHeight;
    static FontListDivHeight;
    static SuppressLoadOnScroll = false;
    static FilteredFontListItems = undefined;

    static $instance;

    constructor(props) {
        super(props);
        FontPicker.$instance = this;
    }

    static ClearFontListItems() {
        FontPicker.SuppressLoadOnScroll = false;
        $("#fontPickerRightPane").find("#divFontListItems").empty();
    }

    static AddFontListItem(name, fvd, item, onlyDefault) {
        if(onlyDefault) {
            item = item || GoogleFonts.GetFont(name);
            if(item.defaultStyle !== fvd && item.defaultStyle.replace(/^regular$/, "n4") !== fvd) {
                return;
            }
        }

        if(!item.loaded) {
            GoogleFonts.LoadFont(item, true);
        }

        // let text = $("#txtFontPreviewText").val() || "The quick brown fox jumped over the lazy dog.";
        let fontInfo = GoogleFonts.DecodeFvd(fvd);

        FontPickerRightPane.addFontListItem(
            item,
            fontInfo["font-weight"],
            fontInfo["font-style"],
            FontPickerLeftPane.Options['previewSize'], // ($("#txtFontPickerPreviewSize").val() || 30) + "pt",
            undefined // $root
        );
    }

    static PopulateFontListItems(count, start) {
        count = count || 10;
        start = start || 0;
        let end = start + count;

        let items = FontPicker.FilteredFontListItems || GoogleFonts.FontList.items;
        for(var i = start; i < end && i < items.length; i++) {
            var item = items[i];
            FontPicker.AddFontListItem(item.family, item.defaultStyle, item, true);
        }
    }

    static FilterFontListItems() {
        let options = FontPickerLeftPane.Options;
        let includeAll =
            options.search === "" &&
            options.suggestions === "All" &&
            options.subset === "Latin" &&
            options.category === "All";

        if(includeAll) {
            FontPicker.FilteredFontListItems = undefined;
            return;
        }

        let filtered = [];
        let items = GoogleFonts.FontList.items;

        for(let i = 0; i < items.length; i++) {
            let item = items[i];

            let doAdd = true;

            doAdd &= options.search === "" || item.family.toLowerCase().includes(options.search.toLowerCase());
            doAdd &= options.suggestions === "All" || GoogleFonts.Suggestions[options.suggestions].includes(item.family);
            doAdd &= options.subset === "All" || item.subsets.includes(options.subset.toLowerCase());
            doAdd &= options.category === "All" || item.category.toLowerCase() === options.category.toLowerCase();

            if(doAdd) filtered.push(item);
        }

        FontPicker.FilteredFontListItems = filtered;
    }

    static handleOptionsChanged(id, key, newValue) {
        if(key === 'sortBy') {
            GoogleFonts.SortFontList(FontPickerLeftPane.Options[key]);
        }
        if(key === 'search') {
            FontPickerRightPane.SearchText = FontPickerLeftPane.Options[key];
        }

        switch(key) {
            case 'search':
            case 'category':
            case 'suggestions':
            case 'subset':
            case 'sortBy':
                FontPicker.FilterFontListItems();
                FontPicker.ClearFontListItems();
                FontPicker.$instance.setState({});
                setTimeout(() => {
                    FontPicker.PopulateFontListItems(10);
                }, 0);
                break;
            /* istanbul ignore next */
            default:
                break;
        }
    }

    componentDidMount() {
        FontPickerLeftPane.RegisterChangeListener(FontPicker.handleOptionsChanged);
    }

    render() {
        let body = (
            <div style={{maxHeight:'100%'}}>
                <div className="divPopupSidebarLeft" id="divPopupSidebarLeft">
                    <FontPickerLeftPane />
                </div>
                <div id="divPopupFontList" style={{position:'absolute', top:0, left:'200px', right:0, bottom:0, overflow:'scroll'}}>
                    <FontPickerRightPane />
                </div>
            </div>
        );

        return (
            <div>
                <MyModal id={this.constructor.name} big tall title="Font Picker" body={body} />
            </div>
        );
    }

    // TODO: write coverage for scroll event
    /* istanbul ignore next */
    static handleScroll() {
        if(FontPicker.SuppressLoadOnScroll) { return; }

        let $fontListItems = $("#fontPickerRightPane").find("div.list-group-item");
        let fontListItemCount = $fontListItems.length;
        FontPicker.FontListItemHeight = FontPicker.FontListItemHeight || $fontListItems.first().outerHeight();
        FontPicker.FontListDivHeight = FontPicker.FontListDivHeight || $(this).height();

        if($(this)[0].scrollHeight - $(this).scrollTop() <= FontPicker.FontListDivHeight) {
            FontPicker.PopulateFontListItems(10, fontListItemCount);
        }
    }

    static Close() { MyModal.Close("FontPicker"); }
    static Show() {
        MyModal.Show("FontPicker");

        setTimeout(() => {
            // TODO: write coverage for scroll event
            $("#divPopupFontList").scroll(/* istanbul ignore next */ FontPicker.handleScroll);
            FontPicker.PopulateFontListItems(10);
        }, 0);
    }
}

export default FontPicker;