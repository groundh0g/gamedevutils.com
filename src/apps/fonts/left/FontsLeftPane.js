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
import $ from 'jquery';
import * as FontsOptions from './FontsOptions'
import './FontsLeftPane.css';

export class FontsLeftPane extends React.Component {

    static DefaultOptions = { };
    static Options = { };
    static isDirty = false;

    componentDidMount() {
        let options = FontsLeftPane.readOptions();
        FontsLeftPane.DefaultOptions = FontsLeftPane.copyOptions(options);
        FontsLeftPane.Options = FontsLeftPane.copyOptions(options);
        FontsLeftPane.isDirty = false;
    }

    render() {
        return (
            <div id="paneLeft">

                <FontsOptions.Output />
                <FontsOptions.Algorithm />
                <FontsOptions.Dimensions />
                <FontsOptions.Padding />
                <FontsOptions.Filters />

                <br/><br/><br/><br/>
            </div>
        );
    }

    static handleChange(id, newValue, oldValue) {
        let key = FontsLeftPane.getOptionKeyFromControlId(id);
        FontsLeftPane.Options[key] = $.isNumeric(newValue) ? parseFloat(newValue) : newValue;
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
            /* istanbul ignore else */
            if(source.hasOwnProperty(key)) {
                options[key] = source[key];
            }
        }
        return options;
    }

    static readOptions() {
        let options = { };

        let $root = $("#paneLeft");

        // grab values from text boxes
        $root.find("input").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = FontsLeftPane.getOptionKeyFromControlId(id);
            let val = $obj.val().trim();
            val = $.isNumeric(val) ? parseFloat(val) : val;
            if(key) { options[key] = val; }
        });

        // grab values from drop downs
        $root.find("button").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = FontsLeftPane.getOptionKeyFromControlId(id);
            let val = $obj.text().trim();
            val = $.isNumeric(val) ? parseFloat(val) : val;
            if(key) { options[key] = val; }
        });

        return options;
    }

    static writeOptions(options) {
        if(options) {
            let $root = $("#paneLeft");
            // push values to text boxes
            $root.find("input").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = FontsLeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                if(val !== undefined) { $obj.val(val); }
            });

            // push values to drop downs
            $root.find("button").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = FontsLeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                if(val !== undefined) { $obj.text(val); }
            });
        }
    }
}