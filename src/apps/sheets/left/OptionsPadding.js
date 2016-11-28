import React from 'react';
import { OptionLabel, OptionTextbox } from '../../../widgets/Widgets';
import LeftPane from './LeftPane';

class OptionsPadding extends React.Component {

    render() {
        return (
            <div id="paneLeftPadding">
                <OptionLabel group text="Padding" />

                <OptionLabel text="Border Padding" />
                <OptionTextbox id="txtProjectBorderPadding" defaultValue="2" placeholder="Border Padding" icon="resize-vertical" onChange={LeftPane.handleChange} />

                <OptionLabel text="Shape Padding" />
                <OptionTextbox id="txtProjectShapePadding" defaultValue="2" placeholder="Shape Padding" icon="resize-vertical" onChange={LeftPane.handleChange} />

                <OptionLabel text="Inner Padding" />
                <OptionTextbox id="txtProjectInnerPadding" defaultValue="2" placeholder="Inner Padding" icon="resize-vertical" onChange={LeftPane.handleChange} />
            </div>
        );
    }
}

export default OptionsPadding;