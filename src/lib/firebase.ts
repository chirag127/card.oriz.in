import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

let _app: FirebaseApp | undefined;
let _auth: Auth | undefined;
let _db: Firestore | undefined;

function getFirebaseConfig() {
  return {
    apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as string,
    authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: import.meta.env.PUBLIC_FIREBASE_APP_ID as string,
    measurementId: import.meta.env.PUBLIC_FIREBASE_MEASUREMENT_ID as string,
  };
}

export function getFirebaseApp(): FirebaseApp {
  if (!_app) {
    const existing = getApps();
    _app = existing.length > 0 ? existing[0]! : initializeApp(getFirebaseConfig());
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getFirebaseDb(): Firestore {
  if (!_db) {
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
}
