import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { postIdState } from "../atoms/postIdAtom";

function Movie({ id, movie }) {
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  console.log(router.asPath);

  const onClick = () => {
    if (router.asPath === "/dramas") {
      router.push(`/dramas/${movie.id}`);
    } else {
      router.push(`/movies/${movie.id}`);
    }
    setPostId(id);
  };

  console.log(movie);

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-gray-300 cursor-pointer w-full rounded-xl my-5 md:mx-8 p-5 md:p-10 flex flex-col justify-center items-center"
        onClick={onClick}
      >
        <img
          className="max-w-[300px] md:h-[400px] md:w-[280px]"
          src={movie.movie_image}
          alt=""
        />
        <h1 className="mt-3">{movie.title}</h1>
      </div>
    </div>
  );
}

export default Movie;
