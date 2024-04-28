import './App.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faCircleUp, faArrowRotateLeft, faPlay, faPause} from '@fortawesome/free-solid-svg-icons'
import beep from "./assets/beep.mp3"



function App() {


const [gap, setGap] = useState(5); 
const [work, setWork] = useState(25); 
const [seconds, setSeconds] = useState(0); 
const [minutes, setMinutes] = useState(25);  
const timerMinutes = minutes <10? `0${minutes}` : minutes;
const timerSeconds = seconds <10? `0${seconds}` : seconds;
const [timerRunning, setTimerRunning] = useState(false);
const [count, setCount] = useState(0);
const [boxLabel, setboxLabel] = useState("Adjust or start.")

useEffect(() => {
  
  let interval = setInterval(() => {
    clearInterval(interval)
    if(timerRunning){
      if(seconds === 0) {
       if(minutes!==0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else if(count == 0) {
          playBeep();
          setCount(1);
          setMinutes(gap); 
          setSeconds(0); 
          setboxLabel("Break");
          
          
        } else {
          playBeep();
          setCount(0);
          setMinutes(work);
          setSeconds(0);  
          setboxLabel("Session")
        
          
        }}
        else { 
          setSeconds(seconds - 1);
        }
      }
     },1000);
      return () => clearInterval(interval);
},[timerRunning,seconds, minutes]);





const playBeep = () => {
  document.getElementById('beep').play();
 
}

const incrementGap = ()  => {
  if(gap > 59) { 
    return;
  } else {
  setGap(gap + 1);}
}

const decrementGap = ()  => {
  if(gap <= 1) {
    return;
  } else {
    setGap(gap - 1);}
  
}

const incrementWork = ()  => {
  if(work > 59) {
    return;
  } else {
  setWork(work + 1);
  setMinutes(minutes + 1);}
}

const decrementWork = ()  => {
  if(work <= 1) {
    return;
  } else {
    setWork(work - 1);}
    setMinutes(minutes - 1);
  
}

const handleReset = () => {
    setTimerRunning(false);
    setboxLabel("Adjust or start.");
    setWork(25); //25
    setGap(5);  //5
    setMinutes(25); //25 
    setSeconds(0); //0
    setCount(0);
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    
}

const handlePlayPause = () => {
  if(!timerRunning){
    setTimerRunning(true);
    setboxLabel("Session");
  } else {
    setTimerRunning(false);
    setboxLabel("Session Paused");
  } }
  


  return (
   
    <div className="container">
      <div className="app">
        <div className="main-title">
          <h1>Pomodoro Timer </h1>
        </div>
        <div className="time-adjust">
          <div id="session-label" className="subtitle">Session Length</div>
          <button  id="session-increment" className="up-down-buttons btn-reset" onClick={incrementWork} ><FontAwesomeIcon icon={faCircleUp} size="2x"/></button>
          <div id="session-length" className="work-length">{work}</div>
          <button id="session-decrement" className="up-down-buttons btn-reset" onClick={decrementWork}><FontAwesomeIcon icon={faCircleDown} size="2x"/></button>
        </div>
        
        <div className="time-adjust">
          <div id="break-label" className="subtitle">Break Length</div>
          <button  id="break-increment" className="up-down-buttons btn-reset" onClick={incrementGap}><FontAwesomeIcon icon={faCircleUp} size="2x"/></button>
          <div id="break-length" className="gap-length">{gap}</div>
          <button id="break-decrement" className="up-down-buttons btn-reset" onClick={decrementGap}><FontAwesomeIcon icon={faCircleDown} size="2x"/></button>
        </div>
        <div className="timer">
        <div className="clock">
          <p id="timer-label">{boxLabel}</p>
          <p id="time-left" className="remaining-time">{timerMinutes}:{timerSeconds}</p>
        </div>
        <div className="controls">
          <div className="start-pause" onClick={handlePlayPause}>
            <button id="start_stop" className="play-button btn-reset" ><FontAwesomeIcon icon={faPlay} size="2x"/></button>
            <button id="start_stop" className="pause-button btn-reset"><FontAwesomeIcon icon={faPause} size="2x"/></button>
          </div>
          <div  className="reset">
            <button id="reset" className="reset-button btn-reset" onClick={handleReset}><FontAwesomeIcon icon={faArrowRotateLeft} size="2x"/></button>
          </div>
        </div>
        </div>
        <audio id="beep">
          <source src = {beep}></source>
        </audio>
      </div>
    </div>
  )
}

export default App
