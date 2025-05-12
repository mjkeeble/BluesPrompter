import { TSong } from 'src/types';
import { TSongData } from './Setlist';

export const fetchSongs = async (ids: string[]): Promise<(TSongData | 'Song not found')[]> => {
  try {
    const songs = await Promise.all(
      ids.map(async (id) => {
        try {
          const response: TSong = await (await fetch(`http://localhost:3000/songs/${id}`)).json();
          const { title, version } = response;
          return { id, title, version };
        } catch (error) {
          console.error(`Error fetching song with id ${id}`, error);
          return 'Song not found';
        }
      }),
    );
    return songs;
  } catch (error) {
    console.error('Error fetching songs', error);
    return [];
  }
};
