import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import NoAccess from './pages/NoAccess';
import Logout from './pages/logout';
import Navbar from './components/navbar';
import { useAuth } from './context/AuthContext';
import VerifyUser from './pages/verifyUser';
import GoogleAuth from './pages/googleAuthFInal';
import ChatSpace from './pages/ChatSpace';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import StartPage from './pages/StartPage';
import Profile from './pages/Profile';
import Footer from './components/footer';

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
  const {isAuthenticated,loader} = useAuth();

  const protectedRoute = (element)=>{
    if(isAuthenticated) return element;
    else{
      console.log("sendding to login due to non auth")
      return <Navigate to={"/login"}/>
    }
  }
  
  const semiProtectedRoute = (element) =>{
    if(isAuthenticated) return <Navigate to={"/"}/>
    else return element

  }

  return (
      <Router>
      <div className={`w-screen h-screen flex flex-col overflow-auto bg-base`}>
      {loader && <div className='w-full h-full bg-black fixed top-0 z-[6000] flex justify-center items-center'>
          <img className='animate-pulse' src={'Logo.png'} alt={'Loader'} width={200} height={200} />
      </div>}
        <Navbar />
        <Routes>
          <Route strict path='/verifyUser' element={<VerifyUser />} />
          <Route path='/noAccess' element={< NoAccess />} />
          <Route path='/' element={<Home />} />
          {isAuthenticated && <>
          <Route  path='/chat' element={<ChatSpace />} />
          <Route path='/start' element={<StartPage />} />
          <Route path='/logout' element={<Logout/>} />
          <Route path='*' element={<Navigate to="/"></Navigate>}/>
          </>}
          {isAuthenticated == false && <>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/googleCallback' element={<GoogleAuth />} />
          <Route path='*' element={<Navigate to="/"></Navigate>}/>
          </>}
        </Routes>
        <Footer />
      </div>
      </Router>
  )
}

export default App
