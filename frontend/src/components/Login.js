import React, { useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../contexts/alert/AlertContext';


function Login() {
    const contextForAlert = useContext(AlertContext);
    const {showAlert} = contextForAlert;
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const handleOnSubmit = async (e) =>{
        e.preventDefault();
        const params = {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({email: emailRef.current.value, password: passwordRef.current.value})
        }
        const data = await fetch("http://127.0.0.1:5000/api/auth/login",params);
        const parsedData = await data.json();
        if(parsedData.success)
        {
            sessionStorage.setItem("authToken", parsedData.authToken);
            navigate("/");
        }
        else
        {
            showAlert("danger", "Wrong Credentials!");
        }
        
    }
  return (
    <div className='container my-4'>
        <h2>Please Login to Continue</h2>
        <form onSubmit={handleOnSubmit} className='my-2'>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address:</label>
            <input required={true} ref={emailRef} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input required={true} autoComplete='true' ref={passwordRef} type="password" className="form-control" id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Login
