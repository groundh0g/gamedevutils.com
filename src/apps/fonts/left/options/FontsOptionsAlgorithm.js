import React from 'react';
import { OptionLabel, OptionDropdown } from '../../../../widgets/Widgets';
import { FontsLeftPane } from '../FontsLeftPane';

export class FontsOptionsAlgorithm extends React.Component {

    render() {
        return (
            <div id="paneLeftAlgorithm">
                <OptionLabel group text="Algorithm" />

                <OptionLabel text="Sprite Packer" />
                <OptionDropdown id="ddlProjectSpritePacker" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Basic</li>
                    <li default>Encoded</li>
                    <li>JoeRects</li>
                </OptionDropdown>

                <OptionLabel text="Sort By" />
                <OptionDropdown id="ddlProjectSortBy" fullWidth onChange={FontsLeftPane.handleChange}>
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
                <OptionDropdown id="ddlProjectAllowRotate" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}