import { useState, useEffect } from "react"
import { useDebounce } from "use-debounce";



const MovieSearch = ({ onSearch}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const debouncedSearchQuery = useDebounce(searchTerm, 500);

    const API_KEY = "578e646a5044941759cebddb08deb4e7" 
    useEffect(() => {
        onSearch(debouncedSearchQuery);
    }, [debouncedSearchQuery, onSearch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try{
            let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            let data = await response.json(); 
            setIsLoading(false);
            if(!data.results){
                return;
            }
            window.location.assign("/search?query=" + searchTerm);
            setError(null);
        } catch(err) {
            console.log(err);
            setIsLoading(false);
            setError(error.response.data.message);
        }
    };
    
    
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Search for a Movie</h1>
           <form onSubmit={handleSubmit}>
            <input type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search for a Movie..." 
            className="border border-gray-300 rounded-md px-4 py-2 mb-2" />
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white rounded-md px-4 py-2">
                {isLoading ? 'Loading...' : 'Search'}
            </button>
        </form>
        {error && <p>{error}</p>} 
        {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}
        </div>
        
        
    )
};

export const getStaticProps = async () => {
    return {
      props: {},
    };
};

export default MovieSearch;