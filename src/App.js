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
import LapDescComponent from './components/WatchComponent/LapDescComponent';

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
  
  const [timerInterval, setTimerInterval] = useState(null);

  const [laps, setLaps] = useState([]);

  const [actualDuration, setActualDuration] = useState("00:00:00");
  const [prevLapTime, setPrevLapTime] = useState("00:00:00");
  
  function FormatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }
  
  function UpdateTimer() {
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

  function FindimeDuration(time1, time2) {
    
    const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
    const [hours2, minutes2, seconds2] = time2.split(":").map(Number);
  
    const totalSeconds1 = hours1 * 3600 + minutes1 * 60 + seconds1;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
  
    const resultSeconds = totalSeconds1 - totalSeconds2;
  
    const hours = Math.floor(resultSeconds / 3600);
    const minutes = Math.floor((resultSeconds % 3600) / 60);
    const seconds = resultSeconds % 60;
  
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  
  function Activate() {
    setIsActive(true);
    setIsPaused(false);
    setIsStopped(false);
  
    setTimerInterval(setInterval(UpdateTimer, 10));
  }
  
  function Pause() {
    setTimerInterval(prevInterval => {
      clearInterval(prevInterval);
      return null;
    });

    setIsActive(false);
    setIsPaused(true);
    setIsStopped(false);
  }
  
  function Stop() {
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);

    setLaps(prevLaps => {
      return []
    });
    setPrevLapTime("00:00:00");

    setTimerInterval(prevInterval => {
      clearInterval(prevInterval);
      return null;
    });
    
    console.log(timerInterval);
    
    setIsActive(false);
    setIsPaused(false);
    setIsStopped(true);
  }
  
  function LapSplit() {
    setIsActive(true);
    setIsPaused(false);
    setIsStopped(false);
    
    let lapDuration = FindimeDuration(actualDuration,prevLapTime);

    const lap = {
      LapNumber: laps.length + 1,
      Duration: lapDuration,
      StartTime: actualDuration,
    };

    setLaps(prevLaps => {
      return [...prevLaps, lap]
    });

    setPrevLapTime(actualDuration);
  }
  
  function Restart() {
    setCentiseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);

    setLaps(prevLaps => {
      return []
    });
    setPrevLapTime("00:00:00");

    setTimerInterval(prevInterval => {
      clearInterval(prevInterval);
      return null;
    });

    Activate();
  }
  
  useEffect(() => {
    const centisecondsFormatted = FormatTime(centiseconds);
    setTimer(`${centisecondsFormatted}`);
  }, [centiseconds]);
  
  useEffect(() => {
    const secondsFormatted = FormatTime(seconds);
    const minutesFormatted = FormatTime(minutes);
    const hoursFormatted = FormatTime(hours);

    setActualDuration(`${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`);
    
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
          <LapComponent key="laps" childComponents={laps.map((lap, index) => (
            <LapDescComponent
              key={`Lap ${index}`}
              LapNumber={lap.LapNumber}
              Duration={lap.Duration}
              StartTime={lap.StartTime}
            />
          ))} />,
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
