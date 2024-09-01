import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import Chat from './pages/chat';
import AccountModal from './components/AccountModal';
import Logout from './pages/logout';
import Navbar from './components/navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import VerifyUser from './pages/verifyUser';
import GoogleAuth from './pages/googleAuthFInal';
import ChatSpace from './pages/ChatSpace';
import VideoChatSpace from './pages/VideoChatSpace';

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
        </Routes>
        <AccountModal />
      </div>
      </Router>
  )
}

export default App
