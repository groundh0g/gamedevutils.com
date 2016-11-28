import React from 'react';
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../widgets/Widgets';
import LeftPane from './LeftPane';

class OptionsOutput extends React.Component {

    render() {
        return (
            <div id="paneLeftOutput">
                <OptionLabel group text="Output" />

                <OptionLabel text="Project Name" />
                <OptionTextbox id="txtProjectName" defaultValue="Untitled" placeholder="Project Name" onChange={LeftPane.handleChange} />

                <OptionLabel text="Image Format" />
                <OptionDropdown id="ddlProjectImageFormat" fullWidth onChange={LeftPane.handleChange} tooltip="<span>Hello!</span>">
                    <li>GIF</li>
                    <li>JPG</li>
                    <li default>PNG</li>
                </OptionDropdown>

                <OptionLabel text="Data Format" />
                <OptionDropdown id="ddlProjectDataFormat" fullWidth onChange={LeftPane.handleChange}>
                    <li>CSS</li>
                    <li>JSON</li>
                    <li default>XML</li>
                </OptionDropdown>

                <OptionLabel text="Zip Project" />
                <OptionDropdown id="ddlProjectCompressProject" fullWidth onChange={LeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}

export default OptionsOutput;