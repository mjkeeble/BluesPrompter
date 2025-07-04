import { Screensaver } from '@components/index.ts';
import { goFullScreen } from '@components/utils.ts';
import { GigContext } from '@context/gigContextDefinition';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIVEKEYS, BREAK } from 'src/const.ts';
import { Song } from 'src/types';
import LyricPage from './LyricPage.tsx';
import TitlePage from './TitlePage.tsx';
import { ManageInteraction } from './interaction';
import { fetchSong } from './utils.ts';

const SongComponent = () => {
  const Navigate = useNavigate();
  const { setlist } = useContext(GigContext) ?? { setlist: [] };
  const { id } = useParams();
  const [setlistIndex, setSetlistIndex] = useState<number>(parseInt(id!));
  const [song, setSong] = useState<Song>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [timerIsHalted, setTimerIsHalted] = useState<boolean>(false);
  const duration = song?.pages[currentPage - 1]?.duration || 0;

  useEffect(() => {
    const newIndex = parseInt(id!);
    setSetlistIndex(newIndex);
  }, [id]);

  useEffect(() => {
    // Reassert fullscreen and reset currentPage to 0 when id changes
    goFullScreen();
    setCurrentPage(0);
  }, [id]);

  useEffect(() => {
    const songId = setlist[setlistIndex];

    const getAndSaveSong = async () => {
      if (songId !== BREAK && (!song || song.id != songId)) {
        const fetchedSong = await fetchSong(songId);
        if (!fetchedSong) {
          console.error('No song found');
          return;
        }

        setSong(fetchedSong);
      }
    };
    getAndSaveSong();
  }, [setlistIndex, setlist, song]);

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
          hasTimer: !!duration && !!song?.pages.length && currentPage < song.pages.length,
          timerHalted: timerIsHalted,
          setTimerHalted: setTimerIsHalted,
          songPages: song?.pages.length || 0,
          Navigate,
        });
      }
    };

    document.addEventListener('keydown', handleFootswitchInput);

    return () => {
      document.removeEventListener('keydown', handleFootswitchInput);
    };
  }, [setlistIndex, setlist, currentPage, duration, timerIsHalted, song, Navigate]);

  if (setlist[setlistIndex] === BREAK)
    return <Screensaver isStart={!setlistIndex} isLastSong={setlistIndex === setlist.length - 1} />;

  if (!song) {
    return (
      <>
        <h1>No song found!</h1>
        <p>setlist[setlistIndex]: {setlist[setlistIndex]}</p>
      </>
    );
  }
  return (
    <div className="w-full overflow-x-hidden">
      {song && !currentPage ? (
        <TitlePage
          title={song.title}
          version={song.version}
          scale={song.scale}
          setup={song.setup}
          tempo={song.tempo}
          notes={song.notes}
          timeSignature={song.timeSignature}
          isLastSong={setlistIndex === setlist.length - 1}
        />
      ) : null}
      {song && currentPage ? (
        <LyricPage song={song} currentPage={currentPage} setCurrentPage={setCurrentPage} timerHalted={timerIsHalted} />
      ) : null}
    </div>
  );
};

export default SongComponent;
