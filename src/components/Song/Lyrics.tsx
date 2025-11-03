import React, { useContext, useEffect, useRef, useState } from 'react';

import { ConfigContext } from '@context/configContextDefinition';
import { DEFAULT_MAX_FONT_SIZE, DEFAULT_MIN_FONT_SIZE, MAX_LYRIC_FONT_SIZE } from 'src/const';
import { FontSizeKey } from 'src/types';
import { getFormattedLine } from './utils';

type TProps = {
  lyrics: string[];
};

const Lyrics: React.FC<TProps> = ({ lyrics }) => {
  const config = useContext(ConfigContext);
  const lyricMinFontSize: number = config?.lyricMinFontSize || DEFAULT_MIN_FONT_SIZE;
  const lyricMaxFontSize: FontSizeKey = config?.lyricMaxFontSize || DEFAULT_MAX_FONT_SIZE;
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState<number>(MAX_LYRIC_FONT_SIZE[lyricMaxFontSize].size); // Initial font size
  const [containerReady, setContainerReady] = useState<boolean>(false); // State to track if container is ready
  const [isResizingText, setIsResizingText] = useState<boolean>(true);

  useEffect(() => {
    setFontSize(MAX_LYRIC_FONT_SIZE[lyricMaxFontSize].size);
    setIsResizingText(true);
  }, [lyrics, lyricMaxFontSize]);

  useEffect(() => {
    // This effect runs after the initial render
    setContainerReady(true); // Set containerReady to true after initial render
  }, []);

  useEffect(() => {
    // This effect runs whenever fontSize changes
    if (containerReady && containerRef.current) {
      // Check if container is ready and ref is not null
      const container = containerRef.current;
      const hasOverflow = container.scrollHeight > container.clientHeight;
      if (hasOverflow && fontSize > lyricMinFontSize) {
        // Reduce font size and recheck
        setFontSize((prevSize) => prevSize - MAX_LYRIC_FONT_SIZE[lyricMaxFontSize].reductionIncrement);
      } else {
        setIsResizingText(false);
      }
    }
  }, [fontSize, containerReady, isResizingText, lyrics, lyricMinFontSize, lyricMaxFontSize]); // Re-run effect when fontSize or containerReady changes

  if (!lyrics.length) return <NoLyricsMessage />;

  return (
    <div ref={containerRef} className="max-h-full overflow-y-hidden pl-15">
      {' '}
      {lyrics.map((line, index) => {
        const formattedLyric = getFormattedLine(line);
        return (
          <p
            key={index}
            className={`${formattedLyric.format} min-h-8 leading-tight font-semibold`}
            style={{ fontSize }}
          >
            {formattedLyric.lyric}
          </p>
        );
      })}
    </div>
  );
};

const NoLyricsMessage = () => {
  return (
    <div className="grid w-full items-center justify-center">
      <p className="text-lyric text-bj-green-light font-semibold">No lyrics here!</p>
    </div>
  );
};

export default Lyrics;
