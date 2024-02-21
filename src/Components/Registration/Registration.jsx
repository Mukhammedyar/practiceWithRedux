import React, { useEffect, useState } from 'react'
import Input from '../../UI/input/input'
import Button from '../../UI/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { signUserFailure, signUserStart, signUserSuccess } from '../../Reducer/auth'
import AuthService from '../../Service/Auth'
import ValidationError from '../ValidationError/validationError'
import { useNavigate } from 'react-router-dom'

export default function Registration() {
    const [value, setValue] = useState({ name: "", email: "", pass: "" })
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)


    const navigate = useNavigate()
    
    const handleRegister = async (e) => {
        e.preventDefault() 
        dispatch(signUserStart())
        const user = {
            username: value.name,
            password: value.pass,
            email: value.email
        }
        try {
            const response = await AuthService.userRegister(user)
            dispatch(signUserSuccess(response.user))
            navigate("/login");  
            setValue({ name: "", email: '', pass: '' })
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='h-[100vh] flex justify-center items-center'>
        <form action="" className='bg-gray-100 border w-1/3 border-gray-400 min-h-1/3 p-4 flex justify-center flex-col gap-2'>
            Please Sign-Up
            <Input 
                placeholder={"name..."}
                type={"text"}
                value={value.name}
                onChange={(e)=> setValue({...value, name: e.target.value})}
            />
            <Input 
                placeholder={"email..."}
                type={"text"}
                value={value.email}
                onChange={(e)=> setValue({...value, email: e.target.value})}
            />
            <Input 
                placeholder={"password..."}
                type={"password"}
                value={value.pass}
                onChange={(e)=> setValue({...value, pass: e.target.value})}
              />
            <ValidationError/>
            <Button onClick={handleRegister}>
                {isLoading? "Loading...": "Redistration" }
            </Button>
        </form>
    </div>
  )
}
