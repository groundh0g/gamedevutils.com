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
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { AboutTheDevelopers, AboutTheLibraries, AboutTheLicense } from './about/Modals';
import App from './App';
import './MainNavbar.css';

class MainNavbar extends React.Component {

    constructor(props) {
        super(props);

        App.refreshQueryStrings();
        let app = App.QueryParam["app"];
        this.state = {
            app: {
                sheets:  app === "sheets",
                fonts:   app === "fonts",
                tiles:   app === "tiles",
                animate: app === "animate",
                effects: app === "effects",
            },
        };

        // this.state.app["home"] = !(
        //     this.state.app["sheets"] ||
        //     this.state.app["fonts"] ||
        //     this.state.app["tiles"] ||
        //     this.state.app["animate"] ||
        //     this.state.app["effects"]
        // );
    }

    handleSelect(key, event) {
        switch(key) {
            case 'popupAboutTheDevelopers':
                AboutTheDevelopers.Show();
                event.preventDefault();
                break;
            case 'popupAboutTheLibraries':
                AboutTheLibraries.Show();
                event.preventDefault();
                break;
            case 'popupAboutTheLicense':
                AboutTheLicense.Show();
                event.preventDefault();
                break;
            /* istanbul ignore next */
            default:
                break;
        }
        // console.log(e);
    }

    render() {
        let cnSheets  = this.state.app["sheets"] ? "active" : "";
        let cnFonts   = this.state.app["fonts"] ? "active" : "";
        let cnTiles   = this.state.app["tiles"] ? "active" : "";
        let cnAnimate = this.state.app["animate"] ? "active" : "";
        let cnEffects = this.state.app["effects"] ? "active" : "";

        return (
            <div>
                <Navbar id="mainNavbar" inverse className="strip-margins-black">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="?">GameDevUtils.com</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem href="?app=sheets"  className={cnSheets}>Sheets</NavItem>
                        <NavItem href="?app=fonts"   className={cnFonts}>Fonts</NavItem>
                        <NavItem href="?app=tiles"   className={cnTiles}>Tiles</NavItem>
                        <NavItem href="?app=animate" className={cnAnimate}>Animation</NavItem>
                        <NavItem href="?app=effects" className={cnEffects}>Effects</NavItem>
                    </Nav>
                    <Nav onSelect={this.handleSelect} pullRight>
                        <NavDropdown eventKey="aboutModals" title="About" id="menuAbout">
                            <MenuItem eventKey="popupAboutTheDevelopers">The Developer</MenuItem>
                            <MenuItem eventKey="popupAboutTheLibraries">The OSS Libraries</MenuItem>
                            <MenuItem eventKey="popupAboutTheLicense">The License (MIT)</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar>

                <AboutTheDevelopers />
                <AboutTheLibraries />
                <AboutTheLicense />
            </div>
        );
    }
}

export default MainNavbar;