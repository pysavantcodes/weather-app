import React, { useState } from 'react'
import Results from './results'
import "./card.css"
import {FiX} from "react-icons/fi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Weather from './weather';
import Search from './Search';
  

const Card = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(false)
  const [noResult, setNoResult] = useState(false);
  const [displayWeather, setDisplayWeather] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayHome, setDisplayHome] = useState(true);
  const [locInfo, setLocInfo] = useState({});
  const [weatherInfo, setWeatherInfo] = useState({});
  const [loadingWeather, setLoadingWeather] = useState(false);


  const notify = () => toast.warn('Please enter a location', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  const noNetwork = () => toast.warn('Lost Connection, try checking connection', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  const getLocations = async()=>{
    try{
      setLoading(true)
      const url = document.getElementById("input").value;
      if(url === ""){
        notify();
        setLoading(false)
      }else{
        const fetchedLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${url}&limit=5&appid=d5bc5b2978ccf503c918012f8fa15f23`);
        const data = await fetchedLocation.json();
        setLoading(false);
        setNoResult(false)
        setLocations(data)
        if(locations.length === 0){
          setNoResult(true);
          setLocations(data);

        }else{
          setNoResult(false);
          setLocations(data);
          
        }
      }

    }catch(err){
      console.log(err)
      setLoading(false)
      setLocations([])
      noNetwork();
    }
  }
  const getWeather = async()=>{
    try{
      const fetchedWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locInfo.lat}&lon=${locInfo.lon}&appid=d5bc5b2978ccf503c918012f8fa15f23`)
      const data = await fetchedWeather.json();
      setWeatherInfo(data)
  
    }catch(error){
      console.log(error);
    }
  }

  const search = ()=>{
    setDisplaySearch(true);
    setDisplayWeather(false);
    setDisplayHome(false);
  }

  const cancelSearch = ()=>{
    setDisplaySearch(false);
    setDisplayWeather(false);
    setDisplayHome(true);
  }

  const viewWeather = (key)=>{
    setLocInfo(key);
    getWeather();
    setLoadingWeather(true);
    
 
    if(Object.keys(weatherInfo).length > 2 && Object.keys(locInfo).length > 2){
      setDisplayWeather(true)
      setLoadingWeather(false);
    }
    setDisplaySearch(false)
    
  }

  return (
    <div className='card'>
      <h1>Pysavant Weather app</h1>
      <div className="input">
        <input id='input' onFocus={()=>search()} type="text" placeholder='Search for a Location' />
        <button onClick={()=>getLocations()}>Search</button>
      </div>
      {
        displaySearch && 
        <div className="results">
        <h1 id='search'>Search Results <FiX onClick={()=> cancelSearch()}/></h1>
        {loading && 
        <div className="load">
          <div></div>
        </div> 
        }
        
        {!loading && noResult ? <p id='noresult'>No results of location</p> : <>{
          locations.map((loc)=>{
            return <Results onClick={()=>viewWeather(loc)} key={`${loc.lat}${loc.lon}`} location={`${loc.name}, ${loc.state}, ${loc.country}`} lat={loc.lat} long={loc.lon}/>
          })
        }</>}
        
      </div>
      }
      {
        loadingWeather &&

        <div className="load">
          <div></div>
        </div> 
      }
      {
        displayWeather &&
          <>
    
            <Weather country={`${locInfo.name}, ${locInfo.state}, ${locInfo.country}.`} cloud={weatherInfo.weather[0].description} temp={(weatherInfo.main.temp - 273).toFixed(2)} date={`Humidity : ${weatherInfo.main.humidity}`}
              
            time={`Wind Speed : ${weatherInfo.wind.speed} metre/sec`}/>
          </>
        
      }
      {
        displayHome && (
          <>
            <Search/>
          </>
        )
      }
  
      

      <ToastContainer position="top-right" autoClose={5000}hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
    </div>
    
  )
}

export default Card