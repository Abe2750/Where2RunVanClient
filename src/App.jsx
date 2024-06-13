
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import SignInSide from  "./components/SignInSide/SignInSide" 
import SignUp from "./components/SignUpPage/SignUpPage"
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import RunRoutes from './components/RunRoutes/RunRoutes';
//import MapComponent from './components/MapComponent/MapComponent';
import AddressInput from './components/AddressInput/AddressInput';

import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <div className="App">
    <AuthProvider>
     <Header/>
     {/* <AddressInput/> */}
     {/* <AddressInput/> */}
     {/* <RunRoutes/> */}
     {/* <MapComponent/> */}
     <BrowserRouter>
     
     <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path="/runroutes" element={<RunRoutes/>} />
        <Route path="/signin" element={<SignInSide/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
      </BrowserRouter>
      <Footer/>
    </AuthProvider>
    </div>
  );
}

export default App;
