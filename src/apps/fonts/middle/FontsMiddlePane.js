import React from 'react';
import FontsWorkspaceToolbar from './workspace/FontsWorkspaceToolbar';
import FontsWorkspace from './workspace/FontsWorkspace';

export class FontsMiddlePane extends React.Component {

    render() {
        return (
            <div>
                <FontsWorkspaceToolbar />
                <FontsWorkspace />
            </div>
        );
    }
}

// export default FontsMiddlePane;