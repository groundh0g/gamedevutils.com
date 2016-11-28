import React from 'react';
import { ButtonGroup, ButtonToolbar, Button, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';
import ButtonToggle from './ButtonToggle';
import './ConsoleTab.css';

class ConsoleTab extends React.Component {

    static $instance;
    static $statusLabel;
    static MessageHistory;

    constructor(props) {
        super(props);
        this.state = {
            showError: true,
            showWarning: true,
            showInfo: true,
            showSuccess: true,
            showDebug: false,
            items: []
        };
        ConsoleTab.$instance = this;
    }

    static TYPE = {
        DEBUG:   "debug",
        INFO:    "info",
        WARNING: "warning",
        ERROR:   "error",
        SUCCESS: "success"
    };

    static TYPE_STYLE = {
        debug: ConsoleTab.TYPE.INFO,
        warning: ConsoleTab.TYPE.WARNING,
        info: "",
        error: "danger",
        success: ConsoleTab.TYPE.SUCCESS
    };

    showMessageForType(type) {
        switch(type) {
            case ConsoleTab.TYPE.ERROR:
                return this.state.showError;
            case ConsoleTab.TYPE.WARNING:
                return this.state.showWarning;
            case ConsoleTab.TYPE.INFO:
                return this.state.showInfo;
            case ConsoleTab.TYPE.DEBUG:
                return this.state.showDebug;
            case ConsoleTab.TYPE.SUCCESS:
                return this.state.showSuccess;
            /* istanbul ignore next */
            default:
                return true;
        }
    }

    static blurButton(e) {
        e.target.blur();
        e.target.parentElement.blur();
    }

    toggleButton(e, flag) {
        ConsoleTab.blurButton(e);
        /* istanbul ignore else */
        if(flag) {
            let update = {};
            update[flag] = !this.state[flag];
            this.setState(update);
        }
    }

    render() {
        // Update status label (if any)
        let statusText = "Console (" + this.state.items.length + ")";
        if(ConsoleTab.$statusLabel)  { ConsoleTab.$statusLabel.text(statusText); }

        ConsoleTab.MessageHistory = this.state.items;

        return (
            <div>
                <div className="consoleTabToolbar">
                    <ButtonToolbar bsSize="small">
                        <ButtonGroup>
                            <ButtonToggle afterClick={(e) => {this.toggleButton(e, "showError");}}   glyph="remove-sign" isToggled={this.state.showError}   title="Show errors." />
                            <ButtonToggle afterClick={(e) => {this.toggleButton(e, "showWarning");}} glyph="alert"       isToggled={this.state.showWarning} title="Show warnings." />
                            <ButtonToggle afterClick={(e) => {this.toggleButton(e, "showInfo");}}    glyph="info-sign"   isToggled={this.state.showInfo}    title="Show informational messages." />
                            <ButtonToggle afterClick={(e) => {this.toggleButton(e, "showSuccess");}} glyph="ok-sign"     isToggled={this.state.showSuccess} title="Show success messages." />
                            <ButtonToggle afterClick={(e) => {this.toggleButton(e, "showDebug");}}   glyph="flag"        isToggled={this.state.showDebug}   title="Show debug messages." />
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button onClick={(e) => {ConsoleTab.clear(); ConsoleTab.blurButton(e);}} title="Clear console messages." ><Glyphicon glyph="trash" /></Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>
                <div className="consoleTabContent">
                    <ButtonGroup bsSize="small">
                        <Button onClick={/* istanbul ignore next */(e) => ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.DEBUG,   "This is a debug message.")}>Debug</Button>
                        <Button onClick={/* istanbul ignore next */(e) => ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.WARNING, "This is a warning message.")}>Warn</Button>
                        <Button onClick={/* istanbul ignore next */(e) => ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.INFO,    "This is an info message.")}>Info</Button>
                        <Button onClick={/* istanbul ignore next */(e) => ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.ERROR,   "This is an error message.", new Error("Some error occurred."))}>Error</Button>
                        <Button onClick={/* istanbul ignore next */(e) => ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.SUCCESS, "This is a success message.")}>Success</Button>
                    </ButtonGroup>
                    <ListGroup>
                        {this.state.items.map((item) => {
                                if (this.showMessageForType(item.type)) {
                                    return item.style ? (
                                        <ListGroupItem header={item.type.toUpperCase()} key={item.id} bsStyle={item.style}>{item.body}</ListGroupItem>
                                    ) : (
                                        <ListGroupItem header={item.type.toUpperCase()} key={item.id}>{item.body}</ListGroupItem>
                                    )
                                } else {
                                    return "";
                                }
                            }
                        )}
                    </ListGroup>
                </div>
            </div>
        );
    }

    static addConsoleEntry(type, msg, err) {
        let items = ConsoleTab.$instance.state.items;
        items.push({
            id: items.length + 1,
            type: type,
            body: msg,
            error: err,
            style: ConsoleTab.TYPE_STYLE[type] || ConsoleTab.TYPE_STYLE["info"]
        });
        ConsoleTab.$instance.setState({items: items});
    }

    static clear() {
        ConsoleTab.$instance.setState({items: []});
    }

    static error(msg, err)   { ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.ERROR, msg, err); }
    static warning(msg, err) { ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.WARNING, msg, err); }
    static info(msg, err)    { ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.INFO, msg, err); }
    static debug(msg, err)   { ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.DEBUG, msg, err); }
    static success(msg, err) { ConsoleTab.addConsoleEntry(ConsoleTab.TYPE.SUCCESS, msg, err); }
}

export default ConsoleTab;
