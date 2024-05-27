import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/Home/HomePage';
import SectionList from './pages/SectionList/SectionList';
import SectionAdd from './pages/SectionAdd/SectionAdd';
import SectionPage from './pages/SectionPage/SectionPage';
import PrivateRoute from './utils/PrivateRoute';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header/>
          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route exact path='/learning' element={<SectionList/>}/>
            <Route exact path='/learning/:id' element={<SectionPage/>}/>
            
            <Route exact path='/learning/:id/edit' element={<PrivateRoute/>}>
              <Route path='/learning/:id/edit' Component={SectionAdd} />
            </Route>

            <Route exact path='/login' element={<LoginPage/>}/>
            <Route exact path='/section-add' element={<SectionAdd/>}/>
          </Routes>
          <Footer/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;