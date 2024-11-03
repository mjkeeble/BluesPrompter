import {
  IconDefinition,
  faArrowRotateRight,
  faBackwardFast,
  faBackwardStep,
  faDownLong,
  faEject,
  faForward,
  faForwardStep,
  faHandPointer,
  faMinus,
  faPause,
  faPlay,
  faUpLong,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { symbolKeys } from 'src/types';

type TProps = {
  leftLong?: symbolKeys;
  leftShort?: symbolKeys;
  centreShort?: symbolKeys;
  centreLong?: symbolKeys;
  rightShort?: symbolKeys;
  rightLong?: symbolKeys;
};

const symbols: { [key: string]: IconDefinition } = {
  backward: faPlay,
  backwardFast: faBackwardFast,
  backwardStep: faBackwardStep,
  down: faDownLong,
  eject: faEject,
  forwardStep: faForwardStep,
  pause: faPause,
  point: faHandPointer,
  play: faPlay,
  reload: faArrowRotateRight,
  skipDown: faForward,
  skipUp: faForward,
  up: faUpLong,
  x: faX,
};

const NavIndicator: React.FC<TProps> = ({ leftLong, leftShort, centreLong, centreShort, rightLong, rightShort }) => {
  const showShort = leftShort || centreShort || rightShort;
  const showLong = leftLong || centreLong || rightLong;
  const rows = (showLong ? 1 : 0) + (showShort ? 1 : 0);

  if (!rows) return <></>;

  return (
    <div className={`fixed bottom-0 left-0 m-1 rounded-lg border-2 bg-black py-2 text-3xl`}>
      {showShort ? (
        <div className="grid grid-cols-3">
          <FontAwesomeIcon
            className="mx-3 text-center text-bj-blue-light"
            icon={leftShort ? symbols[leftShort] : faMinus}
            rotation={leftShort === 'backward' ? 180 : undefined}
          />

          <FontAwesomeIcon
            className="mx-3 text-center text-bj-blue-light"
            icon={centreShort ? symbols[centreShort] : faMinus}
          />

          <FontAwesomeIcon
            className="mx-3 text-center text-bj-blue-light"
            icon={rightShort ? symbols[rightShort] : faMinus}
          />
        </div>
      ) : null}

      {showLong ? (
        <div className="grid grid-cols-3">
          <FontAwesomeIcon
            className="mx-3 mt-2 text-center text-bj-green-light"
            icon={leftLong ? symbols[leftLong] : faMinus}
            rotation={leftLong === 'skipUp' ? 270 : undefined}
          />

          <FontAwesomeIcon
            className="mx-3 mt-2 text-center text-bj-green-light"
            icon={centreLong ? symbols[centreLong] : faMinus}
          />

          <FontAwesomeIcon
            className="mx-3 mt-2 text-center text-bj-green-light"
            icon={rightLong ? symbols[rightLong] : faMinus}
            rotation={rightLong === 'skipDown' ? 90 : undefined}
          />
        </div>
      ) : null}
    </div>
  );
};

export default NavIndicator;
