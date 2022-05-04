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
    searchIdDramas(id)
  );
  console.log(data);

  const goBack = () => {
    router.push(`/dramas/search/${searchvalue}`);
  };

  const sendPost = async () => {
    const docRef = await addDoc(collection(db, "dramas"), {
      id: data?.id,
      title: data?.name,
      movie_image: makeImagePath(data?.poster_path, "w500"),
      overview: data?.overview,
      timestamp: serverTimestamp(),
    });
    alert("저장되었습니다.");
    router.push("/dramas");
  };

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <div className="border-b flex w-full justify-around md:justify-start">
        <button className="rounded-full p-3 border mb-4" onClick={goBack}>
          뒤로가기
        </button>
      </div>

      <div>
        <div
          className="flex flex-col items-center lg:items-start lg:flex-row p-4 md:p-0 md:mt-10
          lg:justify-evenly
          "
        >
          <img src={makeImagePath(data?.poster_path, "w500")} alt="" />
          <div className="mt-8 border p-8 rounded-xl h-full flex flex-col items-center lg:ml-6 lg:mt-6">
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:mb-4">
              <h1 className="text-[20px] font-extrabold mb-2 lg:m-0 lg:mr-4">
                {data?.name}
              </h1>
              <div className="text-sm mb-4 lg:m-0">
                {data?.genres?.map((genre) => (
                  <span key={genre.id}>{genre.name} · </span>
                ))}
              </div>
            </div>
            <p className="max-w-[500px] font-sm text-[15px] text-justify">
              {data?.overview}
            </p>
            <button className="rounded-full p-3 border mt-8" onClick={sendPost}>
              내 목록에 저장하기
            </button>
            {/* <p>more Info: {data?.homepage}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDetail;

const API_KEY = "c8f19c449ebdc0261f133e83ef901c46";
const BASE_PATH = "https://api.themoviedb.org/3";

function searchIdDramas(keyword) {
  return fetch(
    `${BASE_PATH}/tv/${keyword}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
