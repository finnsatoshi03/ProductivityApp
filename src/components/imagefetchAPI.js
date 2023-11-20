const UNSPLASH_ACCESS_KEY = 'DwofUXPr1rcqUsoyYR2_Y9nAYxj8Z7z3rCxvpRrF7gc';

export default async function fetchSquareImage(query) {
  try {
    const apiUrl = 'https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&query="${encodeURIComponent(query)}"';
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return data.urls.regular; // Return the URL of the image
    } else {
      throw new Error('Failed to fetch image');
    }
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}