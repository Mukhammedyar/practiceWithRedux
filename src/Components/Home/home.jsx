import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ArticleServise from '../../Service/articles'
import { deleteArticleStart, deleteArticleSuccess, getArticleStart, getArticleSuccess } from '../../Reducer/ArticleReducer'
import Loader from '../../UI/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import HomeCard from './HomeCard/HomeCard'

export default function Home() {
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const { articles, isLoading } = useSelector(state => state.article)
  
  const getArticles = async () => {
    dispatch(getArticleStart())
    try {
      const { articles } = await ArticleServise.getArticles()
      dispatch(getArticleSuccess(articles))
    } catch (error) {
      console.log('error');
    }
  }
  const deleteHandler = async (slug) => {
    dispatch(deleteArticleStart())
    try {
      await ArticleServise.deleteArticle(slug)
      dispatch(deleteArticleSuccess())
      getArticles()
    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    getArticles()
  },[])

  return isLoading
      ? <Loader/>
      : <div className='bg-white'>
      <div className="cards flex flex-wrap py-4 px-5 gap-4 justify-evenly">
      {articles.map((item,index) => (
          <HomeCard 
          item={item} 
          onclick={()=> navigate(`/articledetail/${item.slug}`)} 
          key={index}
          deleteArticle={deleteHandler}
        />
      ))
      }
      </div>
    </div>
}
