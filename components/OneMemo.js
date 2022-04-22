import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { postIdState } from "../atoms/postIdAtom";
import { db } from "../firebase";

function OneMemo({ memo, id }) {
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();

  const onDelete = async () => {
    if (router.pathname === "/dramas/[id]/memo") {
      await deleteDoc(doc(db, "dramas", postId, "memos", id));
    } else {
      await deleteDoc(doc(db, "movies", postId, "memos", id));
    }
  };

  return (
    <li>
      {memo.memo}
      <span onClick={onDelete} className="cursor-pointer px-2 border font-bold">
        delete
      </span>
    </li>
  );
}

export default OneMemo;
