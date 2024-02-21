import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

export default function ValidationError() {
    const {error} = useSelector(state => state.auth)
    
    const errorMessage = useCallback(() => {
        return Object.keys(error?.payload).map(name => {
            const msg = error.payload[name]
            return `${name} ${msg}`
       }) 
    }, [error])


    return error !== null && 
    <div>
      {errorMessage().map(err => (
        <div className='text-red-600 border text-sm p-1 m-1 border-red-600' key={err}>{err}</div>
      ))}
    </div>
}
