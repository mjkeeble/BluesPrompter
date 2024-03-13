import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { TAction } from 'src/types';

type TProps = {
  action: TAction;
  currentSong: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  songPages: number;
  Navigate: ReturnType<typeof useNavigate>;
};

const activeKeys = ['j', 'k', 'm'];

// This component returns null. It is only responsible for handling user commands

export const HandleSongPageInteraction: React.FC<TProps> = ({
  action,
  currentSong,
  currentPage,
  setCurrentPage,
  songPages,
  Navigate,
}) => {
  // console.log('🚀 ---------------------------🚀');
  // console.log('🚀 => songPages:', songPages);
  // console.log('🚀 ---------------------------🚀');

  // if action data is incomplete or pressed button is invalid, ignore
  if (!action.keyPressed || !activeKeys.includes(action.keyPressed)) return null;

  // j short press
  if (action.keyPressed === 'j' && !action.isLongPress) {
    console.log(' j short');

    // go to previous page in song
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  }

  // k short press
  if (action.keyPressed === 'k' && !action.isLongPress) {
    console.log(' k short');
    if (currentPage < songPages) {
      // go to next page in song
      setCurrentPage(currentPage + 1);
    } else {
      // go to next song if at the end of this one
      Navigate(`/song/${currentSong + 1}`);
    }
  }

  //m long press
  if (action.keyPressed === 'm' && action.isLongPress) {
    console.log(' m long');
    if (!currentPage) {
      // console.log('go to setlist');
      // TODO:add navigation to setlist
    } else {
      // console.log('freeze timer');
      // TODO:add timer freeze
    }
  }

  // k long press
  if (action.keyPressed === 'k' && action.isLongPress) {
    console.log(' k long');
    // navigate to next song
    Navigate(`/song/${currentSong + 1}`);
  }

  // j long press
  if (action.keyPressed === 'j' && action.isLongPress) {
    console.log(' j long');
    if (!currentPage) {
      // navigate to previous song if on the title page
      Navigate(`/song/${currentSong - 1}`);
    } else {
      // navigate to start of current song if on a lyrics page
      Navigate(`/song/${currentSong}`);
    }
  }

  return null;
};
