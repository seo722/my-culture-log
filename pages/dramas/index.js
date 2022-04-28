import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import Movie from "../../components/Movie";
import { db } from "../../firebase";

function Dramas() {
  const [dramas, setDramas] = useState();
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "dramas"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setDramas(snapshot.docs);
        }
      ),
    [db]
  );

  const goToSearch = () => [router.push("/dramas/search")];

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <div className="border-b flex w-full justify-around md:justify-start">
        <button onClick={goToSearch} className="rounded-full p-3 border mb-4">
          검색하러 가기
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center">
        {dramas?.map((drama) => (
          <Movie id={drama.id} key={drama.id} movie={drama.data()} />
        ))}
      </div>
    </div>
  );
}

export default Dramas;
