import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../firebase";

function Banner({ id, banner }) {
  const onDelete = async () => {
    await deleteDoc(doc(db, "banner", id));
    const deleteImgRef = ref(storage, `banner/${id}/image`);
    deleteObject(deleteImgRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => console.log("error"));
  };

  return (
    <div className="p-5 border-b border-gray-400">
      <img
        onClick={onDelete}
        className=" dark:brightness-[0.85] rounded-2xl max-w-[350px] object-cover"
        src={banner.image}
        alt=""
      />
    </div>
  );
}

export default Banner;
