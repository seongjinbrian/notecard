import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { FbConfig } from "./model/firebase";

const fbsettings: FbConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(fbsettings);

export const instance = firebase;
export const authorization = firebase.auth();
