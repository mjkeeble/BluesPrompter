import { Demo, Gigs, Repertoire, Setlist, Song } from '@components/index';
import { ConfigContextProvider } from '@context/configContext';
import { GigContextProvider } from '@context/gigContext';
import { Route, Routes } from 'react-router-dom';
import 'src/App.css';

const App = () => {
  return (
    <div id="App" className="bg-bj-black h-full w-full cursor-none overflow-y-hidden text-bj-white">
      <ConfigContextProvider>
        <GigContextProvider>
          <Routes>
            <Route path="/" element={<Gigs />} />
            <Route path="demo/" element={<Demo />} />
            <Route path="song/:id" element={<Song />} />
            <Route path="setlist/" element={<Setlist />} />
            {/* <Route path="setlist/:id" element={<Setlist />} /> */}
            <Route path="repertoire/" element={<Repertoire />} />
          </Routes>
        </GigContextProvider>
      </ConfigContextProvider>
    </div>
  );
};

export default App;
