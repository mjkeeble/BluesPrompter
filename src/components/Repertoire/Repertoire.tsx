import { storeSetlist } from '@context/index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavIndicator, SongListButton } from '..';
import { BREAK, footswitch } from '../../const';
import { TSong } from '../../types';
import { fetchSongs } from './utils';

const Repertoire = () => {
  const navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repertoireList, setRepertoireList] = useState<TSong[]>([]);

  // TODO: at the moment setlist is stored in local storage and

  useEffect(() => {
    const getAndSetSongs = async () => {
      const songList = await fetchSongs();
      if (songList) {
        setRepertoireList(songList);
      }
    };

    storeSetlist([0]);
    getAndSetSongs();
  }, []);

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

  const endOfListRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: { key: string }) => {
    if (isLoaded) {
      // TODO: refactor with switch
      const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
      switch (event.key) {
        case footswitch.centreShort:
          buttonsRef.current[currentIndex].click();
          break;
        case footswitch.leftShort:
          if (currentIndex > 0) {
            buttonsRef.current[currentIndex - 1].focus();
            buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (currentIndex === 0) {
            buttonsRef.current[repertoireList.length - 1].focus();
            buttonsRef.current[repertoireList.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        case footswitch.rightShort:
          if (currentIndex < buttonsRef.current.length - 1) {
            buttonsRef.current[currentIndex + 1].focus();
            buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (currentIndex === buttonsRef.current.length - 1) {
            buttonsRef.current[0].focus();
            buttonsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else if (endOfListRef.current) {
            endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
          }
          break;
        case footswitch.leftLong:
          if (currentIndex > 10) {
            buttonsRef.current[currentIndex - 10].focus();
            buttonsRef.current[currentIndex - 10].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            buttonsRef.current[0].focus();
            buttonsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        case footswitch.rightLong:
          if (currentIndex + 10 < buttonsRef.current.length) {
            buttonsRef.current[currentIndex + 10].focus();
            buttonsRef.current[currentIndex + 10].scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            buttonsRef.current[buttonsRef.current.length - 1].focus();
            buttonsRef.current[buttonsRef.current.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSelectSong = (id: number) => {
    let storageUpdateDebounce: NodeJS.Timeout | null = null;

    storeSetlist([BREAK, Number(id)]);
    fetchSongs();
    if (storageUpdateDebounce) clearTimeout(storageUpdateDebounce);
    storageUpdateDebounce = setTimeout(() => {
      navigate(`/song/1`);
    }, 500);
  };

  return (
    <div>
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="my-5 font-fredericka text-7xl text-bj-white">Repertoire</h1>
        <ul className="mb-20 mt-8">
          {repertoireList.map((song: TSong, index) => {
            return (
              <li key={index}>
                <SongListButton
                  ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                  classes="text-bj-white bg-bj-blue-dark"
                  onclick={() => handleSelectSong(song.id)}
                  title={song.title}
                  version={song.version}
                />
              </li>
            );
          })}
          <div ref={endOfListRef} />
        </ul>
      </div>
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" leftLong="skipUp" rightLong="skipDown" />
    </div>
  );
};

export default Repertoire;
