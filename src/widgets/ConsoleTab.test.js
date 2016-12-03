import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import ConsoleTab from './ConsoleTab';

describe('Console', () => {

    let $root;
    let $consoleTabContent;

    beforeEach(() => {
        var $status = $("<span/>").attr("id", "status");
        var $content = $("<div/>").attr("id", "content");
        $root = $(document.createElement('div')).attr("id", "wrapper");
        $root.append($status);
        $root.append($content);
        ReactDOM.render(<ConsoleTab />, $root.find("#content").get(0));
        $consoleTabContent = $root.find("div.consoleTabContent").first();
        ConsoleTab.$statusLabel = $root.find("#status");
        // console.log(' """""""""""""""""""" ');
        // console.log($status);
        // ConsoleTab.$statusLabel = $status;
        ConsoleTab.clear();
    });

    it('logs DEBUG messages', () => {
        const MSG1 = "This is a debug message.";
        const MSG2 = "This is another debug message - with an error.";
        const ERR1 = "This is an error for the debug message.";
        try {
            ConsoleTab.debug(MSG1);
            throw new Error(ERR1);
        } catch(err) {
            ConsoleTab.debug(MSG2, err);
        }
        expect(ConsoleTab.MessageHistory[0].type).toEqual(ConsoleTab.TYPE.DEBUG);
        expect(ConsoleTab.MessageHistory[0].body).toEqual(MSG1);
        expect(ConsoleTab.MessageHistory[0].error).toBeUndefined();
        expect(ConsoleTab.MessageHistory[1].type).toEqual(ConsoleTab.TYPE.DEBUG);
        expect(ConsoleTab.MessageHistory[1].body).toEqual(MSG2);
        expect(ConsoleTab.MessageHistory[1].error.message).toEqual(ERR1);
        expect(ConsoleTab.MessageHistory[1].error).toEqual(new Error(ERR1));
    });

    it('logs INFO messages', () => {
        const MSG1 = "This is an info message.";
        const ERR1 = "This is an error for the info message.";
        ConsoleTab.info(MSG1, ERR1);
        expect(ConsoleTab.MessageHistory[0].type).toEqual(ConsoleTab.TYPE.INFO);
        expect(ConsoleTab.MessageHistory[0].body).toEqual(MSG1);
        expect(ConsoleTab.MessageHistory[0].error).toEqual(ERR1);
    });

    it('logs WARNING messages', () => {
        const MSG1 = "This is a warning message.";
        const ERR1 = "This is an error for the warning message.";
        ConsoleTab.warning(MSG1, ERR1);
        expect(ConsoleTab.MessageHistory[0].type).toEqual(ConsoleTab.TYPE.WARNING);
        expect(ConsoleTab.MessageHistory[0].body).toEqual(MSG1);
        expect(ConsoleTab.MessageHistory[0].error).toEqual(ERR1);
    });

    it('logs ERROR messages', () => {
        const MSG1 = "This is an error message.";
        const ERR1 = "This is an error for the error message.";
        ConsoleTab.error(MSG1, ERR1);
        expect(ConsoleTab.MessageHistory[0].type).toEqual(ConsoleTab.TYPE.ERROR);
        expect(ConsoleTab.MessageHistory[0].body).toEqual(MSG1);
        expect(ConsoleTab.MessageHistory[0].error).toEqual(ERR1);
    });

    it('logs SUCCESS messages', () => {
        const MSG1 = "This is a success message.";
        ConsoleTab.success(MSG1);
        expect(ConsoleTab.MessageHistory[0].type).toEqual(ConsoleTab.TYPE.SUCCESS);
        expect(ConsoleTab.MessageHistory[0].body).toEqual(MSG1);
    });

    it('renders error ONLY when showError is active', () => {
        const MSG1 = "This is a test.";
        ConsoleTab.error(MSG1);
        ConsoleTab.$instance.setState({showError: true});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(1);
        ConsoleTab.$instance.setState({showError: false});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(0);
    });

    it('renders warning ONLY when showWarning is active', () => {
        const MSG1 = "This is a test.";
        ConsoleTab.warning(MSG1);
        ConsoleTab.$instance.setState({showWarning: true});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(1);
        ConsoleTab.$instance.setState({showWarning: false});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(0);
    });

    it('renders info ONLY when showInfo is active', () => {
        const MSG1 = "This is a test.";
        ConsoleTab.info(MSG1);
        ConsoleTab.$instance.setState({showInfo: true});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(1);
        ConsoleTab.$instance.setState({showInfo: false});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(0);
    });

    it('renders success ONLY when showSuccess is active', () => {
        const MSG1 = "This is a test.";
        ConsoleTab.success(MSG1);
        ConsoleTab.$instance.setState({showSuccess: true});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(1);
        ConsoleTab.$instance.setState({showSuccess: false});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(0);
    });

    it('renders debug ONLY when showDebug is active', () => {
        const MSG1 = "This is a test.";
        ConsoleTab.debug(MSG1);
        ConsoleTab.$instance.setState({showDebug: true});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(1);
        ConsoleTab.$instance.setState({showDebug: false});
        expect($consoleTabContent.find("li.list-group-item").length).toEqual(0);
    });

    it('populates and clears the console messages', () => {
        ConsoleTab.debug("this is a debug test");
        ConsoleTab.warning("this is a warning test");
        ConsoleTab.info("this is an info test");
        ConsoleTab.error("this is an error test");
        expect(ConsoleTab.MessageHistory.length).toEqual(4);
        ConsoleTab.clear();
        expect(ConsoleTab.MessageHistory.length).toEqual(0);
    });

    it('handles clicks on the toggle buttons', () => {
        $root.find(".consoleTabToolbar").find("button").each((i, node) => {
            if(i < 5) {
                const isActive = $(node).hasClass("active");
                ReactTestUtils.Simulate.click(node);
                expect($(node).hasClass("active")).toEqual(!isActive);
            }
        });
    });

    it('clears console when trashcan is clicked', () => {
        ConsoleTab.debug("this is a debug test");
        ConsoleTab.warning("this is a warning test");
        ConsoleTab.info("this is an info test");
        ConsoleTab.error("this is an error test");
        expect(ConsoleTab.MessageHistory.length).toEqual(4);

        ReactTestUtils.Simulate.click(
            $root.find(".consoleTabToolbar").find("button").get(5)
        );
        expect(ConsoleTab.MessageHistory.length).toEqual(0);
    });
});
