import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  orderBy,
  addDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCMmAYuZ_YcZqBnYvXQ5E57eu7kkzkfxdk',
  authDomain: 'crm-api-project-5956a.firebaseapp.com',
  projectId: 'crm-api-project-5956a',
  storageBucket: 'crm-api-project-5956a.appspot.com',
  messagingSenderId: '545036893899',
  appId: '1:545036893899:web:81b9278c179514f306a54e',
  measurementId: 'G-J0MS3XB6FE',
};

export const createDocument = async (document: any, type: any) => {
  if (!document) return;
  let docRef = null;
  try {
    docRef = collection(firestore, type);
    await setDoc(doc(docRef), {
      ...document,
    });
  } catch (error) {
    console.error(`error adding contact ${type}`, error);
  }

  return docRef;
};

export const getDocuments = async (
  documentId = null,
  typeStr: any,
  orderByStr = null,
  fieldStr = null,
  conditionStr = null,
  valueStr = null,
) => {
  try {
    const objRef = collection(firestore, typeStr);
    let docRef = query(objRef);

    if (documentId) docRef = query(objRef, where('Id', '==', documentId));

    if (orderByStr) docRef = query(objRef, orderBy(orderByStr));

    if (fieldStr && conditionStr && valueStr)
      docRef = query(objRef, where(fieldStr, conditionStr, valueStr));

    console.log(docRef);
    const snapShot = await getDocs(docRef);
    return snapShot;
  } catch (error) {
    console.error(`error retrieving ${typeStr} `, error);
  }
};

export const createUserProfileDocument = async (
  userAuth: { uid?: any; displayName?: any; email?: any },
  additionalData: any,
) => {
  if (!userAuth) return;

  const q = query(
    collection(firestore, 'users'),
    where('Id', '==', userAuth.uid),
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    const userRef = collection(firestore, 'users');

    await setDoc(doc(userRef, userAuth.uid), {
      displayName,
      email,
      createdAt,
      ...additionalData,
    });

    const q1 = query(
      collection(firestore, 'users'),
      where('Id', '==', userAuth.uid),
    );
    const querySnapshot1 = await getDocs(q);
    return querySnapshot1;
  }
  return querySnapshot;
};

const firebase = initializeApp(config);
export const auth = getAuth(firebase);
export const firestore = getFirestore(firebase);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = signInWithPopup(auth, provider);

export default firebase;

/*
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
*/
