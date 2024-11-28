import React,{useState,useEffect,useContext} from 'react'
import './UserProfile.css'
import axios from 'axios'
import {AiOutlineDelete} from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Aos from 'aos'
import 'aos/dist/aos.css'

function UserProfile() {

  let [favourite,setFavourite]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  let [showToast, setShowToast] = useState(false);

  let [err,set]=useState("")
  let getFavourite=()=>{
    axios.get("http://localhost:3500/favourite-api/getfavourites")
    .then(response=>{
      if(response.status===200){
        setFavourite(response.data.payload.filter(favbook=>favbook.name===currentUser.username))
      }
    })
    .catch(err=>{
      set(err.message)
    })
  }

  let handleDelete=(id)=>{
    axios.delete(`http://localhost:3500/favourite-api/deletefavourite/${id}`)
    .then(response=>{
      if(response.status===200){
        setFavourite(prevFavourite => prevFavourite.filter(book => book._id !== id));
        console.log('deleted successfully')
      }
      else{
        console.log('not deleted')
      }
    })
    .catch(err=>{
      set(err.message)
    })
  }



  useEffect(()=>{
    getFavourite()
  },[])

  useEffect(() => {
    let hasShownToast = localStorage.getItem('hasShownToast');

    if (!hasShownToast) {
      setShowToast(true);

      let timer = setTimeout(() => {
        setShowToast(false);
        localStorage.setItem('hasShownToast', 'true')

      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(()=>{
    Aos.init()
  })



  return (
    <div>
      <h4 className='display-5'>Liked books</h4>
       <ToastContainer position='top-end' className='p-5'>
      <Toast show={showToast} onClose={()=>setShowToast(false)}>
        <Toast.Header>
          <strong className="me-auto">Login Successful</strong>
        </Toast.Header>
        <Toast.Body>Welcome,{currentUser.username}</Toast.Body>
      </Toast>
      </ToastContainer>
      
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4'>
        { favourite.length!==0?(favourite.map((favouriteObj)=><div className='col ' key={favouriteObj._id} >
            <div data-aos='flip-down' data-aos-duration='1000' className='card mt-3 mb-3 h-100'>
              <img src={favouriteObj.img} alt="" className='mx-auto profile' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{favouriteObj.title}</p>
                <a href={favouriteObj.pdfurl} target="_blank" className='btn btn-secondary float-end'>Read</a>
                <button onClick={()=>handleDelete(favouriteObj._id)} className='btn float-start btn-danger delete d-block'><AiOutlineDelete/>Remove</button>
              </div>
            </div>
          </div>
          )
       ) :<h4 className='mx-auto text-danger'>No Books Liked</h4>}
      </div>
    </div>
  )
}

export default UserProfile