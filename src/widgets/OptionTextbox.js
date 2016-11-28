import React from 'react';
import $ from 'jquery';

class OptionTextbox extends React.Component {
    componentDidMount() {
        // select text on focus
        let id = this.props.id;
        /* istanbul ignore else */
        if(id) {
            // TODO: test focus+select in UI
            $("#" + id).focus(/* istanbul ignore next */ () => {
                var $self = $(this);
                window.setTimeout (function(){
                    $self.select();
                },100);
            });
        }
    }

    handleChange(id, newValue) {
        /* istanbul ignore else */
        if(this.props.onChange) { this.props.onChange(id, newValue); }
    }

    render() {
        return (
                <div className="btn-group" style={{width:"100%"}}>
                    <div className="input-group btn-group" style={{margin:0}}>
                        <input
                            id={this.props.id}
                            className="form-control"
                            type="text"
                            defaultValue={this.props.defaultValue}
                            placeholder={this.props.placeholder}
                            style={{ margin:0, width:'100%' }}
                            onChange={(e) => {this.handleChange(this.props.id, e.target.value)}}
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                        />
                        {this.props.icon &&
                            <span className="input-group-addon">
                                <i className={"glyphicon glyphicon-" + this.props.icon} />
                            </span>
                        }
                    </div>
                </div>
            );
    }
}

export default OptionTextbox;