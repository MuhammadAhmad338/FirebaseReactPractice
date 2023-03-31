import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signIn.css';
import {  signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../config/firebase';

const SignIn = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
 
  const handleSubmit = async  () => {
    await signInWithEmailAndPassword(auth, email, password).then((res) => {
        alert(`User Signed In ${res.user}`);
    }).catch((error) => {
       alert(error.message);
    })
   }
   
   const SignInGoogle =  async () => {
    try {
        await signInWithPopup(auth, googleAuthProvider);
    }  catch (e) {
      alert(e.message);
    }
   }

    return (
       <div className='center'>
          <p className="signin"> Sign In </p>
           <div >
                <input className='emailclass' placeholder='Email' title='email' type='email' onChange={(e) => SetEmail(e.target.value)}/>
          </div>
           <div >
                <input className='passwordclass' placeholder='Password' title='password' type='password' onChange={(e) => SetPassword(e.target.value)}/>
          </div>
           <button className='mybutton' onClick={handleSubmit}> Submit </button>
           <p>Do not have an account? <Link to='/'>Sign Up </Link> </p>
           <button className='mybutton' onClick={SignInGoogle}> Sign In with google </button>
       </div>
   );
}

export default SignIn;