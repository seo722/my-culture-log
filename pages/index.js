import { getProviders, getSession, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";
import { useState, useEffect, useRef } from "react";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import {
  doc,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import Banner from "../components/Banner";

//toDO: 홈화면 반응형으로, 트위터처럼 만들기(답글 기능, textarea, 삭제 기능)

export default function Home({ providers }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [banners, setBanenrs] = useState([]);
  const { data: session } = useSession();
  const fileInputRef = useRef(null);
  const router = useRouter();

  //firebase에서 사진 가져오기
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "banner"), orderBy("timestamp", "desc")),
        (snpashot) => setBanenrs(snpashot.docs)
      ),
    [db]
  );
  console.log(banners);

  //firebase에 사진 업로드
  const sendPost = async (e) => {
    e.preventDefault();

    if (selectedFile) {
      const docRef = await addDoc(collection(db, "banner"), {
        timestamp: serverTimestamp(),
      });

      const imageRef = ref(storage, `banner/${docRef.id}/image`);

      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "banner", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setSelectedFile(null);
    fileInputRef.current.value = null;
  };

  //사진 파일 state 등록
  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
      console.log(setSelectedFile);
    };
  };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <div className=" bg-white dark:bg-zinc-800 h-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center w-full md:px-6">
          <div className="w-full flex items-center justify-center border-b border-gray-400 py-5 md:hidden">
            <form onSubmit={sendPost}>
              <img
                src={session.user.image}
                className="h-11 w-11 rounded-full"
                alt=""
              />
              <div className="flex">
                <PhotographIcon
                  className="h-[35px]"
                  onClick={() => fileInputRef.current.click()}
                />
                <input
                  type="file"
                  hidden
                  onChange={addImage}
                  ref={fileInputRef}
                />
                <button
                  onClick={sendPost}
                  className="bg-zinc-300 rounded-md h-[35px] w-[50px]"
                >
                  post
                </button>
              </div>
            </form>
          </div>
          {selectedFile && (
            <>
              <div className="relative p-5">
                <div
                  className="top-6 left-6 absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setSelectedFile(null);
                    fileInputRef.current.value = null;
                  }}
                >
                  <XIcon className="text-white h-5" />
                </div>
                <img
                  src={selectedFile}
                  alt=""
                  className="rounded-2xl max-h-80 object-contain"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col w-full justify-around items-center md:hidden">
          {banners?.map((banner) => (
            <Banner key={banner.id} id={banner.id} banner={banner.data()} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);

  return { props: { session, providers } };
}
