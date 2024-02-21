import React from 'react'
import { useSelector } from 'react-redux'
import ArticleServise from '../../../Service/articles'
import { useNavigate } from 'react-router-dom'

export default function HomeCard({ item, onclick, deleteArticle}) {
  const { loggedIn, user } = useSelector(state => state.auth)
  const navigate = useNavigate()
  console.log(item);
  
  
  return (
    <div className="card bg-white w-[280px] min-h-[260px] rounded-lg text-start border border-gray-300 flex flex-col justify-between">
      <img
        className='w-full object-cover h-[250px] rounded-t-lg p-1'
        src={item.author.image} alt="" />
      <p className="p-1 px-2text-md font-bold">{item.title.slice(0,30)}...</p>
      <p className="p-1 px-2text-xs pb-2 text-gray-600">{item.slug.slice(0,60)}...</p>
      <div className="flex justify-between px-1 border-t py-2 border-t-gray-400 bg-gray-200">
        <div className="button-group flex">
          <button 
            onClick={onclick}
            className="bg-white border-[1px] font-medium border-purple-950 text-purple-950 text-center py-1 rounded-s-lg  px-1  text-sm">
            View</button>
          {loggedIn && user.username === item.author.username
            &&
            (<>
            <button
                onClick={()=> navigate(`/edit-article/${item.slug}`)}
                className="bg-white border-[1px] font-medium border-purple-950 text-purple-950 text-center py-1  px-1 border-x-0 text-sm">
                Edit</button>
              <button 
                className="bg-white border-[1px] font-medium border-purple-950 text-purple-950 text-center py-1 rounded-e-lg px-1  text-sm"
                onClick={()=> deleteArticle(item.slug)}
                >
                Delete</button>
            </>)}
          
        </div>
        <p className="text-md font-semibold text-gray-600">{item.author.username}</p>
      </div>
    </div>
  )
}
