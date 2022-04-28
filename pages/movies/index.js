import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import Movie from "../../components/Movie";
import { db } from "../../firebase";

function Movies() {
  const [movies, setMovies] = useState();
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "movies"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setMovies(snapshot.docs);
        }
      ),
    [db]
  );

  const goToSearch = () => [router.push("/movies/search")];

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <div className="border-b flex w-full justify-around md:justify-start">
        <button onClick={goToSearch} className="rounded-full p-3 border mb-4">
          검색하러 가기
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center">
        {movies?.map((movie) => (
          <Movie id={movie.id} key={movie.id} movie={movie.data()} />
        ))}
      </div>
    </div>
  );
}

export default Movies;
