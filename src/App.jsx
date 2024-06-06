
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SignInSide from  "./components/SignInSide/SignInSide" 
import SignUp from "./components/SignUpPage/SignUpPage"
import Hero from './components/Hero/Hero';

function App() {
  return (
    <div className="App">
    <Hero/>
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
