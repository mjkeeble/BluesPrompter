import { NavIndicator } from '@components/NavIndicator';
import { ConfigContext } from '@context/configContextDefinition';
import { useContext } from 'react';
import { Song } from 'src/types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';
import PageTitle from './SectionTitle';
import { fetchScreenSplit } from './utils';

type TProps = {
  song: Song;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  timerHalted: boolean;
};

const LyricPage: React.FC<TProps> = ({ song, currentPage, setCurrentPage, timerHalted }) => {
  const config = useContext(ConfigContext);
  const currentPageData = song.pages[currentPage - 1];
  const isLastPage = currentPage === song.pages.length;
  const hasTimer = song.tempo && song.timeSignature && currentPageData.duration;

  if (!currentPageData) {
    return <div>Error: Page data not found</div>;
  }

  // NOTE: Progress bar is currently deactivated
  // TODO: Add progress bar activation toggle to config
  const pageHasProgressBar: boolean = false;
  // !!currentPageData && !!song.tempo && !!song.timeSignature && !!currentPageData.duration;
  const pageHasChords: boolean = !!currentPageData.chords.length;
  const lyricBoxHeight = pageHasProgressBar ? '100vh - 84px' : pageHasChords ? '100vh' : '100vh - 125px';

  const screenSplit = fetchScreenSplit(song.configChordPaneSize || config?.chordPaneSize, pageHasChords);

  const progressIndicatorControlIcon = (): 'pause' | 'play' | undefined => {
    if (isLastPage) return undefined;
    if (hasTimer && timerHalted) return 'play';
    if (hasTimer) return 'pause';
  };

  return (
    <div className="flex h-screen flex-col overflow-y-hidden">
      {pageHasProgressBar ? (
        <ProgressBar
          tempo={song.tempo!}
          timeSignature={song.timeSignature!}
          timerHalted={timerHalted}
          duration={currentPageData.duration || undefined}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          finalPage={song.pages.length === currentPage}
        />
      ) : null}
      {pageHasChords ? null : (
        <PageTitle
          currentPage={currentPage}
          title={currentPageData.section}
          totalPages={song.pages.length}
          pageHasChords={pageHasChords}
        />
      )}

      <div className={`grid flex-1 grid-cols-10 ${pageHasChords ? 'divide-x' : null} overflow-y-auto`}>
        <div className={`col-span-${screenSplit} p-4`}>
          {pageHasChords ? (
            <PageTitle
              currentPage={currentPage}
              title={currentPageData.section}
              totalPages={song.pages.length}
              pageHasChords={pageHasChords}
            />
          ) : null}
          <Chords chords={currentPageData.chords} />
        </div>
        <div
          className={`col-span-${10 - screenSplit} overflow-y-clip px-4`}
          style={{ height: `calc(${lyricBoxHeight})` }}
        >
          <Lyrics lyrics={currentPageData.lyrics} />
        </div>
      </div>
      <NavIndicator
        leftShort="backward"
        centreShort={progressIndicatorControlIcon()}
        rightShort={isLastPage ? 'forwardStep' : 'play'}
        leftLong="backwardStep"
        centreLong="reload"
        rightLong={isLastPage ? undefined : 'forwardStep'}
        locateRight={config?.navIndicatorOnRight || !pageHasChords}
      />
    </div>
  );
};

export default LyricPage;
