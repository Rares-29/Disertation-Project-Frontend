import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FloatingLabel } from 'react-bootstrap';
import "./Login.css";
import Form from 'react-bootstrap/Form';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Button from 'react-bootstrap/Button';
import Loading from '../components/Loading';


const Login = () => {
    
  const {user, setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/profile");
  }, [user]);
    const [data, setData] = useState({
        fullName: "",
        trustScore: "",
    });
    const [details, setDetails] = useState({
        email:"",
        password:"",
        token:"",
    });
    const [error, setError] = useState(false);

    const handleData = (e) => {
        setDetails({...details, [e.target.id]: e.target.value});
    }

    const sendData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:8080/auth/login", details);
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
            setUser(true);
            navigate('/');
        }, 1000)
        
      } catch (error) {
        setLoading(false);
        console.error(error.response.status);
        if (error.response.status == "403") {
            setError(true);
        }
        
      }
    };
  return (
    <div className="login-container">
    <div className="login-form">
    <h2 style = {{marginBottom:"20px"}}>Login</h2>
    <>
      <FloatingLabel
      controlId="email"
      label="Email address"
      className="mb-3">
      <Form.Control  type="email" placeholder="name@example.com" onChange={handleData} value={data.email} />
    </FloatingLabel>

    <FloatingLabel controlId="password" label="Password">
      <Form.Control type="password" placeholder="Password" onChange={handleData}/>
    </FloatingLabel>
    {error? <p style={{fontSize:"0.8rem", color:"#ff0808"}}>Wrong username or password!</p> : <></>}
  </>
      <p style={{fontSize:"0.8rem", marginTop:"10px"}}>Forgot password?</p>
      <Button className="submit-button" variant="primary" onClick={sendData}>
      {!loading ?<p style={{margin:0, padding:0}}>Sign in</p>: <Loading/>}</Button>
      <p style={{marginTop:"10px"}}>Don't have an account? <a style={{textDecoration:"none", color:"black", fontWeight:"700"}} href="/signup">Register for free</a></p>
    </div>
    </div>
  )
}

export default Login