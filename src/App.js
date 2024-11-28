import './App.css';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import RootLayout from './RootLayout';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Books from './components/books/Books';
import UserProfile from './components/userprofile/UserProfile';
import Drama from './components/drama/Drama';
import Horror from './components/horror/Horror';
import Fiction from './components/fiction/Fiction';
import Adventure from './components/adventure/Adventure';
import Autobiography from './components/autobiography/Autobiography';
import Mythology from './components/mythology/Mythology';
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:<RootLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/register',
          element:<Register/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/userprofile',
          element:<UserProfile/>
        },
        {
          path:'/books',
          element:<Books/>,
        },
        {
          path:'/drama',
          element:<Drama/>
        },
        {
          path:'/horror',
          element:<Horror/>
        },
        {
          path:'/fiction',
          element:<Fiction/>
        },
        {
          path:'/adventure',
          element:<Adventure/>
        },
        {
          path:'/autobiography',
          element:<Autobiography/>
        },
        {
          path:'/mythology',
          element:<Mythology/>
        }
      ]
    }
  ])
  return (
    <div >
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
