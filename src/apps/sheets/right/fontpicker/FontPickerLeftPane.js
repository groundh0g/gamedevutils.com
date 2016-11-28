import React from 'react';
import $ from 'jquery';
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../../widgets/Widgets';
import './FontPickerLeftPane.css';

class FontPickerLeftPane extends React.Component {

    static PANE_ID="paneLeftFontPicker";

    static DefaultOptions = { };
    static Options = { };
    static isDirty = false;

    static $root;

    componentDidMount() {
        let options = FontPickerLeftPane.readOptions();
        FontPickerLeftPane.DefaultOptions = FontPickerLeftPane.copyOptions(options);
        FontPickerLeftPane.Options = FontPickerLeftPane.copyOptions(options);
        FontPickerLeftPane.isDirty = false;
    }

    render() {
        return (
            <div id={FontPickerLeftPane.PANE_ID}>

                <OptionLabel text="Search" />
                <OptionTextbox id="txtFontsSearch" defaultValue="" placeholder="Font Name" icon="search" onChange={FontPickerLeftPane.handleChange} />

                <OptionLabel text="Category" />
                <OptionDropdown id="ddlFontsCategory" fullWidth onChange={FontPickerLeftPane.handleChange} tooltip="Filter the list of fonts to the selected category.">
                    <li default>All</li>
                    <li>Display</li>
                    <li>Handwriting</li>
                    <li>Monospace</li>
                    <li>Sans-Serif</li>
                    <li>Serif</li>
                </OptionDropdown>


                <br/><br/><br/><br/>
            </div>
        );
    }

    static handleChange(id, newValue, oldValue) {
        let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
        FontPickerLeftPane.Options[key] = $.isNumeric(newValue) ? parseFloat(newValue) : newValue;
    }

    static getOptionKeyFromControlId(id) {
        let key = id;
        if(id && id.length > 0) {
            key = id.replace(/ddlFonts|txtFonts/, "");
            key = key.charAt(0).toLowerCase() + key.slice(1);
        }
        return key;
    }

    static copyOptions(source) {
        let options = { };
        for(let key in source) {
            if(source.hasOwnProperty(key)) {
                options[key] = source[key];
            }
        }
        return options;
    }

    static readOptions($root) {
        let options = { };

        $root = $root || this.$root || $(`#${FontPickerLeftPane.PANE_ID}`);

        // grab values from text boxes
        $root.find("input").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
            let val = $obj.val().trim();
            val = $.isNumeric(val) ? parseFloat(val) : val;
            if(key) { options[key] = val; }
        });

        // grab values from drop downs
        $root.find("button").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
            let val = $obj.text().trim();
            val = $.isNumeric(val) ? parseFloat(val) : val;
            if(key) { options[key] = val; }
        });

        return options;
    }

    static writeOptions(options, $root) {
        if(options) {
            $root = $root || this.$root || $(`#${FontPickerLeftPane.PANE_ID}`);

            // push values to text boxes
            $root.find("input").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                if(val !== undefined) { $obj.val(val); }
            });

            // push values to drop downs
            $root.find("button").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                if(val !== undefined) { $obj.text(val); }
            });
        }
    }
}

export default FontPickerLeftPane;