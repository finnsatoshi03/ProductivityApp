const UNSPLASH_ACCESS_KEY = 'DwofUXPr1rcqUsoyYR2_Y9nAYxj8Z7z3rCxvpRrF7gc';

export default async function fetchSquareImage(query) {
  try {
    const params = new URLSearchParams({
        client_id: UNSPLASH_ACCESS_KEY,
        query: encodeURIComponent(query),
        orientation: 'portrait', // Example additional parameter for landscape images
        // Add more parameters as needed, such as color, collections, etc.
      });
  
    const apiUrl = `https://api.unsplash.com/photos/random?${params}`;
    
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