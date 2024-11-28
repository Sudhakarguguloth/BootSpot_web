import React,{useContext} from 'react'
import './Navigationbar.css'
import { loginContext } from '../../contexts/loginContext';
import { NavLink } from 'react-router-dom'
function Navigationbar() {

  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=(useContext(loginContext))


    let activeLink={
        color:"gold",
        fontWeight:"bold",
        fontSize:"17px"
    }
    let inactiveLink={
        color:"white",
    }
  return (
    <div className='navborder'>
    <nav className="navbar navbar-expand-md shadow mb-2 n1">
  <div className="container">
    <NavLink className="navbar-brand" href="#"><img  className="logo"src='https://media.istockphoto.com/id/1270155083/vector/blue-e-book-logo-design-vector-sign-of-electronic-book-library-icon-symbol.jpg?s=170667a&w=0&k=20&c=0wYeiYcK2LhDfhsryfrxq-JqJsu8vYSnk1QMsZyS8J8=' alt='' width='50px' height='50px'></img></NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item mx-auto">
          <NavLink className="nav-link me-5 " to="/" style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }}>Home</NavLink>
        </li>
        <li className="nav-item mx-auto dropdown">
          <NavLink style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }} className="nav-link dropdown-toggle me-5" to="/books" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Books
          </NavLink>
          <ul className="dropdown-menu">
            <li><NavLink className="dropdown-item" to="/books">View all</NavLink></li>
            <li><NavLink className="dropdown-item" to="/drama">Drama</NavLink></li>
            <li><NavLink className="dropdown-item" to="/horror">Horror</NavLink></li>
            <li><NavLink className="dropdown-item" to="/fiction">Fiction</NavLink></li>
            <li><NavLink className="dropdown-item" to="/adventure">Adventure</NavLink></li>
            <li><NavLink className="dropdown-item" to="/autobiography">Autobiography</NavLink></li>
            <li><NavLink className="dropdown-item" to="/mythology">Mythology</NavLink></li>
            
           
          </ul>
        </li>
        <li className="nav-item mx-auto">
          <NavLink className="nav-link me-5 " to="/register" style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }}>Register</NavLink>
        </li>
        {userLoginStatus?<li className="nav-item mx-auto"> <NavLink className="nav-link mx-auto logout text-white me-5" to="/login" onClick={logoutUser}>Logout</NavLink>  
        </li>: <li className="nav-item mx-auto">
          <NavLink className="nav-link me-5 " to="/login" style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }}>Login</NavLink>
        </li>}
        {userLoginStatus===true&&   <li className="nav-item mx-auto">
          <NavLink className="nav-link me-5 " to="/userprofile" style={({isActive})=>{
            return isActive?activeLink:inactiveLink
          }}>My Profile</NavLink>
        </li>}

      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navigationbar