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

function SearchDetail() {
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

    alert("저장되었습니다.");
    router.push("/movies");
  };

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <div className="border-b flex w-full justify-around md:justify-start">
        <button className="rounded-full p-3 border mb-4" onClick={goBack}>
          뒤로가기
        </button>
      </div>

      <div>
        <div className="flex flex-col items-center sm:flex-row p-4 md:p-0 md:mt-4">
          <img
            className="w-full sm:max-w-[500px]"
            src={makeImagePath(data?.poster_path, "w500")}
            alt=""
          />
          <div className="flex flex-col items-center">
            <h1 className="text-[20px] font-extrabold mt-6 mb-2">
              {data?.title}
            </h1>
            <div className="text-sm mb-4">
              {data?.genres?.map((genre) => (
                <span key={genre.id}>{genre.name} · </span>
              ))}
              <span>{data?.runtime}분</span>
            </div>
            <p className="max-w-[600px] font-sm text-[15px] text-justify">
              {data?.overview}
            </p>

            <p>more info: {data?.homepage}</p>
            <p>release date: {data?.release_date}</p>
          </div>
        </div>
      </div>
      <button className="rounded-full p-3 border my-10" onClick={sendPost}>
        내 목록에 저장하기
      </button>
    </div>
  );
}

export default SearchDetail;

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
