import React from "react";

function Movie({ movie }) {
  console.log(movie);
  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.movie_image} alt="" />
    </div>
  );
}

export default Movie;
