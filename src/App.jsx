
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SignInSide from  "./components/SignInSide/SignInSide" 
import SignUp from "./components/SignUpPage/SignUpPage"
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <Header/>
     <Hero/>
     <BrowserRouter>
     <Routes>
        <Route path="/signin" element={<SignInSide/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
