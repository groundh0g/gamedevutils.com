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
import { Glyphicon, Button } from 'react-bootstrap';
// import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import './Home.css';

class FontsApp extends React.Component {
    componentDidMount() {
    }

    render() {
        return (
            <div className="container">

                <br/>
                <br/>

                <p>GameDevUtils.com is a suite of tools that I developed for my game programming students. There are certainly
                    better products out there, but I wanted my students to have access to free tools and, more importantly,
                    access to the source code for those tools. I also didn’t want the tools to look like poop that was
                    designed in the 80’s.</p>
                
                <table cellPadding="0" cellSpacing="0" style={{border:0, width:'650px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <tbody><tr>
                        <td style={{width:'300px'}}>
                            <img src={process.env.PUBLIC_URL + "/iconSpriteSheets.png"} alt="Sprite Sheets" />
                        </td>
                        <td style={{textAlign:'center', whiteSpace:'nowrap'}}>
                            <p>A tool to merge several art assets (objects <br/>
                                within the game) into a single image, saving <br/>
                                memory and reducing CPU-to-GPU chatter.
                            </p>
                            <p>
                                <Button bsStyle="primary">Show Features</Button>&nbsp;
                                <Button bsStyle="primary" onClick={() => {window.location='?app=sheets';}}>Go!</Button>
                            </p>
                        </td>
                    </tr><tr>
                        <td style={{width:'300px'}}>
                            <img src={process.env.PUBLIC_URL + "/iconSpriteFonts.png"} alt="Sprite Sheets" />
                        </td>
                        <td style={{textAlign:'center', whiteSpace:'nowrap'}}>
                            <p>A tool to convert public domain TTF &amp; OTF <br/>
                                fonts into bitmap fonts - a format that is <br/>
                                more easily consumed by game engines.
                            </p>
                            <p>
                                <Button bsStyle="primary">Show Features</Button>&nbsp;
                                <Button bsStyle="primary" onClick={() => {window.location='?app=fonts';}}>Go!</Button>
                            </p>
                        </td>
                    </tr><tr>
                        <td style={{width:'300px'}}>
                            <img src={process.env.PUBLIC_URL + "/iconTileEditor.png"} alt="Sprite Sheets" />
                        </td>
                        <td style={{textAlign:'center', whiteSpace:'nowrap'}}>
                            <p>A tool that manages the placement of a fixed <br/>
                                set of tiled images. By painting these tiles <br/>
                                into place, entire game worlds can be made.
                            </p>
                            <p>
                                <Button disabled>Show Features</Button>&nbsp;
                                <Button disabled>Go!</Button>
                            </p>
                        </td>
                    </tr><tr>
                        <td style={{width:'300px'}}>
                            <img src={process.env.PUBLIC_URL + "/iconAnimation.png"} alt="Sprite Animation" />
                        </td>
                        <td style={{textAlign:'center', whiteSpace:'nowrap'}}>
                            <p>A tool to assemble sprites into frame-based <br/>
                                or bones-based animation sequences. <br/>
                                Future version to include UV deformation.
                            </p>
                            <p>
                                <Button disabled>Show Features</Button>&nbsp;
                                <Button disabled>Go!</Button>
                            </p>
                        </td>
                    </tr><tr>
                        <td style={{width:'300px'}}>
                            <img src={process.env.PUBLIC_URL + "/iconEffects.png"} alt="Sprite Effects" />
                        </td>
                        <td style={{textAlign:'center', whiteSpace:'nowrap'}}>
                            <p>A tool to create visual effects as parametrized <br/>
                                animations that can be placed in the game world <br/>
                                and have their playback tweaked at run-time.
                            </p>
                            <p>
                                <Button disabled>Show Features</Button>&nbsp;
                                <Button disabled>Go!</Button>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <h2 id="what-makes-gamedevutilscom-so-special">What Makes GameDevUtils.com So Special?</h2>

                <p>It’s certainly not its features. The commercial offerings provide options and functionality that
                    aren’t (yet) supported in this suite of tools. The biggest benefits of this suite are that it’s
                    open source, and that it doesn’t require you to install anything. Everything runs in your browser.</p>

                <div style={{marginLeft:'30px'}}>

                    <h3>Everything Runs in Your Browser</h3>

                    <p>You read that right. Everything runs in your browser. The technology that drives GameDevUtils.com is
                        vanilla HTML5 and JavaScript. That means that you can use the app from any operating system,
                        using any modern web browser.</p>

                    <p>You don't have to be an administrator on your computer. You don't have to worry about updates.</p>

                    <p>At least, that's the idea. I've been developing on my MacBook Pro, using the Chrome and Firefox
                        web browsers. I'll be doing more extensive testing in the near future.</p>

                    <h3>Your Assets, on Your Computer</h3>

                    <p>There is no server component to GameDevUtils.com. Assets are loaded into your browser from your local
                        file system. Project files are loaded from and saved to your computer. Published resources are
                        generated on and saved to your computer.</p>

                    <p>Your data is never transmitted to the server. I don't need to see it, and I don't need to pay
                        for dedicated servers that churn through data or bandwidth for that data to travel to and from
                        those servers.</p>

                    <p>In fact, if you really want to be cautious (*cough* *cough* tinfoil hat *cough*), you
                        can download the static HTML and Javascript and run them on your computer - even without an
                        internet connection.</p>

                    <h3>Stop, Collaborate, and Listen! (Share Your Work)</h3>

                    <p>Project files and published resources are generated as self-contained plaintext or compressed
                        (ZIP DEFLATE) files. Just share the file via email, DropBox, or however you normally
                        share files with teammates.</p>

                    <p>Resources are embedded in the project file, not linked. GameDevUtils.com embeds the source image
                        data and configured options. Once assets have been added to the project, they're never
                        referenced from your filesystem again. Share away.</p>

                    <h3>FUTURE: Prefer a Command Line Interface?</h3>

                    <p>One of the selling points of the commercial offerings is that they provide a command line interface for their tools. Today, GameDevUtils.com is a browser-based suite of tools.</p>

                    <p>I have plans to refactor the logic that drives the web apps into <a href="https://nodejs.org/" target="_blank">NodeJS</a> modules, and share that code between the web and console versions of the tools.</p>

                    <p>Why all the effort? I want to support build pipelines. Just plug some scripts into your favorite continuous integration solution and build your assets alongside your code!</p>

                    <h3>FUTURE: Want to Work in the Cloud?</h3>

                    <p>The beauty of GameDevUtils.com is that there are no dependencies on the client. It's OS and, to a great extent, browser independent. Also nice is that your data need never leave your computer. That is, until you want to work with a team. If you think emailing ZIP files is clunky (I certainly do), then there's a new option coming your way soon!</p>

                    <p>You're probably already using one of the many popular cloud storage providers. If so, you can tell GameDevUtils.com to reference assets as file links rather than embedding those resources in the project files. That makes the project files smaller, and it makes it easier to edit an asset without having to remove it from the project and add it back.</p>

                    <ul style={{marginLeft:'30px'}}>
                        <li>Google Drive</li>
                        <li>Dropbox</li>
                        <li>OneDrive</li>
                        <li>iCloud</li>
                        <li>GitHub</li>
                        <li>Bitbucket</li>
                    </ul>

                    <p>I know what you're thinking ... <i>Hey! GitHub and Bitbucket aren't cloud storage providers!</i></p>

                    <p>You're absolutely right. But, after the cloud storage support is in place, I hope to provide GitHub and BitBucket integration for the ultimate in team collaboration.</p>

                </div>

                <h2 id="want-to-help">Want to Help?</h2>

                <p>Kick the tires. Try things out. If you find something wonky, or just want to suggest a new feature, <a href="https://github.com/groundh0g/gamedevutils.com/issues">open an issue</a>.</p>

                <p>If you’re looking to contribute, I ask that you keep edits small and as self-contained as possible. The planned support for a command line interface will involve a lot of churn in the code.</p>

                <p>Simple bug fixes are another story, though. Issue your pull request against the <a href="https://github.com/groundh0g/gamedevutils.com/tree/gh-pages">gh-pages branch</a> for now. Once the code has been modularized for web and console, it should live in the master branch.</p>

                <hr/>
                    <p>Thanks for Visiting!<br/>
                        — <a href="https://twitter.com/groundh0g">@groundh0g</a></p>

                    <div id="popupFeatureSheets" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    <h4 className="modal-title">Sprite Sheet Features</h4>
                                </div>
                                <div className="modal-body">
                                    <h3>Current Features:</h3>
                                    <div style={{paddingLeft:'10px'}}><p>
                                        <Glyphicon glyph="check"/> Import web-friendly image formats<br/>
                                        <Glyphicon glyph="check"/> <em>Extract animated GIF frames!</em><br/>
                                        <Glyphicon glyph="check"/> Export images as PNG, GIF, or JPG<br/>
                                        <Glyphicon glyph="check"/> Export data as XML or JSON<br/>
                                        <Glyphicon glyph="check"/> Export data as CSS<br/>
                                        <Glyphicon glyph="check"/> Trim &amp; crop unused pixels<br/>
                                        <Glyphicon glyph="check"/> Heuristic mapping (chroma key)<br/>
                                        <Glyphicon glyph="check"/> Basic rects (shelf) texture packing<br/>
                                        <Glyphicon glyph="check"/> MaxRects texture packing<br/>
                                        <Glyphicon glyph="check"/> Alpha (transparent) cleaning (aids compression)<br/>
                                        <Glyphicon glyph="check"/> Debug mode (show sprite outlines)
                                    </p></div>
                                    <h3>Planned Features:</h3>
                                    <div style={{paddingLeft:'10px'}}><p>
                                        <Glyphicon glyph="wrench"/> Import non-web image formats<br/>
                                        <Glyphicon glyph="wrench"/> Export optimized images<br/>
                                        <Glyphicon glyph="wrench"/> Allow sprite rotate within sheet<br/>
                                        <Glyphicon glyph="wrench"/> Alias duplicate sprites<br/>
                                        <Glyphicon glyph="wrench"/> DropBox (et. al.) support
                                    </p></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="popupFeatureFonts" className="modal fade">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                                    <h4 className="modal-title">Sprite Fonts Features</h4>
                                </div>
                                <div className="modal-body">
                                    <h3>Current Features:</h3>
                                    <div style={{paddingLeft:'10px'}}><p>
                                        <Glyphicon glyph="check"/> Select from a library of 2000+ fonts<br/>
                                        <Glyphicon glyph="check"/> Export images as PNG, GIF, or JPG<br/>
                                        <Glyphicon glyph="check"/> Export data as XML or JSON<br/>
                                        <Glyphicon glyph="check"/> Trim &amp; crop unused pixels (smaller files)<br/>
                                        <Glyphicon glyph="check"/> Kerning (deduced)<br/>
                                        <Glyphicon glyph="check"/> Metrics (deduced)<br/>
                                        <Glyphicon glyph="check"/> Specify included characters<br/>
                                        <Glyphicon glyph="check"/> Filter included characters from sample text<br/>
                                        <Glyphicon glyph="check"/> Debug mode (show font metrics as outlines)
                                    </p></div>
                                    <h3>Planned Features:</h3>
                                    <div style={{paddingLeft:'10px'}}><p>
                                        <Glyphicon glyph="wrench"/> Import your own TTF/OTF fonts<br/>
                                        <Glyphicon glyph="wrench"/> Kerning (inspect font data)<br/>
                                        <Glyphicon glyph="wrench"/> Metrics (inspect font data)<br/>
                                        <Glyphicon glyph="wrench"/> Embedded bounds data in image (no separate atlas)<br/>
                                        <Glyphicon glyph="wrench"/> Export optimized images<br/>
                                        <Glyphicon glyph="wrench"/> Alias duplicate glyphs<br/>
                                        <Glyphicon glyph="wrench"/> DropBox support
                                    </p></div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">Dismiss</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p>&nbsp;</p>
                
            </div>
        );
    }
}


export default FontsApp;
