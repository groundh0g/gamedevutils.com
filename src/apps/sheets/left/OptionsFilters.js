import React from 'react';
import { OptionLabel, OptionTextbox, OptionDropdown } from '../../../widgets/Widgets';
import LeftPane from './LeftPane';

class OptionsFilters extends React.Component {

    render() {
        return (
            <div id="paneLeftFilters">
                <OptionLabel group text="Filters" />

                <OptionLabel text="Clean Alpha" />
                <OptionDropdown id="ddlProjectFilterCleanAlpha" fullWidth onChange={LeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Color Mask" />
                <OptionDropdown id="ddlProjectFilterColorMask" fullWidth onChange={LeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Alias Glyphs" />
                <OptionDropdown id="ddlProjectFilterAliasGlyphs" fullWidth onChange={LeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Debug Mode" />
                <OptionDropdown id="ddlProjectFilterDebugMode" fullWidth onChange={LeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Trim Mode" />
                <OptionDropdown id="ddlProjectFilterTrimMode" fullWidth onChange={LeftPane.handleChange}>
                    <li default>None</li>
                    <li>Trim</li>
                </OptionDropdown>

                <OptionLabel text="Trim Threshold" />
                <OptionTextbox id="txtProjectFilterTrimThreshold" defaultValue="1" placeholder="Trim Threshold" icon="resize-vertical" onChange={LeftPane.handleChange} />
            </div>
        );
    }
}

export default OptionsFilters;