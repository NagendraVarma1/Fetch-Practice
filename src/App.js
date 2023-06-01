import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./Components/MoviesList";
import MovieForm from "./Components/MovieForm/MovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [render, setRender] = useState(true)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setRender(false);
    setError(null);
    try {
      const response = await fetch(
        "https://react-project-4e5e7-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong.....Retrying");
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);
  
  const renderHandler = () => {
    setRender(true)
  }

  useEffect(() => {
    console.log('testing useEffect');
    if(render) {
      fetchMoviesHandler();
    }
      
  }, [render, fetchMoviesHandler]);


  return (
    <React.Fragment>
      <section>
        <MovieForm onButtonClick= {renderHandler}/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && movies.length === 0 && !error && <p>No Movies....</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} onButtonClick= {renderHandler}/>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
