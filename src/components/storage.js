import React from 'react';
import { useState } from "react";
import { storage } from '../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Storage = () => {
 
  const [data, setData] = useState({});
  const storageRef = ref(storage, `images/${data.name}`); 

  const handleSubmit = () => {
     
      const uploadTask = uploadBytesResumable(storageRef, data);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
          console.log('Upload is ' + progress + '% done');
        // eslint-disable-next-line default-case
        switch(snapshot.state) {
          case "paused": 
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
        }, (error) => {
            console.log(error.message);
        }, () => {
           getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
               console.log('File available at', downloadUrl);
        })
        }   
    ) 
  }

  return (
    <div className='Storage'>
      <input type="file" onChange={(event) => setData(event.target.files[0])}/>
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Storage;