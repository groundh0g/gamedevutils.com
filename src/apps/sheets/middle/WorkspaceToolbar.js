import React from 'react';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import './WorkspaceToolbar.css';

class WorkspaceToolbar extends React.Component {
    render() {
        return (
            <div id="workspaceToolbar">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={this.handleClick} id="cmdFoo"><i className="fa fa-question"></i> Foo</Button>
                        <Button onClick={this.handleClick} id="cmdBar"><i className="fa fa-question"></i> Bar</Button>
                        <Button onClick={this.handleClick} id="cmdBaz"><i className="fa fa-question"></i> Baz</Button>
                        <Button onClick={this.handleClick} id="cmdBip"><i className="fa fa-question"></i> Bip</Button>
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }
}

export default WorkspaceToolbar;