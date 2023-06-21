import React, { useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import app from '../firebaseConfig';

export default function Login() {
  return (
    <>
      <Form />
    </>
  );
}

function Form() {

  const startLoading = () => {
    var button = document.querySelector('.login-button');
    button.classList.add('loading');

    // Simulate login process
    setTimeout(function () {
      button.classList.remove('loading');
    }, 3000);
  }

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [terms, setTerms] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleTerms = (event) => {
    if (terms) {
      setTerms(false);
    }
    else {
      setTerms(true);
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const auth = getAuth(app);
    if (terms) {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          window.location.href = '/'
        })
        .catch((err) => {
          
          document.getElementById('err').innerHTML = err.code;
          if (err.code == 'auth/user-not-found') {
            document.getElementById('err').innerHTML = "No user found";
          }
          else if(err.code == 'auth/wrong-password'){
            document.getElementById('err').innerHTML = "Incorrect Password";
          }
        })
    }
    else {
      document.getElementById('err').innerHTML = "Accept terms and condition";
    }
    setValidated(true);
  };

  return (
    <>
      <div className='login_form_wrapper ps-0 ps-md-5 justify-content-center justify-content-md-start'>
        <form className='form needs-validation' noValidate onSubmit={handleSubmit}>
          <center>
            <p className="h1"><b>LOGIN</b></p>
            <br></br>
            <p className="h4">Hello again!</p>
          </center>
          <div className={`mb-3 ${validated ? 'was-validated' : ''}`}>
            <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className={`mb-3 ${validated ? 'was-validated' : ''}`}>
            <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={handleTerms} required />
            <label className="form-check-label" htmlFor="exampleCheck1">I agree to the Terms & Conditions</label>
          </div>
          <button type="submit" className="btn-full mt-3 login-button">Login</button>
          <p className='mt-3' id='err'></p>
          <div className='text-center mt-2'>
            <span>Don't have an account? <Link to='/signup'>Sign Up</Link></span>
          </div>
        </form>
      </div>
    </>
  );
}
