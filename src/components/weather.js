import React from 'react'
import "./card.css"


const Weather = ({temp, cloud, country, time, date}) => {
    
  return (
    <div className='weather-info'>
        <h4>{country}</h4>
        <p id='time'>{date}</p>
        <p id='time'>{time}</p>
        
        <div className="back">
        <div className="situation">
          <h1 id='temp'>{temp}<span>°C</span></h1>
          <p id="description" >{cloud}</p>
        </div>
        </div>
        
        


        
    </div>
    
  )
}

export default Weather