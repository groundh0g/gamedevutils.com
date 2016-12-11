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
import { Dropdown, MenuItem } from 'react-bootstrap'

class OptionDropdown extends React.Component {
    static $instances;

    constructor(props) {
        super(props);
        let defaultValue = this.props.defaultValue || this.calcDefaultValue();
        this.state = {
            text: defaultValue,
            // defaultValue: defaultValue
        };

        OptionDropdown.$instances = OptionDropdown.$instances || {};
        OptionDropdown.$instances[this.props.id] = this;
    }

    setText(text) {
        this.setState({text: text});
    }

    calcDefaultValue() {
        let items = this.props.children;
        let result = items.length > 0 ? "" + items[0].props.children : undefined;
        for(let i = 0; i < items.length; i++) {
            let item = items[i];
            if(item.props.default) {
                result = "" + item.props.children;
                break;
            }
        }
        return result;
    }

    handleSelect(key, e) {
        let oldValue = this.state.text;
        let newValue = e.target.textContent.replace(/ \*/, "");
        this.setState({ text: newValue });
        /* istanbul ignore else */
        if(newValue !== oldValue && this.props.onChange) {
            this.props.onChange(this.props.id, newValue, oldValue);
        }
    }

    render() {
        return (
            <Dropdown
                id={this.props.id}
                style={this.props.fullWidth ? { width:"100%" } : { }}
                ref={this.props.id}
                onSelect={ (key, e) => { this.handleSelect(key, e); }}
            >
                <Dropdown.Toggle title={this.state.text} style={this.props.fullWidth ? { width:"100%" } : { }}>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.props.children.map((item, index) => {
                        return (
                            <MenuItem
                                id={item.props.id}
                                key={index}
                                eventKey={this.props.id}
                                onSelect={this.props.onSelect}
                            >{item.props.children}{item.props.default ? " *" : ""}</MenuItem>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default OptionDropdown;