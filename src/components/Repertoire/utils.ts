import { footswitch } from 'src/const';
import { TGig, TSong } from 'src/types';

export const fetchSongs = async (): Promise<TSong[] | null> => {
  try {
    const response: TSong[] = await (await fetch(`http://localhost:3000/songs`)).json();
    return response.sort((a, b) => {
      const titleComparison = a.title.localeCompare(b.title);
      if (titleComparison !== 0) {
        return titleComparison;
      }
      return (a.version ?? '').localeCompare(b.version ?? '');
    });
  } catch (error) {
    console.error('Error fetching songs', error);
    return null;
  }
};

export const handleKeyDown = (
  event: { key: string },
  buttonsRef: React.RefObject<HTMLButtonElement[]>,
  repertoireList: TSong[],
  endOfListRef: React.RefObject<HTMLDivElement | null>,
  gig: TGig | undefined,
  Navigate: (path: string) => void,
) => {
  if (buttonsRef.current) {
    const currentIndex = buttonsRef.current.findIndex((button) => button === document.activeElement);
    if (currentIndex === -1) return; // Add this check to ensure currentIndex is valid

    switch (event.key) {
      case footswitch.CENTRE_SHORT:
        buttonsRef.current[currentIndex].click();
        break;
      case footswitch.LEFT_SHORT:
        if (currentIndex > 0) {
          moveFocus(buttonsRef, currentIndex, -1);
        } else if (currentIndex === 0) {
          moveFocus(buttonsRef, repertoireList.length, -1);
        }
        break;
      case footswitch.RIGHT_SHORT:
        if (currentIndex < buttonsRef.current.length - 1) {
          moveFocus(buttonsRef, currentIndex, 1);
        } else if (currentIndex === buttonsRef.current.length - 1) {
          moveFocus(buttonsRef, 0, 0);
        } else if (endOfListRef.current) {
          endOfListRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        break;
      case footswitch.LEFT_LONG:
        if (currentIndex > 10) {
          moveFocus(buttonsRef, currentIndex, -10);
        } else {
          moveFocus(buttonsRef, 0, 0);
        }
        break;
      case footswitch.RIGHT_LONG:
        if (currentIndex + 10 < buttonsRef.current.length) {
          moveFocus(buttonsRef, currentIndex, 10);
        } else {
          moveFocus(buttonsRef, buttonsRef.current.length - 1, 0);
        }
        break;
      case footswitch.CENTRE_LONG:
        gig && gig.id !== 'repertoire' ? Navigate(`/setlist`) : Navigate('/');
        break;
      default:
        break;
    }
  }
};

export const moveFocus = (
  buttonsRef: React.RefObject<HTMLButtonElement[]>,
  currentIndex: number,
  shift: number,
): void => {
  if (buttonsRef.current) {
    if (buttonsRef.current[currentIndex + shift]) {
      buttonsRef.current[currentIndex + shift].focus();
      buttonsRef.current[currentIndex + shift].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};
