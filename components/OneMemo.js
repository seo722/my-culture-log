import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import Moment from "react-moment";
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
    <li className="list-none mb-4 w-full flex justify-between">
      <span className="w-4/5">
        {memo.memo} ·{" "}
        <span className="text-[13px] sm:text-[13px]">
          <Moment format="YYYY/MM/DD HH:mm">{memo?.timestamp?.toDate()}</Moment>
        </span>
      </span>

      <span
        onClick={onDelete}
        className="cursor-pointer border dark:font-medium font-bold w-[58px] h-[34px] rounded-full flex items-center justify-center"
      >
        delete
      </span>
    </li>
  );
}

export default OneMemo;
