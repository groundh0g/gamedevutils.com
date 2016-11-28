import React from 'react';
import { DropdownButton, InputGroup, MenuItem } from 'react-bootstrap'

class OptionDropdown extends React.Component {
    constructor(props) {
        super(props);
        let defaultValue = this.calcDefaultValue();
        this.state = {
            text: defaultValue,
            defaultValue: defaultValue
        };
    }

    calcDefaultValue() {
        var items = this.props.children;
        var result = items.length > 0 ? "" + items[0].props.children : undefined;
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
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
                title={this.state.text}
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