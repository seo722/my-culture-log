import { useRouter } from "next/router";

function SearchedMovie({ movie, id }) {
  const router = useRouter();
  const searchValue = router.query.searchvalue;
  console.log(router);

  const onIdClick = (id) => {
    if (router.pathname === `/movies/search/[searchvalue]`) {
      router.push(`/movies/search/${searchValue}/${id}`);
    } else {
      router.push(`/dramas/search/${searchValue}/${id}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="bg-gray-300 cursor-pointer w-[360px] rounded-xl my-5 md:mx-8 p-8  md:p-10 flex flex-col justify-center items-center"
        onClick={() => {
          onIdClick(movie.id);
        }}
      >
        <img
          className="max-w-[300px] md:h-[400px] md:w-[280px]"
          src={makeImagePath(movie.poster_path, "w500")}
          alt={movie.title}
        />
        <h1 className="mt-3">
          {router.pathname === "/movies/search/[searchvalue]"
            ? movie.title
            : movie.name}
        </h1>
      </div>
    </div>
  );
}

export default SearchedMovie;

function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

// movie.title.length > 20 ? `${movie.title.slice(0, 20)}...` : movie.title;
