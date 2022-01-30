import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Ratings } from "./pages";
import { useState, useEffect } from "react";
import FormData from "form-data";

function App() {
  let [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("./movies.json")
      .then((response) => response.json())
      .then(setMovies);
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={movies}
              onRemoveMovie={(title) => {
                // console.log(title);
                const updatedMovies = movies.filter(
                  (movie) => movie.Title !== title
                );
                setMovies(updatedMovies);
                console.log(movies);
              }}
            />
          }
        />
        <Route
          path="/ratings"
          element={
            <Ratings
              newReview={(Title, Actors, Poster, Rating, Released) => {
                const Review = [
                  ...movies,
                  { Title, Actors, Poster, Rating, Released },
                ];
                setMovies(Review);
              }}
            />
          }
        />
        console.log(formData)
      </Routes>
    </div>
  );
}

export default App;
