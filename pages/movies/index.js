import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import Movie from "../../components/Movie";
import { db } from "../../firebase";

function books() {
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
    <div>
      <button onClick={goToSearch} className="rounded-full p-3 border">
        검색하러 가기
      </button>
      <div>
        {movies?.map((movie) => (
          <Movie key={movie.id} movie={movie.data()} />
        ))}
      </div>
    </div>
  );
}

export default books;
