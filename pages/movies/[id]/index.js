import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { postIdState } from "../../../atoms/postIdAtom";
import { db } from "../../../firebase";

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

  const onDelete = async () => {
    await deleteDoc(doc(db, "movies", postId));
    router.push("/movies");
  };

  return (
    <div>
      <button onClick={goBackList} className="rounded-full p-3 border">
        내 목록 보기
      </button>
      <button onClick={goMemo} className="rounded-full p-3 border">
        메모하러 가기
      </button>
      <button onClick={onDelete} className="p-3 border rounded-3xl">
        delete
      </button>
    </div>
  );
}

export default MovieDetail;
