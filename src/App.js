import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/Home/HomePage';
import LearningPage from './pages/LearningPage/LearningPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header/>
          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route exact path='/learning' element={<LearningPage/>}/>
            <Route exact path='/login' element={<LoginPage/>}/>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;