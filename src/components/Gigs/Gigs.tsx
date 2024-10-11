// import { storeSetlist } from '@context/index';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavIndicator } from '..';
import { footswitch } from '../../const';
import { TGig } from '../../types';
import { displayDate } from '../../utils';
import { getDateBasedStyling, fetchGigs } from './utils';

const Gigs = () => {
  const Navigate = useNavigate();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [gigs, setGigs] = useState<TGig[]>([]);

  useEffect(() => {
    const getAndSetGigs = async () => {
      const gigs = await fetchGigs();
      if (gigs) {
        setGigs(gigs.sort((a, b) => new Date(a.dateTime).valueOf() - new Date(b.dateTime).valueOf()));
      }
    };

    getAndSetGigs();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date

    // Find the index of the gig for today or the last gig before today
    const gigIndex = gigs.reduce((acc, gig, index) => {
      const gigDate = new Date(gig.dateTime);
      gigDate.setHours(0, 0, 0, 0); // Normalize gig date

      // If gigDate is today or before today and closer to today than the current acc
      if (gigDate <= today && (acc === -1 || gigDate > new Date(gigs[acc].dateTime))) {
        return index;
      }
      return acc;
    }, -1);

    // If a gig is found, focus on its button
    if (gigIndex !== -1 && buttonsRef.current[gigIndex]) {
      buttonsRef.current[gigIndex].focus();
    }
  }, [gigs]);

  const endOfListRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: { key: string }) => {
    const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
    if (event.key === footswitch.centreShort) {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
      buttonsRef.current[currentIndex].click();
    } else if (event.key === footswitch.leftShort && currentIndex > 0) {
      buttonsRef.current[currentIndex - 1].focus();
      buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (event.key === footswitch.rightShort) {
      if (currentIndex < buttonsRef.current.length - 1) {
        buttonsRef.current[currentIndex + 1].focus();
        buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (endOfListRef.current) {
        endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectGig = (gig: TGig): void => {
    
    Navigate(`/setList/${gig.id}`);
  };

  return (
    <div className="overflow-y-hidden">
      <div onKeyDown={handleKeyDown} tabIndex={0}>
        <h1 className="my-5 font-fredericka text-7xl text-bj-white">Gigs</h1>
        <ul className="mb-20 mt-8">
          {gigs.map((gigFromList: TGig, index) => (
            <li key={gigFromList.id}>
              <GigButton
                ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                classes={`${getDateBasedStyling(gigFromList.dateTime)}`}
                onclick={() => handleSelectGig(gigFromList)}
                text={`${displayDate(gigFromList.dateTime)}, ${gigFromList.venue}, ${gigFromList.town}`}
              />
            </li>
          ))}
          <li key="repertoire">
            <GigButton
              ref={(el: HTMLButtonElement) => (buttonsRef.current[gigs.length] = el)}
              classes="bg-bj-blue-dark text-bj-blue-light"
              onclick={() => Navigate(`/repertoire/`)}
              text="Repertoire"
            />
          </li>
          <div ref={endOfListRef} />
        </ul>
      </div>
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" />
    </div>
  );
};

type TProps = {
  classes: string;
  text: string;
  onclick?: () => void;
};

const GigButton = forwardRef<HTMLButtonElement, TProps>(({ classes, text, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`my-2 w-2/3 rounded-full border-none p-2 px-6 text-center text-7xl transition-colors duration-300 ease-in-out focus:bg-bj-green-mid focus:text-bj-white focus:outline-none focus:ring-2 focus:ring-bj-green-dark focus:ring-offset-2 ${classes}`}
      onClick={onclick}
    >
      {text}
    </button>
  );
});

export default Gigs;
