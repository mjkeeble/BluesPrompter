import { NavIndicator, SongListButton } from '@components/index';
import { GigContext } from '@context/index';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BREAK, footswitch } from 'src/const';
import { TBreak } from 'src/types';
import { displayDate } from 'src/utils';
import { fetchSongs } from './utils';

export type TSongData = {
  id: number;
  title: string;
  version?: string;
};

const Setlist = () => {
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const gigContext = useContext(GigContext);
  const gig = gigContext?.gig;
  const setlist = useMemo(() => gigContext?.setlist || [], [gigContext?.setlist]);
  const [songs, setSongs] = useState<TSongData[]>([]);

  useEffect(() => {
    const focusFirstButton = () => {
      if (buttonsRef.current[0]) {
        buttonsRef.current[0].focus();
      }
    };

    // Use a timeout to ensure the elements are rendered
    const timerId = setTimeout(focusFirstButton, 500);

    // Cleanup the timeout
    return () => clearTimeout(timerId);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const getAndStoreSongs = async () => {
      const songIds = setlist.filter((songId: number | TBreak) => songId !== BREAK);

      const getSongs = await fetchSongs(songIds);
      const extractedSongs = getSongs.map((song) => {
        if (song === 'Song not found') {
          return { id: 0, title: 'Song not found' };
        } else {
          return {
            id: song.id,
            title: song.title,
            version: song.version,
          };
        }
      });

      setSongs(extractedSongs);
    };

    getAndStoreSongs();
  }, [setlist]);

  const handleKeyDown = (event: { key: string }) => {
    if (isLoaded) {
      const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
      if (event.key === footswitch.CENTRE_LONG) {
        Navigate('/');
      } else if (event.key === footswitch.CENTRE_SHORT) {
        buttonsRef.current[currentIndex].click();
      } else if (event.key === footswitch.LEFT_SHORT && currentIndex > 0) {
        buttonsRef.current[currentIndex - 1].focus();
        buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (event.key === footswitch.RIGHT_SHORT) {
        if (currentIndex < buttonsRef.current.length - 1) {
          buttonsRef.current[currentIndex + 1].focus();
          buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (endOfListRef.current) {
          endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const endOfListRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="my-5 font-fredericka text-7xl text-bj-white">Set List</h1>
        {gig ? (
          <h3>
            {displayDate(gig.dateTime)}, {gig.venue}, {gig.town}
          </h3>
        ) : null}

        <ul className="mb-20 mt-8">
          {setlist.map((songId: number | TBreak, index: number) => {
            if (songId === BREAK)
              return (
                <li key={index}>
                  <SongListButton
                    ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                    classes="bg-bj-blue"
                    onclick={() => Navigate(`/song/${index}`)}
                    title="BREAK"
                  />
                </li>
              );

            const song: TSongData | undefined = songs.find((song) => Number(song.id) === songId);

            if (!song) {
              return (
                <li key={index}>
                  <span>Song not found</span>
                </li>
              );
            }

            return (
              <li key={index}>
                <SongListButton
                  ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                  onclick={() => Navigate(`/song/${index}`)}
                  title={song.title}
                />
              </li>
            );
          })}
        </ul>
        <div ref={endOfListRef}></div>
      </div>
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" centreLong="eject" />
    </div>
  );
};

export default Setlist;
