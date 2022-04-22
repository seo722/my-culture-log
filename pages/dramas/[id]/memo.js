import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { postIdState } from "../../../atoms/postIdAtom";
import OneMemo from "../../../components/OneMemo";
import { db } from "../../../firebase";

function Memo() {
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (postId !== "") {
      onSnapshot(
        query(
          collection(db, "dramas", postId, "memos"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setMemos(snapshot.docs)
      );
    } else {
      return;
    }
  }, [db, postId]);

  const goBackList = () => {
    router.push("/dramas");
  };

  const sendMemo = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "dramas", postId, "memos"), {
      memo: memo,
      timestamp: serverTimestamp(),
    });
    setMemo("");
  };

  return (
    <div>
      <button onClick={goBackList} className="rounded-full p-3 border">
        내 목록 보기
      </button>
      <form action="submit" onSubmit={sendMemo}>
        <input
          disabled={postId === ""}
          onChange={(e) => setMemo(e.target.value)}
          value={memo}
          type="text"
          placeholder="memo"
          className="p-3 border rounded-xl"
        />
      </form>
      <div>
        {memos.map((memo) => (
          <OneMemo key={memo.id} id={memo.id} memo={memo.data()} />
        ))}
      </div>
    </div>
  );
}

export default Memo;
