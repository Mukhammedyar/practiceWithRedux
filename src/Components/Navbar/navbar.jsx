import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeItem } from '../../helpers/persistance-storage'
import { logOutUser } from '../../Reducer/auth'

export default function Navbar() {
  const { loggedIn, user } = useSelector(state => state.auth)
  const dispatch= useDispatch()
  const navigate= useNavigate()

  const logOutHandler = () => {
    navigate('/login')
    removeItem('token')
    dispatch(logOutUser())
  }

  return (
    <div className='flex bg-white shadow-lg items-center justify-between p-2 border-b-gray-400 border-b-[1px] b'>
        <Link to={'/'} className='text-2xl font-bold'>Redux-Course</Link>
        <div className='flex justify-around w-1/4'>
        {loggedIn ?
          <>
            <Link to={'/create-article'}>Create Article</Link>
            <p className="text-gray-800 px-3 border-b-gray-700 border-b text-center h-[30px]">{user.username}</p>
            <button className='border border-red-500 p-2' onClick={logOutHandler}>LogOut</button>
          </>
        : <>
           <Link to={'/login'} className='bg-gray-700 text-white px-2 rounded-md p-1'>Login</Link>
            <Link to={'/reg'} className='bg-gray-700 text-white px-2 rounded-md p-1'>Register</Link>
          </>
          }
            
        </div>
    </div>
  )
}
