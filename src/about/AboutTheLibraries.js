import React from 'react';
import MyModal from '../widgets/MyModal';

class AboutTheLibraries extends React.Component {

    render() {
        let body = (
            <div>
                <p>This app uses the following opensource and public domain projects:</p>
                <ul style={{"marginLeft":"25px"}}>
                    <li><a href="https://github.com/mathiasbynens/base64" target="_blank">base64</a> - a base64 encoder / decoder, compatible with atob() and btoa()</li>
                    <li><a href="https://github.com/eligrey/Blob.js" target="_blank">Blob</a> - W3C Blob interface for browsers that do not support it</li>
                    <li><a href="http://getbootstrap.com/2.3.2/index.html" target="_blank">Bootstrap</a> - a framework for faster and easier web development</li>
                    <li><a href="https://code.google.com/p/crypto-js/#HMAC" target="_blank">crypto-js</a> - an implementation of SHA256 and MD5 hashing</li>
                    <li><a href="https://github.com/eligrey/FileSaver.js" target="_blank">FileSaver</a> - W3C FileSaver interface for browsers that do not support it</li>
                    <li><a href="https://pages.github.com/" target="_blank">GitHub Pages</a> - websites for you and your projects</li>
                    <li><a href="http://jekyllbootstrap.com" target="_blank">Jekyll Bootstrap</a> - The definitive Jekyll blogging framework</li>
                    <li><a href="http://code.jquery.com/jquery-1.8.3.js" target="_blank">jQuery</a> - a fast, small, and feature-rich JavaScript library</li>
                    <li><a href="https://github.com/douglascrockford/JSON-js" target="_blank">json2</a> - JSON feature for browsers that do not support it</li>
                    <li><a href="https://github.com/Stuk/jszip" target="_blank">jszip</a> - create, read, and edit .zip files with Javascript</li>
                    <li><a href="https://github.com/groundh0g/FannyPack/blob/master/assets/js/app/util/libgif.js" target="_blank">libgif.js</a> - a modified version of <a href="https://github.com/buzzfeed/libgif-js" target="_blank">@buzzfeed's &amp; @shachaf's GIF parser</a></li>
                    <li><a href="https://github.com/groundh0g/FannyPack/blob/master/assets/js/app/util/libgifparser.js" target="_blank">libgifparser.js</a> - my lib, based on <a href="https://github.com/buzzfeed/libgif-js" target="_blank">@buzzfeed's SuperGIF</a></li>
                    <li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys" target="_blank">object-keys.js</a> - Object.keys for browsers that do not support it</li>
                    <li><a href="https://github.com/groundh0g/FannyPack/blob/master/assets/js/app/util/string-helpers.js" target="_blank">string-helpers.js</a> - contains, endsWith, ... for browsers without support</li>
                    <li><a href="http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136" target="_blank">UUID</a> - a JavaScript module to create GUIDs</li>
                    <li><a href="https://github.com/juj/RectangleBinPack/" target="_blank">MaxRectsBinPack.cpp</a> - my JavaScript port of C++ source by Jukka Jylänki</li>
                </ul>
            </div>
        );
        return (
            <div>
                <MyModal id={this.constructor.name} title="About the Libs" body={body} />
            </div>
        );
    }

    static Show() { MyModal.Show("AboutTheLibraries"); }
    static Close() { MyModal.Close("AboutTheLibraries"); }
}

export default AboutTheLibraries;