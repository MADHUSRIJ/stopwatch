import React,{useState,useEffect} from 'react';
import './App.css';
import ButtonComponent from './components/WatchComponent/ButtonComponent';
import ButtonsArrangeComponent from './components/WatchComponent/ButtonsArrangeComponent';
import IndicatorComponent from './components/WatchComponent/IndicatorComponent';
import LapComponent from './components/WatchComponent/LapComponent';
import MobileComponent from './components/WatchComponent/MobileComponent';
import playIcon from "./assets/images/play.png";
import pauseIcon from "./assets/images/pause.png";
import stopIcon from "./assets/images/stop.png";
import restartIcon from "./assets/images/restart.png";
import lapIcon from "./assets/images/lap.png";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(true);
  
  const [duration, setDuration] = useState("0");
  const [timer, setTimer] = useState("0");
  
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [centiseconds, setCentiseconds] = useState(0);
  
  function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }
  
  function updateTimer() {
    setCentiseconds(prevCentiseconds => {
      let updatedCentiseconds = prevCentiseconds + 1;
  
      if (updatedCentiseconds >= 100) {
        updatedCentiseconds = 0;
        setSeconds(prevSeconds => {
          let updatedSeconds = prevSeconds + 1;
  
          if (updatedSeconds >= 60) {
            updatedSeconds = 0;
            setMinutes(prevMinutes => {
              let updatedMinutes = prevMinutes + 1;
  
              if (updatedMinutes >= 60) {
                updatedMinutes = 0;
                setHours(prevHours => prevHours + 1);
              }
  
              return updatedMinutes;
            });
          }
  
          return updatedSeconds;
        });
      }
      
      return updatedCentiseconds;
    });
  
  }
  
  
  function Activate() {
    setIsActive(true);
    setIsPaused(false);
    setIsStopped(false);
  
    setInterval(updateTimer, 10);
  }
  
  function Pause() {
    clearInterval(updateTimer);

    setIsActive(false);
    setIsPaused(true);
    setIsStopped(false);
  }
  
  function Stop() {
    setIsActive(false);
    setIsPaused(false);
    setIsStopped(true);

    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);

    clearInterval(updateTimer);
  }
  
  function LapSplit() {
    setIsActive(true);
    setIsPaused(false);
    setIsStopped(false);
  }
  
  function Restart() {
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);

    Activate();
  }
  
  useEffect(() => {
    const centisecondsFormatted = formatTime(centiseconds);
    setTimer(`${centisecondsFormatted}`);
  }, [centiseconds]);
  
  useEffect(() => {
    const secondsFormatted = formatTime(seconds);
    const minutesFormatted = formatTime(minutes);
    const hoursFormatted = formatTime(hours);

    if(hoursFormatted>0){
      setDuration(`${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`);
    }
    else if(minutesFormatted>0){
      setDuration(`${minutesFormatted}:${secondsFormatted}`);
    }
    else{
      setDuration(`${secondsFormatted}`);
    }
    
  }, [seconds, minutes, hours]);

  
  return (
    <div className="App">
      <div className="Main-Container">
        <MobileComponent childComponents={[
          <div key="title">Stopwatch</div>,
          <IndicatorComponent key="indicator" Duration={duration} Timer={timer} />,
          <LapComponent key="lap" />,
          <ButtonsArrangeComponent key="buttons" childComponents={
            isActive ? [
              <ButtonComponent key="restart" Style={{ backgroundColor: '#5fead185' }} ButtonIcon={restartIcon} ButtonId="restart" OnClickEvent={Restart} />,
              <ButtonComponent key="pause" Style={{ backgroundColor: '#5fead140', height: '75px', width: '75px' }} ButtonIcon={pauseIcon} ButtonId="pause" OnClickEvent={Pause} />,
              <ButtonComponent key="lap" Style={{ backgroundColor: '#5fead185' }} ButtonIcon={lapIcon} ButtonId="lap" OnClickEvent={LapSplit} />,
            ] : isPaused ? [
              <ButtonComponent key="restart" Style={{ backgroundColor: '#5fead185' }} ButtonIcon={restartIcon} ButtonId="restart" OnClickEvent={Restart} />,
              <ButtonComponent key="play" Style={{ backgroundColor: '#5fead140', height: '75px', width: '75px' }} ButtonIcon={playIcon} ButtonId="play" OnClickEvent={Activate} />,
              <ButtonComponent key="stop" Style={{ backgroundColor: '#5fead185' }} ButtonIcon={stopIcon} ButtonId="stop" OnClickEvent={Stop} />,
            ] : isStopped ? [
              <ButtonComponent key="play" Style={{ backgroundColor: '#5fead140', height: '75px', width: '75px' }} ButtonIcon={playIcon} ButtonId="play" OnClickEvent={Activate} />,
            ] : []
          } />
        ]} />
      </div>
    </div>
  );
}


export default App;
