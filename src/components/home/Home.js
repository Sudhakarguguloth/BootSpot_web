import React,{useState,useEffect} from 'react'
import Carousel from 'react-bootstrap/Carousel';
import {GoBook} from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import Aos from 'aos';
import 'aos/dist/aos.css'
function Home() {

  let navigate=useNavigate()
  let goto=()=>{
    navigate('/books')
  }

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(()=>{
    Aos.init()
  },[])


  return (
    <div className='container'> 
    <div className="row homeborder">
      <div className="col-lg-6">
        <img data-aos='fade' data-aos-duration='3000' src="https://cdn.wallpapersafari.com/60/31/bq6Zyu.jpg" className="img-fluid mb-4 " alt="Landing Image"/>
      </div>
      <div className="col-lg-6">
        <h1 data-aos='fade-right' data-aos-duration='2000' className="display-6 mb-3">A Book is a gift you can open again and again</h1>
        <p data-aos='fade-left' data-aos-duration='2000'  className='lead'>"I think books are like people, in the sense that they'll turn up in your life when you most need them."</p>
        <p data-aos='fade-left' data-aos-duration='2000'  className='lead'>- Emma Thompson</p>
        <div className='text-center'>
        <button data-aos='slide-up' data-aos-duration='2000' data-aos-delay='100' onClick={goto} className='btn btn-lg btn-info'><GoBook />View Books</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home