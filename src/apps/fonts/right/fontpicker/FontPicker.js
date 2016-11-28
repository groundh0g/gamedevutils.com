import React from 'react';
import MyModal from '../../../../widgets/MyModal';
import FontPickerLeftPane from './FontPickerLeftPane';
import FontPickerRightPane from './FontPickerRightPane';
import './FontPicker.css';

class FontPicker extends React.Component {

    render() {
        let body = (
            <div style={{maxHeight:'100%'}}>
                <div className="divPopupSidebarLeft" id="divPopupSidebarLeft">
                    <FontPickerLeftPane />
                </div>
                <div id="divPopupFontList" style={{position:'absolute', top:0, left:'200px', right:0, bottom:0, overflow:'scroll'}}>
                    <FontPickerRightPane />
                </div>
            </div>
        );

        return (
            <div>
                <MyModal id={this.constructor.name} big tall title="Font Picker" body={body} />
            </div>
        );
    }

    static Show() { MyModal.Show("FontPicker"); }
    static Close() { MyModal.Close("FontPicker"); }
}

export default FontPicker;