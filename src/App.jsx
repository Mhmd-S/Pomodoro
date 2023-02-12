import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pomoTimer, setPomoTimer] = useState(1200);
  const [pause, setPause] = useState(true);
  const [timerMode, setTimerMode] = useState(1200); // 0 = pomodoro, 1 = short break, 2 = long break

  let leftTime = 0;

  const decrementTimer = () => {
    setPomoTimer(pomoTimer-1);
  }

  const handleTimerChange = (mode) => {
      
    if (mode == 0 && timerMode !== 0){
      setPomoTimer(1200); //1200
      setTimerMode(1200);
      setPause(true);
    } else if (mode == 1 && timerMode !== 1){
      setPomoTimer(300); // 300
      setTimerMode(300);
      setPause(true);
    } else if (mode == 2 && timerMode !== 2){
      setPomoTimer(600); // 600
      setTimerMode(600);
      setPause(true);
    }
  }

  useEffect(()=>{
    if(pause){return;}
    const timerActive = setInterval(decrementTimer, 1000);
    leftTime = ((300 - pomoTimer) / 283) + " 283";
    return () => clearInterval(timerActive);
  },[decrementTimer])

  return (
    <div className="App">
      <div className="App-Header">
        <h1 className="App-Header-Title">pomodoro</h1>
        <ul className="App-Header-Modes">
          <li className={timerMode == 0 ? "Mode-Active" : undefined} onClick={()=>handleTimerChange(0)}>Pomodoro</li>
          <li className={timerMode == 1 ? "Mode-Active" : undefined} onClick={()=>handleTimerChange(1)}>Short Break</li>
          <li className={timerMode == 2 ? "Mode-Active" : undefined} onClick={()=>handleTimerChange(2)}>Long Break</li>
        </ul>
      </div>
      <div className="App-Body">
        <div className="App-Body-Timer">
          <div className="App-Body-Timer-Ring">
            <svg className="App-Body-Timer-Ring-SVG" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g className="App-Body-Timer-Ring-Circle">
                <circle className="App-Body-Timer-Ring-PathElapsed" cx="50" cy="50" r="45" />
                <path
                  id="base-timer-path-remaining"
                  strokeDasharray={(((timerMode-pomoTimer) / timerMode) * 283).toFixed(0) + " 283"}
                  className="App-Body-Timer-Ring-Remaining"
                  d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0
                  "
                ></path>
              </g>
            </svg>     
          </div>
          <div className="App-Body-Timer-Display">
            {(Math.floor(pomoTimer/60)).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})+":"+(pomoTimer%60).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})}
          </div>
          <button onClick={()=>{setPause(!pause)}} className="App-Timer-Pause">Pause</button>
        </div>
      </div>
    </div>
  )
}

export default App
