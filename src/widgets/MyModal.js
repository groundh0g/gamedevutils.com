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