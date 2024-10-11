import { storeSetlist, storeSongs } from '@context/index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavIndicator, SongListButton } from '..';
import { BREAK, footswitch } from '../../const';
import {TSong} from '../../types';
import { fetchSongs } from './utils';
import {fetchAndStoreSongs} from '@components/Setlist/utils';

const Repertoire = () => {
  const navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repertoireList, setRepertoireList] = useState<TSong[]>([]);

  // TODO: at the moment setlist is stored in local storage and


  useEffect(() => {
    const getAndSetSongs = async () => {
      const songList = await fetchSongs();
      if(songList) {
        setRepertoireList(songList);
      }
    }
    
    storeSetlist([0]);
    storeSongs([]);
    getAndSetSongs()
  }, [])
  
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
      if (event.key === footswitch.centreShort) {
        buttonsRef.current[currentIndex].click();
      } else if (event.key === footswitch.leftShort && currentIndex > 0) {
        buttonsRef.current[currentIndex - 1].focus();
        buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (event.key === footswitch.leftShort && currentIndex === 0) {
        buttonsRef.current[repertoireList.length - 1].focus();
        buttonsRef.current[repertoireList.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (event.key === footswitch.rightShort) {
        if (currentIndex < buttonsRef.current.length - 1) {
          buttonsRef.current[currentIndex + 1].focus();
          buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (currentIndex === buttonsRef.current.length - 1) {
          buttonsRef.current[0].focus();
          buttonsRef.current[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (endOfListRef.current) {
          endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (event.key === footswitch.leftLong) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  const handleSelectSong = (id: number) => {
    let storageUpdateDebounce: NodeJS.Timeout | null = null;

    storeSetlist([BREAK, Number(id)]);
    fetchAndStoreSongs([id]);
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
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" />
    </div>
  );
};

export default Repertoire;
