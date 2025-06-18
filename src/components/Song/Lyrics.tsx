import React, { useContext, useEffect, useRef, useState } from 'react';

import { ConfigContext } from '@context/configContextDefinition';
import { DEFAULT_MAX_FONT_SIZE, DEFAULT_MIN_FONT_SIZE, MAX_LYRIC_FONT_SIZE } from 'src/const';
import { FontSizeKey } from 'src/types';

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

  // Regular expression pattern to match "[" at the beginning and "]" at the end of the string
  const regexToIdentifyColor1 = /^\[.*\]$/;
  const regexToIdentifyColor2 = /^#.*#$/;

  const getTextColor = (str: string): string => {
    if (regexToIdentifyColor1.test(str)) return 'text-amber-500';
    if (regexToIdentifyColor2.test(str)) return 'text-red-500';
    return 'text-inherent';
  };

  if (!lyrics.length) return <NoLyricsMessage />;

  return (
    <div ref={containerRef} className="max-h-full overflow-y-hidden">
      {' '}
      {lyrics.map((line, index) => {
        const textColor = getTextColor(line);
        return (
          <p
            key={index}
            className={`${textColor} min-h-8 pl-12 ${textColor === 'text-red-500' ? 'text-right' : 'text-left'} -indent-12 font-semibold leading-tight`}
            style={{ fontSize }}
          >
            {textColor !== 'text-inherent' ? line.substring(1, line.length - 1) : line}
          </p>
        );
      })}
    </div>
  );
};

const NoLyricsMessage = () => {
  return (
    <div className="grid w-full items-center justify-center">
      <p className="text-lyric font-semibold text-bj-green-light">No lyrics here!</p>
    </div>
  );
};

export default Lyrics;
