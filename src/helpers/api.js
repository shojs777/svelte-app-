import { collection, addDoc } from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "./firebase";
// Add a new document with a generated id.
export const postDiary = async (uid, body, rate) => {
  const docRef = await addDoc(collection(db, "diaries"), {
    uid: uid,
    rate: rate,
    body: body,
    image: "",
    createdAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id ? true : false;
};
