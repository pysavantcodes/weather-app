import React from 'react'
import image from "../World-pana.png"

const Search = () => {
  return (
    <div className='cont'>
        <img id='search' src={image} alt="" />
        <p>Try searching for anywhere around the globe.</p>
    </div>
  )
}

export default Search