import React, { Component } from 'react';
import Letter from './letter';
class Letters extends Component {
    render() {
        return (
            <div className="letters">
                {Object
                    .keys(this.props.letterStatus)
                    .map(letter => <Letter className={this.props.letterStatus[letter]?"selected":"blank"}updateLetter={this.props.updateLetter} letterStatus={this.props.letterStatus} key={letter} letter={letter} />)}
            </div>
        )
    }
}
export default Letters