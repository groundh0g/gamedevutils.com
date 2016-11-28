import React from 'react';
import WorkspaceToolbar from './WorkspaceToolbar';
import Workspace from './Workspace';

class MiddlePane extends React.Component {

    render() {
        return (
            <div>
                <WorkspaceToolbar />
                <Workspace />
            </div>
        );
    }
}

export default MiddlePane;