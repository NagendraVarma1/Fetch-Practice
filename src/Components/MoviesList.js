import Movie from "./Movie";

const MoviesList = (props) => {
    return(
        <ul>
            {props.movies.map((movie) => (
                <Movie key= {movie.id} 
                id={movie.id}
                title={movie.title}
                releaseDate= {movie.releaseDate}
                openingText = {movie.openingText} 
                onButtonClick={props.onButtonClick}/>
            ))}
        </ul>
    )
}

export default MoviesList;