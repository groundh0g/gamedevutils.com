import React from 'react';
import './OptionLabel.css';

class OptionLabel extends React.Component {
    render() {
        let className =
            "option-label" +
            (this.props.group ? "-big" : "") +
            (this.props.light ? "-light" : "");

        return (
            <div className={className}>
                {this.props.text}
            </div>
        );
    }
}

export default OptionLabel;