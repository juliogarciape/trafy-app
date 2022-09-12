import {LOGO_FIREBASE_STORAGE,PRODUCT_FIREBASE_STORAGE} from "@consts/index";
import {getApps, initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

/* =========== CONSTANT VALUES =========== */

function setDefaultStorage (defaultStorage) {
  
    if(defaultStorage === 1){
      
      return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      };
    
    }else if(defaultStorage === 2){
      
      return {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
      };
      
    }  
}

/* ======= FIREBASE CONFIG ========== */

const mainConfiguration = setDefaultStorage(PRODUCT_FIREBASE_STORAGE);
const secondaryConfiguration = setDefaultStorage(LOGO_FIREBASE_STORAGE);

if (getApps().length < 1) {  
  var mainProject = initializeApp(mainConfiguration);
  var sideProject = initializeApp(secondaryConfiguration,"other");
}

export const productStorage = getStorage(mainProject);
export const logoStorage = getStorage(sideProject);