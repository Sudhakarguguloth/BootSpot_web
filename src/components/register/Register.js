import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import './Register.css'
function Register() {
  let [error, setError] = useState("");
  let [success, setSuccess] = useState("");

  let navigateToLogin = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  let password = watch("password");

  let addUser = (userObj) => {
    axios
      .post("http://localhost:3500/users-api/user-signup", userObj)
      .then((response) => {
        if (response.status === 201) {
          setSuccess("Registration successful. Redirecting to login...");
          setTimeout(() => {
            navigateToLogin("/login");
          }, 2000);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h2 className="display-4 text-center">Register</h2>
        {error.length !== 0 && (
          <p className="text-center text-danger display-5">{error}</p>
        )}
        {success.length !== 0 && (
          <p className="text-center text-success display-5">{success}</p>
        )}
        <form
          onSubmit={handleSubmit(addUser)}
          className="col-11 col-sm-8 col-md-6 shadow p-4 mx-auto mt-3 bg-light"
        >
          {/* ... existing fields */}
           {/*name*/}
           <label htmlFor='name'>Username</label>
          <input type='text' className='form-control mb-3'{...register("username",{required:true})} ></input>
          {errors.name?.type==='required'&& <p className='text-danger'>*Name is required</p>}
          {/*email */}
          <label htmlFor="email">Email</label>
<input
  type="email"
  className="form-control mb-3"
  {...register("email", {
    required: true,
    pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/i,
  })}
/>
{errors.email?.type === "required" && (
  <p className="text-danger">*Email is required</p>
)}
{errors.email?.type === "pattern" && (
  <p className="text-danger">*Please enter a valid email address</p>
)}

          {/*password */}
          <label htmlFor='password'>Password</label>
          <input type='password' className='form-control mb-3'{...register("password",{required:true,minLength:8})} ></input>
          {errors.password?.type==='required'&& <p className='text-danger'>*Password is required</p>}
          {errors.password?.type==='minLength'&&<p className='text-danger'>*Password must be atleast 8 characters long</p>}

          {/* Confirm Password */}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control mb-3"
            {...register("confirmPassword", {
              required: true,minLength:8,
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          ></input>
          {errors.confirmPassword?.type === "required" && (
            <p className="text-danger">*Confirm Password is required</p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="text-danger">{errors.confirmPassword.message}</p>
          )}
          <button type="submit" className="btn btn-primary float-end">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;