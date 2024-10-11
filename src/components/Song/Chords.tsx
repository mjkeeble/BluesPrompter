import React from 'react';
import {NavIndicator} from '..';
import config from '../../../data/config.json';

type TProps = {
  chords: string[][];
  isLastPage: boolean;
  timerHalted: boolean;
  hasTimer: boolean;
};

const flattenChords = (chords: string[][], barsPerLine: number): string[] => {
  return chords
    .map((subArray) => {
      const padding = Array(barsPerLine - subArray.length).fill(' ');
      return [...subArray, ...padding];
    })
    .flat();
}

const Chords: React.FC<TProps> = ({ chords, isLastPage, timerHalted, hasTimer }) => {
  const progressIndicatorControlIcon = (): 'pause' | 'play' | undefined => {
    if (isLastPage) return undefined;
    if (hasTimer && timerHalted) return 'play';
    if (hasTimer) return 'pause';
  };
  const barsPerLine = Math.round(Math.max(...chords.map((subArray) => subArray.length)));
  const flattenedChords = flattenChords(chords, barsPerLine)


  return (
    <div className="w-full">
      {flattenedChords.length > 1 ? (<div style={{ display: 'grid', gridTemplateColumns: `repeat(${barsPerLine}, minmax(0, 1fr))` }}>
        {flattenedChords.map((bar, cellIndex) => (
          <div key={cellIndex} className="border border-solid border-slate-200 py-5 text-center">
            <span className={`whitespace-pre text-${config.chordFontSize} font-semibold`}>{bar}</span>
          </div>
        ))}
      </div>): null}

      <NavIndicator
        leftShort="backward"
        centreShort={progressIndicatorControlIcon()}
        rightShort={isLastPage ? 'forwardStep' : 'play'}
        leftLong="backwardStep"
        centreLong="reload"
        rightLong={isLastPage ? undefined : 'forwardStep'}
      />
    </div>
  );
};

export default Chords;
