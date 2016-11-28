import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon, InputGroup, FormGroup, Form } from 'react-bootstrap';
import $ from 'jquery';
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../../widgets/Widgets';
import './FontPickerLeftPane.css';

class FontPickerLeftPane extends React.Component {

    static PANE_ID="paneLeftFontPicker";

    static DefaultOptions = { };
    static Options = { };
    static isDirty = false;

    static $root;
    // static $instance;
    //
    // constructor(props) {
    //     super(props);
    //     FontPickerLeftPane.$instance = this;
    // }

    componentDidMount() {
        let options = FontPickerLeftPane.readOptions();
        FontPickerLeftPane.DefaultOptions = FontPickerLeftPane.copyOptions(options);
        FontPickerLeftPane.Options = FontPickerLeftPane.copyOptions(options);
        FontPickerLeftPane.isDirty = false;
    }

    render() {
        return (
            <div id={FontPickerLeftPane.PANE_ID} className="paneGroup">

                <OptionLabel light text="Search" />
                <OptionTextbox id="txtFontPickerSearch" defaultValue="" placeholder="Font Name" icon="search" onChange={FontPickerLeftPane.handleChange} />

                <OptionLabel light text="Category" />
                <OptionDropdown id="ddlFontPickerCategory" fullWidth onChange={FontPickerLeftPane.handleChange} tooltip="Filter the list of fonts to the selected category.">
                    <li default>All</li>
                    <li>Display</li>
                    <li>Handwriting</li>
                    <li>Monospace</li>
                    <li>Sans-Serif</li>
                    <li>Serif</li>
                </OptionDropdown>

                <OptionLabel light text="Suggestions" />
                <OptionDropdown id="ddlFontPickerSuggestions" fullWidth onChange={FontPickerLeftPane.handleChange} tooltip="">
                    <li default>All</li>
                    <li>Headings</li>
                    <li>Paragraphs</li>
                </OptionDropdown>

                <OptionLabel light text="Subset" />
                <OptionDropdown id="ddlFontPickerSubset" fullWidth onChange={FontPickerLeftPane.handleChange} tooltip="">
                    <li>Arabic</li>
                    <li>Cyrillic</li>
                    <li>Cyrillic Extended</li>
                    <li>Devanagari</li>
                    <li>Greek</li>
                    <li>Greek Extended</li>
                    <li>Hebrew</li>
                    <li>Khmer</li>
                    <li default>Latin</li>
                    <li>Latin Extended</li>
                    <li>Tamil</li>
                    <li>Telugu</li>
                    <li>Thai</li>
                    <li>Vietnamese</li>
                </OptionDropdown>

                <OptionLabel light text="SortBy" />
                <OptionDropdown id="ddlFontPickerSortBy" fullWidth onChange={FontPickerLeftPane.handleChange} tooltip="">
                    <li>category</li>
                    <li>family</li>
                    <li>lastModified</li>
                    <li default>popularity</li>
                </OptionDropdown>

                <OptionLabel light text="Display" />
                <ButtonToolbar>
                    <ButtonGroup bsSize="small">
                        <Button id="cmdFontPickerToggleDark"><Glyphicon glyph="adjust" /></Button>
                        <Button id="cmdFontPickerResetOptions"><Glyphicon glyph="repeat" /></Button>
                        <Button id="cmdFontPickerRefresh"><Glyphicon glyph="refresh" /></Button>
                    </ButtonGroup>
                    <ButtonGroup bsSize="small">
                        <Form inline>
                            <FormGroup>
                                <InputGroup bsSize="small">
                                    <input
                                        id="txtFontPickerPreviewSize"
                                        className="form-control"
                                        type="text"
                                        defaultValue="30"
                                        placeholder="Size"
                                        style={{ margin:0, width:'50px' }}
                                        onChange={FontPickerLeftPane.handleChange}
                                    />
                                    <span className="input-group-addon">
                                <Glyphicon glyph="resize-vertical"/>
                            </span>
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </ButtonGroup>
                </ButtonToolbar>

                <OptionLabel light text="Preview Text" />
                <OptionTextbox id="txtFontPickerPreviewText" defaultValue="The quick, brown fox jumps over the lazy dog." placeholder="Preview Text" icon="share-alt" onChange={FontPickerLeftPane.handleChange} />


                <br/><br/><br/><br/>
            </div>
        );
    }

    static handleChange(id, newValue, oldValue) {
        let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
        FontPickerLeftPane.Options[key] = FontPickerLeftPane.tryParseNumber(newValue);
    }

    static getOptionKeyFromControlId(id) {
        let key = id;
        if(id && id.length > 0) {
            key = id.replace(/ddlFontPicker|txtFontPicker/, "");
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

    static tryParseNumber(val) { return $.isNumeric(val) ? parseFloat(val) : val; }

    static readOptions($root) {
        let options = { };

        $root = $root || FontPickerLeftPane.$root || $(`#${FontPickerLeftPane.PANE_ID}`);

        // grab values from text boxes
        $root.find("input").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
            let val = $obj.val().trim();
            val = FontPickerLeftPane.tryParseNumber(val);
            /* istanbul ignore else */
            if(key) { options[key] = val; }
        });

        // grab values from drop downs
        $root.find("button").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
            let val = $obj.text().trim();
            val = FontPickerLeftPane.tryParseNumber(val);
            /* istanbul ignore else */
            if(key) { options[key] = val; }
        });

        return options;
    }

    static writeOptions(options, $root) {
        if(options) {
            $root = $root || FontPickerLeftPane.$root || $(`#${FontPickerLeftPane.PANE_ID}`);

            // push values to text boxes
            $root.find("input").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                /* istanbul ignore else */
                if(val !== undefined) { $obj.val(val); }
            });

            // push values to drop downs
            $root.find("button").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                let val = options[key];
                /* istanbul ignore else */
                if(val !== undefined) { $obj.text(val); }
            });
        }
    }
}

export default FontPickerLeftPane;