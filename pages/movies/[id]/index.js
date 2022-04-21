import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { postIdState } from "../../../atoms/postIdAtom";

function MovieDetail() {
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  const { id } = router.query;

  const goBackList = () => {
    router.push("/movies");
  };

  const goMemo = () => {
    router.push(`/movies/${id}/memo`);
  };

  return (
    <div>
      <button onClick={goBackList} className="rounded-full p-3 border">
        내 목록 보기
      </button>
      <button onClick={goMemo} className="rounded-full p-3 border">
        메모하러 가기
      </button>
    </div>
  );
}

export default MovieDetail;
