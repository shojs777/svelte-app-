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
  deleteDoc,
  limit,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import dayjs from "dayjs";
// Add a new document with a generated id.

export const postDiary = async (uid = "", body = "", rate = 1, image = "") => {
  let uploadResult = "";
  if (image.name) {
    const storageRef = ref(storage);
    const ext = image.name.split(".").pop();
    const hashName = Math.random().toString(36).slice(-8);
    // Create a reference to 'images/mountains.jpg'
    const uploadRef = ref(storageRef, `/images/${hashName}.${ext}`);
    await uploadBytes(uploadRef, image).then(async (result) => {
      console.log("Uploaded a file!" + result);
      await getDownloadURL(uploadRef).then((url) => {
        uploadResult = url;
      });
    });
  }
  const docRef = await addDoc(collection(db, "diaries"), {
    uid: uid,
    rate: rate,
    body: body,
    image: uploadResult,
    createdAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id ? true : false;
};
export const fetch = async (uid = "", filterMonth = null) => {
  let q;
  if (filterMonth) {
    filterMonth = filterMonth.replace("-", "/");
    q = query(
      collection(db, "diaries"),
      where("uid", "==", uid),
      where("createdAt", ">=", filterMonth + "/01"),
      where("createdAt", "<=", filterMonth + "/31"),
      limit(31)
    );
  } else {
    q = query(
      collection(db, "diaries"),
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(31)
    );
  }
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
export const updateDiary = async (
  id = "",
  body = "",
  rate = 1,
  image = null
) => {
  let uploadResult = "";
  if (image.name) {
    const storageRef = ref(storage);
    const ext = image.name.split(".").pop();
    const hashName = Math.random().toString(36).slice(-8);
    // Create a reference to 'images/mountains.jpg'
    const uploadRef = ref(storageRef, `/images/${hashName}.${ext}`);
    await uploadBytes(uploadRef, image).then(async (result) => {
      console.log("Uploaded a file!" + result);
      await getDownloadURL(uploadRef).then((url) => {
        uploadResult = url;
      });
    });
  }
  const diaryRef = doc(db, "diaries", id);
  if (!diaryRef) return false;
  let updateData;
  if (image.name) {
    updateData = {
      body: body,
      rate: rate,
      image: uploadResult,
    };
  } else {
    updateData = {
      body: body,
      rate: rate,
    };
  }
  // Set the "capital" field of the city 'DC'
  await updateDoc(diaryRef, updateData);
  return true;
};
export const deleteDiary = async (id) => {
  await deleteDoc(doc(db, "diaries", id));
  return true;
};
