import { NavIndicator } from '@components/index';
import CountIn from './CountIn';

type TProps = {
  title: string;
  scale?: string;
  setup?: string;
  tempo?: number;
  notes?: string;
  timeSignature?: string;
  isLastSong: boolean;
};

const TitlePage: React.FC<TProps> = ({ title, scale: scale, setup, tempo, notes, timeSignature, isLastSong }) => {
  const currentTime = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden px-8 py-8">
      <header className=" m-2 flex items-start justify-between text-4xl ">
        <h1 className="text-left">{title}</h1>
        <h2>{currentTime}</h2>
      </header>
      <div className="flex h-full items-center justify-center">
        <div className="w-full text-center text-lyric">
          {scale ? <p>Key: {scale}</p> : null}
          {setup ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-lyric">{setup}</p>
            </div>
          ) : null}
          {notes ? <RenderSongNotes notes={notes} /> : null}
          <div>{tempo && timeSignature ? <CountIn tempo={tempo} timeSignature={timeSignature} /> : null}</div>
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

const RenderSongNotes: React.FC<{notes: string}> = ({notes}) => {
  return (
    <p className="text-7xl text-bj-green-light">
      {notes.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </p>
  );
};
  

export default TitlePage;
