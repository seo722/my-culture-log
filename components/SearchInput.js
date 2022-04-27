import { useRouter } from "next/router";
import { useState } from "react";

function SearchInput() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      router.pathname === "/movies/search" ||
      router.pathname === "/movies/search/[searchvalue]"
    ) {
      router.push(`/movies/search/${input}`);
    } else {
      router.push(`/dramas/search/${input}`);
    }
  };

  const goToMyList = () => {
    if (
      router.pathname === "/movies/search/[searchvalue]" ||
      router.pathname === "/movies/search"
    ) {
      router.push("/movies");
    } else {
      router.push("/dramas");
    }
  };

  return (
    <div className="border-b flex w-full justify-around md:justify-start">
      <button className="rounded-full mb-4 p-3 border" onClick={goToMyList}>
        내 목록 보기
      </button>
      <form className="md:ml-5" onSubmit={onSubmit}>
        <input
          type="text"
          className="border border-gray-500 p-3 rounded-md"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchInput;
