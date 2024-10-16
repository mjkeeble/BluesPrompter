import { getSetlist } from '@context/index';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screensaver } from '..';
import { ACTIVEKEYS, BREAK } from '../../const.ts';
import { TSong } from '../../types';
import LyricPage from './LyricPage.tsx';
import TitlePage from './TitlePage.tsx';
import { ManageInteraction } from './interaction';

const fetchSong = async (id: number) => {
  try {
    const response: TSong = await(await fetch(`http://localhost:3000/songs/${id}`)).json();
    return response;
  } catch (error) {
    console.error('Error fetching song', error);
    return null;
  }
}

const Song = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const setlist= getSetlist();
  const [setlistIndex] = useState<number>(parseInt(id!));
  const [song, setSong] = useState<TSong | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [timerHalted, setTimerHalted] = useState<boolean>(false);
  const duration = song?.pages?.[currentPage - 1]?.duration || 0;

useEffect(() => {
  // Only update the setlist if necessary
   const searchIndex = setlist[setlistIndex];
  if (searchIndex !== BREAK) {
    const getAndSaveSong = async () => {
      const fetchedSong = await fetchSong(searchIndex);
      setSong(fetchedSong);
    };


    getAndSaveSong();
  }
}, [setlistIndex, setlist]);

  useEffect(() => {
    const handleFootswitchInput = (event: KeyboardEvent) => {
      if (ACTIVEKEYS.includes(event.key)) {
        ManageInteraction({
          showingScreensaver: setlist[setlistIndex] === BREAK,
          footswitchInput: event.key,
          currentSong: setlistIndex,
          totalSongs: setlist.length,
          currentPage,
          setCurrentPage,
          hasTimer: !!duration && !!song?.pages.length && currentPage < song?.pages.length,
          timerHalted,
          setTimerHalted,
          songPages: song?.pages.length || 0,
          Navigate,
        });
      }
    };

    document.addEventListener('keydown', handleFootswitchInput);

    return () => {
      document.removeEventListener('keydown', handleFootswitchInput);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, setlistIndex, timerHalted]);

  if (!setlistIndex || setlist[setlistIndex] === BREAK)
    return <Screensaver isStart={!setlistIndex} isLastSong={setlistIndex === setlist.length - 1} />;

  if (setlist[setlistIndex] !== BREAK && !song) {
    return (
      <>
        <h1>No song found!</h1>
        <p>setlist[setlistIndex]: {setlist[setlistIndex]}</p>
      </>
    );
  }
  return (
    <div className="w-full overflow-x-hidden">
      {!currentPage ? (
        <TitlePage
          title={song.title}
          scale={song.scale}
          setup={song.setup}
          tempo={song.tempo}
          notes={song.notes}
          timeSignature={song.timeSignature}
          isLastSong={setlistIndex === setlist.length - 1}
        />
      ) : (
        <LyricPage song={song} currentPage={currentPage} setCurrentPage={setCurrentPage} timerHalted={timerHalted} />
      )}
    </div>
  );
};

export default Song;
