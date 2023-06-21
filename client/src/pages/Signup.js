import React, { useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database'
import app from '../firebaseConfig';

export default function Login() {
  return (
    <>
      <Form />
    </>
  );
}

function Form() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [name, setName] = useState();
  const [terms, setTerms] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleMobile = (event) => {
    setMobile(event.target.value)
  }
  const handleName = (event) => {
    setName(event.target.value)
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
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          const userId = user.user.uid;
          const db = getDatabase(app);
          set(ref(db, 'Users/' + userId), {
            name: name,
            email: email,
            phone_number: mobile
          })
          .catch((err)=>{
            console.log(err.message);
          })

          window.location.href = '/'
          

        })
        .catch((err) => {
          document.getElementById('err').innerHTML = err.code;
          if (err.code == 'auth/email-already-in-use') {
            document.getElementById('err').innerHTML = "Email already used by another user";
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
      <div className='signup_form_wrapper  ps-0 ps-md-5 justify-content-center justify-content-md-start'>
        <form className='form_signup needs-validation' noValidate onSubmit={handleSubmit}>
          <center>
            <p className="h1"><b>SIGN IN</b></p>
            <br></br>
            <p className="h4">Hey there !</p>
          </center>
          <div className={`mb-2 ${validated ? 'was-validated' : ''}`}>
            <label htmlFor="exampleInputName" className="form-label"><b>Name</b></label>
            <input type="text" className="form-control" id="exampleInputName" onChange={handleName} required />
          </div>
          <div className={`mb-2 ${validated ? 'was-validated' : ''}`}>
            <label htmlFor="exampleInputPhone" className="form-label"><b>Mobile No.</b></label>
            <input type="number" className="form-control" id="exampleInputPhone" onChange={handleMobile} required />
          </div>
          <div className={`mb-2 ${validated ? 'was-validated' : ''}`}>
            <label htmlFor="exampleInputEmail1" className="form-label"><b>Email address</b></label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmail} required />
            <div id="emailHelp" className="form-text">We'll never share your email and Mobile No. with anyone  else.</div>
          </div>
          <div className={`mb-2 ${validated ? 'was-validated' : ''}`}>
            <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
            <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePassword} required />
          </div>
          <div className="mb-2 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" required onChange={handleTerms} />
            <label className="form-check-label" htmlFor="exampleCheck1">I agree to the Terms & Conditions</label>
          </div>
          <button type="submit" className="btn mt-3 btn-full btn-light">Signup</button>
          <p className='mt-3' id='err'></p>
          <div className='text-center mt-4'>
            <span>Already have an account? <Link to='/login'>Login</Link></span>
          </div>
        </form>
      </div>
    </>
  );
}
