import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { postIdState } from "../../../atoms/postIdAtom";
import Memos from "../../../components/Memos";
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
          <button onClick={onDelete} className="p-3 border rounded-3xl">
            delete
          </button>
        </div>
      </div>

      {postId !== "" && (
        <div>
          <div
            className="flex flex-col items-center lg:items-start lg:flex-row p-4 md:p-0 md:mt-10
          lg:justify-evenly
          "
          >
            <img
              src={detail?.movie_image}
              alt=""
              className="w-full sm:max-w-[500px]"
            />
            <div>
              <div className="mt-8 border p-8 rounded-xl h-full flex flex-col items-center lg:ml-6 lg:mt-6">
                <div className="w-full flex flex-row items-center lg:mb-4">
                  <h1 className="text-[20px] font-extrabold mb-2 lg:mb-0 mr-4">
                    {detail?.title}
                  </h1>
                  <span className="text-sm mb-3 lg:m-0">
                    · &nbsp; {detail?.runtime}분{" "}
                  </span>
                </div>
                <p className="max-w-[500px] font-sm text-[15px] text-justify">
                  {detail?.overview}
                </p>
              </div>
              <div className="lg:ml-6 w-full max-w-[560px] mt-6">
                <Memos />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DramaDetail;
