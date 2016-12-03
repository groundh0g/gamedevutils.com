import React from 'react';
import { DropdownButton, InputGroup, MenuItem } from 'react-bootstrap'

class OptionDropdown extends React.Component {
    // TODO: Only used by FontPickerLeftPane to force redraw of children. Feel like a hack. Investigate.
    static $instances;

    constructor(props) {
        super(props);
        this.state = {
            text: undefined,
            defaultValue: this.props.defaultValue || this.calcDefaultValue()
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
        if(newValue !== oldValue && this.props.onChange) {
            this.props.onChange(this.props.id, newValue, oldValue);
        }
    }

    render() {
        return (
            <DropdownButton
                componentClass={InputGroup.Button}
                style={this.props.fullWidth ? { width:"100%" } : { }}
                id={this.props.id}
                ref={this.props.id}
                title={this.state.text !== undefined ? this.state.text : this.state.defaultValue}
                onSelect={ (key, e) => { this.handleSelect(key, e); }} >
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
            </DropdownButton>
        );
    }
}

export default OptionDropdown;