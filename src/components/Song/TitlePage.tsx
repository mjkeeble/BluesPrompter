import { NavIndicator } from '@components/index';
// import CountIn from './CountIn';

type TProps = {
  title: string;
  version?: string;
  scale?: string;
  setup?: string;
  tempo?: number;
  notes?: string;
  timeSignature?: string;
  isLastSong: boolean;
};

// const TitlePage: React.FC<TProps> = ({title, version, scale, setup, tempo, notes, timeSignature, isLastSong}) => {
const TitlePage: React.FC<TProps> = ({ title, version, scale, setup, notes, isLastSong }) => {
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden px-8 py-8">
      <header className="m-2 flex items-start justify-between text-3xl">
        <h1 className="mr-2 text-left">{title}</h1>
        <h2>{currentTime}</h2>
      </header>
      <div className="flex h-full items-center justify-center">
        <div className="text-6xl w-full text-center">
          {scale ? <p>Key: {scale}</p> : null}
          {version ? <p>Version: {version}</p> : null}
          {setup ? (
            <div className="flex h-full w-full items-center justify-center">
              <p>{setup}</p>
            </div>
          ) : null}
          {notes ? <RenderSongNotes notes={notes} /> : null}
          {/* <div>{tempo && timeSignature ? <CountIn tempo={tempo} timeSignature={timeSignature} /> : null}</div> */}
        </div>
      </div>
      <NavIndicator
        leftShort="backwardFast"
        rightShort="play"
        centreLong="eject"
        rightLong={isLastSong ? undefined : 'forwardStep'}
        // centreShort="eject"  // TODO: add navigate back to setlist
      />
    </div>
  );
};

const RenderSongNotes: React.FC<{ notes: string }> = ({ notes }) => {
  return (
    <p className="text-bj-green-light">
      {notes.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
};

export default TitlePage;
