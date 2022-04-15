import { getProviders, getSession, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getStorage, ref } from "firebase/storage";
import { storage } from "../firebase";

export default function Home({ providers }) {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();

  // TODO: background upload 가능하게 만들기
  // const uploadBackgroundPic = async () => {
  //   const docRef = await addDoc(collection(db, "background"), {
  //     timestamp: serverTimestamp(),
  //   });

  //   const imageRef = ref(storage, `background/${docRef.id}/image`);

  //   if (selectedFile) {
  //     await uploadString(imageRef, selectedFile, "data_url").then(async () => {
  //       const downloadURL = await getDownloadURL(imageRef);
  //       await updateDoc(doc(db, "background", docRef.id), {
  //         image: downloadURL,
  //       });
  //     });
  //   }
  // };

  // const addImageToPost = (e) => {
  //   const reader = new FileReader();
  //   if (e.target.files[0]) {
  //     reader.readAsDataURL(e.target.files[0]);
  //   }

  //   reader.onload = (readerEvent) => {
  //     setSelectedFile(readerEvent.target.result);
  //   };
  // };

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <>
      <div className="bg-white dark:bg-zinc-800 h-screen">
        <div className="md:hidden flex w-full h-full bg-slate-500">
          <Image
            layout="fill"
            src="https://pbs.twimg.com/media/FQEf1hraAAIw8Eg?format=jpg"
            className="dark:brightness-75 "
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
