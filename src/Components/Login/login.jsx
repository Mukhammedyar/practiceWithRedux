import React, { useEffect, useState } from 'react'
import Input from '../../UI/input/input'
import Button from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../../Reducer/auth'
import AuthService from '../../Service/Auth'
import ValidationError from '../ValidationError/validationError'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [value, setValue] = useState({ email: "", pass: "" })
  const dispatch = useDispatch()
  const { isLoading, loggedIn } = useSelector(state => state.auth)


  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault()
    dispatch(signUserStart())
    const user = {
      email: value.email,
      password: value.pass,
    }
    try {
      const response = await AuthService.userLogin(user)
      dispatch(signUserSuccess(response.user))
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/home")
    }
  }, [loggedIn])

  return (
    <div className='h-[100vh] flex justify-center items-center'>
      <form action="" className='bg-gray-100 border w-1/3 border-gray-400 min-h-1/3 p-4 flex justify-center flex-col gap-2'>
        Please Sign In
        <Input
          placeholder={"email..."}
          type={"text"}
          value={value.email}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
        />
        <Input
          placeholder={"password..."}
          type={"password"}
          value={value.pass}
          onChange={(e) => setValue({ ...value, pass: e.target.value })}
        />
        <ValidationError />
        <Button onClick={loginHandler} className={' bg-gray-800 disabled:bg-gray-700'}>
          {isLoading ? "loading..." : "Login"}
        </Button>
      </form>
    </div>
  )
}
