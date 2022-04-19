import { useRouter } from "next/router";
import { useState } from "react";

function search() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/movies/search/${input}`);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="border border-black"
          placeholder="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
      책 검색 페이지: 검색 인풋, 검색 목록
    </div>
  );
}

export default search;
