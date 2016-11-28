import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RightPane from './RightPane';
import ConsoleTab from '../../../widgets/ConsoleTab';

describe('Right Pane', () => {

    const statusId = "#paneRightTabs-tab-2";

    let root;
    let $consoleTabContent;

    beforeEach(() => {
        root = document.createElement('div');
        ReactDOM.render(<RightPane />, root);
        $consoleTabContent = $(root).find("div.consoleTabContent").first();
        ConsoleTab.$statusLabel = $(root).find(statusId).first();
    });

    it('updates the message counts in the tab text', () => {
        let $status = $(root).find(statusId);
        ConsoleTab.clear();
        expect($status.text()).toEqual("Console (0)");
        ConsoleTab.debug("this is a debug test");
        expect($status.text()).toEqual("Console (1)");
        ConsoleTab.warning("this is a warning test");
        expect($status.text()).toEqual("Console (2)");
        ConsoleTab.info("this is an info test");
        expect($status.text()).toEqual("Console (3)");
        ConsoleTab.error("this is an error test");
        expect($status.text()).toEqual("Console (4)");
    });
});
