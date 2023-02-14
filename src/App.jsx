import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [pomoTimer, setPomoTimer] = useState(1200);
  const [pause, setPause] = useState(true);
  const [timerMode, setTimerMode] = useState(1200); // 0 = pomodoro, 1 = short break, 2 = long break

  const [viewSettings, setViewSettings] = useState(false);

  const [inputsChange , setInputsChange] = useState([1200, 300, 600])

  const [mainTiming, setMainTiming] = useState(1200);
  const [sBreak, setSBreak] = useState(300);
  const [lBreak, setLBreak] = useState(600);

  const decrementTimer = () => {
    setPomoTimer(pomoTimer-1);
  }

  const handleTimerChange = (mode) => {
      
    if (mode == 0 && timerMode !== 0){
      setPomoTimer(mainTiming); //1200
      setTimerMode(mainTiming);
      setPause(true);
    } else if (mode == 1 && timerMode !== 1){
      setPomoTimer(sBreak); // 300
      setTimerMode(sBreak);
      setPause(true);
    } else if (mode == 2 && timerMode !== 2){
      setPomoTimer(lBreak); // 600
      setTimerMode(lBreak);
      setPause(true);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setMainTiming(inputsChange[0])
    setPomoTimer(inputsChange[0]); //1200
    setTimerMode(inputsChange[0]);
    setSBreak(inputsChange[1])
    setLBreak(inputsChange[2])
    setViewSettings(false);
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
          <li className={timerMode == mainTiming ? "Mode-Active" : undefined} onClick={()=>handleTimerChange(0)}>Pomodoro</li>
          <li className={timerMode == sBreak ? "Mode-Active" : undefined} onClick={()=>handleTimerChange(1)}>Short Break</li>
          <li className={timerMode == lBreak ? "Mode-Active" : undefined} onClick={()=>handleTimerChange(2)}>Long Break</li>
        </ul>
        <img className="Gear-Icon" src="./assets/gear.svg" onClick={()=>setViewSettings(true)}/>
      </div>
      <div className="App-Body">
        <div className="App-Body-Timer">
          <div className="App-Body-Timer-Ring">
            <svg className="App-Body-Timer-Ring-SVG" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g className="App-Body-Timer-Ring-Circle">
                <circle className="App-Body-Timer-Ring-PathElapsed" cx="50" cy="50" r="45" />
                <path
                  id="base-timer-path-remaining"
                  strokeDasharray={(((timerMode-pomoTimer) / timerMode) * 283).toFixed(1) + " 283"}
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
          <img onClick={()=>{setPause(!pause)}} className="App-Timer-Pause" src={pause ? "./assets/action.svg" : "./assets/pause.svg"}></img>
        </div>
      </div>

      <div className={viewSettings ? "App-Settings" : "settings-OffScreen"}>
        
        <div className="App-Settings-Container">
          
          <div className="App-Settings-Header">
          
          <h3>Settings</h3>
            <img onClick={()=>setViewSettings(false)} src="./assets/close.svg"/>
          </div>
          
          <form className="App-Settings-Body" onSubmit={e=>handleFormSubmit(e)}>

            <div className="App-Settings-Body-Section">
              <label>Main Timer</label>
              <input type="number" max="120" step="0.1" placeholder={(mainTiming/60).toFixed(2)} onChange={e=>setInputsChange([e.target.value*60, inputsChange[1], inputsChange[2]])}/>
            </div>

            <div className="App-Settings-Body-Section">
              <label>Short Break</label>
             <input type="number" max="120" step="0.1" placeholder={(sBreak/60).toFixed(2)} onChange={e=>setInputsChange([inputsChange[1], e.target.value*60, inputsChange[2]])} />
            </div>

            <div className="App-Settings-Body-Section">
              < label>Long Break</label>
               <input  type="number" max="120" step="0.1" placeholder={(lBreak/60).toFixed(2)} onChange={e=>setInputsChange([inputsChange[0], inputsChange[1], e.target.value*60])}/>
            </div>
            <button type="submit" className="App-Settings-Button">Confrim</button>
          </form>
         
        </div>
      </div>
    </div>
  )
}

export default App
