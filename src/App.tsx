import React from 'react';
import './App.css';
import Login from './component/login/login';
import Auth from './component/login/auth';
import  Navgation from './component/login/navigation';
import { BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login/>
        
?      </header>
    </div>
  );
}





export default App;
