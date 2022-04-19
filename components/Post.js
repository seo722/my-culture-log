import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { deleteObject, ref } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { db, storage } from "../firebase";

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const router = useRouter();

  const onDelete = async () => {
    deleteDoc(doc(db, "posts", id));
    if (post?.image) {
      const deleteImgRef = ref(storage, `posts/${id}/image`);
      deleteObject(deleteImgRef)
        .then(() => {
          console.log("deleted");
        })
        .catch((error) => console.log("error"));
    }
  };

  return (
    <div className="p-3 flex border-b border-gray-300">
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
            </div>{" "}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment format="YYYY/MM/DD HH:mm">
                {post?.timestamp?.toDate()}
              </Moment>
            </span>
            {!postPage && (
              <p className="text-[15px] sm:text-base mt-0.5">{post?.text}</p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl object-cover mr-2"
        />
        <div
          className={`text-[#6e767d] flex justify-end w-11/12 ${
            postPage && "mx-auto"
          }`}
        >
          {session?.user.uid === post?.id && (
            <div
              className="flex items-center space-x-1 group"
              onClick={onDelete}
            >
              <div className="icon cursor-pointer">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
