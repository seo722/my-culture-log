import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import { db, storage } from "../../../../firebase";

function searchDetail() {
  const router = useRouter();
  const { searchvalue, id } = router.query;
  const { data, isLoading } = useQuery(["search", id], () =>
    searchIdMovies(id)
  );

  const goBack = () => {
    router.push(`/movies/search/${searchvalue}`);
  };

  const sendPost = async () => {
    const docRef = await addDoc(collection(db, "movies"), {
      id: data?.id,
      title: data?.title,
      movie_image: makeImagePath(data?.poster_path, "w300"),
      overview: data?.overview,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div>
      <div>
        <button onClick={goBack}>뒤로가기</button>
      </div>
      <div>
        <h1 className="font-bold">{data?.title}</h1>
        <img src={makeImagePath(data?.poster_path, "w500")} alt="" />
        <p>{data?.overview}</p>
        {data?.genres?.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
        <p>more Info: {data?.homepage}</p>
        <p>release date: {data?.release_date}</p>
      </div>
      <div className="mt-10" onClick={sendPost}>
        내 목록에 저장하기
      </div>
    </div>
  );
}

export default searchDetail;

const API_KEY = "c8f19c449ebdc0261f133e83ef901c46";
const BASE_PATH = "https://api.themoviedb.org/3";

function searchIdMovies(keyword) {
  return fetch(
    `${BASE_PATH}/movie/${keyword}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
