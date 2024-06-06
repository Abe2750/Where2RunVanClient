
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SignInSide from  "./components/SignInSide/SignInSide" 
import SignUp from "./components/SignUpPage/SignUpPage"

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
        <Route path="/signin" element={<SignInSide/>} />
        <Route path="/signup" element={<SignUp/>} />
     </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
