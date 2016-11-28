import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('App', () => {
    beforeEach(() => {
        App.Location = { hash: "", search: ""};
    });

    it('renders sheets without crashing', () => {
        App.Location.search = "?app=sheets";
        expect(() => {
            renderApp();
        }).not.toThrow();
    });

    it('renders fonts without crashing', () => {
        App.Location.search = "?app=fonts";
        expect(() => {
            renderApp();
        }).not.toThrow();
    });

    it('renders tiles without crashing', () => {
        App.Location.search = "?app=tiles";
        expect(() => {
            renderApp();
        }).not.toThrow();
    });

    it('renders animate without crashing', () => {
        App.Location.search = "?app=animate";
        expect(() => {
            renderApp();
        }).not.toThrow();
    });

    it('renders effects without crashing', () => {
        App.Location.search = "?app=effects";
        expect(() => {
            renderApp();
        }).not.toThrow();
    });

    it('renders ERROR without crashing', () => {
        App.Location.search = "?app=BOGUS";
        expect(() => {
            renderApp();
        }).not.toThrow();
    });

    let renderApp = function() {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    };

});
