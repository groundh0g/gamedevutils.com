import React from 'react';
import './FontsRightPane.css';
import $ from 'jquery';
import { Tabs, Tab } from 'react-bootstrap';
import FontsTab from './FontsTab';
import ConsoleTab from '../../../widgets/ConsoleTab';
import FontPicker from './fontpicker/FontPicker';

export class FontsRightPane extends React.Component {

    componentDidMount() {
        FontsTab.$statusLabel = $("#paneRightTabs-tab-1");
        ConsoleTab.$statusLabel = $("#paneRightTabs-tab-2");
    }

    render() {
        return (
            <div id="paneRight">
                <Tabs defaultActiveKey={1} id="paneRightTabs">
                    <Tab eventKey={1} title="Fonts (0)">
                        <div id="divTabContentFonts" className="fontsTabWrapper">
                            <FontsTab />
                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Console (0)">
                        <div id="divTabContentConsole" className="consoleTabWrapper">
                            <ConsoleTab />
                        </div>
                    </Tab>
                </Tabs>
                <FontPicker />
            </div>
        );
    }
}

// export default FontsRightPane;