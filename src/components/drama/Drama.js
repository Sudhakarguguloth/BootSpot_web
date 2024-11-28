import React,{useState,useEffect,useContext}from 'react'
import './Drama.css'
import axios from 'axios'
import {AiOutlineLike} from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Aos from 'aos'
import 'aos/dist/aos.css'

function Drama() {

  let [err,set]=useState("")
  let [drama,setDrama]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [likedBooks, setLikedBooks] = useState([]); // Store liked book IDs

  let [loading,setLoading]=useState(false)
  

  const [filteredDrama, setFilteredDrama] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let navigate=useNavigate()

  const handleLike=(dramaObj)=>{
    if(userLoginStatus===true){
      dramaObj.name=currentUser.username
      axios.post("http://localhost:3500/favourite-api/favourites",dramaObj)
      .then(response=>{
        if(response.status===200){
          console.log("success")
          //update the likedbooks state
          setLikedBooks((prevLikedBooks) =>
          prevLikedBooks.includes(dramaObj._id)
            ? prevLikedBooks.filter((bookId) => bookId !== dramaObj._id)
            : [...prevLikedBooks, dramaObj._id]
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


  let getDrama=()=>{
    axios.get("http://localhost:3500/drama-api/dramas")
    .then(response=>{
      if(response.status===200){
        setDrama(response.data.payload)
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
    getDrama();
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
    ? drama.filter(dramaObj =>
        dramaObj.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : drama;
  setFilteredDrama(filtered);
  }, [searchQuery, drama]);


  useEffect(()=>{
    Aos.init()
  },[])


  
  return (
    <div>
        <h1 className='text-center text-danger display-3'>Dramas</h1>
        <div className='row col-sm-8 col-md-6 col-lg-6 mx-auto'>
        <form className="d-flex" role="search">
        <input className="form-control" type="search"  onChange={e=>setSearchQuery(e.target.value)} placeholder="Search dramas by title" aria-label="Search"/>
        
      </form>

        </div>
        <div className='text-center'>
        {loading? <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4'>
        {filteredDrama.map((dramaObj)=><div className='col mx-auto' key={dramaObj._id} >
            <div data-aos="zoom-in" data-aos-duration='2000' className='card mt-3 mb-3 h-100'>
              <img src={dramaObj.img} alt="" className='mx-auto profile' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{dramaObj.title}</p>
                <p className='card-text'><span className='fw-semibold'>Author:</span>{dramaObj.author}</p>
                <p className='card-text'><span className='fw-semibold'>Description:</span>{dramaObj.description}</p>
                <button className='btn like float-start' onClick={()=>handleLike(dramaObj)}>{likedBooks.includes(dramaObj._id) && userLoginStatus===true ? <AiFillLike /> : <AiOutlineLike />}</button>
                <a href={dramaObj.pdfurl} target="_blank"className='btn btn-danger float-end'>Read</a>
                {likedBooks.includes(dramaObj._id) && userLoginStatus===true && dramaObj.name===currentUser.username &&(
                  <p className="card-text float-start">You liked this book</p>
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

export default Drama