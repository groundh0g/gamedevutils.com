import React from 'react';
import MyModal from '../../../../widgets/MyModal';
import './FontPicker.css';

class FontPicker extends React.Component {

    render() {
        let body = (
            <div>Hello!</div>
        );

        return (
            <div>
                <MyModal id={this.constructor.name} title="Font Picker" body={body} />
            </div>
        );
    }

    static Show() { MyModal.Show("FontPicker"); }
    static Close() { MyModal.Close("FontPicker"); }
}

export default FontPicker;