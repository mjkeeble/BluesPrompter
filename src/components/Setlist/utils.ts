import { TSong } from 'src/types';
import { TSongData } from './Setlist';
export const fetchSongs = async (ids: number[]): Promise<(TSongData | 'Song not found')[]> => {
  const songs: (TSongData | 'Song not found')[] = [];
  try {
    await Promise.all(
      ids.map(async (id) => {
        try {
          const response: TSong = await (await fetch(`http://localhost:3000/songs/${id}`)).json();
          const { title, version } = response;
          songs.push({ id, title, version });
        } catch (error) {
          songs.push('Song not found');
        }
      }),
    );
    return songs;
  } catch (error) {
    console.error('Error fetching songs', error);
    return [];
  }
};
