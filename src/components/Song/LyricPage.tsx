import { ConfigContext } from '@context/configContext';
import { useContext } from 'react';
import { TSong } from 'src/types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';
import PageTitle from './SectionTitle';
import { fetchScreenSplit } from './utils';

type TProps = {
  song: TSong;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  timerHalted: boolean;
};

const LyricPage: React.FC<TProps> = ({ song, currentPage, setCurrentPage, timerHalted }) => {
  const config = useContext(ConfigContext);
  const currentPageData = song.pages[currentPage - 1];

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

      <div className="grid flex-1 grid-cols-10 divide-x overflow-y-auto">
        <div className={`col-span-${screenSplit} p-4`}>
          {pageHasChords ? (
            <PageTitle
              currentPage={currentPage}
              title={currentPageData.section}
              totalPages={song.pages.length}
              pageHasChords={pageHasChords}
            />
          ) : null}
          <Chords
            chords={currentPageData.chords}
            isLastPage={currentPage === song.pages.length}
            timerHalted={timerHalted}
            hasTimer={!!currentPageData.duration}
          />
        </div>
        <div
          className={`col-span-${10 - screenSplit} overflow-y-clip border border-red-title px-4`}
          style={{ height: `calc(${lyricBoxHeight})` }}
        >
          <Lyrics lyrics={currentPageData.lyrics} />
        </div>
      </div>
    </div>
  );
};

export default LyricPage;
