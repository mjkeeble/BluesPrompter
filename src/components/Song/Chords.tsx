import { ConfigContext } from '@context/configContextDefinition';
import React, { useContext } from 'react';
import { TEXT_XL } from 'src/const';
import { TextSizes } from 'src/types';

type TProps = {
  chords: string[][];
};

const flattenChords = (chords: string[][], barsPerLine: number): string[] => {
  return chords
    .map((subArray) => {
      const padding = Array(barsPerLine - subArray.length).fill(' ');
      return [...subArray, ...padding];
    })
    .flat();
};

const Chords: React.FC<TProps> = ({ chords }) => {
  const config = useContext(ConfigContext);
  const chordFontSize: TextSizes = config?.chordFontSize ?? TEXT_XL;

  const barsPerLine = Math.round(Math.max(...chords.map((subArray) => subArray.length)));
  const flattenedChords = flattenChords(chords, barsPerLine);

  return (
    <div className="w-full">
      {flattenedChords.length > 1 ? (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${barsPerLine}, minmax(0, 1fr))` }}>
          {flattenedChords.map((bar, cellIndex) => (
            <div key={cellIndex} className="border border-solid border-slate-200 py-5 text-center">
              <span className={`whitespace-pre ${chordFontSize}`}>{bar}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Chords;
