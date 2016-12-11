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