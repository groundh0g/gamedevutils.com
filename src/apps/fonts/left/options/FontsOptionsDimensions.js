import React from 'react';
import { OptionLabel, OptionDropdown } from '../../../../widgets/Widgets';
import { FontsLeftPane } from '../FontsLeftPane';

export class FontsOptionsDimensions extends React.Component {

    render() {
        return (
            <div id="paneLeftDimensions">
                <OptionLabel group text="Dimensions" />

                <OptionLabel text="Width" />
                <OptionDropdown id="ddlProjectWidth" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>16</li>
                    <li>32</li>
                    <li>64</li>
                    <li>128</li>
                    <li>256</li>
                    <li>512</li>
                    <li default>1024</li>
                    <li>2048</li>
                    <li>4096</li>
                    <li>8192</li>
                    <li>16384</li>
                </OptionDropdown>

                <OptionLabel text="Height" />
                <OptionDropdown id="ddlProjectHeight" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>16</li>
                    <li>32</li>
                    <li>64</li>
                    <li>128</li>
                    <li>256</li>
                    <li>512</li>
                    <li default>1024</li>
                    <li>2048</li>
                    <li>4096</li>
                    <li>8192</li>
                    <li>16384</li>
                </OptionDropdown>

                <OptionLabel text="Size Mode" />
                <OptionDropdown id="ddlProjectSizeMode" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Fixed Size</li>
                    <li default>Max Size</li>
                </OptionDropdown>

                <OptionLabel text="Constraint" />
                <OptionDropdown id="ddlProjectSizeConstraint" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Any Size</li>
                    <li default>Power of Two</li>
                </OptionDropdown>

                <OptionLabel text="Force Square" />
                <OptionDropdown id="ddlProjectForceSquareSize" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>

                <OptionLabel text="Include @2x" />
                <OptionDropdown id="ddlProjectIncludeAt2x" fullWidth onChange={FontsLeftPane.handleChange}>
                    <li>Yes</li>
                    <li default>No</li>
                </OptionDropdown>
            </div>
        );
    }
}