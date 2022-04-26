import { useRouter } from "next/router";
import { useState } from "react";
import SearchInput from "../../../components/SearchInput";

function Search() {
  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      <SearchInput />
    </div>
  );
}

export default Search;
