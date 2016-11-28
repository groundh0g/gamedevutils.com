import React from 'react';
import { OptionLabel, OptionDropdown } from '../../../widgets/Widgets';
import LeftPane from './LeftPane';

class OptionsAlgorithm extends React.Component {

    render() {
        return (
            <div id="paneLeftAlgorithm">
                <OptionLabel group text="Algorithm" />

                <OptionLabel text="Sprite Packer" />
                <OptionDropdown id="ddlProjectSpritePacker" fullWidth onChange={LeftPane.handleChange}>
                    <li>Basic</li>
                    <li default>Encoded</li>
                    <li>JoeRects</li>
                </OptionDropdown>

                <OptionLabel text="Sort By" />
                <OptionDropdown id="ddlProjectSortBy" fullWidth onChange={LeftPane.handleChange}>
                    <li>Area</li>
                    <li>Area Descending</li>
                    <li default>Glyph</li>
                    <li>Glyph Descending</li>
                    <li>Height</li>
                    <li>Height Descending</li>
                    <li>Width</li>
                    <li>Width Descending</li>
                </OptionDropdown>

                <OptionLabel text="Allow Rotate" />
                <OptionDropdown id="ddlProjectAllowRotate" fullWidth onChange={LeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}

export default OptionsAlgorithm;