import React,{useState,useEffect,useContext} from 'react'
import axios from 'axios'
import {AiOutlineLike} from 'react-icons/ai'
import { AiFillLike } from 'react-icons/ai'
import { loginContext } from '../../contexts/loginContext'
import { useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner';
import Aos from 'aos'
import 'aos/dist/aos.css'
function Mythology() {

  let [err,set]=useState("")
  let [mythology,setMythology]=useState([])
  let [currentUser,loginErr,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)
    let [likedBooks, setLikedBooks] = useState([]); // Store liked book IDs

    let [loading,setLoading]=useState(false)


  let [filteredMythology, setFilteredMythology] = useState([]);
  let [searchQuery, setSearchQuery] = useState("");


  let navigate=useNavigate()

  const handleLike=(mythologyObj)=>{
    if(userLoginStatus===true){
      mythologyObj.name=currentUser.username
      axios.post("http://localhost:3500/favourite-api/favourites",mythologyObj)
      .then(response=>{
        if(response.status===200){
          console.log("success")
           //update the likedbooks state
          setLikedBooks((prevLikedBooks) =>
          prevLikedBooks.includes(mythologyObj._id)
            ? prevLikedBooks.filter((bookId) => bookId !== mythologyObj._id)
            : [...prevLikedBooks, mythologyObj._id]
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


  let getMythology=()=>{
    axios.get("http://localhost:3500/mythology-api/mythologies")
    .then(response=>{
      if(response.status===200){
        console.log(response)
        setMythology(response.data.payload)
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
    getMythology()
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
    ? mythology.filter(mythologyObj =>
        mythologyObj.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mythology;
  setFilteredMythology(filtered);
  }, [searchQuery, mythology]);

  useEffect(()=>{
    Aos.init()
  },[])

  return (
    <div>
              <h1 className='text-center text-danger display-3'>Mythologies</h1>
              <div className='row col-sm-8 col-md-6 col-lg-6 mx-auto'>
        <form className="d-flex" role="search">
        <input className="form-control" type="search"  onChange={e=>setSearchQuery(e.target.value)} placeholder="Search mythologies by title" aria-label="Search"/>
        
      </form>

        </div>
        <div className='text-center'>
          {loading?        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4'>
        {
          filteredMythology.map((mythologyObj)=><div className='col mx-auto m-2' key={mythologyObj._id} >
           
            <div  data-aos="zoom-in" data-aos-duration='2000' className='card mt-3 mb-3 h-100'>
              <img src={mythologyObj.img} alt="" className='mx-auto profile m-5 p-5' />
              <div className="card-body text-center">
                <p className='card-text'><span className='fw-semibold'>Title:</span>{mythologyObj.title}</p>
                <p className='card-text'><span className='fw-semibold'>Author:</span>{mythologyObj.author}</p>
                <p className='card-text'><span className='fw-semibold'>Description:</span>{mythologyObj.description}</p>
                <button className='btn like float-start' onClick={()=>handleLike(mythologyObj)}>{likedBooks.includes(mythologyObj._id) && userLoginStatus===true ? <AiFillLike /> : <AiOutlineLike />}</button>

                <a href={mythologyObj.pdfurl} target="_blank" className='btn btn-danger float-end'>Read</a>
              {likedBooks.includes(mythologyObj._id) && userLoginStatus===true && mythologyObj.name===currentUser.username&&(
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

export default Mythology