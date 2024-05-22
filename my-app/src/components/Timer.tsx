import React, { useState, useEffect } from 'react';
import {  ClearOutlined,PauseOutlined,
HistoryOutlined } from '@ant-design/icons';
import { Button} from 'antd';
import '../styles/Timer.scss'



const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div className='div-btn'>
      <h3>Timer: {seconds} seconds</h3>
      <Button type="primary"  shape="round" className="btns" onClick={handleStart}> <HistoryOutlined /></Button>
      <Button type="primary"  shape="round" className="btns" onClick={handleStop}>  <PauseOutlined className="btn-cor" /></Button>
      <Button type="primary" shape="round" className="btns" onClick={handleReset}> <ClearOutlined className="btn-cor" /></Button>
    </div>

  );
};

export default Timer;
