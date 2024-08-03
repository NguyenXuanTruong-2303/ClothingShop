import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Setup FireBase
const firebaseConfig = {
  apiKey: "AIzaSyCnRWiANrdYYFUT9gQZP5JuJgVMxxjlDDs",
  authDomain: "crwn-clothing-23afd.firebaseapp.com",
  projectId: "crwn-clothing-23afd",
  storageBucket: "crwn-clothing-23afd.appspot.com",
  messagingSenderId: "1081872746810",
  appId: "1:1081872746810:web:d598a931b7d19a3e4d2803",
};

const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

// Bắt đầu code ===================================
// ==========================Auth===========================================
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

//================FireStore - Thông tin đăng nhập ======================================
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //console.log(userSnapshot);
  // console.log(userSnapshot.exists()); //exists() trả về true/false xem dữ liệu người dùng userSnapShot đã có trên FirestoreDB chưa

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};
// ========================create Auth User  With Email And Password=========
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

//========================Sign In===================
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider); // Signin - signInWithPopup

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// ===================== Sign Out =====================
export const signOutUser = async () => await signOut(auth);

// Chức năng của onAuthStateChanged là theo dõi trạng thái đăng nhập thay cho useContext bởi vì mỗi khi đăng nhập theo mỗi cách khác nhau
// thì setCurrent phải gọi ở nơi khác nhau => mã bị dàn trải ở nhiều nơi nên onAuthStateChanged sẽ giúp tập trung chức năng đó ở 1 nơi
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

//============================= Set data lên fireStore ====================================
// collection, writeBatch
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};
//============================= Get data lên fireStore ====================================
// query
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
    const { title, items } = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};
