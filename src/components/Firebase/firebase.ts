import firebase from 'firebase/app';
import "firebase/database";
import "firebase/auth";

import { TYPES } from '../../constants';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  private database: firebase.database.Database;
  private auth: firebase.auth.Auth;
  private user: firebase.auth.UserCredential | null;
  private admin: string = "4jJw2Qp9zchYpmsNmqiw2dOwWZ13";

  constructor() {
    firebase.initializeApp(config);
    this.database = firebase.database();
    this.auth = firebase.auth();
    this.user = null;
  }

  // ============ User API ==============

  setLoggedUser = (user: firebase.auth.UserCredential) => {
    this.user = user;
  }

  getLoggedUser = () => {
    return this.auth.currentUser;
  }

  // ============ Auth API ==============

  // Create user
  createUserWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Sign in
  signInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Sign out
  signOut = () => {
    return this.auth.signOut();
  }

  passwordReset = (email: string) => {
    return this.auth.sendPasswordResetEmail(email);
  }
 
  passwordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password);
    }
  }

  checkIfLoggedIn = () => {
    return this.auth.currentUser;
  }

  // Database API
  getUsers = () => this.database.ref("/users");

  getImages = () => {
      return this.database.ref("users/" + this.admin + "/images");

  }

  addImageObject = (data: TYPES.ImageObject) => {
    if (this.auth.currentUser) {
      var newImageKey = firebase.database().ref("users/" + this.auth.currentUser.uid + "/images").push().key;
      const location = `/users/${this.auth.currentUser.uid}/images/${newImageKey}`;
    
      try {
        firebase.database().ref(location).set(data);
      } catch (error) {
        console.log(error);
      }
    
    } else {
      console.log("Not logged in")
      var newImageKey = firebase.database().ref("users/" + this.admin + "/images").push().key;
      const location = `/users/${this.admin}/images/${newImageKey}`;
    
      try {
        firebase.database().ref(location).set(data);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  addImage = (data: string) => {
    if (this.auth.currentUser) {
      var newImageKey = firebase.database().ref("users/" + this.auth.currentUser.uid + "/images").push().key;
      const location = `/users/${this.auth.currentUser.uid}/images/${newImageKey}`;
    
      try {
        firebase.database().ref(location).set(data);
      } catch (error) {
        console.log(error);
      }
    
    } else {
      console.log("Not logged in")
      var newImageKey = firebase.database().ref("users/" + this.admin + "/images").push().key;
      const location = `/users/${this.admin}/images/${newImageKey}`;
    
      try {
        firebase.database().ref(location).set(data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  updateImagePoints = (imageKey: string, points: number) => {
    const location = `/users/${this.admin}/images/${imageKey}`;
      try {
        firebase.database().ref(location).update({'points': points});
      } catch (error) {
        console.log(error);
      }
  }

  deleteImage = (imageKey: string) => {
    const location = `/users/${this.admin}/images/${imageKey}`;
    try {
      firebase.database().ref(location).remove();
    } catch (error) {
      console.log(error);
    }  

  }
}

export default Firebase;