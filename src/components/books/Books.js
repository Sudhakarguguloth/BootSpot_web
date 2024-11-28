import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './Books.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
function Books() {

  let navigate=useNavigate()
  let goToDrama=()=>{
    navigate('/drama')
  }

  let goToHorror=()=>{
    navigate('/horror')
  }

  let goToFiction=()=>{
    navigate('/fiction')
  }

  let goToAdventure=()=>{
    navigate('/adventure')
  }

  let goToAutobiography=()=>{
    navigate('/autobiography')
  }

  let goToMythology=()=>{
    navigate('/mythology')
  }

  useEffect(()=>{
    Aos.init()
  },[])

  return (
    <div className='container'>
      <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col">
    <div data-aos="zoom-in" data-aos-duration='2000' className='card-container' >
    <div  className="card shadow">
      <img src="https://www.artshub.com.au/wp-content/uploads/sites/2/2020/11/2-283008-Main-0x0-0.jpg" className="card-img-top b1" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Drama</h5>
        <div className='text-center'>
        <button onClick={goToDrama} className='btn btn-primary a'>Explore</button>

        </div>
      </div>
    </div>
    </div>
   
  </div>
  <div className="col">
    <div className='card-container' data-aos="zoom-in" data-aos-duration='2000'>
    <div className="card shadow">
      <img src="https://filmfare.wwmindia.com/thumb/content/2021/aug/besthollywoodhorrormovies101629283587.jpg?width=1200&height=900" className="card-img-top b2" alt="..."/>
      <div className="card-body ">
        <h5 className="card-title">Horror</h5>
        <div className='text-center'>
        <button onClick={goToHorror} className='btn btn-primary a'>Explore</button>

        </div>

      </div>
    </div>
    </div>
   
  </div>
  <div className="col">
    <div className='card-container' data-aos="zoom-in" data-aos-duration='2000'>
    <div className="card shadow">
      <img src="https://media.istockphoto.com/id/1308595699/photo/book-of-the-universe-opened-magic-book-with-planets-and-galaxies-elements-of-this-image.jpg?s=612x612&w=0&k=20&c=jvopWDHRM-KyPZ57FynEQ2XlQI6OyPJqHwCk0_--o5g=" className="card-img-top b3" alt="..."/>
      <div className="card-body ">
        <h5 className="card-title">Fiction</h5>
        <div className='text-center'>
        <button onClick={goToFiction} className='btn btn-primary a'>Explore</button>

        </div>

      </div>
    </div>
    </div>
   
  </div>
  <div className="col">
    <div className='card-container' data-aos="zoom-in" data-aos-duration='2000'>
    <div className="card shadow">
      <img src="https://warnercnr.colostate.edu/wp-content/uploads/sites/2/2017/04/shutterstock_428626417-1024x683.jpg" className="card-img-top b4" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Adventure</h5>
        <div className='text-center'>
        <button onClick={goToAdventure} className='btn btn-primary a'>Explore</button>

        </div>

      </div>
    </div>
    </div>
    
  </div>
  <div className="col">
    <div className='card-container' data-aos="zoom-in" data-aos-duration='2000'>
    <div className="card shadow">
      <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1588286863i/634583.jpg" className="card-img-top b5" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Autobiography</h5>
        <div className='text-center'>
        <button onClick={goToAutobiography} className='btn btn-primary a'>Explore</button>

        </div>

      </div>
    </div>
    </div>
   
  </div>
  <div className="col">
    <div className='card-container' data-aos="zoom-in" data-aos-duration='2000'>
    <div className="card shadow">
      <img src="https://i.pinimg.com/564x/4f/29/c4/4f29c4dbbe3846d70e9ebe52f0caf582.jpg" className="card-img-top b6" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">Mythology</h5>
        <div className='text-center'>
        <button onClick={goToMythology} className='btn btn-primary a'>Explore</button>

        </div>

      </div>
    </div>
    </div>
   
  </div>

</div>
    </div>
  )
}

export default Books