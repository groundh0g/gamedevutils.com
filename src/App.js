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
import './App.css';
import Home from './homepage/Home';
import MainNavbar from './MainNavbar';
import FontsApp from './apps/fonts/FontsApp';
import SheetsApp from './apps/sheets/SheetsApp';

class App extends React.Component {
    static QueryHash = {};
    static QueryParam = {};
    static Location;

    render() {
        App.refreshQueryStrings(App.Location);
        switch(App.QueryParam['app']) {
            case 'fonts':
                return (
                    <div>
                        <MainNavbar />
                        <FontsApp />
                    </div>
                );
            case 'sheets':
                return (
                    <div>
                        <MainNavbar />
                        <SheetsApp />
                    </div>
                );
            case 'tiles':
                return (
                    <div>
                        <MainNavbar />
                        <div>
                            <img src={process.env.PUBLIC_URL + "/iconTileEditor@2x.png"} alt="" />
                        </div>
                    </div>
                );
            case 'animate':
                return (
                    <div>
                        <MainNavbar />
                        <div>
                            <img src={process.env.PUBLIC_URL + "/iconAnimation@2x.png"} alt="" />
                        </div>
                    </div>
                );
            case 'effects':
                return (
                    <div>
                        <MainNavbar />
                        <div>
                            <img src={process.env.PUBLIC_URL + "/iconEffects@2x.png"} alt="" />
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        <MainNavbar />
                        <Home />
                    </div>
                );
        }
    }

    static refreshQueryStrings(loc) {
        loc = loc || window.location;
        App.parseQueryString(App.QueryHash, loc.hash);
        App.parseQueryString(App.QueryParam, loc.search);
    }

    static parseQueryString(obj, loc) {
        let match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = loc.substring(1);

        while (match = search.exec(query)) // eslint-disable-line no-cond-assign
            obj[decode(match[1])] = decode(match[2]);

    }
}

export default App;
