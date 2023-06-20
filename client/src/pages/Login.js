import React, { useState } from 'react';
import './login.css';
import {Link} from 'react-router-dom'

export default function Login() {
  return (
    <>
      <Form />
    </>
  );
}

function Form() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
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
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className={`mb-3 ${validated ? 'was-validated' : ''}`}>
          <label htmlFor="exampleInputPassword1" className="form-label"><b>Password</b></label>
          <input type="password" className="form-control" id="exampleInputPassword1" required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
          <label className="form-check-label" htmlFor="exampleCheck1">I agree to the Terms & Conditions</label>
        </div>
        <button type="submit" className="btn btn-full mt-3 btn-light" onClick={()=>Login}>Submit</button>

        <div className='text-center mt-5'>
          <span>Don't have an account? <Link to='/signup'>Sign Up</Link></span>
        </div>
      </form>
      </div>
    </>
  );
}
