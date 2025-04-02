import { forwardRef } from 'react';

type TProps = {
  classes?: string;
  title: string;
  version?: string;
  onclick?: () => void;
};

const SongListButton = forwardRef<HTMLButtonElement, TProps>(({ classes, title, version, onclick }, ref) => {
  return (
    <button
      ref={ref}
      className={`my-2 w-2/3 rounded-full border-none p-2 text-center  transition-colors duration-300 ease-in-out text-5xl focus:text-6xl focus:font-semibold focus:outline-none focus:ring-2 focus:ring-bj-green-dark focus:ring-offset-2 ${classes}`}
      onClick={onclick}
    >
      {title}
      {version ? <p className='text-2xl'>{version}</p> : null}
    </button>
  );
});

export default SongListButton;
