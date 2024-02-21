import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/home'
import Login from './Components/Login/login'
import Registration from './Components/Registration/Registration'
import Navbar from './Components/Navbar/navbar'
import AuthService from './Service/Auth'
import { useEffect } from 'react'
import { signUserSuccess } from './Reducer/auth'
import ArticleElement from './Components/ArticleElement/ArticleElement'
import CreateArticle from './Components/CreateArticle/CreateArticle'
import EditArticle from './Components/EditArticle/EditArticle'

function App() {
  const dispatch = useDispatch()

  const getUsers = async () => {
    try {
      const response = await AuthService.getUser()
      dispatch(signUserSuccess(response.user))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
      <div className='text-gray-800'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/reg' element={<Registration/>} />
          <Route path='/articledetail/:slug' element={<ArticleElement/>} />
          <Route path='/create-article' element={<CreateArticle/>} />
          <Route path='/edit-article/:slug' element={<EditArticle/>} />
        </Routes>
     </div>
  )
}

export default App
