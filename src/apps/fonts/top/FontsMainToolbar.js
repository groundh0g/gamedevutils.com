import React from 'react';
import $ from 'jquery';
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
// import FontPicker from '../right/fontpicker/FontPicker';
import './FontsMainToolbar.css';

export class FontsMainToolbar extends React.Component {

    static $testRoot;

    handleClick(e) {
        let $root = FontsMainToolbar.$testRoot || $("#root");
        e.preventDefault();
        e.target.blur();
        e.target.parentElement.blur();
        switch(e.target.id) {
            case 'cmdProjectSettings':
                if($root.find('#cmdProjectSettings').hasClass('active')) {
                    $root.find('#cmdProjectSettings').removeClass('active');
                    $root.find('#paneLeft').css('display', 'none');
                    $root.find('#workspaceToolbar').css('left', '0');
                    $root.find('#paneWorkspace').css('left', '0');
                } else {
                    $root.find('#cmdProjectSettings').addClass('active');
                    $root.find('#paneLeft').css('display', 'block');
                    $root.find('#workspaceToolbar').css('left', '200px');
                    $root.find('#paneWorkspace').css('left', '200px');
                }

                break;
            /* istanbul ignore next */
            default:
                break;
        }
    }

    render() {
        return (
            <div id="mainFontsToolbar">
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