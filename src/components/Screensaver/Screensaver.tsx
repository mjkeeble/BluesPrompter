import { useEffect, useState } from 'react';
import { NavIndicator } from '..';

type TProps = {
  isStart: boolean;
  isLastSong: boolean;
};

type TImage = {
  src: string;
  alt: string;
  text: string;
};

const Screensaver: React.FC<TProps> = ({ isStart, isLastSong }) => {
  const images: TImage[] = [
    { src: '/blues-jab-logo.png', alt: 'Blues Jab - Boy Band of the Blues', text: '' },
    // { src: '/BluesPrompter_logo_new4.png', alt: 'BluesPrompte. Your songs. On stage. No worries', text: '' },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(intervalId);
  }, [currentImage, images.length]);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="w-2/3">
          <img className="my-60 drop-shadow-logo" src={images[currentImage].src} alt={images[currentImage].alt} />
          {/* <div className="w-3/5">
          <img src="/songPrompter_logo_transparent_white.png" alt="openSongPrompt. Your songs. On stage. No worries" /> */}
        </div>
        <h1 className="text-9xl">{images[currentImage].text}</h1>
      </div>

      <NavIndicator
        leftShort={isStart ? undefined : 'backwardStep'}
        rightShort={isLastSong ? 'x' : 'play'}
        centreLong="eject"
      />
    </div>
  );
};

export default Screensaver;
