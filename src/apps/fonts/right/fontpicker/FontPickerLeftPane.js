import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon, InputGroup, FormGroup, Form } from 'react-bootstrap';
import $ from 'jquery';
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../../widgets/Widgets';
import { GoogleFonts } from '../../GoogleFonts';
import './FontPickerLeftPane.css';

class FontPickerLeftPane extends React.Component {

    static PANE_ID="paneLeftFontPicker";

    static DefaultOptions = { };
    static Options = { };
    static isDirty = false;

    static $instance;

    constructor(props) {
        super(props);
        FontPickerLeftPane.$instance = this;
        this.state = {
            Options: FontPickerLeftPane.Options
        };
    }

    static _changeListeners = [];

    static RegisterChangeListener(callback) {
        FontPickerLeftPane._changeListeners.push(callback);
    }

    static OnChange(id, key, newValue) {
        for(let i = 0; i < FontPickerLeftPane._changeListeners.length; i++) {
            FontPickerLeftPane._changeListeners[i](id, key, newValue);
        }
    }

    componentDidMount() {
        if(FontPickerLeftPane.DefaultOptions['search'] === undefined) {
            let options = FontPickerLeftPane.readOptions();
            FontPickerLeftPane.DefaultOptions = FontPickerLeftPane.copyOptions(options);
            FontPickerLeftPane.Options = FontPickerLeftPane.copyOptions(options);
            FontPickerLeftPane.isDirty = false;
        }
    }

    render() {
        return (
            <div id={FontPickerLeftPane.PANE_ID} className="paneGroup">

                <OptionLabel light text="Search" />
                <OptionTextbox
                    id="txtFontPickerSearch"
                    value={this.state.Options["search"] || ""}
                    placeholder="Font Name"
                    icon="search"
                    onChange={FontPickerLeftPane.handleChange} />

                <OptionLabel light text="Category" />

                <OptionDropdown
                    id="ddlFontPickerCategory"
                    value={this.state.Options["category"]}
                    fullWidth
                    onChange={(id, newValue, oldValue) => {FontPickerLeftPane.handleChange(id, newValue, oldValue);}}
                    tooltip="Filter the list of fonts to the selected category.">
                    <li default>All</li>
                    <li>Display</li>
                    <li><span>Handwriting</span></li>
                    <li>Monospace</li>
                    <li>Sans-Serif</li>
                    <li>Serif</li>
                </OptionDropdown>

                <OptionLabel light text="Suggestions" />
                <OptionDropdown
                    id="ddlFontPickerSuggestions"
                    value={this.state.Options["suggestions"]}
                    fullWidth
                    onChange={(id, newValue, oldValue) => {FontPickerLeftPane.handleChange(id, newValue, oldValue);}}
                    tooltip="">
                    <li default>All</li>
                    <li>Headings</li>
                    <li>Paragraphs</li>
                </OptionDropdown>

                <OptionLabel light text="Subset" />
                <OptionDropdown
                    id="ddlFontPickerSubset"
                    value={this.state.Options["subset"]}
                    fullWidth
                    onChange={(id, newValue, oldValue) => {FontPickerLeftPane.handleChange(id, newValue, oldValue);}}
                    tooltip="">
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
                <OptionDropdown
                    id="ddlFontPickerSortBy"
                    value={this.state.Options["sortBy"]}
                    fullWidth
                    onChange={(id, newValue, oldValue) => {FontPickerLeftPane.handleChange(id, newValue, oldValue);}}
                    tooltip="">
                    <li>category</li>
                    <li>family</li>
                    <li>lastModified</li>
                    <li default>popularity</li>
                </OptionDropdown>

                <OptionLabel light text="Display" />
                <ButtonToolbar>
                    <ButtonGroup bsSize="small">
                        <Button id="cmdFontPickerToggleDark" onClick={(e) => {this.handleClick(e);}}><Glyphicon glyph="adjust" /></Button>
                        <Button id="cmdFontPickerResetOptions" onClick={(e) => {this.handleClick(e);}}><Glyphicon glyph="repeat" /></Button>
                        <Button id="cmdFontPickerRefresh" onClick={(e) => {this.handleClick(e);}}><Glyphicon glyph="refresh" /></Button>
                    </ButtonGroup>
                    <ButtonGroup bsSize="small">
                        <Form inline>
                            <FormGroup>
                                <InputGroup bsSize="small">
                                    <input
                                        id="txtFontPickerPreviewSize"
                                        className="form-control"
                                        type="text"
                                        value={this.state.Options["previewSize"] || '32'}
                                        placeholder="Size"
                                        style={{ margin:0, width:'50px' }}
                                        onChange={(id, newValue, oldValue) => {FontPickerLeftPane.handleChange(id, newValue, oldValue);}}
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
                <OptionTextbox
                    id="txtFontPickerPreviewText"
                    value={this.state.Options["previewText"] || 'The quick, brown fox jumps over the lazy dog.'}
                    placeholder="Preview Text"
                    icon="share-alt"
                    onChange={(id, newValue, oldValue) => {FontPickerLeftPane.handleChange(id, newValue, oldValue);}} />

                <span style={{display:'none'}}>{"" + this.state.foo}</span>


                <br/><br/><br/><br/>
            </div>
        );
    }

