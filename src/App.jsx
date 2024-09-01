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
import VideoChatSpace from './pages/VideoChatSpace';
import { useEffect } from 'react';
import Home from './pages/home';
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

  useEffect(() => {
    const tabIdentifier = 'unique_tab_flag';
    const func= () => {
      localStorage.removeItem(tabIdentifier);
    }

    if (localStorage.getItem(tabIdentifier)) {
      alert();
    } else {
      localStorage.setItem(tabIdentifier, 'open');
      window.addEventListener('beforeunload', func);
    }

    return () => {
      func()
      window.removeEventListener('beforeunload', func);
    };

  }, [])
  

  return (
      <Router>
      <div className={`w-screen h-screen flex flex-col bg-base`}>
        <Navbar />
        <Routes>
          {
            isAuthenticated? 
              <>
                  <Route path='/chat' element={<ChatSpace />} />
                  <Route path='/' element={<ChatSpace />} />
                  <Route path='/video' element={<VideoChatSpace />} />
                  <Route path='/logout' element={<Logout/>} />
                  <Route path="*" element={<Navigate to="/" />} />
              </>
              :
              <>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/verifyUser' element={<VerifyUser />} />
                <Route path='/googleCallback' element={<GoogleAuth />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
          }
          <Route path='/noAccess' element={<NoAccess />} />
        </Routes>
        <AccountModal />
      </div>
      </Router>
  )
}

export default App
