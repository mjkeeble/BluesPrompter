import { TSong } from 'src/types';
import Chords from './Chords';
import Lyrics from './Lyrics';
import ProgressBar from './ProgressBar';
import PageTitle from './SectionTitle';
import { getScreenSplit } from './utils';

type TProps = {
  song: TSong;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  timerHalted: boolean;
};

const LyricPage: React.FC<TProps> = ({ song, currentPage, setCurrentPage, timerHalted }) => {
  const currentPageData = song.pages[currentPage - 1];

  if (!currentPageData) {
    return <div>Error: Page data not found</div>;
  }

  const pageHasChords: boolean = !!currentPageData.chords.length;

  const screenSplit = getScreenSplit(
    song.configChordPaneSize,
    pageHasChords,
    !!currentPageData.lyrics.length,
  );

  return (
    <div className="flex h-screen flex-col overflow-y-hidden">
      {!!currentPageData && !!song.tempo && !!song.timeSignature ? (
        <ProgressBar
          tempo={song.tempo}
          timeSignature={song.timeSignature}
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
        <div className={`col-span-${10 - screenSplit} overflow-y-hidden px-4`} style={{ height: 'calc(100vh - 60px)' }}>
          <Lyrics lyrics={currentPageData.lyrics} />
        </div>
      </div>
    </div>
  );
};

export default LyricPage;
