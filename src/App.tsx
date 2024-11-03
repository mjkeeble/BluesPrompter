import { Demo, Gigs, Repertoire, Setlist, Song } from '@components/index';
import { ConfigProvider } from '@context/configContext';
import { Route, Routes } from 'react-router-dom';
import 'src/App.css';

const App = () => {
  return (
    <div id="App" className="cursor-none overflow-y-hidden text-bj-white">
      <ConfigProvider>
        <Routes>
          <Route path="/" element={<Gigs />} />
          <Route path="demo/" element={<Demo />} />
          <Route path="song/:id" element={<Song />} />
          <Route path="setlist/" element={<Setlist />} />
          <Route path="setlist/:id" element={<Setlist />} />
          <Route path="repertoire/" element={<Repertoire />} />
        </Routes>
      </ConfigProvider>
    </div>
  );
};

export default App;
