import React from 'react'
import './loader.css'

export default function Loader() {
  return (
      <div className="spinner-body flex w-full h-full absolute top-0 left-0 justify-center items-center">
          <div className="lds-spinner">
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
        <div id="elem"></div>
    </div>
    </div>
  )
}
