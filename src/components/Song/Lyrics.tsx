import React, { useEffect, useRef, useState } from 'react';
import { TConfig } from 'src/types';
import config from '../../../data/config.json';
import { MAX_LYRIC_FONT_SIZE } from '../../const';

type TProps = {
  lyrics: string[];
};

// Usage:
const Lyrics: React.FC<TProps> = ({ lyrics }) => {
  const { lyricMinFontSize, lyricMaxFontSize } = config as TConfig;
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
  const regexToIdentifyComment = /^\[.*\]$/;

  const isComment = (str: string): boolean => {
    return regexToIdentifyComment.test(str);
  };
  if (!lyrics.length) return <NoLyricsMessage />;

  return (
    <div ref={containerRef} className="max-h-full overflow-y-auto">
      {' '}
      {lyrics.map((line, index) => (
        <p
          key={index}
          className={`${isResizingText ? 'text-transparent' : isComment(line) ? 'text-amber-500' : 'text-inherit'} min-h-8 pl-12 text-left -indent-12 font-semibold leading-tight`}
          style={{ fontSize }}
        >
          {isComment(line) ? line.substring(1, line.length - 1) : line}
        </p>
      ))}
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
