import "./App.css";
// --firebase core import --//
import firebase from "firebase/app";
import "firebase/auth"; //--firebase authentication product --//
import firebaseConfig from "./firebase.config"; //--firebase configuration import --//
import { useState } from "react";

//--firebase app initialize --//
// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    email: "",
    name: "",
    photo: "",
  });

  // --googleAuth Provider --//
  const provider = new firebase.auth.GoogleAuthProvider();
  // --handle signIn --//
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { email, displayName, photoURL } = result.user;
        const signedInUser = {
          isSignedIn: true,
          email: email,
          name: displayName,
          photo: photoURL,
        };
        setUser(signedInUser);
        // console.log(email,displayName,photoURL);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };

  // --handle signOut --//
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((response) => {
        const signOutUser = {
          isSignedIn: false,
          email: "",
          name: "",
          photo: "",
        };
        setUser(signOutUser);
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  };
  return (
    <div className="App">
      <h1>Learning React-Authentication</h1>
      {/* <button onClick={handleSignIn}>Sign In</button> */}

      {user.isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}

      {/* <p>{user.name}</p>
      <p>{user.email}</p>
      <img src={user.photo} alt="" style={{width:"300px",height:'300px'}} /> */}

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
