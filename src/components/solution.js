import React, { Component } from 'react';
import Letter from './letter';
class Solution extends Component {
    updateLetter = () => null
    startBoard() {
        let arr = []
        for (let i = 0; i < 4; i++) {
            arr.push(<span key={i}>_</span>)
        }
        return arr
    }
    render() {
        return (
            <div>
                {this.props.solution.word
                    .map((letter, i) => {
                        let dis = this.props.letterStatus[letter] ? letter : "_"
                        return <Letter className={`null`} key={i + letter} letter={dis} />
                    })}
                <div>{this.props.solution.hint}</div>
            </div>
        )
    }
}
export default Solution