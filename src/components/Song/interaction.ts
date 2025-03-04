import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIVEKEYS, footswitch } from 'src/const';
import { TInput } from 'src/types';
import { goto } from './utils';

type TProps = {
  footswitchInput: TInput;
  currentSong: number;
  totalSongs: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  songPages: number;
  showingScreensaver: boolean;
  hasTimer: boolean;
  timerHalted: boolean;
  setTimerHalted: Dispatch<SetStateAction<boolean>>;
  Navigate: ReturnType<typeof useNavigate>;
};

// This component returns null (i.e.no visible component). It is only responsible for handling user commands

export const ManageInteraction = ({
  footswitchInput,
  currentSong,
  totalSongs,
  currentPage,
  setCurrentPage,
  hasTimer,
  timerHalted,
  setTimerHalted,
  songPages,
  showingScreensaver,
  Navigate,
}: TProps) => {
  // TITLE PAGE

  if (footswitchInput && !ACTIVEKEYS.includes(footswitchInput)) return;

  const isLastSong = currentSong === totalSongs - 1;
  const isLastPage = currentPage === songPages;

  // BREAK
  if (showingScreensaver) {
    switch (footswitchInput) {
      case footswitch.LEFT_SHORT:
        currentSong ? goto.previousSong(currentSong, Navigate) : null;
        return;

      case footswitch.RIGHT_SHORT:
        isLastSong ? goto.repertoire(Navigate) : goto.nextSong(currentSong, Navigate);
        return;

      case footswitch.CENTRE_LONG:
        goto.setList(Navigate);
        return;

      default:
        return;
    }
  }

  // TITLE PAGE
  if (!currentPage) {
    switch (footswitchInput) {
      case footswitch.LEFT_SHORT:
        goto.previousSong(currentSong, Navigate);
        return;

      case footswitch.RIGHT_SHORT:
        goto.nextPage(currentPage, setCurrentPage);
        return;

      case footswitch.CENTRE_LONG:
        goto.setList(Navigate);
        return;

      case footswitch.RIGHT_LONG:
        isLastSong ? goto.repertoire(Navigate) : goto.nextSong(currentSong, Navigate);
        return;

      default:
        return;
    }
  }
  // LYRIC PAGE
  if (!isLastPage && currentPage) {
    switch (footswitchInput) {
      case footswitch.LEFT_SHORT:
        goto.previousPage(currentPage, setCurrentPage);
        return;

      case footswitch.CENTRE_SHORT:
        if (hasTimer) {
          goto.toggleTimerFreeze(timerHalted, setTimerHalted);
        } else {
          setTimerHalted(false);
        }
        return;

      case footswitch.RIGHT_SHORT:
        goto.nextPage(currentPage, setCurrentPage);
        return;

      case footswitch.LEFT_LONG:
        goto.titlePage(setCurrentPage);
        return;

      case footswitch.CENTRE_LONG:
        // reload page
        window.location.reload();
        return;

      case footswitch.RIGHT_LONG:
        isLastSong ? goto.repertoire(Navigate) : goto.nextSong(currentSong, Navigate);
        return;

      default:
        return;
    }
  }
  // LAST LYRIC PAGE
  if (isLastPage) {
    switch (footswitchInput) {
      case footswitch.LEFT_SHORT:
        goto.previousPage(currentPage, setCurrentPage);
        return;

      case footswitch.CENTRE_SHORT:
        hasTimer ? goto.toggleTimerFreeze(timerHalted, setTimerHalted) : setTimerHalted(false);
        return;

      case footswitch.RIGHT_SHORT:
        isLastSong ? goto.repertoire(Navigate) : goto.nextSong(currentSong, Navigate);
        return;

      case footswitch.LEFT_LONG:
        goto.titlePage(setCurrentPage);
        return;

      case footswitch.CENTRE_LONG:
        // reload page
        window.location.reload();
        return;

      default:
        return;
    }
  }
};
