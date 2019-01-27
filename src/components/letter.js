import React, { Component } from 'react';
class Letter extends Component {
    updateLetter=()=>{
        this.props.updateLetter(this.props.letter)
    }
    render() {
        return <span className={this.props.className} onClick={this.updateLetter}>{this.props.letter}</span>
    }
}
export default Letter