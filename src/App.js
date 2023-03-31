import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<SignUp />} />  
        <Route path="/login" element={<SignIn />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
