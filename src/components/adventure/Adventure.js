import React,{useState,useEffect,useContext} from 'react'
import './Adventure.css'
import axios from 'axios'
import {AiOutlineLike} from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Aos from 'aos'
import 'aos/dist/aos.css'
function Adventure() {

  let [err,set]=useState("")
  let [adventure,setAdventure]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [likedBooks, setLikedBooks] = useState([]); // Store liked book IDs

  let[loading,setLoading]=useState(false)


  let [filteredAdventure, setFilteredAdventure] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");



  let navigate=useNavigate()
  
  const handleLike=(adventureObj)=>{
    if(userLoginStatus===true){
      adventureObj.name=currentUser.username
      axios.post("http://localhost:3500/favourite-api/favourites",adventureObj)
      .then(response=>{
        if(response.status===200){
          console.log("success")
           //update the likedbooks state
          setLikedBooks((prevLikedBooks) =>
          prevLikedBooks.includes(adventureObj._id)
            ? prevLikedBooks.filter((bookId) => bookId !== adventureObj._id)
            : [...prevLikedBooks, adventureObj._id]
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


  let getAdventure=()=>{
    axios.get("http://localhost:3500/adventure-api/adventures")
    .then(response=>{
      if(response.status===200){
        console.log(response)
        setAdventure(response.data.payload)
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
    getAdventure()
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
    ? adventure.filter(adventureObj =>
        adventureObj.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : adventure;
  setFilteredAdventure(filtered);
  }, [searchQuery, adventure]);

  useEffect(()=>{
    Aos.init()
  },[])

  return (
    <div>
              <h1 className='text-center text-danger display-3'>Adventures</h1>
              <div className='row col-sm-8 col-md-6 col-lg-6 mx-auto'>
        <form className="d-flex" role="search">
        <input className="form-control" type="search"  onChange={e=>setSearchQuery(e.target.value)} placeholder="Search adventures by title" aria-label="Search"/>
        
      </form>

        </div>

        <div className='text-center'>
          {loading?        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4'>
        {
          filteredAdventure.map((adventureObj)=><div className='col mx-auto' key={adventureObj._id} >
          
            <div  data-aos="zoom-in" data-aos-duration='2000' className='card mt-3 mb-3 h-100'>
              <img src={adventureObj.img} alt="" className='mx-auto profile' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{adventureObj.title}</p>
                <p className='card-text'><span className='fw-semibold'>Author:</span>{adventureObj.author}</p>
                <p className='card-text'><span className='fw-semibold'>Description:</span>{adventureObj.description}</p>
                <button className='btn like float-start' onClick={()=>handleLike(adventureObj)}>{likedBooks.includes(adventureObj._id) && userLoginStatus===true ? <AiFillLike /> : <AiOutlineLike />}</button>

                <a href={adventureObj.pdfurl} target="_blank" className='btn btn-danger float-end'>Read</a>
               {likedBooks.includes(adventureObj._id) && userLoginStatus===true && adventureObj.name===currentUser.username&&(
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

export default Adventure