import React from 'react';
import $ from 'jquery';
import OptionsOutput from './OptionsOutput';
import OptionsAlgorithm from './OptionsAlgorithm';
import OptionsDimensions from './OptionsDimensions';
import OptionsPadding from './OptionsPadding';
import OptionsFilters from './OptionsFilters';
import './LeftPane.css';

class LeftPane extends React.Component {

    static DefaultOptions = { };
    static Options = { };
    static isDirty = false;

    static $root;

    componentDidMount() {
        let options = LeftPane.readOptions();
        LeftPane.DefaultOptions = LeftPane.copyOptions(options);
        LeftPane.Options = LeftPane.copyOptions(options);
        LeftPane.isDirty = false;
    }

    render() {
        return (
            <div id="paneLeft">

                <OptionsOutput />
                <OptionsAlgorithm />
                <OptionsDimensions />
                <OptionsPadding />
                <OptionsFilters />

                <br/><br/><br/><br/>
            </div>
        );
    }

    static handleChange(id, newValue, oldValue) {
        let key = LeftPane.getOptionKeyFromControlId(id);
        LeftPane.Options[key] = $.isNumeric(newValue) ? parseFloat(newValue) : newValue;
    }

    static getOptionKeyFromControlId(id) {
        let key = id;
        if(id && id.length > 0) {
            key = id.replace(/ddlProject|txtProject/, "");
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

        $root = $root || this.$root || $("#paneLeft");

        // grab values from text boxes
        $root.find("input").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = LeftPane.getOptionKeyFromControlId(id);
            let val = $obj.val().trim();
            val = $.isNumeric(val) ? parseFloat(val) : val;
            if(key) { options[key] = val; }
        });

        // grab values from drop downs
        $root.find("button").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = LeftPane.getOptionKeyFromControlId(id);
            let val = $obj.text().trim();
            val = $.isNumeric(val) ? parseFloat(val) : val;
            if(key) { options[key] = val; }
        });

        return options;
    }

    static writeOptions(options, $root) {
        if(options) {
            $root = $root || this.$root || $("#paneLeft");

            // push values to text boxes
            $root.find("input").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = LeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                if(val !== undefined) { $obj.val(val); }
            });

            // push values to drop downs
            $root.find("button").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = LeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                if(val !== undefined) { $obj.text(val); }
            });
        }
    }
}

export default LeftPane;