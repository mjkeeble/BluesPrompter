import { TSong } from 'src/types';

export const fetchSongs = async (): Promise<TSong[] | null> => {
  try {
    const response: TSong[] = await (await fetch(`http://localhost:3000/songs`)).json();
    return response.sort((a, b) => {
      const titleComparison = a.title.localeCompare(b.title);
      if (titleComparison !== 0) {
        return titleComparison;
      }
      return (a.version ?? '').localeCompare(b.version ?? '');
    });
  } catch (error) {
    console.error('Error fetching songs', error);
    return null;
  }
};
