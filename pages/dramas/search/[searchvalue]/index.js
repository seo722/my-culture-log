import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import SearchedMovie from "../../../../components/SearchedMovie";
import SearchInput from "../../../../components/SearchInput";

function SearchValue() {
  const router = useRouter();
  const searchValue = router.query.searchvalue;
  const { data, isLoading } = useQuery(["search", searchValue], () =>
    searchDramas(searchValue)
  );

  const onIdClick = (id) => {
    router.push(`/dramas/search/${searchValue}/${id}`);
  };

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <SearchInput />
      <div>
        <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center">
          {data?.results.map((drama) => (
            <SearchedMovie key={drama.id} movie={drama} id={drama.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchValue;

const API_KEY = "c8f19c449ebdc0261f133e83ef901c46";
const BASE_PATH = "https://api.themoviedb.org/3";

function searchDramas(keyword) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=1`
  ).then((response) => response.json());
}

function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
