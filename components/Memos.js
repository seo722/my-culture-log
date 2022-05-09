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
import { postIdState } from "../atoms/postIdAtom";
import { db } from "../firebase";
import OneMemo from "./OneMemo";

function Memos() {
  const [memo, setMemo] = useState("");
  const [memos, setMemos] = useState([]);
  const [postId, setPostId] = useRecoilState(postIdState);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (postId !== "") {
      onSnapshot(
        query(
          collection(db, "movies", postId, "memos"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setMemos(snapshot.docs)
      );
    } else {
      return;
    }
  }, [db, postId]);

  const sendMemo = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "movies", postId, "memos"), {
      memo: memo,
      timestamp: serverTimestamp(),
    });
    setMemo("");
  };

  return (
    <div>
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
      <div className="mt-6">
        {memos.map((memo) => (
          <OneMemo key={memo.id} id={memo.id} memo={memo.data()} />
        ))}
      </div>
    </div>
  );
}

export default Memos;
