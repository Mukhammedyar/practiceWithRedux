import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess } from '../../Reducer/ArticleReducer';
import axios from 'axios';
import ArticleServise from '../../Service/articles';
import Loader from '../../UI/Loader/Loader';
import moment from 'moment/moment';

export default function ArticleElement() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { ArticleDetail, isLoading } = useSelector(state => state.article)
  console.log(slug);
    
  const getArticleDetail =async () => {
    dispatch(getArticleDetailStart())
    try {
      const {article} = await ArticleServise.getArticleDetail(slug)
      dispatch(getArticleDetailSuccess(article))
    } catch (error) {
      dispatch(getArticleDetailFailure())
    }
  }

  useEffect(() => {
    getArticleDetail()
  },[slug])


    return (
      isLoading ? <Loader/>
      : ArticleDetail !== null && 
      <div className="py-3 mb-4 rounded-md bg-white px-16">
          <div className="container-fluid pb-5 ">
          <div className='min-h-[300px] flex flex-col items-start justify-center gap-3 bg-gray-50 border mb-2 px-5 rounded-lg border-gray-300'>
            <h1 className="text-lg md:text-4xl w-[80%] md:w-4/5 font-bold text-start">{ArticleDetail.title}</h1>
            <p className="col-md-8 text-sm md:text-lg text-start w-[80%] md:w-2/3">{ArticleDetail.description}</p>
            <p className="text-gray-600">
              <span className="font-bold">Created at: </span>
              { moment(ArticleDetail.createdAt).format('LL')}
            </p>
          </div>
            <div className="col-md-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 overflow-hidden mb-4 my-4">
                <div className="p-4 flex flex-col items-start col-start-1 col-end-3 md:col-end-2 bg-slate-900 text-white rounded-lg min-h-[250px] py-10">
                    <strong className="inline-block mb-2 text-blue-600 font-sans text-2xl">Body of article</strong>
                    <p className="card-text mb-auto text-start">{ArticleDetail.body.slice(0,300)}...</p>
                    <button className='bg-white text-blue-800 font-bold rounded-md px-2 mt-2'>Learn more </button>
                </div>
                <div className="grid grid-flow-row grid-cols-5 bg-white border-gray-300 border text-black lg:col-start-2 col-start-1 col-end-3 lg:col-end-2 rounded-lg min-h-[250px]">
                  <div className=" bg-slate-700 col-start-1 col-end-3 h-full flex items-center justify-center rounded-l-lg">
                     <p className=' text-white text-8xl uppercase p-0 m-0'>{ArticleDetail.author.username.slice(0,1)}</p> 
                  </div>
                  <div className='col-start-3 col-end-6 flex flex-col justify-center items-start gap-2 text-start px-2'>
                    <p className="text-lg md:text-2xl text-blue-800 font-bold">{ArticleDetail.author.username}</p>
                    <p className="text-md md:text-lg">{ArticleDetail.description}</p>
                  </div>
                </div>
              </div>     
            </div>
          
        </div>
      </div>
    
  )
}
