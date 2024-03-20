import React, { useState, useEffect } from 'react'
import './WeatherApp.css'

import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import search_icon from '../assets/search.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

export const WeatherApp = () => {
    const [value, setValue] = useState('');
    const [weather, setWeather] = useState([])

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const apiKey = '3fbce0349d6fcfc4f53a6d9871b50641';

    useEffect(() => {
        console.log(weather);
    }, [weather]);


    const search = async () => {
        if (!value.trim()) {
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(value)}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            setWeather([data]);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };
    return (
        <div className='container'>
            <div className='top-bar'>
                <input className='cityInput' placeholder='Search' value={value} type='text' onChange={handleInput} />

                <div className='searchIcon' onClick={search} >
                    <img src={search_icon} alt='searchIcon' />
                </div>
            </div>
            <div className='weather-image'>
                <img src={cloud_icon} />
            </div>
            <div className='weather-temp'>
                {
                    weather.map((weath, index) => (
                        <p key={index}>
                            {Math.round(weath.main.temp - 273.15)}&deg;C
                        </p>
                    ))
                }
            </div>


            <div className='weather-location'>{
                value
            }</div>
            <div className='data-container'>
                <div className='element'>
                    <img src={humidity_icon} className='icon' />
                    <div className='data'>
                        <div className='humidity-percentage'>{
                            weather.map((weath, index) => (
                                <p key={index}>{weath.main.humidity}%</p>
                            ))
                        }</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img src={wind_icon} className='icon' />
                    <div className='data'>
                        <div className='humidity-percentage'> {
                            weather.map((weath, index) => (
                                <p key={index}>{weath.wind.speed}km/h</p>
                            ))
                        }</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
