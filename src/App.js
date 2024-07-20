import './App.css';
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/Home/HomePage';
import SectionList from './pages/SectionList/SectionList';
import SectionAdd from './pages/SectionAdd/SectionAdd';
import SectionPage from './pages/SectionPage/SectionPage';
import SectionEdit from './pages/SectionEdit/SectionEdit';
import PrivateRoute from './utils/PrivateRoute';
import Footer from './Components/Footer/Footer';
import TopicAdd from './pages/TopicAdd/TopicAdd';
import TopicEdit from './pages/TopicEdit/TopicEdit';
import TopicPage from './pages/TopicPage/TopicPage';
import SubtopicPage from './pages/SubtopicPage/SubtopicPage';
import SubtopicAdd from './pages/SubtopicAdd/SubtopicAdd';
import SubtopicEdit from './pages/SubtopicEdit/SubtopicEdit';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Unauthorized from './pages/Unauthorized/Unauthorized';

function App() {
  
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header/>
          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            
            <Route exact path='/:user' element={<ProfilePage />}/>

            {/* Sections */}
            <Route exact path='/learning' element={<SectionList/>}/>

            <Route exact path='/learning/:id' element={<SectionPage/>}/>

            <Route exact path='/learning/add' element={<PrivateRoute/>}>
              <Route exact path='/learning/add' Component={SectionAdd}/>
            </Route>

            <Route exact path='/learning/:id/edit' element={<PrivateRoute/>}>
              <Route path='/learning/:id/edit' Component={SectionEdit} />
            </Route>

            {/* Topics */}
            <Route exact path='/learning/:id/topic/:topicId' element={<TopicPage/>}/>

            <Route exact path='/learning/:id/add' element={<PrivateRoute/>}>
              <Route exact path='/learning/:id/add' Component={TopicAdd}/>
            </Route>

            <Route exact path='/learning/:id/topic/:topicId/edit/' element={<PrivateRoute/>}>
              <Route path='/learning/:id/topic/:topicId/edit/' Component={TopicEdit} />
            </Route>

            {/* Subtopics */}
            <Route exact path='/learning/:id/topic/:topicId/material/:matId' element={<SubtopicPage/>}/>
            
            <Route exact path='/learning/:id/topic/:topicId/add' element={<PrivateRoute/>}>
              <Route exact path='/learning/:id/topic/:topicId/add' Component={SubtopicAdd}/>
            </Route>
            
            <Route exact path='/learning/:id/topic/:topicId/material/:matId/edit' element={<PrivateRoute/>}>
              <Route exact path='/learning/:id/topic/:topicId/material/:matId/edit' Component={SubtopicEdit}/>
            </Route>            

            {/* Authentication */}
            <Route exact path='/login' element={<LoginPage/>}/>
            <Route exact path='/register' element={<RegisterPage />}/>
            <Route exact path='/unauthorized' element={<Unauthorized />}/>

          </Routes>
          <Footer/>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;