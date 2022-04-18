import { useEffect, useState } from "react";
import Input from "./Input";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  return (
    <div className="lg:flex w-full h-full justify-center lg:flex-row flex-col relative">
      <Input />
      <div className="lg:absolute lg:left-[500px] lg:w-full ">
        <div className="pb-72 lg:max-w-3xl lg:border-l">
          {posts.map((post) => (
            <Post key={post.id} id={post.id} post={post.data()} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;
