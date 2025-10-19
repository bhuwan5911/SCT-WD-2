import React, { useState, useEffect } from 'react';

interface LapListProps {
  laps: number[]; // Array of lap times in milliseconds
}

/**
 * Formats milliseconds into MM:SS.mmm format for lap display.
 */
const formatLapTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = milliseconds % 1000;

    return [
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
    ].join(':') + `.${ms.toString().padStart(3, '0')}`;
};

interface LapItemProps {
  lapTime: number;
  lapNumber: number;
  isNewest: boolean;
}

// A component for a single lap item with its own animation logic
const LapItem: React.FC<LapItemProps> = ({ lapTime, lapNumber, isNewest }) => {
  const [visible, setVisible] = useState(!isNewest);

  useEffect(() => {
    // If this is the newest lap, animate it in after it's been mounted.
    if (isNewest) {
      // Use a timeout to allow the initial (invisible) state to render first,
      // then update to the visible state to trigger the CSS transition.
      const timer = setTimeout(() => {
        setVisible(true);
      }, 10); // A small delay is enough for the transition to trigger.
      return () => clearTimeout(timer);
    }
  }, [isNewest]);

  const transitionClasses = "transition-all duration-500 ease-out";
  const initialClasses = "opacity-0 -translate-y-4";
  const finalClasses = "opacity-100 translate-y-0";

  return (
    <li
      className={`flex justify-between items-center p-3 text-slate-300 ${transitionClasses} ${visible ? finalClasses : initialClasses}`}
    >
      <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">
        Lap {lapNumber}
      </span>
      <span className="font-mono text-lg text-slate-100">
        {formatLapTime(lapTime)}
      </span>
    </li>
  );
};


const LapList: React.FC<LapListProps> = ({ laps }) => {
  if (laps.length === 0) {
    return null; // Don't render anything if there are no laps
  }

  return (
    <div className="w-full mt-4 bg-slate-900/40 rounded-lg p-2 max-h-48 overflow-y-auto border border-slate-800">
      <ul className="divide-y divide-slate-700/50">
        {laps.map((lap, index) => (
          <LapItem
            key={laps.length - index} // Stable key based on lap number
            lapTime={lap}
            lapNumber={laps.length - index}
            isNewest={index === 0} // The first item in the array is always the newest
          />
        ))}
      </ul>
    </div>
  );
};

export default LapList;
