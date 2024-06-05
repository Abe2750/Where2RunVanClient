
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import SignInSide from  "./components/SignInSide/SignInSide" 

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <SignInSide />
      </BrowserRouter>
    </div>
  );
}

export default App;
