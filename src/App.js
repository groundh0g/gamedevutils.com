import React from 'react';
import './App.css';
import Home from './homepage/Home';
import MainNavbar from './MainNavbar';
import FontsApp from './apps/fonts/FontsApp';
// import SheetsApp from './apps/sheets/SheetsApp';

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
                        <div>
                            <img src={process.env.PUBLIC_URL + "/iconSpriteSheets@2x.png"} alt="" />
                        </div>
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
