
import React from 'react';

interface TimeDisplayProps {
  time: number; // Time in milliseconds
}

/**
 * Formats milliseconds into HH:MM:SS.mmm format.
 * @param milliseconds The total elapsed time in milliseconds.
 * @returns A formatted time string.
 */
const formatTime = (milliseconds: number): [string, string] => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const ms = milliseconds % 1000;

  const mainPart = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');
  
  const msPart = ms.toString().padStart(3, '0');

  return [mainPart, msPart];
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
  const [mainTime, milliseconds] = formatTime(time);

  return (
    <div className="font-mono text-center select-none flex items-baseline justify-center" aria-live="polite" aria-atomic="true">
      <span className="text-5xl md:text-6xl font-bold tracking-wider text-slate-100">
        {mainTime}
      </span>
      <span className="text-3xl md:text-4xl font-semibold tracking-wider text-cyan-400">
        .{milliseconds}
      </span>
    </div>
  );
};

export default TimeDisplay;