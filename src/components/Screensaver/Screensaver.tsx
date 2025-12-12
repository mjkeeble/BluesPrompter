import { NavIndicator } from '@components/index';
import { goFullScreen } from '@components/utils';
import { useEffect, useMemo, useRef, useState } from 'react';

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
const FADE_OUT_MS = 800; // ms - old image fade out
const FADE_IN_MS = 800; // ms - new image fade in

const Screensaver: React.FC<TProps> = ({isStart, isLastSong}) => {
  const images: TImage[] = useMemo(() => [
    { src: '/blues_jab_logo.svg', alt: 'Blues Jab - Boy Band of the Blues', text: '' },
    { src: '/bp_icon_with_text_inkscape.svg', alt: 'Blues Prompter. Your songs. Your stage. No worries', text: '' },
  ],[]);


  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState<number | null>(null);
  const [prevImage, setPrevImage] = useState<number | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutRef2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    goFullScreen();
  }, []);

  const preloadImage = (src: string) =>
    new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
      if (img.complete && img.naturalWidth) resolve();
    });

  useEffect(() => {
    let mounted = true;

    intervalRef.current = setInterval(() => {
      (async () => {
        const idx = (currentImage + 1) % images.length;

        // preload next image
        await preloadImage(images[idx].src);
        if (!mounted) return;

        // prepare staged transition
        setNextImage(idx);           // mount next image (underneath) at opacity 0
        setPrevImage(currentImage);  // keep previous image (on top) for fade out
        setIsFadingIn(false);
        // start fade out of previous image
        // slight delay to ensure DOM paint
        timeoutRef.current = setTimeout(() => {
          if (!mounted) return;
          setIsFadingOut(true); // prev -> opacity 0
        }, 20);

        // when fade-out finishes, swap current, remove prev and start fade-in
        timeoutRef2.current = setTimeout(() => {
          if (!mounted) return;
          setIsFadingOut(false);
          setPrevImage(null);     // remove prev from DOM
          setCurrentImage(idx);   // commit new image as current
          setIsFadingIn(true);    // start fade in of next
          // after fade-in done, clear nextImage and fading state
          timeoutRef.current = setTimeout(() => {
            if (!mounted) return;
            setIsFadingIn(false);
            setNextImage(null);
          }, FADE_IN_MS);
        }, FADE_OUT_MS + 20); // ensure this runs after the out transition
      })();
    }, IMAGE_DURATION * 1000);

    return () => {
      mounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
    };
    // include currentImage so interval recalculates against latest base image
  }, [currentImage, images]);

  return (
    <div>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="relative flex h-2/3 w-2/3 items-center justify-center">
          {/* next image (underneath) - rendered during transition, fades in */}
          {nextImage !== null && (
            <img
              key={`img-next-${nextImage}`}
              className="drop-shadow-logo absolute top-0 left-0 h-full w-full object-contain transition-opacity"
              src={images[nextImage].src}
              alt={images[nextImage].alt}
              style={{
                opacity: isFadingIn ? 1 : 0,
                transitionDuration: `${FADE_IN_MS}ms`,
                zIndex: 1,
              }}
              aria-hidden={!isFadingIn}
            />
          )}

          {/* current image - normal display or will become the 'prev' during transition */}
          <img
            key={`img-current-${currentImage}`}
            className="drop-shadow-logo absolute top-0 left-0 h-full w-full object-contain transition-opacity"
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            style={{
              opacity: prevImage !== null && isFadingOut ? 0 : 1,
              transitionDuration: `${FADE_OUT_MS}ms`,
              zIndex: prevImage !== null ? 2 : 1,
            }}
            aria-hidden={false}
          />

          {/* previous image (kept for fade-out) - rendered on top while fading out */}
          {prevImage !== null && (
            <img
              key={`img-prev-${prevImage}`}
              className="drop-shadow-logo absolute top-0 left-0 h-full w-full object-contain transition-opacity"
              src={images[prevImage].src}
              alt={images[prevImage].alt}
              style={{
                opacity: isFadingOut ? 0 : 1,
                transitionDuration: `${FADE_OUT_MS}ms`,
                zIndex: 3,
              }}
              aria-hidden={isFadingOut}
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
