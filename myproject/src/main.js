import './style.css';
import * as CanvasScript from './CanvasScript.js';
import * as WavesScript from './waves.js';
import { initForm, formObject } from './Form.js';
import * as AuthUser from './Authentication.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";    


CanvasScript.SetUpCanvas();
WavesScript.ApplyDrawing();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyANsdlJ9nUSKcRP1UehtPBxXHzn_KOBWWU",

  authDomain: "homecell-induction.firebaseapp.com",

  projectId: "homecell-induction",

  storageBucket: "homecell-induction.firebasestorage.app",

  messagingSenderId: "179438270178",

  appId: "1:179438270178:web:becaaf05eda2e017ba10bb",

  measurementId: "G-029T0GSKT4"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//SDK products:
const db = getFirestore();

//db.settings({ timestampsInSnapshots: true });

// Track the currently signed-in user (anonymous or otherwise)
let currentUserUid = null;

// Ensure auth is ready before wiring form behavior.
AuthUser.authenticateUser()
  .then(({ user }) => {
    currentUserUid = user.uid;
    console.log("Authenticated with UID:", currentUserUid);
    initForm(submitInducteeForm);
  })
  .catch((error) => {
    console.error("Authentication failed:", error);
    // If auth fails, you can still show an error in the UI or disable the form.
  });

// helper for inserting the document into the collection
async function submitInducteeForm(formData) {

  try {

    const docRef = await addDoc(collection(db, "Inductees"), {
      // Track which user submitted this (anonymous uid or real user uid)
      uid: currentUserUid,

      first_name: formData.firstName,
      last_name: formData.lastName,
      phonenumber: formData.phoneNumber,
      residence: formData.residence,
      HasWhatsApp: formData.hasWhatsApp ? "Yes" : "No",
      submittedAt: new Date(),

      status: "pending" // Initial status

    });

    console.log("Document written with ID: ", docRef.id);

    //Succsess: change to thank you page
    formObject().reset(); // Clear the form fields
    window.location.href = "../pages/ThankYou.html";

  } catch (e) {

    console.error("Error adding document: ", e);

    // Handle error, e.g., show an error message to the user

  }

}


