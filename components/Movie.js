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
    <div className="w-full">
      <div className="bg-gray-100 w-96 m-5 p-5" onClick={onClick}>
        <h1>{movie.title}</h1>
        <img src={movie.movie_image} alt="" />
      </div>
    </div>
  );
}

export default Movie;
