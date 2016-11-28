import React from 'react';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
import FontPicker from '../right/fontpicker/FontPicker';
import './MainToolbar.css';

class MainToolbar extends React.Component {

    handleClick(source, event) {
        event.preventDefault();
        source.target.blur();
        source.target.parentElement.blur();
        switch(source.target.id) {
            case 'cmdFontAdd':
                FontPicker.Show();
                break;
            default:
                break;
        }
        // console.log(`clicked ${source.target.id}.`);
    }

    render() {
        return (
            <div id="mainToolbar">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={this.handleClick} id="cmdProjectNew" className="disabled"><Glyphicon glyph="file" /> New</Button>
                        <Button onClick={this.handleClick} id="cmdProjectOpen" className="disabled"><Glyphicon glyph="folder-open" />&nbsp; Open</Button>
                        <Button onClick={this.handleClick} id="cmdProjectSave" className="disabled"><Glyphicon glyph="floppy-disk" /> Save</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={this.handleClick} id="cmdWorkspaceRefresh" className="disabled"><Glyphicon glyph="refresh" /> Refresh</Button>
                        <Button onClick={this.handleClick} id="cmdProjectPublish" className="disabled"><Glyphicon glyph="share" /> Publish</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={this.handleClick} id="cmdProjectSettings" className="active"><Glyphicon glyph="cog" /> Settings</Button>
                    </ButtonGroup>
                    <div className="pull-right">
                        <ButtonGroup>
                            <Button onClick={this.handleClick} id="cmdHelp" className="disabled"><Glyphicon glyph="education" />&nbsp; Help</Button>
                        </ButtonGroup>
                    </div>
                </ButtonToolbar>
            </div>
        );
    }
}

export default MainToolbar;