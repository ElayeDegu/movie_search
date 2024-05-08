import MovieSearch from "@/components/MovieSearch";
import MovieResults from "@/components/MovieResults";
import Movie from "@/components/Movie";
import { useState } from "react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <MovieSearch onSearch={handleSearch} />
      {searchTerm && <MovieResults searchTerm={searchTerm} onSelect={handleSelect} />}
      {selectedMovie && <Movie id={selectedMovie.imdbID} />}
    </div>
  );
};

export default Home;