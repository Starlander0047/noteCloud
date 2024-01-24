import React, { useState, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../contexts/notes/NoteContext';

const Navbar = () => {
  const context = useContext(NoteContext);
  const {userDetails} = context;
  const loc = useLocation();
  const navigate = useNavigate();
  const handleLogout = () =>{
      sessionStorage.removeItem("authToken");
      navigate("/login");
  }
  // For Cloud Bounce
  const [bounce, setBounce] = useState("");
  const handleCloudUp = ()=>{
    setBounce("fa-bounce");
  }
  const handleCloudLeave = ()=>{
    setBounce("");
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <i onMouseOver={handleCloudUp} onMouseLeave={handleCloudLeave} className={`fa-solid fa-xl fa-cloud ${bounce} mx-2`} style={{color: "#74C0FC"}}></i>
    <Link onMouseOver={handleCloudUp} onMouseLeave={handleCloudLeave} className="navbar-brand" to="/">NoteCloud</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {
        !sessionStorage.getItem("authToken")?
        <div className="d-flex">
        <Link className='btn btn-primary mx-1' role="button" to="/login">Login</Link>
        <Link className='btn btn-primary mx-1' role="button" to="/signup">Signup</Link>
      </div> : 
      <div className="d-flex">
        {
          sessionStorage.getItem("authToken")?
          <b className='mx-4 mt-2' style={{color: "white"}}>Username: {userDetails.name}</b>:
          ""
        }
        <button className='btn btn-primary mx-1' onClick={handleLogout} >Logout</button>
      </div>
      }
    </div>
  </div>
</nav>
  )
}

export default Navbar
