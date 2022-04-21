import { deleteDoc, doc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { postIdState } from "../atoms/postIdAtom";
import { db } from "../firebase";

function OneMemo({ memo, id }) {
  const [postId, setPostId] = useRecoilState(postIdState);

  const onDelete = async () => {
    await deleteDoc(doc(db, "movies", postId, "memos", id));
  };

  return (
    <li>
      {memo.memo}
      <span onClick={onDelete} className="px-2 border font-bold">
        delete
      </span>
    </li>
  );
}

export default OneMemo;
