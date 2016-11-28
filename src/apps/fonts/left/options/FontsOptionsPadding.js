import React from 'react';
import { OptionLabel, OptionTextbox } from '../../../../widgets/Widgets';
import { FontsLeftPane } from '../FontsLeftPane';

export class FontsOptionsPadding extends React.Component {

    render() {
        return (
            <div id="paneLeftPadding">
                <OptionLabel group text="Padding" />

                <OptionLabel text="Border Padding" />
                <OptionTextbox id="txtProjectBorderPadding" defaultValue="2" placeholder="Border Padding" icon="resize-vertical" onChange={FontsLeftPane.handleChange} />

                <OptionLabel text="Shape Padding" />
                <OptionTextbox id="txtProjectShapePadding" defaultValue="2" placeholder="Shape Padding" icon="resize-vertical" onChange={FontsLeftPane.handleChange} />

                <OptionLabel text="Inner Padding" />
                <OptionTextbox id="txtProjectInnerPadding" defaultValue="2" placeholder="Inner Padding" icon="resize-vertical" onChange={FontsLeftPane.handleChange} />
            </div>
        );
    }
}