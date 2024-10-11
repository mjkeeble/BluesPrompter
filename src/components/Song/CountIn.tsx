import { useEffect, useState } from 'react';

type TProps = {
  tempo: number;
  timeSignature: string;
};

const getCountSymbols = (timeSignature: string): string[] => {
  // switch
  switch (timeSignature) {
    case '3/4':
      return ['1', '2', '3'];
    case '4/4':
      return ['1', '2', '3', '4'];
    case '6/8':
      return ['1', '.', '.', '2', '.', '.', "3", '.', '.'];
    case '12/8':
      return ['1', '.', '.', '2', '.', '.', "3", '.', '.', '4', '.', '.'];
    default:
      return ['1', '2', '3', '4'];
  }
}



const CountIn: React.FC<TProps> = ({ tempo, timeSignature }) => {
  const [activesymbol, setActiveSymbol] = useState<number>(0);
  const countSymbols = getCountSymbols(timeSignature);
  const countTempoMultiple = 
  ['6/8', '12/8'].includes(timeSignature) ?  3 :  1;
  const beatDuration = 60000 / (tempo * countTempoMultiple); // Duration of a single beat in ms

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSymbol((prevNumber) => (prevNumber + 1) % countSymbols.length);
    }, beatDuration);

    return () => clearInterval(interval);
  }, [beatDuration, countSymbols.length]);

  return (
    <div className="mt-36 flex flex-row">
      {countSymbols.map((symbol, index) => (
        <p
          key={index}
          className={
            index === activesymbol
              ? 'transition-all duration-300 grow font-semibold text-countin bg-bj-green-light text-black'
              : 'transition-all grow font-semibold text-countin text-bj-white'
          }
        >
          {symbol}
        </p>
      ))}
    </div>
  );
};

export default CountIn;
