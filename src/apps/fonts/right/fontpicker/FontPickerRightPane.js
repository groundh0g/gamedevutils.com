import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import FontsTab from '../FontsTab';
import './FontPickerRightPane.css';

class FontPickerRightPane extends React.Component {

    static FontListItemId = 0;
    static SearchText = "";

    render() {
        return (
            <div id="fontPickerRightPane">
                <div id="divFontListItems" className="list-group">
                </div>
            </div>
        );
    }

    static headingHTML(text) {
        return (text || "").replace(new RegExp(FontPickerRightPane.SearchText, 'gi'), '<span class="searchHighlight">$&</span>');
    }

    static addFontListItem(font, weight, style, size) {
        weight = weight || 400;
        style = style || 'Normal';
        size = (size || '30pt');
        let template = (
            <div className="list-group-item">
                <h4 className="list-group-item-heading"><strong><span className="font-list-item-family" dangerouslySetInnerHTML={{__html: FontPickerRightPane.headingHTML(font.family)}} /></strong>&nbsp;&nbsp;&nbsp;<span style={{color:'#ccc'}}><span className="font-list-item-weight">{weight}</span> <span className="font-list-item-style">{style}</span>, <span className="font-list-item-size">{size}pt</span></span><span className="font-list-item-font-id" style={{display:'none'}}>{FontPickerRightPane.FontListItemId}</span></h4>
                <div className="list-group-item-text" style={{width:'100%'}}>
                    <div style={{
                        whiteSpace:'nowrap',
                        fontFamily: font.family,
                        fontSize: size,
                        fontWeight: weight,
                        right:0,
                        overflow:'scroll'}}><span className="font-list-item-preview-text">The quick, brown fox jumps over the lazy dog.</span></div>
                    <ButtonToolbar>
                        <ButtonGroup bsSize="small">
                            <Button disabled title="Change size, style, and weight."><Glyphicon glyph="cog" /></Button>
                            <Button onClick={(e) => { FontPickerRightPane.handleClick(e, "add"); }} title="Add this font to the project."><Glyphicon glyph="plus" /></Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
            </div>
        );
        FontPickerRightPane.FontListItemId++;
        let $element = $("<div/>");
        $('#fontPickerRightPane div.list-group').first().append($element);
        ReactDOM.render(template, $element.get(0));
    }

    static handleClick(e, button) {
        e.target.blur();
        e.target.parentElement.blur();
        let $meta = $(e.target).closest('div.list-group-item').find('h4.list-group-item-heading');
        // console.log($meta);
        let font = {
            id:$meta.find('span.font-list-item-font-id').text(),
            family:$meta.find('span.font-list-item-family').text(),
            weight:$meta.find('span.font-list-item-weight').text(),
            style:$meta.find('span.font-list-item-style').text().toLowerCase(),
            size:$meta.find('span.font-list-item-size').text(),
            sample:$meta.parent().find('span.font-list-item-preview-text').text()
        };
        // console.log(font);
        FontsTab.addFont(font);
    }
}

export default FontPickerRightPane;