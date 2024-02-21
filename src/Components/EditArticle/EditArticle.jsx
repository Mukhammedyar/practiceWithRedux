import React, { useState } from 'react'
import Input from '../../UI/input/input'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../UI/Button/Button'
import ArticleServise from '../../Service/articles'
import { useEffect } from 'react'
import { getArticleDetailFailure, getArticleDetailStart, getArticleDetailSuccess, postArticleStart, postArticleSuccess } from '../../Reducer/ArticleReducer'
import { Alert } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

export default function EditArticle() {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch()
    const { isLoading, ArticleDetail } = useSelector(state => state.article)
    const { slug } = useParams()
    const navigate = useNavigate()
    const [visible , setVisible] = useState(false)
    
    useEffect(() => {
        const getArticleDetail =async () => {
            dispatch(getArticleDetailStart())
            try {
                const { article } = await ArticleServise.getArticleDetail(slug)
                setTitle(article.title)
                setBody(article.body)
                setDescription(article.description)
                dispatch(getArticleDetailSuccess(article))
            } catch (error) {
              dispatch(getArticleDetailFailure())
            }
          }
        getArticleDetail()
    }, [])

    
    const formSubmit =async (e) => {
        e.preventDefault()
        dispatch(postArticleStart())
        const article={title, body, description}
        try {
            await ArticleServise.editArticle(slug, { article })
            setVisible(true)
            dispatch(postArticleSuccess())
            setTitle("")
            setBody("")
            setDescription("")
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='px-5 md:px-10 lg:px-16 flex justify-center items-center min-h-[80vh]'>
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className={`${visible ? 'opacity-1' : "opacity-0"} absolute top-16`}>
         Here is a gentle confirmation that your action was successful.
        </Alert>
      <div className="border-gray-400 rounded-lg bg-white border-[1px] w-[75%] md:w-1/2 lg:w-1/3 p-3 md:p-5 ">
        <h1 className="text-lg md:text-lg lg:text-2xl font-bold">Edit Article</h1>
        <form 
        className='text-start flex flex-col gap-2'>
          <Input
            className={"px-0 text-sm"} 
            Label={"Title"} 
            onChange={(e) => setTitle(e.target.value)} 
            value={isLoading?"loading...":title}  />
          <textarea 
              name="body" 
              placeholder='body' 
              id=""
              className='min-h-[80px] p-1 border-[1px] focus:border-blue-500 focus:outline-0 focus:border-2 rounded-md' 
              onChange={(e) => setBody(e.target.value)} 
              value={isLoading?"loading...":body}></textarea>
          <textarea 
              name="description" 
              placeholder='description' 
              id=""
              className='min-h-[80px] p-1 border-[1px] focus:border-blue-500 focus:outline-0 focus:border-2 rounded-md' 
              onChange={(e) => setDescription(e.target.value)} 
              value={isLoading?"loading...":description}></textarea>
          <Button
            onClick={formSubmit}
            type={"submit"}
            className={`px-3 py-2 w-full md:w-3/4 lg-1/2 ${ body==="" || description==="" || title==="" ? "bg-gray-600" : "bg-gray-800"}`}
            disabled={body==="" || description==="" || title==="" ? true : false}>
            {isLoading ? "Creating article in progress": "Create"}
          </Button>
        </form>
      </div>
    </div>
  )
}
