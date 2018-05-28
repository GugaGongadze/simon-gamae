import React, { Component } from 'react';
import './index.css';
import redSound from '../Sounds/simonSound1.mp3';
import blueSound from '../Sounds/simonSound2.mp3';
import yellowSound from '../Sounds/simonSound3.mp3';
import greenSound from '../Sounds/simonSound4.mp3';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameOn: false,
      strictModeEnabled: false,
      gameStarted: false,
      count: null,
      level: 0,
      currentSteps: []
    };

    this.redButton = React.createRef();
    this.blueButton = React.createRef();
    this.yellowButton = React.createRef();
    this.greenButton = React.createRef();
    this.redButtonWrapper = React.createRef();
    this.blueButtonWrapper = React.createRef();
    this.yellowButtonWrapper = React.createRef();
    this.greenButtonWrapper = React.createRef();

    this.onSwitchChange = this.onSwitchChange.bind(this);
    this.onGameStart = this.onGameStart.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this); // Redundant but I like to keep all event handlers explicitly declared
  }

  onSwitchChange = () => {
    if (this.state.gameOn === false) {
      this.setState({
        gameOn: true
      });
    } else {
      this.setState({
        gameOn: false,
        strictModeEnabled: false,
        gameStarted: false,
        count: null,
        currentSteps: []
      });
    }
  };

  onGameStart = () => {
    if (this.state.gameOn) {
      if (this.state.gameStarted) {
        this.setState({
          count: 0,
          currentSteps: []
        });
      } else {
        this.setState({
          gameStarted: true,
          count: 0
        });
      }
      this.playSound(chooseRandomColor());
    }
  };

  playSound = color => {
    if (color === 'red') {
      this.redButtonWrapper.current.style.opacity = "0.5";
      this.redButton.current.play();
        setTimeout(() => {
          this.redButtonWrapper.current.style.opacity = "1";
        }, this.redButton.current.duration * 1000);
    } else if (color === 'blue') {
      this.blueButtonWrapper.current.style.opacity = "0.5";
      this.blueButton.current.play();
        setTimeout(() => {
          this.blueButtonWrapper.current.style.opacity = "1";
        }, this.blueButton.current.duration * 1000);
      this.blueButton.current.play();
    } else if (color === 'yellow') {
      this.yellowButtonWrapper.current.style.opacity = "0.5";
      this.yellowButton.current.play();
        setTimeout(() => {
          this.yellowButtonWrapper.current.style.opacity = "1";
        }, this.yellowButton.current.duration * 1000);
      this.yellowButton.current.play();
    } else if (color === 'green') {
      this.greenButtonWrapper.current.style.opacity = "0.5";
      this.greenButton.current.play();
        setTimeout(() => {
          this.greenButtonWrapper.current.style.opacity = "1";
        }, this.greenButton.current.duration * 1000);
      this.greenButton.current.play();
    }

    this.setState(prevState => ({
      count: prevState.count + 1,
      currentSteps: [...prevState.currentSteps, color]
    }));
  };

  continueGame = () => {
    this.playSound(chooseRandomColor())
  }

  onButtonClick = userGuess => {
    const currentMove = this.state.currentSteps[
      this.state.currentSteps.length - 1
    ];
    if (userGuess !== currentMove) {
      this.setState({
        count: null,
        level: 0,
        currentSteps: []
      });
    } else {
      this.setState(prevState => ({
        count: prevState.count + 1,
        level: prevState.level + 1,
      }));

      this.continueGame();
    }
  };

  render() {
    return (
      <div className="game-board">
        <div className="top-buttons">
          <div
            className="button green-button"
            onClick={() => this.onButtonClick('green')}
            ref={this.greenButtonWrapper}
          >
            <audio ref={this.greenButton} src={greenSound} />
          </div>
          <div
            className="button red-button"
            onClick={() => this.onButtonClick('red')}
            ref={this.redButtonWrapper}
          >
            <audio ref={this.redButton} src={redSound} />
          </div>
        </div>
        <div className="bottom-buttons">
          <div
            className="button yellow-button"
            onClick={() => this.onButtonClick('yellow')}
            ref={this.yellowButtonWrapper}
          >
            <audio ref={this.yellowButton} src={yellowSound} />
          </div>
          <div
            className="button blue-button"
            onClick={() => this.onButtonClick('blue')}
            ref={this.blueButtonWrapper}
          >
            <audio ref={this.blueButton} src={blueSound} />
          </div>
        </div>

        <div className="dashboard">
          <div className="white-bg">
            <h1 className="game-name mb-0">Simon</h1>
            <div className="controls">
              <div className="display">
                <div className="screen-frame">
                  <div className="screen">
                    <span className="count-output">
                      {this.state.gameOn === true
                        ? this.state.gameStarted
                          ? this.state.count
                          : '--'
                        : this.state.gameOn}
                    </span>
                  </div>
                </div>
                <p className="display-text text-uppercase mt-5">Count</p>
              </div>
              <div className="start-button" onClick={this.onGameStart}>
                <div className="start-button-outline" />
                <p className="display-text text-uppercase mt-5">Start</p>
              </div>
              <div className="strict-mode-button">
                <div className="strict-mode-indicator" />
                <div className="strict-mode-button-outline" />
                <p className="display-text text-uppercase mt-5">Strict</p>
              </div>
            </div>
            <div className="on-off-switch">
              <p className="display-text text-uppercase">Off</p>

              <label className="switch ml-5">
                <input type="checkbox" onChange={this.onSwitchChange} />
                <span className="slider round" />
              </label>

              <p className="display-text ml-5 text-uppercase">On</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function chooseRandomColor() {
  const randomNumber = Math.round(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    return 'red';
  } else if (randomNumber === 2) {
    return 'blue';
  } else if (randomNumber === 3) {
    return 'yellow';
  } else {
    return 'green';
  }
}

export default Game;
