import React from 'react';
import './FontsApp.css';
import * as FontsUI from './FontsUI';

class FontsApp extends React.Component {

    render() {
        return (
            <div>
                <FontsUI.MainToolbar />

                <FontsUI.LeftPane />
                <FontsUI.MiddlePane />
                <FontsUI.RightPane />
            </div>
        );
    }
}

export default FontsApp;
