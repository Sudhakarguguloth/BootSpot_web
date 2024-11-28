import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {AiOutlineLike} from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Aos from 'aos'
import 'aos/dist/aos.css'

function Autobiography() {

  let [err,set]=useState("")
let [autobiography,setAutobiography]=useState([])
let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

let [filteredAutobiography, setFilteredAutobiography] = useState([]);
let [searchQuery, setSearchQuery] = useState("");
  let [likedBooks, setLikedBooks] = useState([]); // Store liked book IDs

  let [loading,setLoading]=useState(false)


let navigate=useNavigate()

const handleLike=(autobiographyObj)=>{
  if(userLoginStatus===true){
    autobiographyObj.name=currentUser.username
    axios.post("http://localhost:3500/favourite-api/favourites",autobiographyObj)
    .then(response=>{
      if(response.status===200){
        console.log("success")
  //update the likedbooks state
          setLikedBooks((prevLikedBooks) =>
          prevLikedBooks.includes(autobiographyObj._id)
            ? prevLikedBooks.filter((bookId) => bookId !== autobiographyObj._id)
            : [...prevLikedBooks, autobiographyObj._id]
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


let getAutobiography=()=>{
  axios.get("http://localhost:3500/autobiography-api/autobiographies")
  .then(response=>{
    if(response.status===200){
      console.log(response)
      setAutobiography(response.data.payload)
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
  getAutobiography()
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
  ? autobiography.filter(autobiographyObj =>
      autobiographyObj.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : autobiography;
setFilteredAutobiography(filtered);
}, [searchQuery, autobiography]);

useEffect(()=>{
  Aos.init()
},[])

  return (
    <div>
              <h1 className='text-center text-danger display-3'>Autobiographies</h1>
              <div className='row col-sm-8 col-md-6 col-lg-6 mx-auto'>
        <form className="d-flex" role="search">
        <input className="form-control" type="search"  onChange={e=>setSearchQuery(e.target.value)} placeholder="Search autobiographies by title" aria-label="Search"/>
        
      </form>

        </div>
        <div className='text-center'>
          {loading?        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4'>
        {
          filteredAutobiography.map((autobiographyObj)=><div className='col mx-auto' key={autobiographyObj._id} >
      
            <div  data-aos="zoom-in" data-aos-duration='2000' className='card mt-3 mb-3 h-100'>
              <img src={autobiographyObj.img} alt="" className='mx-auto profile' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{autobiographyObj.title}</p>
                <p className='card-text'><span className='fw-semibold'>Author:</span>{autobiographyObj.author}</p>
                <p className='card-text'><span className='fw-semibold'>Description:</span>{autobiographyObj.description}</p>
                <button className='btn like float-start' onClick={()=>handleLike(autobiographyObj)}>{likedBooks.includes(autobiographyObj._id) && userLoginStatus===true ? <AiFillLike /> : <AiOutlineLike />}</button>

                <a href={autobiographyObj.pdfurl} target="_blank" className='btn btn-danger float-end'>Read</a>
            {likedBooks.includes(autobiographyObj._id) && userLoginStatus===true && autobiographyObj.name===currentUser.username&& (
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

export default Autobiography