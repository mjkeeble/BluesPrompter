import { storeSetlist, storeSongs } from '@context/index';
import { TGig, TSong } from 'src/types';
import {flattenSetlist} from '../../utils';

export const fetchGig = async (id: string): Promise<TGig | null> => {
  try {
    const response: TGig = await (await fetch(`http://localhost:3000/gigs/${id}`)).json();
storeSetlist(flattenSetlist(response.setlist));
    return response;
  } catch (error) {
    console.error('Error fetching gig', error);
    return null;
  }
};

export const fetchAndStoreSongs = async (ids: number[]): Promise<TSong[]> => {
  const songs: TSong[] = [];
  try {
    await Promise.all(
      ids.map(async (id) => {
        const response: TSong = await (await fetch(`http://localhost:3000/songs/${id}`)).json();
        songs.push(response);

      }),
    );

    storeSongs(songs);
    return songs;
  } catch (error) {
    console.error('Error fetching songs', error);
    return [];
  }
};
