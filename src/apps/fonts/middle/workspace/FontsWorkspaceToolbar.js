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
import { ButtonToolbar, ButtonGroup, Button, Glyphicon, ProgressBar, DropdownButton, MenuItem } from 'react-bootstrap';
import './FontsWorkspaceToolbar.css';

class FontsWorkspaceToolbar extends React.Component {
    render() {
        return (
            <div id="workspaceToolbar">
                <ButtonToolbar>
                    <ButtonGroup>
                        <Button onClick={this.handleClick} id="cmdImageWorkspaceZoomIn"><Glyphicon glyph="zoom-in"/></Button>
                        <Button onClick={this.handleClick} id="cmdImageWorkspaceZoomOut"><Glyphicon glyph="zoom-out"/></Button>
                    </ButtonGroup>
                    <ButtonGroup className="input-group">
                        <input id="txtImageWorkspaceZoom" type="text" defaultValue="100%" size="5" className="form-control" style={{width:'66px'}} />
                        <DropdownButton pullRight title="" key={1} id="txtImageWorkspaceZoomOptions">
                            <MenuItem eventKey="1600">1600%</MenuItem>
                            <MenuItem eventKey="800">800%</MenuItem>
                            <MenuItem eventKey="400">400%</MenuItem>
                            <MenuItem eventKey="200">200%</MenuItem>
                            <MenuItem eventKey="100">100%</MenuItem>
                            <MenuItem eventKey="50">50%</MenuItem>
                            <MenuItem eventKey="25">25%</MenuItem>
                            <MenuItem eventKey="12.5">12.5%</MenuItem>
                        </DropdownButton>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button onClick={this.handleClick} id="cmdImageWorkspaceFitWidth"><Glyphicon glyph="resize-horizontal"/></Button>
                        <Button onClick={this.handleClick} id="cmdImageWorkspaceFitHeight"><Glyphicon glyph="resize-vertical"/></Button>
                        <Button onClick={this.handleClick} id="cmdImageWorkspaceFitPage"><Glyphicon glyph="resize-full"/></Button>
                    </ButtonGroup>
                    <ButtonGroup className="pull-right">
                        <ProgressBar bsStyle="warning" now={20} style={{width:'250px', height:'34px'}} />
                    </ButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }
}

export default FontsWorkspaceToolbar;