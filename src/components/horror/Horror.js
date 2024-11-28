import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import './Horror.css'
import {AiOutlineLike} from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Aos from 'aos'
import 'aos/dist/aos.css'
function Horror() {

  let [err,set]=useState("")
  let [horror,setHorror]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [likedBooks, setLikedBooks] = useState([]); // Store liked book IDs

  let [loading,setLoading]=useState(false)

  let [filteredHorror, setFilteredHorror] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");


  let navigate=useNavigate()

  const handleLike=(horrorObj)=>{
    if(userLoginStatus===true){
      horrorObj.name=currentUser.username
      axios.post("http://localhost:3500/favourite-api/favourites",horrorObj)
      .then(response=>{
        if(response.status===200){
          console.log("success")
          //update the likedbooks state
          setLikedBooks((prevLikedBooks) =>
          prevLikedBooks.includes(horrorObj._id)
            ? prevLikedBooks.filter((bookId) => bookId !== horrorObj._id)
            : [...prevLikedBooks, horrorObj._id]
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

  let getHorror=()=>{
    axios.get("http://localhost:3500/horror-api/horrors")
    .then(response=>{
      if(response.status===200){
        console.log(response)
        setHorror(response.data.payload)
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
    getHorror()
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
    ? horror.filter(horrorObj =>
        horrorObj.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : horror;
  setFilteredHorror(filtered);
  }, [searchQuery, horror]);

  useEffect(()=>{
    Aos.init()
  },[])


  return (
    <div>
              <h1 className='text-center text-danger display-3'>Horrors</h1>
              <div className='row col-sm-8 col-md-6 col-lg-6 mx-auto'>
        <form className="d-flex" role="search">
        <input className="form-control" type="search"  onChange={e=>setSearchQuery(e.target.value)} placeholder="Search horrors by title" aria-label="Search"/>
        
      </form>

        </div>
        <div className='text-center'>        
        {loading?<div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4 p-2 m-2'>
        { filteredHorror.map((horrorObj)=><div className='col mx-auto' key={horrorObj._id} >
            <div  data-aos="zoom-in" data-aos-duration='2000' className='card mt-3 mb-3 h-100 p-2'>
              <img src={horrorObj.img} alt="" className='mx-auto profile mt-3' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{horrorObj.title}</p>
                <p className='card-text'><span className='fw-semibold'>Author:</span>{horrorObj.author}</p>
                <p className='card-text'><span className='fw-semibold'>Description:</span>{horrorObj.description}</p>
                <button className='btn like float-start' onClick={()=>handleLike(horrorObj)}>{likedBooks.includes(horrorObj._id) && userLoginStatus===true ? <AiFillLike /> : <AiOutlineLike />}</button>
                 <a href={horrorObj.pdfurl} target="_blank" className='btn btn-danger float-end'>Read</a>
               {likedBooks.includes(horrorObj._id) && userLoginStatus===true && horrorObj.name===currentUser.username&& (
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

export default Horror