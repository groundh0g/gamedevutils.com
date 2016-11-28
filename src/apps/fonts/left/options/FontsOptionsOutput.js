import React from 'react';
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../../widgets/Widgets';
import { FontsLeftPane } from '../FontsLeftPane';

export class FontsOptionsOutput extends React.Component {

    render() {
        return (
            <div id="paneLeftOutput">
                <OptionLabel group text="Output" />

                <OptionLabel text="Project Name" />
                <OptionTextbox id="txtProjectName" defaultValue="Untitled" placeholder="Project Name" onChange={FontsLeftPane.handleChange} />

                <OptionLabel text="Image Format" />
                <OptionDropdown id="ddlProjectImageFormat" fullWidth onChange={FontsLeftPane.handleChange} tooltip="<span>Hello!</span>">
                    <li>GIF</li>
                    <li>JPG</li>
                    <li default>PNG</li>
                </OptionDropdown>

                <OptionLabel text="Data Format" />
                <OptionDropdown id="ddlProjectDataFormat" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>CSS</li>
                    <li>JSON</li>
                    <li default>XML</li>
                </OptionDropdown>

                <OptionLabel text="Zip Project" />
                <OptionDropdown id="ddlProjectCompressProject" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}