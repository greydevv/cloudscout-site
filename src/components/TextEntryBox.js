import React from 'react';
import './TextEntryBox.css';

class TextEntryBox extends React.Component {
    constructor(props) {
        super(props);
        this.hintText = props.hint;
        this.isSecret = props.secret
    }

    render() {
        return (
            <div className='text-entry-box'>
                <span>{ this.hintText }</span>
                <input type={ this.isSecret ? 'password' : 'text' }/>
            </div>
        );
    }
}

export default TextEntryBox;
