import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { postIdState } from "../atoms/postIdAtom";

function Movie({ id, movie }) {
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  console.log(id);

  const onClick = () => {
    router.push(`/movies/${movie.id}`);
    setPostId(id);
  };

  console.log(movie);

  return (
    <div onClick={onClick}>
      <h1>{movie.title}</h1>
      <img src={movie.movie_image} alt="" />
    </div>
  );
}

export default Movie;
