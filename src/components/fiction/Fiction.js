import React,{useState,useContext} from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {AiOutlineLike} from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Aos from 'aos'
import 'aos/dist/aos.css'

function Fiction() {
  let [err,set]=useState("")
let [fiction,setFiction]=useState([])
let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [likedBooks, setLikedBooks] = useState([]); // Store liked book IDs

  let [loading,setLoading]=useState(false)

let [filteredFiction, setFilteredFiction] = useState([]);
let [searchQuery, setSearchQuery] = useState("");


let navigate=useNavigate()

const handleLike=(fictionObj)=>{
  if(userLoginStatus===true){
    fictionObj.name=currentUser.username
    axios.post("http://localhost:3500/favourite-api/favourites",fictionObj)
    .then(response=>{
      if(response.status===200){
        console.log("success")
      //update the likedbooks state
          setLikedBooks((prevLikedBooks) =>
          prevLikedBooks.includes(fictionObj._id)
            ? prevLikedBooks.filter((bookId) => bookId !== fictionObj._id)
            : [...prevLikedBooks, fictionObj._id]
        );  
      }
      else{
        console.log("not posted")
      }
    })
    .catch(err=>{
      set(err.messsage)
    })
}
else{
  navigate('/login')
}
};


let getFiction=()=>{
  axios.get("http://localhost:3500/fiction-api/fictions")
  .then(response=>{
    if(response.status===200){
      console.log(response)
      setFiction(response.data.payload)
      setLoading(true)
    }
  })
  .catch(err=>{
    if(err.response){
      set(err.message)
    }
    else if(err.request){
      set(err.message)
    }
    else{
      set(err.message)
    }
  })
}

useEffect(()=>{
  getFiction();
     // Fetch liked books of the current user
  axios
  .get(`http://localhost:3500/favourite-api/getfavourites?name=${currentUser.username}`)
  .then((res) => {
    if (res.status === 200) {
      let likedBooks = res.data.payload.filter((favBook) => favBook.name === currentUser.username);
      let likedBookIds = likedBooks.map((favBook) => favBook._id);
      setLikedBooks(likedBookIds);
    }
  })
  .catch((err) => {
    set(err.message);
  });
},[])


useEffect(() => {
  const filtered = searchQuery
  ? fiction.filter(fictionObj =>
      fictionObj.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : fiction;
setFilteredFiction(filtered);
}, [searchQuery, fiction]);

useEffect(()=>{
  Aos.init()
},[])


  return (
    <div>
              <h1 className='text-center text-danger display-3'>Fictions</h1>
              <div className='row col-sm-8 col-md-6 col-lg-6 mx-auto'>
        <form className="d-flex" role="search">
        <input className="form-control" type="search"  onChange={e=>setSearchQuery(e.target.value)} placeholder="Search fictions by title" aria-label="Search"/>
        
      </form>

        </div>

        <div className='text-center'>
          {loading?        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4'>
        {
          filteredFiction.map((fictionObj)=><div className='col mx-auto' key={fictionObj._id} >
          
            <div  data-aos="zoom-in" data-aos-duration='2000' className='card mt-3 mb-3 h-100'>
              <img src={fictionObj.img} alt="" className='mx-auto profile' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{fictionObj.title}</p>
                <p className='card-text'><span className='fw-semibold'>Author:</span>{fictionObj.author}</p>
                <p className='card-text'><span className='fw-semibold'>Description:</span>{fictionObj.description}</p>
               <button className='btn like float-start' onClick={()=>handleLike(fictionObj)}>{likedBooks.includes(fictionObj._id) && userLoginStatus===true ? <AiFillLike /> : <AiOutlineLike />}</button>
   
                <a href={fictionObj.pdfurl} target="_blank" className='btn btn-danger float-end'>Read</a>
                 {likedBooks.includes(fictionObj._id) && userLoginStatus===true && fictionObj.name===currentUser.username&&(
                  <p className="float-start card-text">You liked this book</p>
                )}
              </div>
            </div>
            
           
          </div>
          )
        }
      </div>:(<Spinner className='mt-5' animation="border" role="status" />)
}

        </div>


    </div>
  )
}

export default Fiction