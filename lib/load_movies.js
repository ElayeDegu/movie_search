// API to fetch all movies
export const loadPosts = async () => {
    // Call an external API endpoint to get posts
    https://api.themoviedb.org/3/search/movie?api_key={578e646a5044941759cebddb08deb4e7}&query={query}
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    return data;
  }

  // API to fetch a post by ID
  export const loadPost = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const data = await res.json();
    return data
  }

  https://www.themoviedb.org/u/Ellaass/watchlist?sort_by=upcoming
  https://www.themoviedb.org/search?query=The%20Lion%20King