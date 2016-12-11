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
import { ButtonToolbar, ButtonGroup, Button, Glyphicon } from 'react-bootstrap';
// import FontPicker from '../right/fontpicker/FontPicker';
import './SheetsMainToolbar.css';

export class SheetsMainToolbar extends React.Component {

    static $testRoot;

    handleClick(e) {
        let $root = SheetsMainToolbar.$testRoot || $("#root");
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
            <div id="mainSheetsToolbar">
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