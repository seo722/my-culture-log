import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import SearchInput from "../../../../components/SearchInput";

function SearchValue() {
  const router = useRouter();
  const searchValue = router.query.searchvalue;
  const { data, isLoading } = useQuery(["search", searchValue], () =>
    searchMovies(searchValue)
  );

  const onIdClick = (id) => {
    router.push(`/movies/search/${searchValue}/${id}`);
  };

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <SearchInput />
      <div>
        <div>
          {data?.results.map((movie) => (
            <div
              key={movie.id}
              className="cursor-pointer"
              onClick={() => {
                onIdClick(movie.id);
              }}
            >
              <h1>{movie.title}</h1>
              <img
                src={makeImagePath(movie.poster_path, "w500")}
                alt={movie.title}
              />
            </div>
          ))}
        </div>
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
