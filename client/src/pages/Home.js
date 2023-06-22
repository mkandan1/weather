/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import loading from './images/loading1.gif'
import app from '../firebaseConfig';


export default function Home() {

  return (
    <>
      <Container />
    </>
  )
}

function Container() {
  const [city, setCity] = useState();
  const [show, setShow] = useState(false);
  const [condition, setCondition] = useState();
  const [temp_c, setTempC] = useState();
  const [image, setImage] = useState();
  const [feelslike, setFeelslike] = useState();
  const [ulv, setUv] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [isLogged, setIsLogged] = useState(false);

  const handleCity = (event) => {
    setCity(event.target.value);
  }

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      }
    })
  })

  const logout = ()=>{
    const auth = getAuth(app);
    signOut(auth).then(()=>{
      setIsLogged(false);
    }).catch((err)=>{
      console.log(err.message);
    })
  }
  const fetchReport = () => {
    setShow(false);
    const container = document.getElementById('container');
    const spinner = document.getElementById('spinner');
    container.classList.remove('show');
    container.classList.add('show');
    spinner.classList.remove('d-none')
    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${city}&aqi=yes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
      .then((weather_data) => {
        setTempC(weather_data.current.temp_c);
        setCondition(weather_data.current.condition.text);
        setImage(weather_data.current.condition.icon);
        setFeelslike(weather_data.current.feelslike_f);
        setWindSpeed(weather_data.current.wind_kph);
        const uv = weather_data.current.uv;
        if (uv >= 0 && uv <= 2) {
          setUv('Good')
        }
        else if (uv >= 3 && uv <= 5) {
          setUv('Low risk')
        }
        else if (uv >= 6 && uv <= 7) {
          setUv('Moderate risk')
        }
        else if (uv >= 8 && uv <= 10) {
          setUv('High risk')
        }
        setTimeout(() => {
          if (temp_c != "") {
            setShow(true)
            spinner.classList.add('d-none')
          }
        }, 1000)
      }).catch((err) => {
        console.log(err.code);
      })


  }
  return (
    <div className='Background d-flex align-items-center justify-content-center'>

      <div id='container' className='container_wrapper row d-flex justify-content-center'>
        <div className='Inputfield col-12 col-md-7 d-flex justify-content-between'>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="dark" class="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          <input id='inputtext' type='text' placeholder='Enter your city name' onChange={handleCity} required></input>
          <input id='check' type='Button' onClick={fetchReport} value={'Check'}></input>
        </div>
        <div className='col-8 d-flex justify-content-center d-none' id='spinner'>
          <img src={loading} className='img-fluid loading' alt='loading'></img>
        </div>
        {show ? <>
          <div className='result_container col-12 col-md-6 mt-5 row d-flex justify-content-between'>
            <div className='weather col-12 col-md-6 text-center pt-3 d-flex'>
              <img src={image} className='img-fluid weather_img ms-auto me-auto' alt={condition} />
              <div className=''>
                <p className='result_temp mt-3'>{temp_c}<sup>°</sup><span className='unit'>C</span></p>
                <p className='mt-2'>{condition}</p>
              </div>
            </div>
            <div className='extra col-12 col-md-6 row mt-3 mt-md-0'>
              <p>Feels Like : {feelslike} %</p>
              <p>Ultraviolet : {ulv}</p>
              <p>Wind Speed : {windSpeed} km/h</p>
            </div>
          </div>
        </> : <></>}

      </div>

      <div className='account'>
        {isLogged ? <span className='d-flex align-items-center logout'><span class="material-symbols-outlined" onClick={logout}>
          logout
        </span> Log out</span> : <Link to='/login'>Login | Sign up</Link>}
      </div>
    </div>
  )
}