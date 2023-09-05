import WeatherCard from '../weatherWidget/weatherWidget'
import axios from 'axios'
import {  useRef, useState } from "react"



const Home = () => {

    const [weatherData, setWeatherData] = useState([])

    const cityNameRef = useRef(null)

    const submitHandler = async(e) => {
        e.preventDefault()
       console.log(cityNameRef.current.value)
        let apikey = `d6b11e5a2cafe8b61045ab0d8c7d767d`

        try{

        const response = await axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameRef.current.value}&appid=${apikey}&units=metric`)
         console.log(response.data);
         setWeatherData([response.data, ...weatherData])
        }
        catch(e){
                // handle error
                console.log(e.data);
               
           }
        }



    
    
  
  
 return <div>

     <form onSubmit={submitHandler}>

        <label htmlFor="cityNameInput">City Name:</label>

            <input type="text" id="cityNameInput" required

             minLength={2} maxLength={20} ref={cityNameRef}/>

             <br />

             <button type="submit">Get Weather</button>
       
     </form>

     <hr />
    
     {weatherData.length ? 
        weatherData.map((eachWeatherDate, index) => {
          return <WeatherCard key={index} weatherData={eachWeatherDate} />;
        })
       : 
        <div>No Data</div>
      }
    

      
    </div>
}

export default Home