import React, { useCallback, useEffect, useState } from "react";
import MoviesList from "./Components/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [render, setRender] = useState(false)

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        setRender(true);
        throw new Error("Something went wrong.....Retrying");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, [])


  useEffect(() => {
    if (render) {
      let interval = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
      return () => {
        clearInterval(interval)
      }
    }
    
    if(!error) {
      fetchMoviesHandler()
    }
  }, [render,error, fetchMoviesHandler]);

  const cancleHandler = () => {
    setError(null)
    setRender(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <h1>Loading...</h1>}
        {!isLoading && movies.length === 0 && !error && <p>No Movies....</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && error && <button onClick={cancleHandler}>cancle</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
