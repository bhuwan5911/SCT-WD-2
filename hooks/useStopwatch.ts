import { useState, useRef, useCallback, useEffect } from 'react';

export const useStopwatch = () => {
  // State to hold the elapsed time in milliseconds
  const [time, setTime] = useState(0);
  // State to track if the stopwatch is running
  const [isRunning, setIsRunning] = useState(false);
  // State to store lap times
  const [laps, setLaps] = useState<number[]>([]);

  // Refs to manage the interval and time calculations across re-renders
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Effect to handle the timer interval
  useEffect(() => {
    if (isRunning) {
      // Record the start time
      startTimeRef.current = Date.now() - time;
      
      // Start an interval to update the time every 10 milliseconds
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      // Clear the interval if the stopwatch is paused or stopped
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    // Cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); // Rerun effect only when isRunning state changes

  // Handler to start the stopwatch
  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Handler to pause the stopwatch
  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Handler to stop and reset the stopwatch
  const handleStop = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }, []);

  // Handler to record a lap
  const handleLap = useCallback(() => {
    if (isRunning) {
      setLaps(prevLaps => [time, ...prevLaps]);
    }
  }, [isRunning, time]);

  return { time, isRunning, laps, handleStart, handlePause, handleStop, handleLap };
};