import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { postIdState } from "../../../atoms/postIdAtom";
import { db } from "../../../firebase";

function DramaDetail() {
  const [detail, setDetail] = useState();
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (postId !== "") {
      const docRef = doc(db, "dramas", postId);
      getDoc(docRef).then((docsnap) => {
        if (docsnap.exists()) {
          setDetail(docsnap.data());
        }
      });
    }
  }, [postId]);

  console.log(detail);

  const goBackList = () => {
    router.push("/dramas");
  };

  const goMemo = () => {
    router.push(`/dramas/${id}/memo`);
  };

  const onDelete = async () => {
    await deleteDoc(doc(db, "dramas", postId));
    router.push("/dramas");
  };

  return (
    <div className="max-w-[1400px] px-4 sm:px-6 mt-4">
      {/* button */}
      <div className="border-b flex w-full justify-around md:justify-start">
        <div className="ml-4 mb-4 space-x-3">
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
      </div>

      <div>
        <img src={detail?.movie_image} alt="" className="rounded-2xl m-4" />
        <h1>{detail?.title}</h1>
        <p>{detail?.overview}</p>
      </div>
    </div>
  );
}

export default DramaDetail;
