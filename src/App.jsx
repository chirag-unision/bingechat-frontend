import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import NoAccess from './pages/NoAccess';
import AccountModal from './components/AccountModal';
import Logout from './pages/logout';
import Navbar from './components/navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import VerifyUser from './pages/verifyUser';
import GoogleAuth from './pages/googleAuthFInal';
import ChatSpace from './pages/ChatSpace';
import { useEffect } from 'react';
import Home from './pages/Home';
import StartPage from './pages/StartPage';

// const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/",
//     element: <Chat />,
//   },
//   {
//     path: "/chat",
//     element: <Chat />,
//   },
// ]);

function App() {  
  const {isAuthenticated} = useAuth();
  
  return (
      <Router>
      <div className={`w-screen h-screen flex flex-col overflow-auto bg-base`}>
        <Navbar />
        <Routes>
          <Route path='/verifyUser' element={<VerifyUser />} />
          <Route path='/noAccess' element={<NoAccess />} />
          <Route path='/' element={<Home />} />
          {
            isAuthenticated? 
            <>
                  <Route path='/chat' element={<ChatSpace />} />
                  <Route path='/start' element={<StartPage />} /> 
                  <Route path='/logout' element={<Logout/>} />
              </>
              :
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/googleCallback' element={<GoogleAuth />} />
              </>
          }
          
        </Routes>
        <AccountModal />
      </div>
      </Router>
  )
}

export default App
