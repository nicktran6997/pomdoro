import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSetterFunc: (min) => {
        return {'minutes' : min,
                'seconds' : 0,
                'ms': 0}
      },
      time:  {'minutes' : 25,'seconds' : 0,'ms': 0},
    };
  }
  GetStartTime() {
    return this.state.timeSetterFunc(25);
  }
  GetShortBreak() {
    return this.state.timeSetterFunc(5);
  }
  GetLongBreak() {
    return this.state.timeSetterFunc(10);
  }

  stopTimer() {
    clearTimeout(this.timeout);
  }
  setTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.tickTime.bind(this), 10);
  }

  reset() {
    this.setState({time: this.GetStartTime()});
  }
  resetShort() {
    this.setState({time: this.GetShortBreak()});
  }
  resetLong() {
    this.setState({time: this.GetLongBreak()});
  }
  tickTime(){
    let {minutes, seconds, ms} = this.state.time;
    if (minutes === 0 && seconds === 0 ) return;
    if (ms === 0) {
      ms = 59;
      if (seconds === 0) {
        seconds = 59;
        minutes--;
      } else {
        seconds--;
      }
    } else {
      ms--;
    }
    this.setState({
      time: {minutes, seconds, ms}
    }, this.setTimer)
}

  render() {
    const renderTime = (time) => time < 10 ? '0' + time.toString() : time.toString();
    const clockStyle ={letterSpacing: '0.05em', 
                        fontSize: '160px', 
                        padding: '5px 0',
                        color: "#daf6ff",
                        textShadow: "0 0 20px rgba(10, 175, 230, 1)",
                        };
    const buttonStyle = {margin: '10px'};
    return (
      <div className="App">
        <header className="App-header">
          <h2 style={{fontSize:"80px"}}>My Pomdoro Clock</h2>
          <span>
            <button onClick={this.reset.bind(this)} style={buttonStyle}className="btn btn-primary">Pomdoro</button>
            <button onClick={this.resetShort.bind(this)}style={buttonStyle}className="btn btn-success">Short Break</button>
            <button onClick={this.resetLong.bind(this)}style={buttonStyle}className='btn btn-warning'>Long Break</button>
          </span>

          <h3 style={clockStyle}>{renderTime(this.state.time.minutes)}:{renderTime(this.state.time.seconds)}</h3>
          <span>
            <button onClick = {this.setTimer.bind(this)} style={buttonStyle}className="btn btn-primary">Start</button>
            <button onClick = {this.stopTimer.bind(this)}style={buttonStyle}className="btn btn-danger">Stop</button>
            <button onClick =  {this.reset.bind(this)}style={buttonStyle}className="btn btn-secondary">Reset</button>
          </span>

          <p>
            Beginning of the Pomdoro.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          </a>
        </header>
      </div>
    );
  
  }
}

export default App;

