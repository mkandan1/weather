/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './Home.css';


export default function Home() {
  return (
    <>
      <Background/>
      <Container/>
      <LineInput/>
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
    <img className='icon' src={require('./images/icon.png')} />
    <input type='text' placeholder='Unleash Weather Insights' required></input>
    </div>
    
    </>
  )
}