    static ResetOptions() {
        FontPickerLeftPane.Options = FontPickerLeftPane.copyOptions(FontPickerLeftPane.DefaultOptions);

        // TODO: These feel like hacks. See why children aren't rendering on parent setState().
        // FontPickerLeftPane.writeOptions(FontPickerLeftPane.Options);
        OptionDropdown.$instances["ddlFontPickerCategory"].setText(FontPickerLeftPane.Options["category"]);
        OptionDropdown.$instances["ddlFontPickerSuggestions"].setText(FontPickerLeftPane.Options["suggestions"]);
        OptionDropdown.$instances["ddlFontPickerSubset"].setText(FontPickerLeftPane.Options["subset"]);
        OptionDropdown.$instances["ddlFontPickerSortBy"].setText(FontPickerLeftPane.Options["sortBy"]);
        $("#txtFontPickerSearch").val(FontPickerLeftPane.Options["search"]);

        GoogleFonts.SortFontList(FontPickerLeftPane.Options["sortBy"]);

        FontPickerLeftPane.$instance.setState({});
        FontPickerLeftPane.OnChange("txtFontPickerSearch", "search");
    }

    handleClick(e) {
        let id = e.target.id || e.target.parentElement.id;
        switch(id) {
            case 'cmdFontPickerToggleDark':
                let $div = $('#divFontListItems');
                if($div.hasClass('dark')) {
                    $div.removeClass('dark');
                } else {
                    $div.addClass('dark');
                }
                break;
            case 'cmdFontPickerResetOptions':
                FontPickerLeftPane.ResetOptions();
                e.preventDefault();
                break;
            case 'cmdFontPickerRefresh':
                $("#fontPickerRightPane").find("#divFontListItems").empty();
                setTimeout(() => {
                    FontPickerLeftPane.OnChange(id, 'search');
                }, 0);
                break;
            /* istanbul ignore next */
            default:
                break;
        }
    }

    static handleChange(id, newValue, oldValue) {
        let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
        FontPickerLeftPane.Options[key] = FontPickerLeftPane.tryParseNumber(newValue);
        FontPickerLeftPane.OnChange(id, key, newValue);
    }

    static getOptionKeyFromControlId(id) {
        let key = id;
        /* istanbul ignore else */
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

    static readOptions() {
        let options = { };
        let $root = $(`#${FontPickerLeftPane.PANE_ID}`);

        // grab values from text boxes
        $root.find("input").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            /* istanbul ignore else */
            if(id && id.substring(0,3) === 'txt') {
                let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                let val = $obj.val().trim();
                val = FontPickerLeftPane.tryParseNumber(val);
                /* istanbul ignore else */
                if(key) { options[key] = val; }
            }
        });

        // grab values from drop downs
        $root.find("button").each((index, obj) => {
            let $obj = $(obj);
            let id = $obj.attr("id");
            /* istanbul ignore else */
            if(id && id.substring(0,3) === 'ddl') {
                let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                let val = $obj.text().trim();
                val = FontPickerLeftPane.tryParseNumber(val);
                /* istanbul ignore else */
                if(key) { options[key] = val; }
            }
        });

        return options;
    }

    static writeOptions(options) {
        if(options) {
            let $root = $(`#${FontPickerLeftPane.PANE_ID}`);

            // push values to text boxes
            $root.find("input").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                /* istanbul ignore else */
                if(id && id.substring(0,3) === 'txt') {
                    let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                    let val = options[key];
                    /* istanbul ignore else */
                    if(val !== undefined) { $obj.val(val); }
                }
            });

            // push values to drop downs
            $root.find("button").each((index, obj) => {
                let $obj = $(obj);
                let id = $obj.attr("id");
                /* istanbul ignore else */
                if(id && id.substring(0,3) === 'ddl') {
                    let key = FontPickerLeftPane.getOptionKeyFromControlId(id);
                    let val = options[key];
                    /* istanbul ignore else */
                    if(val !== undefined) { $obj.html(val + ' <span class="caret"></span>'); }
                }
            });
        }
    }
}

export default FontPickerLeftPane;