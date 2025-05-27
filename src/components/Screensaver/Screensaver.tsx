import { NavIndicator } from '@components/index';
import { useEffect, useState } from 'react';

type TProps = {
  isStart: boolean;
  isLastSong: boolean;
};

type TImage = {
  src: string;
  alt: string;
  text: string;
};

const IMAGE_DURATION = 30; // seconds

const Screensaver: React.FC<TProps> = ({ isStart, isLastSong }) => {
  // TODO: make band logo a config and import here
  const images: TImage[] = [
    { src: '/blues_jab_logo.svg', alt: 'Blues Jab - Boy Band of the Blues', text: '' },
    { src: '/bp_icon_with_text_inkscape.svg', alt: 'Blues Prompter. Your songs. Your stage. No worries', text: '' },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % images.length);
    }, IMAGE_DURATION * 1000);

    return () => clearInterval(intervalId);
  }, [currentImage, images.length]);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex h-2/3 w-2/3 items-center justify-center">
          <img
            className="h-full w-full object-contain drop-shadow-logo"
            src={images[currentImage].src}
            alt={images[currentImage].alt}
          />
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
