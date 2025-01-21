import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'; 
import Layout from './components/Layout'
import { useState } from 'react';
import { UserContext } from './components/UserContext';
import Logout from './pages/Logout';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const [user, setUser] = useState(localStorage.getItem("token") !== null);
  return (
    <UserContext.Provider value={{user,setUser}}>
    <BrowserRouter>
      <Routes>
          <Route path = '/' element={<Layout/>}>
            <Route path='/' element={<StudentDashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup/>} />
            <Route path = "logout" element={<Logout/>} />
          </Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
