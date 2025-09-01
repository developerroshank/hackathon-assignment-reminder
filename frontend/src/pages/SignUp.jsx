import React from 'react'
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "./SignUpLogin.css";

export const SignUp = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowHide = (() => {
    setShowPassword(!showPassword);
  });

  const [form, setForm] = useState({ username: "", email: "", contact: null, password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.contact) {
      newErrors.contact = "Contact is required";
    } else if (form.contact.length < 10) {
      newErrors.contact = "Contact must be at least 10 digits";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted ✅", form);
      try {
        const response = await axios.post('http://localhost:5000/signup', form);
        console.log(response?.data);
        if (response?.data?.status === 200)
          toast.success(response?.data?.message);

      } catch (err) {
        console.log(err?.response?.data);
        toast.error(err?.response?.data?.message);
      }
      setForm({
        username: "",
        email: "",
        contact: "",
        password: "",
      });
    }
  }

  return (

    <>
      <div className="signin-container">

        <div className="signin-box">

          <h1 className="signin-heading">
            Create account
          </h1>

          <div className="form">

            <div className="form-group">
              <label htmlFor="name">Enter your name</label>
              <input name="username" type="text" onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))} />
              {errors.username && <span className="error">{errors.username}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Enter your email</label>
              <input name="email" type="email" onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contact">Enter your contact</label>
              <input name="contact" type="number" onChange={(e) => setForm(prev => ({ ...prev, contact: e.target.value }))} />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Enter your password</label>
              <div className="password-show">
                <input name="password" type={showPassword ? 'text' : 'password'} onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} />
                <p onClick={toggleShowHide} title={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</p>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button onClick={handleSubmit} className="form-button button-primary">Create account</button>

            <p className="account">Already have an account? <span onClick={() => navigate('/login')} className='link-primary'>Sign in</span></p>

          </div>
        </div>
      </div>

      <ToastContainer />
    </>

  )
}


