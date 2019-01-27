import React, { Component } from 'react';
import './App.css';
import Score from './components/score';
import Letters from './components/letters';
import Solution from './components/solution';
import words from './components/words';
import axios from 'axios';

// import { request } from 'https';
// import {parser} from 'https'
let word = words.toUpperCase().split(`\n`)

class App extends Component {
  constructor() {
    super()
    this.state = {
      solution: {
        word: word[Math.floor(Math.random() * 1200)].split(``),
        hint: `wah`,
      },
      score: 100,
      letterStatus: this.generateLetterStatuses()
    }
  }
  // letterGen(){
  //   let alfabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
  //   alfabet.split(``).forEach(letter=>this.state.letterStatus[letter].setState(false)=false)
  // }
  generateLetterStatuses() {
    let letterStatus = {}
    for (let i = 65; i < 91; i++) {
      letterStatus[String.fromCharCode(i)] = false
    }
    return letterStatus
  }
  updateLetter = async (letter) => {
    let letters = { ...this.state.letterStatus }
    letters[letter] = true
    await this.setState({ letterStatus: letters })
    if (this.state.solution.word.find(l => letter === l)) {
      this.setState({ score: this.state.score + 10 })
    } else {
      this.setState({ score: this.state.score - 10 })
    }
    if (this.state.solution.word.filter(l => this.state.letterStatus[l]).length === this.state.solution.word.length) {
      this.winGame()
    } else if (this.state.score === 0) {
      this.endGame()
    }
  }
  winGame() {
    alert(`You won`)
  }
  endGame() {
    alert(`you lost`)
  }
  componentDidMount = async () => {
    await this.setState({ letterStatus: this.generateLetterStatuses() })
    let solution = { ...this.state.solution }
    console.log(word)
    solution.word = word[Math.floor(Math.random() * 1200)].split(``)
    await axios.get(`https://owlbot.info/api/v2/dictionary/${solution.word.join(``).toLowerCase()}?format=json`)
      .then(res => res.json())
      .then((res) => {
        console.log(res)
        solution.hint = res[0].definition
      })
    await this.setState({ 
      solution: solution,
      score: 100 
     })
  }
  // ran
  render() {
    return (
      <div>
        <Score score={this.state.score} />
        <Solution letterStatus={this.state.letterStatus} solution={this.state.solution} />
        <Letters updateLetter={this.updateLetter} letterStatus={this.state.letterStatus} />
        <button onClick={this.newGame}>New Game</button>
      </div>
    )
  }
}

export default App;
