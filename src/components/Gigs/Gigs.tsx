// import { storeSetlist } from '@context/index';
import { NavIndicator } from '@components/index';
import { goFullScreen } from '@components/utils';
import { GigContext } from '@context/gigContextDefinition';
import { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { footswitch } from 'src/const';
import { Gig } from 'src/types';
import { displayDate } from 'src/utils';
import { fetchGigs, getDateBasedStyling } from './utils';

const Gigs = () => {
  const Navigate = useNavigate();
  const gigContext = useContext(GigContext);
  const setGig = gigContext?.setGig;

  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);

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
      if (gigDate >= today && (acc === -1 || gigDate < new Date(gigs[acc].dateTime))) {
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

    switch (event.key) {
      case footswitch.CENTRE_SHORT: {
        goFullScreen;
        buttonsRef.current[currentIndex].click();
        break;
      }
      case footswitch.LEFT_SHORT: {
        if (currentIndex > 0) {
          buttonsRef.current[currentIndex - 1].focus();
          buttonsRef.current[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        break;
      }
      case footswitch.RIGHT_SHORT: {
        if (currentIndex < buttonsRef.current.length - 1) {
          buttonsRef.current[currentIndex + 1].focus();
          buttonsRef.current[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (endOfListRef.current) {
          endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      }
      default:
        break;
    }
  };

  const handleSelectGig = (gig: Gig): void => {
    if (setGig) {
      setGig(gig);
    }
    Navigate(`/setList`);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className=" flex flex-col items-center overflow-y-hidden">
        <div className="w-3/4" onKeyDown={handleKeyDown} tabIndex={0}>
          <h1 className="my-5 font-fredericka text-7xl text-bj-white">Gigs</h1>
          <ul className="mb-20 mt-8">
            {gigs.map((gigFromList: Gig, index) => (
              <li key={gigFromList.id}>
                <GigButton
                  ref={(el: HTMLButtonElement) => (buttonsRef.current[index] = el)}
                  classes={`${getDateBasedStyling(gigFromList.dateTime)}`}
                  onclick={() => handleSelectGig(gigFromList)}
                  date={`${displayDate(gigFromList.dateTime)}`}
                  location={`${gigFromList.venue}, ${gigFromList.town}`}
                />
              </li>
            ))}
            <li key="repertoire">
              <GigButton
                ref={(el: HTMLButtonElement) => (buttonsRef.current[gigs.length] = el)}
                classes="bg-bj-blue-dark text-bj-blue-light border-5 border-bj-white"
                date=""
                onclick={() => Navigate(`/repertoire/`)}
                location="Repertoire"
              />
            </li>
            <div ref={endOfListRef} />
          </ul>
        </div>
      </div>
      <NavIndicator leftShort="up" centreShort="point" rightShort="down" />
    </div>
  );
};

type TProps = { classes: string; date: string; location: string; onclick?: () => void };

const GigButton = forwardRef<HTMLButtonElement, TProps>(({ classes, date, location, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`border-5 my-2 flex w-full flex-row rounded-full border-bj-white p-2 px-6 text-5xl transition-colors duration-300 ease-in-out focus:bg-bj-green-mid focus:text-bj-white focus:outline-none focus:ring-2 focus:ring-bj-green-dark focus:ring-offset-2  ${classes}`}
      onClick={onclick}
    >
      <div className="text-left">{date}</div>
      <div className="flex-grow text-center">{location === 'Repertoire' ? location : ''}</div>
      <div className="text-right">{location !== 'Repertoire' ? location : ''}</div>
    </button>
  );
});

export default Gigs;
