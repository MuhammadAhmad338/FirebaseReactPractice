import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { auth, googleAuthProvider, firebaseDatabase  } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, where, query } from 'firebase/firestore';

const Auth = () => {

  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [age, SetAge] = useState("");
  //instance for the cloud firestore
  const collectionRef = collection(firebaseDatabase, "users");
  const queryAge = query(collectionRef, where("age", "==" , "20"));

  console.log(auth?.currentUser?.email);

  const signUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
        console.log(response.user);
    }).catch((error) => {
        alert(error.message); 
    });
  }

  const signIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
       alert(response.user.email);
    }).catch((error) => {
       console.log(error.message);
    });
  }

  const logout = async () => {
    try {
      await signOut(auth);
      alert("User is logged out");
    } catch(error) {
      alert(error.message);
    }
  }

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch(error){
      alert(error);
    }
  }
 
  const addTheDoc = () => {
    addDoc(collectionRef, {
      email: email,
      password: password,
      age: age
    }).then(() => {
       alert("User Added");
    }).catch((error) => {
       console.log(error);
       alert(error.message);
    });  
  }

  const getData = useCallback(() => {
    try {
       onSnapshot(queryAge, (data) => {
         console.log(data.docs.map((item) => {
            return item.data();
         }))
       }); 
    } catch(error) {
        console.log(error.message);
        alert(error.message);
    }
  }, [queryAge]);

  const updateTheDoc = () => {
    const docToUpdate = doc(firebaseDatabase, "users", "r4WduktBd5YUBQe5QU2p");
        updateDoc(docToUpdate, {
        email: "ahmadmuhammad.7700@gmail.com",
        password: "Ahmad@321"
    }).then(() => {
       alert("Doc Updated"); 
    }).catch((error) => {
        alert(error.message);
    });
  }

  const deleteTheDoc = () => {
      const deleteDocument = doc(firebaseDatabase, "users", "r4WduktBd5YUBQe5QU2p");
      deleteDoc(deleteDocument).then(() => {
        alert("Doc Deleted");
    }).catch((error) => {
        alert(error.message);
    });
  }
  
  useEffect(() => {
    getData();
    onAuthStateChanged(auth, (data) => {
     if (data) {
        alert("User is logged In");
     } else {
        alert("User is not logged In");
     }
    });
  }, [getData]);

  return (
    <div>
        <input className="" placeholder='Email...' onChange={(event) => SetEmail(event.target.value)}/>
        <input className="" placeholder='Password...' type='password' onChange={(event) => SetPassword(event.target.value)}/>
        <input className="" placeholder='Age...' type='text' onChange={(event) => SetAge(event.target.value)} />
        <button className="" onClick={signUp}>signUp</button>
        <button className="" onClick={signIn}>signIn</button>
        <button className="" onClick={logout}>logout</button>
        <button className="" onClick={signInWithGoogle}>Sign In with google</button>

        <button onClick={addTheDoc}>Add The first Doc</button>
        <button onClick={getData}>Get the docs</button>
        
        <button onClick={updateTheDoc}>Update Doc</button>

        <div>
            <button onClick={deleteTheDoc}>Delete The Doc</button>
        </div>
    </div>
  )
}

export default Auth;