import React, { useState } from 'react';
import './login.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <form className='form needs-validation m-5' noValidate onSubmit={handleSubmit}>
        <center>
          <p className="h1"><b>LOGIN</b></p>
          <br></br>
          <p className="h4">Hello again!</p>
        </center>
        <div className={`mb-3 ${validated ? 'was-validated' : ''}`}>
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className={`mb-3 ${validated ? 'was-validated' : ''}`}>
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" required />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
          <label className="form-check-label" htmlFor="exampleCheck1">I agree to the Terms & Conditions</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}
