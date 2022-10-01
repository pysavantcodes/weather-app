import React from 'react'
import {GoLocation} from "react-icons/go"
import "./card.css"



const Results = ({location, lat, long, onClick}) => {
  return (
    <div onClick={onClick} className="row">
      <GoLocation fontSize={20}/>
      <div className="txt">
      <p>{location}</p>
      <p>Lat: {lat}, Long: {long}</p>
      </div>
    </div>
  )
}

export default Results