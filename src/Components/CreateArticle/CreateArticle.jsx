import React, { useState } from 'react'
import Input from '../../UI/input/input'
import Button from '../../UI/Button/Button'
import ArticleServise from '../../Service/articles'
import { useDispatch, useSelector } from 'react-redux'
import { postArticleFailure, postArticleStart, postArticleSuccess } from '../../Reducer/ArticleReducer'
import { useNavigate } from 'react-router-dom'

export default function CreateArticle() {
  const [input, setInput] = useState({ title: "", body: "", description: "" })
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.article)
  const navigate= useNavigate()
  
  const createArticleHandler = async (e) => {
      dispatch(postArticleStart())
      e.preventDefault()
    try {
      await ArticleServise.createArticle(input)
      dispatch(postArticleSuccess())
      setInput({ title: "", body: "", description: "" })
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='px-5 md:px-10 lg:px-16 flex justify-center items-center min-h-[80vh]'>
      <div className="border-gray-400 rounded-lg bg-white border-[1px] w-[75%] md:w-1/2 lg:w-1/3 p-3 md:p-5 ">
        <h1 className="text-lg md:text-lg lg:text-2xl font-bold">Create Article</h1>
        <form 
        className='text-start flex flex-col gap-2'>
          <Input 
            className={"px-0 text-sm"} 
            Label={"Title"} 
            placeholder={"title"} 
            onChange={(e) => setInput({...input,title: e.target.value})} 
            input={input.title}  />
          <textarea 
              name="body" 
              placeholder='body' 
              id=""
              className='min-h-[80px] p-1 border-[1px] focus:border-blue-500 focus:outline-0 focus:border-2 rounded-md' 
              onChange={(e) => setInput({...input,body: e.target.value})} 
              input={input.body}></textarea>
          <textarea 
              name="description" 
              placeholder='description' 
              id=""
              className='min-h-[80px] p-1 border-[1px] focus:border-blue-500 focus:outline-0 focus:border-2 rounded-md' 
              onChange={(e) => setInput({...input,description: e.target.value})} 
            input={input.description}></textarea>
          <Button
            onClick={createArticleHandler}
            type={"submit"}
            className={`px-3 py-2 w-full md:w-3/4 lg-1/2 ${ input.body==="" || input.description==="" || input.title==="" ? "bg-gray-600" : "bg-gray-800"}`}
            disabled={input.body==="" || input.description==="" || input.title==="" ? true : false}>
            {isLoading ? "Creating article in progress": "Create"}
          </Button>
        </form>
      </div>
    </div>
  )
}
