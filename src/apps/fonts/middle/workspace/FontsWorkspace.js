import React from 'react';
import './FontsWorkspace.css';

class FontsWorkspace extends React.Component {
    render() {
        return (
            <div id="paneWorkspace">
                <div>
                    <div>
                        <img src={process.env.PUBLIC_URL + "/iconSpriteFonts@2x.png"} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default FontsWorkspace;
