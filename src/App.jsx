import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pomoTimer, setPomoTimer] = useState(1200);
  const [pause, setPause] = useState(true);
  const [timerMode, setTimerMode] = useState(0); // 0 = pomodoro, 1 = short break, 2 = long break

  const decrementTimer = () => {
    setPomoTimer(pomoTimer-1);
  }

  const handleTimerChange = (mode) => {
      
    if (mode == 0 && timerMode !== 0){
      setPomoTimer(1200); //1200
      setTimerMode(0);
      setPause(true);
    } else if (mode == 1 && timerMode !== 1){
      setPomoTimer(300); // 300
      setTimerMode(1);
      setPause(true);
    } else if (mode == 2 && timerMode !== 2){
      setPomoTimer(600); // 600
      setTimerMode(2);
      setPause(true);
    }
  }

  useEffect(()=>{
    if(pause){return;}
    const timerActive = setInterval(decrementTimer, 1000);
    return () => clearInterval(timerActive);
  },[decrementTimer])

  return (
    <div className="App">
      <div className="App-Header">
        <h1 className="App-Header-Title">pomodoro</h1>
        <ul className="App-Header-Modes">
          <li onClick={()=>handleTimerChange(0)}>Pomodoro</li>
          <li onClick={()=>handleTimerChange(1)}>Short Break</li>
          <li onClick={()=>handleTimerChange(2)}>Long Break</li>
        </ul>
      </div>
      <div className="App-Body">
        <div className="App-Timer">
          {(Math.floor(pomoTimer/60)).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})+":"+(pomoTimer%60).toLocaleString('en-US', {minimumIntegerDigits: 2,useGrouping: false})}
        </div>
        <button onClick={()=>{setPause(!pause)}} className="App-Timer-Pause">Pause</button>
      </div>
    </div>
  )
}

export default App
