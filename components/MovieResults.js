import React, {useState, useEffect} from "react";

const MovieResults = ({searchTerm }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [ currentPage, setCurrentPage] = useState(1);
    const pageSize = 20; 

    const API_KEY = "578e646a5044941759cebddb08deb4e7"
    // When the component mounts make an API call to get the list of movies
    useEffect(() => {
        fetchMovies();

        if (searchTerm) {
            fetchMovies();
        } else {
            setMovies([]);
            setTotalResults(0)
        };
    }, [searchTerm, currentPage]);

    const fetchMovies = async  () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
            const data = await response.json();
            setMovies(data.results);
            setTotalResults(data.totalResults);
            setIsLoading(false);
            setError(null);
        } catch (error) {
            setIsLoading(false);
            setError(error.response.data.message);
        }
        
      };

    const pageNumbers = [];
    for (let i=1; i <= Math.ceil(totalResults/pageSize); i++) {
        pageNumbers.push(i);
    }
    
    
    return ( 
        <>
            <div className="ui relaxed divided list">
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}
            {error && <p>{error}</p>}
            {movies.map((movie) => (
                <div className="item" key={movie.id}>
                    <i className={`large middle aligned icon film`} />
                    <div className="content">
                        <a href={`#${movie.id}`} className="header">{movie.title}</a>
                        <div className="description">
                            <p>{movie.releaseDate}</p>
                            {/* <img src={`https://image.tmdb.org/t/p/w500${movie.posterImage}`} /> */}
                            <p>{movies.averageRating}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <nav className="pagination">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={number === currentPage? 'active' : ''}>
              <a onClick={() => paginate(number)} href={`/search?q=${searchTerm}&page=${number}`}>
                {number}
              </a>
            </li>
          ))}
        </ul>
        </nav>
        </>
    )
};

export const getServerSideProps = async ({ query }) => {
    return {
      props: {
        searchTerm: query.searchTerm,
      },
    };
  };
export default MovieResults;
            
