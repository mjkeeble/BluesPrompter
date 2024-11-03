import { useNavigate } from 'react-router-dom';

// Intro page for online demo version
const Demo = () => {
  const Navigate = useNavigate();
  return (
    <div className="grid-row m-8 grid grid-cols-5 grid-rows-1">
      <div className="col-span-3 flex h-screen flex-col items-center justify-center">
        <div className="w-3/5">
          <img src="/songPrompter_logo_transparent_white.png" alt="songPrompter. Your songs. On stage. No worries" />
        </div>
      </div>
      <div className="col-span-2 flex h-screen flex-col items-start  justify-center">
        <h1 className="w-full pb-10 text-center">Welcome to the Blues Prompter demo!</h1>
        <p className="text-2xl">Blues Prompter is designed to be operated with a footswitch.</p>
        <p className="text-2xl">Use the following keys to emulate the footswitch actions in this demo:</p>
        <div className="grid-row grid w-full grid-cols-4 grid-rows-3 text-3xl">
          <div className="col-span-1 pb-4 pt-4"></div>
          <div className="col-span-1 pb-4 pt-4">Left switch</div>
          <div className="col-span-1 pb-4 pt-4">Centre switch</div>
          <div className="col-span-1 pb-4 pt-4">Right switch</div>
          <div className="col-span-1 pb-4 pt-4">Short press</div>
          <div className="col-span-1 pb-4 pt-4 font-semibold">U</div>
          <div className="col-span-1 pb-4 pt-4 font-semibold">I</div>
          <div className="col-span-1 pb-4 pt-4 font-semibold">O</div>
          <div className="col-span-1 pt-4">Long press</div>
          <div className="col-span-1 pt-4 font-semibold">J</div>
          <div className="col-span-1 pt-4 font-semibold">K</div>
          <div className="col-span-1 pt-4 font-semibold">L</div>
        </div>
        <p className="pt-10 text-2xl">
          The available options will be indicated in the bottom right corner of the screen.
        </p>
        <div className="flex w-full flex-row justify-center">
          <button
            className="mt-36 w-60 rounded-lg bg-bj-green-light p-4 text-5xl font-semibold text-black"
            onClick={() => Navigate('/gigs/')}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Demo;
