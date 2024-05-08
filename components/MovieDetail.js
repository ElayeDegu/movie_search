const MovieDetail = async ({ movie }) => {

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.plot}</p>
            <p>Genres: {movie.genres.join(', ')}</p>
            <p>Runtime: {movie.runtime} minutes</p>
        </div>
    );
};

export const getStaticProps = async ({ params }) => {
  const API_KEY = "578e646a5044941759cebddb08deb4e7"
    const movieId = params.id;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`);
    const data = await response.json();
    return {
      props: {
        movie: data,
      },
    };
  };

export default MovieDetail;