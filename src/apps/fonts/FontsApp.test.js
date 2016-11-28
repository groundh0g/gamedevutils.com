import React from 'react';
import ReactDOM from 'react-dom';
import FontsApp from './FontsApp';

describe('FontsApp', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FontsApp />, div);
    });
});
