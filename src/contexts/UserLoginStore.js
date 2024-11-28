import { loginContext } from "./loginContext"
import axios from "axios"
import { useState } from "react"
function UserLoginStore({children}){

    const [currentUser,setCurrentUser]=useState({})
    const [loginErr,setLoginError]=useState("")
    const [userLoginStatus,setUserLoginStatus]=useState(false)  //if any component want to check whether a user is loggedin or not




    //function to make user login request
    const loginUser=(userCredentialsObj)=>{
        axios.post("http://localhost:3500/users-api/user-login",userCredentialsObj)
        .then(response=>{
            console.log(response)
            if(response.data.message==='success'){
                //save token to local storage
                localStorage.setItem("token",response.data.token)
                setCurrentUser({...response.data.user})
                console.log(response)
                setLoginError("")
                setUserLoginStatus(true)
                console.log('navigated to user profile')
            }
            else{
                setLoginError(response.data.message)
            }
        })
        .catch(err=>{
            console.log("err in userlogin",err)
            setLoginError(err.message)
        })
    }

    //function to logout
    const logoutUser=()=>{
        localStorage.clear()
        setUserLoginStatus(false)
    }
    return(
        <loginContext.Provider value={[currentUser,loginErr,userLoginStatus,loginUser,logoutUser]}>  {/*these values are provided to application */}
            {children}
        </loginContext.Provider>
    )
}
export default UserLoginStore