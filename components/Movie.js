import MovieDetail from "@/components/MovieDetail";
import { useRouter } from "next/router"

const Movie = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            <h1>Movie Details</h1>
            <MovieDetail movie={{ id: id}} />
        </div>
    );

};

export default Movie;