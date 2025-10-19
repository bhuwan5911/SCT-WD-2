import React from 'react';
import { useStopwatch } from './hooks/useStopwatch';
import TimeDisplay from './components/TimeDisplay';
import ControlButton from './components/ControlButton';
import LapList from './components/LapList';
import AnimatedBackground from './components/AnimatedBackground';

const App: React.FC = () => {
  const { time, isRunning, laps, handleStart, handlePause, handleStop, handleLap } = useStopwatch();

  return (
    <main className="text-white min-h-screen flex flex-col items-center justify-center font-sans p-4 relative overflow-hidden">
      <AnimatedBackground />
      <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl shadow-2xl p-10 md:p-12 w-full max-w-md flex flex-col items-center z-10">
        
        <h1 className="text-2xl font-semibold text-slate-300 mb-6 tracking-wider">Stopwatch</h1>

        {/* Time Display */}
        <TimeDisplay time={time} />

        {/* Control Buttons */}
        <div className="flex justify-center items-center gap-4 md:gap-5 my-8">
          <ControlButton onClick={handleStop} variant="secondary" disabled={time === 0 && !isRunning}>
            Stop
          </ControlButton>

          {!isRunning ? (
            <ControlButton onClick={handleStart} variant="start">
              Start
            </ControlButton>
          ) : (
            <ControlButton onClick={handlePause} variant="pause">
              Pause
            </ControlButton>
          )}

          <ControlButton onClick={handleLap} disabled={!isRunning} variant="secondary">
            Lap
          </ControlButton>
        </div>

        {/* Laps List */}
        <LapList laps={laps} />

      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm z-10">
          <p>Built with React & Tailwind CSS</p>
      </footer>
    </main>
  );
};

export default App;