import React from 'react';
import $ from 'jquery';
import { ButtonGroup, ButtonToolbar, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import FontPicker from './fontpicker/FontPicker';
import './FontsTab.css';
import '../../../polyfill';

class FontsTab extends React.Component {

    static $instance;
    static $statusLabel;
    static FontList;

    static fontIdCounter;

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected: [],
        };
        FontsTab.$instance = this;
        FontsTab.fontIdCounter = 0;
    }

    render() {
        // Update status label (if any)
        let statusText = "Fonts (" + this.state.items.length + ")";
        if(FontsTab.$statusLabel)  { FontsTab.$statusLabel.text(statusText); }

        FontsTab.FontList = this.state.items;

        return (
            <div>
                <div className="fontsTabToolbar">
                    <ButtonToolbar bsSize="small">
                        <ButtonGroup>
                            <Button onClick={(e) => {this.selectManyFontListItems(undefined, true);  FontsTab.blurButton(e);}} title="Select all fonts." ><Glyphicon glyph="check" /></Button>
                            <Button onClick={(e) => {this.selectManyFontListItems(undefined, false); FontsTab.blurButton(e);}} title="Deselect all fonts." ><Glyphicon glyph="unchecked" /></Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button onClick={(e) => {
                                FontPicker.Show();
                                FontsTab.blurButton(e);
                            }} id="cmdFontAdd" title="Add a font."><Glyphicon glyph="plus" /></Button>
                            <Button onClick={(e) => {
                                this.removeSelectedFonts();
                                FontsTab.blurButton(e);
                            }} id="cmdFontRemove" title="Remove selected font(s)."><Glyphicon glyph="remove" /></Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className="fontsTabContent">
                    <ListGroup>
                        {this.state.items.map((item) => {
                                let display = `${item.displayWeight} ${item.displayStyle} @ ${item.displaySize}`;
                                let style = {
                                    whiteSpace:"nowrap",
                                    fontFamily: item.font.family,
                                    fontWeight: item.font.weight,
                                    fontStyle: item.font.style,
                                    fontSize: item.font.size,
                                    display: 'block',
                                    overflow: 'scroll',
                                };

                                return this.state.selected.indexOf(item.id) !== -1 ? (
                                    <ListGroupItem
                                        header={item.displayTitle}
                                        key={item.id}
                                        bsStyle="warning"
                                        onClick={(e) => {this.handleFontListItemClick(e, item.id);}}
                                        style={{whiteSpace:'nowrap', display:'block', overflow:'none'}}
                                    >{display}<br/><span style={style}>The quick, brown fox jumps over ...</span></ListGroupItem>
                                ) : (
                                    <ListGroupItem
                                        header={item.displayTitle}
                                        key={item.id}
                                        onClick={(e) => {this.handleFontListItemClick(e, item.id);}}
                                        style={{whiteSpace:'nowrap', display:'block', overflow:'none'}}
                                    >{display}<br/><span style={style}>The quick, brown fox jumps over ...</span></ListGroupItem>
                                );
                            }
                        )}
                    </ListGroup>
                </div>
            </div>
        );
    }

    static blurButton(e) {
        e.target.blur();
        e.target.parentElement.blur();
    }

    handleFontListItemClick(e, id) {
        this.selectFontListItem(id);
        FontsTab.blurButton(e);
    }

    removeSelectedFonts() {
        let items = FontsTab.$instance.state.items;
        let selected = FontsTab.$instance.state.selected;
        for(let i = 0; i < items.length; i++) {
            if(selected.indexOf(items[i].id) !== -1) {
                items.splice(i, 1);
                i--;
            }
        }
        this.setState({items: items, selected: []});
    }

    selectManyFontListItems(idList, state) {
        let i;
        // if(idList && idList.length > 0) {
        //     for(i = 0; i < idList.length; i++) {
        //         this.selectFontListItem(idList[i], !!state, true);
        //     }
        // } else {
            var items = this.state.items;
            for(i = 0; i < items.length; i++) {
                this.selectFontListItem(items[i].id, !!state, true);
            }
        // }
        this.setState({});
    }

    selectFontListItem(id, state, suppressSetState) {
        var selected = this.state.selected;
        var indexOf = selected.indexOf(id);

        if(typeof state === "boolean") {
            // specific state
            if(state === false && indexOf !== -1) {
                selected.splice(indexOf, 1);
            } else if(state === true && indexOf === -1) {
                selected.push(id);
            }
        } else {
            // toggle state
            if(indexOf !== -1) {
                selected.splice(indexOf, 1);
            } else {
                selected.push(id);
            }
        }

        if(!suppressSetState) { this.setState({selected:selected}); }
    }

    static copyFont(font) {
        // Deep copy
        return $.extend(true, {}, font);
    }

    static getFontNameForFamily(family) {
        let fontName = family || ("Unknown Font" + FontsTab.fontIdCounter);
        return fontName.replace(/ /g, "").toLowerCase();
    }

    static addFont(font) {
        let items = FontsTab.$instance.state.items;
        items.push({
            id: FontsTab.fontIdCounter,
            font: FontsTab.copyFont(font),
            displayTitle: font.family || "[Unrecognized Font]",
            displayName: FontsTab.getFontNameForFamily(font.family),
            displayStyle: "Normal",
            displayWeight: 400,
            displaySize: '30pt'
        });
        FontsTab.fontIdCounter++;
        FontsTab.$instance.setState({items: items});
    }

    static clear() {
        FontsTab.fontIdCounter = 0;
        FontsTab.$instance.setState({items: [], selected: []});
    }
}

export default FontsTab;
