import React, { useEffect, useState } from 'react'
import './Weather.css'
import cloud from '../images/cloud.png';
import rain from '../images/heavy-rain.png';
import mist from '../images/fog.png';
import haze from '../images/haze.png';
import cloudy from '../images/cloudy.png';
import tornado from '../images/nature.png';
import storm from '../images/storm.png';
import smoke from '../images/smoke.png';
import clear from '../images/clear.png';

function Weather() {

    const [city, setCity] = useState('Nashik');
    const [weather, setWeatherData] = useState(null);

    const currentDate = new Date();
    const months = ["January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`

    const API_KEY = "85cf35fb578f946f5af476934d6f0e5b";

    const fetchWeatherData = async () => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.json();
            console.log(data);
            setWeatherData(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchWeatherData();
    }, [])


    const handleInputChange = (e) => {
        console.log(e.target.value);
        setCity(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    }


    const getWeatherIconUrl = (main) => {
        switch (main.toLowerCase()) { // Normalize case
            case "clouds":
                return cloud;
            case "rain":
                return rain;
            case "mist":
                return mist;
            case "haze":
                return haze;
            case "cloudy":
                return cloudy;
            case "tornado":
                return tornado;
            case "thunderstorm": 
                return storm;
            case "clear": 
                return clear;
            case "smoke":
                return smoke;
            default:
                return "Icon Not avaiable"; 
        }
    };

    return (
        <div id='App'>
            <div className='flex items-center flex-col'>
                {weather && (
                    <>
                        <h1 className='text-center pt-12 font-semibold text-white text-[18px]'>{formattedDate}</h1>
                        <h1 className='text-center pt-2 font-semibold text-white text-[22px]'>{weather.name}</h1>
                        <img src={getWeatherIconUrl(weather.weather[0].main)} alt="Weather Icon" />

                        <h1 className='text-center pt-8 font-semibold text-white text-[45px]'>{weather.main.temp}</h1>
                        <h1 className='text-center font-bold text-white text-[20px]'>{weather.weather[0].description}</h1>

                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Enter City' className='h-10 w-48 m-8 border rounded text-center'
                                onChange={handleInputChange} />
                            <button className=' text-center h-[36px] w-[50px] bg-slate-400 text-white font-bold border rounded'>Get</button>
                        </form>
                    </>
                )}

            </div>
        </div>
    )
}

export default Weather
