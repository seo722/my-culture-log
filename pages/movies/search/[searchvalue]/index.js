import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

function SearchValue() {
  const router = useRouter();
  const searchValue = router.query.searchvalue;
  const { data, isLoading } = useQuery(["search", searchValue], () =>
    searchMovies(searchValue)
  );
  console.log(data?.results);

  const onBackClick = () => {
    router.push("/movies/search");
  };

  return (
    <div>
      <div>
        <button onClick={onBackClick} className="border p-3 rounded-lg m-3">
          뒤로가기
        </button>
        {data?.results.map((movie) => (
          <>
            <h1>{movie.title}</h1>
            <img
              src={makeImagePath(movie.poster_path, "w500")}
              alt={movie.title}
            />
          </>
        ))}
      </div>
    </div>
  );
}

export default SearchValue;

const API_KEY = "c8f19c449ebdc0261f133e83ef901c46";
const BASE_PATH = "https://api.themoviedb.org/3";

function searchMovies(keyword) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1`
  ).then((response) => response.json());
}

function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}