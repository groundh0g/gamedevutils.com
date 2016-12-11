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
import { Modal, Button } from 'react-bootstrap';
import './MyModal.css';

class MyModal extends React.Component {
    static $instances;

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        MyModal.$instances = MyModal.$instances || {};
        MyModal.$instances[this.props.id] = this;
    }

    dialogClassName() {
        if(this.props.big) return "modal-wide";
        // if(this.props.biger) return "modal-wider";
        return "modal-normal";
    }

    dialogModalHeight() {
        if(this.props.tall) return {height:'400px'};
        // if(this.props.taller) return {height:'500px'};
        return {};
    }

    render() {
        return (
            <div>
                <Modal id={this.props.id} dialogClassName={this.dialogClassName()} show={this.state.showModal} onHide={() => {MyModal.Close(this.props.id);}}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={this.dialogModalHeight()}>
                        {this.props.body ? this.props.body : this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => {MyModal.Close(this.props.id);}}>Dismiss</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    close() { this.setState({showModal: false}); }
    show()  { this.setState({showModal: true}); }

    static Close(id) { MyModal.$instances[id].close(); }
    static Show(id)  { MyModal.$instances[id].show(); }

}

export default MyModal;