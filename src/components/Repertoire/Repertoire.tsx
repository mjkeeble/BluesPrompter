import { NavIndicator, SongListButton } from '@components/index';
import { GigContext } from '@context/gigContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TGig, TSong } from 'src/types';
import { fetchSongs, handleKeyDown } from './utils';

const repertoireGig: TGig = {
  id: 'repertoire',
  venue: '',
  town: '',
  dateTime: new Date().toISOString(),
  setlist: [[]],
};

const Repertoire = () => {
  const Navigate = useNavigate();
  const gigContext = useContext(GigContext);
  const gig = gigContext?.gig;
  const setGig = gigContext?.setGig;
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [repertoireList, setRepertoireList] = useState<TSong[]>([]);

  useEffect(() => {
    setGig && setGig(repertoireGig);
    const getAndSetSongs = async () => {
      const songList = await fetchSongs();
      if (songList) {
        setRepertoireList(songList);
      }
    };

    getAndSetSongs();
  }, [setGig]);

  useEffect(() => {
    const focusFirstButton = () => {
      if (buttonsRef.current && buttonsRef.current[0]) {
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

  const handleSelectSong = (id: number) => {

    if (setGig) {
      setGig({ ...repertoireGig, setlist: [[Number(id)]] });
    }

      Navigate(`/song/0`);
  };

  return (
    <div>
      <div
        onKeyDown={(event) =>
          isLoaded &&
          buttonsRef.current &&
          handleKeyDown(event, buttonsRef, repertoireList, endOfListRef, gig, Navigate)
        }
        tabIndex={0}
      >
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
      <NavIndicator
        leftShort="up"
        centreShort="point"
        rightShort="down"
        leftLong="skipUp"
        centreLong="eject"
        rightLong="skipDown"
      />
    </div>
  );
};

export default Repertoire;
