import { useEffect, useRef } from "react";
import { useState } from "react";
import StarRating from "./StarRating.jsx";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";
import { useKey } from "./useKey.js";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "43f934f6";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectID(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function closeMovie() {
    setSelectedID(null);
  }

  function handleAddMovie(movie) {
    const isWatched = watched.find((e) => e.imdbID === movie.imdbID);
    setWatched(isWatched ? watched : (watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectId={handleSelectID} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              closeMovie={closeMovie}
              onAddMovie={handleAddMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Search({ query, setQuery }) {
  const inputEl = useRef("");

  useKey("Enter", function () {
    if (document.activeElement === inputEl) return;

    inputEl.current.focus();

    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function MovieDetails({ selectedID, closeMovie, onAddMovie, watched }) {
  const [movieDetails, setMovieDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  function handleAddMovie() {
    const movie = {
      imdbID: movieDetails.imdbID,
      userRating: Number(userRating),
      Runtime: Number(movieDetails.Runtime.split(" ").at(0)),
      imdbRating: Number(movieDetails.imdbRating),
      Poster: movieDetails.Poster,
      Title: movieDetails.Title,
      countRatingDecisions: countRef.current,
    };
    onAddMovie(movie);
  }
  function handleUserRating(rating) {
    setUserRating(rating);
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?i=${selectedID}&apikey=${KEY}`
        );

        const data = await res.json();

        setMovieDetails(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!movieDetails.Title) return;
      document.title = `Movie | ${movieDetails.Title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [movieDetails]
  );

  useKey("Escape", closeMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeMovie}>
              &larr;
            </button>
            <img
              src={movieDetails.Poster}
              alt={`Poster of ${movieDetails.movie}`}
            />
            <div className="details-overview">
              <h2>{movieDetails.Title}</h2>
              <p>
                {movieDetails.Released} &bull; {movieDetails.Runtime}
              </p>
              <p>{movieDetails.Genre}</p>
              <p>
                <span>⭐</span>
                {movieDetails.imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!watchedUserRating ? (
                <>
                  <StarRating
                    maxRating={10}
                    size="22px"
                    color="yellow"
                    defaultRating={Math.ceil(Number(movieDetails.imdbRating))}
                    onRating={handleUserRating}
                  />
                  {userRating && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to watched list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating}</p>
              )}
            </div>
            <p>
              <em>{movieDetails.Plot}</em>
            </p>
            <p>Starring {movieDetails.Actors}</p>
            <p>Directed by {movieDetails.Director} </p>
          </section>
        </>
      )}
    </div>
  );
}

function MoviesList({ movies, onSelectId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectId={onSelectId} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectId }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteMovie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
