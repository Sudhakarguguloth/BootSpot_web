import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import { loginContext } from '../../contexts/loginContext'
import './Login.css'
function Login() {

    let goToUserProfile=useNavigate()

    let [currentUser,loginErr,userLoginStatus,loginUser]=(useContext(loginContext))
    let {register,handleSubmit,formState:{errors}}=useForm()
 


    let handleSubmitUser=(userCredentialsObj)=>{
      loginUser(userCredentialsObj)
    }
    useEffect(()=>{
      if(userLoginStatus===true){
        goToUserProfile('/userprofile')
      }
    },[userLoginStatus])

  return (
    <div className='container'>
          <div className='row'>
          <h2 className='display-4 text-center'>User Login</h2>
          
          
          {loginErr.length!==0&&<p className='text-danger lead text-center'>{loginErr}</p>}
          <form onSubmit={handleSubmit(handleSubmitUser)} className='col-11 col-sm-8 col-md-6 mx-auto bg-light shadow p-4'>
            <label>Username</label>
            <input className='form-control' type='text'{...register("username",{required:true})}></input>
            {errors.username?.type==='required'&& <p className='text-danger'>*Username is required</p>}
            <label className='mt-3'>Password</label>
            <input type='password' className='form-control'{...register("password",{required:true})}></input>
            {errors.password?.type==='required'&& <p className='text-danger'>*Password is required</p>}
            <button  type='submit' className='btn btn-primary mt-3 float-end'>Login</button>
          </form>
        </div>

    </div>
  )
}

export default Login