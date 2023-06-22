import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route path='/login' element={< Login />}></Route>
          <Route path='/signup' element={< Signup />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
