import { getProviders, getSession, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from "../firebase";
import { useState, useEffect, useRef } from "react";
import { XIcon } from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default function Home({ providers }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [text, setText] = useState("");
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const fileInputRef = useRef(null);
  const router = useRouter();

  const sendPost = async (e) => {
    const docRef = await addDoc(collection(db, "posts"), {
      text,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setText("");
    setSelectedFile(null);
  };

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

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   if (fileInputRef) {
  //     uploadBackgroundPic();
  //     setSelectedFile(null);
  //     fileInputRef.current.value = null;
  //   }
  // };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <div className="bg-white dark:bg-zinc-800 h-screen">
        <div>
          <form action="">
            <input
              type="text"
              placeholder="write"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={sendPost} className="bg-zinc-300 p-1 rounded-md">
              send
            </button>
          </form>
          <input type="file" onChange={addImage} ref={fileInputRef} />
        </div>
        {selectedFile && (
          <>
            <div
              className="w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
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
          </>
        )}

        <div className="md:hidden flex w-full h-full bg-slate-100 justify-center items-start">
          <img
            src="https://pbs.twimg.com/media/FQEf1hraAAIw8Eg?format=jpg"
            className="dark:brightness-75 rounded-2xl max-h-[500px] object-cover mt-10"
          />
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
