import React from 'react'

export default function Button({children, onClick, type, className, disabled}) {
  return (
    <button
      className={`bg-gray-800 text-white text-xs p-1 w-1/2 mx-auto rounded-md ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
