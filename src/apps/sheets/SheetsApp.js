import React from 'react';
import './SheetsApp.css';
import MainToolbar from './top/MainToolbar'
import LeftPane from './left/LeftPane'
import MiddlePane from './middle/MiddlePane'
import RightPane from './right/RightPane'

class SheetsApp extends React.Component {

    render() {
        return (
            <div>
                <MainToolbar />

                <LeftPane />
                <MiddlePane />
                <RightPane />
            </div>
        );
    }
}

export default SheetsApp;
