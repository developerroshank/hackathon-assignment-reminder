import React from 'react'
import { useState } from "react";
import "./SignUpLogin.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export const Login = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowHide = (() => {
    setShowPassword(!showPassword);
  });

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});


  const validate = () => {
    let newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
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
      try {
        const response = await axios.post('https://hackathon-assignment-reminder.onrender.com/login', form);
        if (response?.data?.status === 200) {
          toast.success(response?.data?.message);
          const token = response?.data?.token
          console.log(token, 'token');
          localStorage.setItem('token', token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        }
      } catch (err) {
        console.log(err)
        toast.error(err?.response?.data?.message);
      }
    }

    setForm({
      username: "",
      email: "",
      contact: "",
      password: "",
    });

  }

  return (

    <>
      <div className="signin-container">

        <div className="signin-box">

          <h1 className="signin-heading">
            Sign In
          </h1>

          <div className="form">

            <div className="form-group">
              <label htmlFor="email">Enter your email</label>
              <input name="email" type="email" onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Enter your password</label>
              <div className="password-show">
                <input name="password" type={showPassword ? 'text' : 'password'} onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))} />
                <p onClick={toggleShowHide} title={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}</p>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button onClick={handleSubmit} className="form-button">Login</button>

            <p className="account">Don't have an account? <span onClick={() => navigate('/signup')} className='link-primary'>Create account</span></p>

          </div>

        </div>

      </div>

      <ToastContainer />
    </>

  )
}


