import { useRouter } from "next/router";
import { useState } from "react";

function Search() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/movies/search/${input}`);
  };

  const goToMyList = () => {
    router.push("/movies");
  };

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
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
    </div>
  );
}

export default Search;
