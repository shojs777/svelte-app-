import {
  collection,
  addDoc,
  query,
  where,
  getDoc,
  getDocs,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "./firebase";
import { async } from "@firebase/util";
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
export const fetch = async (uid = "") => {
  const q = query(
    collection(db, "diaries"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  let diaries = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    diaries.push({
      id: doc.id,
      rate: doc.data().rate,
      body: doc.data().body,
      image: doc.data().image,
      createdAt: doc.data().createdAt,
    });
  });
  return diaries;
};
export const getDiary = async (id = "test") => {
  const docRef = doc(db, "diaries", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return false;
  }
};
export const updateDiary = async (id = "", body = "", rate = 1, image = "") => {
  const diaryRef = doc(db, "diaries", id);
  if (!diaryRef) return false;
  // Set the "capital" field of the city 'DC'
  await updateDoc(diaryRef, {
    body: body,
    rate: rate,
    image: image,
  });
  return true;
};
