/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Home.css';


export default function Home() {
  return (
    <>
      <Background/>
      <Container/>
      <LineInput/>
      <Button/>
      <Weather/>
      <Extra/>
    </>
  )
}



function Background(){
  return(
    <section className='Background'>
       
    </section>
  )
}

function Container(){
  return(
    <div className='container'>
      </div>
  )
}
function LineInput(){
  return(
    <>
    <div className='Inputfield'>
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="dark" class="bi bi-geo-alt-fill me-2" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg>
    <input id='inputtext' type='text' placeholder='Enter your city name' required></input>

    </div>
    
    </>
  )
}
function Button(){
  return(
    <>
    <input id='check' type='Button' value={'Check'}></input>
    </>
  )
}
function Weather(){
  return(
    <>
    <div className='weather'>
      <p>28&deg;&nbsp;C</p>
      <center>
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="dark" class="bi bi-cloud-lightning-rain-fill" viewBox="0 0 16 16">
        <path d="M2.658 11.026a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.5 1.5a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm9.5 0a.5.5 0 0 1 .316.632l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.316zm-7.105-1.25A.5.5 0 0 1 7.5 11h1a.5.5 0 0 1 .474.658l-.28.842H9.5a.5.5 0 0 1 .39.812l-2 2.5a.5.5 0 0 1-.875-.433L7.36 14H6.5a.5.5 0 0 1-.447-.724l1-2zm6.352-7.249a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z"/>
      </svg>
      </center>
      <br></br>
      <p id='condition'>Rain with ThunderStrom</p>
      
    </div>

    </>
  )
}

function Extra(){
  return(
    <>
    <div className='extra'>
      <p>Feels Like : 82</p>
      <p>Ultraviolet : low</p>
      <p>Wind Speed : 4km/h</p>
    </div>
      </>
  )
}