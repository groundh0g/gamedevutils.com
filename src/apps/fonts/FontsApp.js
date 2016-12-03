import React from 'react';
import './FontsApp.css';
import * as FontsUI from './FontsUI';
import { GoogleFonts } from './GoogleFonts';

class FontsApp extends React.Component {
    componentDidMount() {
        GoogleFonts.LoadFontList(() => {
            // $('#txtFontSearch').typeahead({
            //     source: GoogleFonts.FontList.items,
            //     displayText: function(item) { return item.family; },
            //     autoSelect: false
            // });
        });
    }

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
