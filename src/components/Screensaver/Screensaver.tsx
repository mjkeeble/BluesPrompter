import { NavIndicator } from '@components/index';
import {goFullScreen} from '@components/utils';
import { useEffect, useRef, useState } from 'react';

type TProps = {
  isStart: boolean;
  isLastSong: boolean;
};

type TImage = {
  src: string;
  alt: string;
  text: string;
};

const IMAGE_DURATION = 20; // seconds
const FADE_DURATION = 4000; // ms - adjust to taste

const Screensaver: React.FC<TProps> = ({ isStart, isLastSong }) => {
  // ...existing code...
  const images: TImage[] = [
    { src: '/blues_jab_logo.svg', alt: 'Blues Jab - Boy Band of the Blues', text: '' },
    { src: '/bp_icon_with_text_inkscape.svg', alt: 'Blues Prompter. Your songs. Your stage. No worries', text: '' },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null); // <-- new ref for requestAnimationFrame

  useEffect(() => {
    goFullScreen();
  }, []);

useEffect(() => {
    // start cycle: wait IMAGE_DURATION, then cross-fade to nextImage
    intervalRef.current = setInterval(() => {
      const idx = (currentImage + 1) % images.length;

      // mount the next image but keep it hidden initially
      setNextImage(idx);
      setIsFading(false);

      // after next paint, trigger the cross-fade so both images transition:
      // current -> opacity 0, next -> opacity 1
      rafRef.current = requestAnimationFrame(() => {
        // trigger the transition
        setIsFading(true);

        // after fade duration, commit the new current image and clear transition state
        fadeTimeoutRef.current = setTimeout(() => {
          setCurrentImage(idx);
          setIsFading(false);
          setNextImage(null);
        }, FADE_DURATION);
      });
    }, IMAGE_DURATION * 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // include currentImage in deps so new intervals use the latest base image
  }, [currentImage, images.length]);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="relative flex h-2/3 w-2/3 items-center justify-center">
          {/* current image - stable key tied to currentImage */}
          <img
            key={`img-current-${currentImage}`}
            className="drop-shadow-logo absolute top-0 left-0 h-full w-full object-contain transition-opacity"
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            style={{ opacity: isFading ? 0 : 1, transitionDuration: `${FADE_DURATION}ms` }}
            aria-hidden={isFading}
          />
          {/* next image - only render while transitioning; stable key tied to nextImage */}
          {nextImage !== null && (
            <img
              key={`img-next-${nextImage}`}
              className="drop-shadow-logo absolute top-0 left-0 h-full w-full object-contain transition-opacity"
              src={images[nextImage].src}
              alt={images[nextImage].alt}
              style={{ opacity: isFading ? 1 : 0, transitionDuration: `${FADE_DURATION}ms` }}
              aria-hidden={!isFading}
            />
          )}
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
