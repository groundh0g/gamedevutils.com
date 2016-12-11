/*
 Copyright (c) 2016 Joseph B. Hall [@groundh0g]

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import $ from 'jquery';
import { AboutTheDevelopers, AboutTheLibraries, AboutTheLicense } from './about/Modals';
import MyModal from './widgets/MyModal';
import MainNavbar from './MainNavbar';

describe('Main Navbar', () => {

    let $root;

    beforeEach(() => {
        $root = $(document.createElement('div')).attr("id", "wrapper");
        ReactDOM.render(<MainNavbar />, $root.get(0));
    });

    it('shows AboutTheDevelopers dialog when selected from menu', () => {
        let popup = AboutTheDevelopers;
        let oldFunction = popup.Show;
        popup.Show = jest.fn(() => { oldFunction(); });

        // let menuNode = $root.find("#menuAbout").get(0);
        // ReactTestUtils.Simulate.click(menuNode);
        // let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The Developer')").get(0);
        let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The Developer')").get(0);
        ReactTestUtils.Simulate.click(itemNode);
        popup.Close();

        expect(popup.Show).toBeCalled();
        popup.Show = oldFunction;
    });

    it('shows AboutTheLibraries dialog when selected from menu', () => {
        let popup = AboutTheLibraries;
        let oldFunction = popup.Show;
        popup.Show = jest.fn(() => { oldFunction(); });

        // let menuNode = $root.find("#menuAbout").get(0);
        // ReactTestUtils.Simulate.click(menuNode);
        // let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The Developer')").get(0);
        let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The OSS Libraries')").get(0);
        ReactTestUtils.Simulate.click(itemNode);
        popup.Close();

        expect(popup.Show).toBeCalled();
        popup.Show = oldFunction;
    });

    it('shows AboutTheLicense dialog when selected from menu', () => {
        let popup = AboutTheLicense;
        let oldFunction = popup.Show;
        popup.Show = jest.fn(() => { oldFunction(); });

        // let menuNode = $root.find("#menuAbout").get(0);
        // ReactTestUtils.Simulate.click(menuNode);
        let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The License (MIT)')").get(0);
        ReactTestUtils.Simulate.click(itemNode);
        popup.Close();

        expect(popup.Show).toBeCalled();
        popup.Show = oldFunction;
    });

    it('dismisses dialog when footer button is clicked', (done) => {
        let oldShow = AboutTheLibraries.Show;
        let oldClose = MyModal.Close;
        let mockShow = jest.fn(() => { MyModal.Show("AboutTheLibraries"); });
        let mockClose = jest.fn(() => { oldClose("AboutTheLibraries"); });
        AboutTheLibraries.Show = mockShow;
        MyModal.Close = mockClose;

        let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The OSS Libraries')").get(0);
        ReactTestUtils.Simulate.click(itemNode);
        expect(mockShow).toBeCalled();

        return new Promise((resolve) => {
            setTimeout(() => { resolve(); }, 0);
        }).then(() => {
            let dismissButton = $(document).find("#AboutTheLibraries").find("div.modal-footer").find("button").get(0);
            ReactTestUtils.Simulate.click(dismissButton);
            // console.log(" before expect(mockClose).toBeCalled() ");
            try {
                expect(mockClose).toBeCalled();
            } catch(e) { console.log(e); return; }
            // console.log(" after expect(mockClose).toBeCalled() ");
            AboutTheLibraries.Show = oldShow;
            MyModal.Close = oldClose;
            done();
        });

    });

    it('dismisses dialog when header "X" button is clicked', (done) => {
        let oldShow = AboutTheLibraries.Show;
        let oldClose = MyModal.Close;
        let mockShow = jest.fn(() => { MyModal.Show("AboutTheLibraries"); });
        let mockClose = jest.fn(() => { oldClose("AboutTheLibraries"); });
        AboutTheLibraries.Show = mockShow;
        MyModal.Close = mockClose;

        let itemNode = $root.find("#menuAbout").first().parent().find("li a:contains('The OSS Libraries')").get(0);
        ReactTestUtils.Simulate.click(itemNode);
        expect(mockShow).toBeCalled();

        return new Promise((resolve) => {
            setTimeout(() => { resolve(); }, 0);
        }).then(() => {
            let dismissButton = $(document).find("#AboutTheLibraries").find("div.modal-header").find("button").get(0);
            ReactTestUtils.Simulate.click(dismissButton);
            // console.log(" before expect(mockClose).toBeCalled() ");
            try {
                expect(mockClose).toBeCalled();
            } catch(e) { console.log(e); return; }
            // console.log(" after expect(mockClose).toBeCalled() ");
            AboutTheLibraries.Show = oldShow;
            MyModal.Close = oldClose;
            done();
        });

    });
});
