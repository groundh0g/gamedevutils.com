import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import './ButtonToggle.css';

class ButtonToggle extends React.Component {
    constructor(props){
        super(props);
        this.state = { toggle: !!this.props.isToggled };
    }

    render() {
        return (
            <Button
                onClick={(e) => {
                    this.setState({toggle: !this.state.toggle});
                    e.target.blur();
                    e.target.parentElement.blur();
                    if(this.props.afterClick) { this.props.afterClick(e); }
                }}
                id={this.props.id}
                title={this.props.title}
                className={ this.state.toggle ? "active btn-primary button-toggle" : "button-toggle"}
            >{this.props.glyph && <Glyphicon glyph={this.props.glyph} />}{this.props.children}</Button>
        );
    }
}

export default ButtonToggle;

