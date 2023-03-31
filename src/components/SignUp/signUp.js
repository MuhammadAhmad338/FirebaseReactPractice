/* eslint-disable jsx-a11y/img-redundant-alt */
import './signUp.css';
import MyImage from '../../assets/google.png';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {createUserWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import {auth, googleAuthProvider, firebaseDatabase} from '../../config/firebase';
import Increase from '../increment';

const SignUp = () => {

  //useState state
 const [username , SetUsername] = useState("");
 const [email, SetEmail] = useState("");
 const [password, SetPassword] = useState("");
 
 //Collection
 const collectionRef  = collection(firebaseDatabase, "users");

  //Handle the submit
 const handleSubmit = async () => {
   try {
     await createUserWithEmailAndPassword(auth, email, password).then((response) => {
       alert(`User Created ${response.user}`);
     }).catch((error) => {
       alert(error.message);
     });
     addingTheDoc();
   } catch(error) {
       console.log(error);
   }
  }
  
  //Sign in with google
    const SignInGoogle =  async () => {
      try {
        await signInWithPopup(auth, googleAuthProvider);
      } catch (e) {
        alert(e.message);
      }
    }
   
     //Adding the document
    const addingTheDoc = ( ) => {
     if (email !== "" || password !== "") {
       addDoc(collectionRef, {
         email: email,
         username: username
       }).then(() => {
         alert("User ADDED!");
       }).catch((error) => {
         alert(error.message);
       })
     }
    }
  
  return (
      <div className='center'>
          <p className="signup"> Sign Up </p>
          <div>
              <input className='usernameclass' placeholder='Username' title='username' type='username' onChange={(e) => {SetUsername(e.target.value)}} />
          </div>
          <div >
              <input className='emailclass' placeholder='Email' title='email' type='email' onChange={(e) => {SetEmail(e.target.value)}} />
          </div>
          <div >
              <input className='passwordclass' placeholder='Password' title='password' type='password' onChange={(e) => {SetPassword(e.target.value)}} />
          </div>
          <button className='mybutton' onClick={handleSubmit}> Submit </button>
          <p>Already have an account?  <Link to='/login'> Sign In </Link></p>
          <button className='mybutton' onClick={SignInGoogle}> Sign in with google  <img src={MyImage} alt='My Image' class="icon" />  </button>

          <Increase />
      </div>
  );
}

export default  SignUp;