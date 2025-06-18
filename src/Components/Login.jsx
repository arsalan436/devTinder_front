import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";

const Login = () => {

  const [emailId,setEmailId] = useState("shahid@gmail.in");
  const [password,setPassword] = useState("Shahid@123");
  const [error , setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async ()=>{
    try{
      const res = await axios.post(BASE_URL+"/login", {
        emailId,
        password
      },{withCredentials:true});
      dispatch(addUser(res.data));
      navigate('/');
      // console.log(res.data);
      
    }
    catch(err){
      
      setError(err?.message || "something went wrong!");
      
    }
  }


  return (
    <div className="flex justify-center items-center mt-6">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          {/*  */}
          <label data-theme="light" className="input validator my-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              value={emailId}
              onChange={e=>setEmailId(e.target.value)}
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
              type="email"
              placeholder="mail@site.com"
              required
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          {/*  */}
          <label data-theme="light" className="input validator mb-2">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              value={password}
              onChange={e=>setPassword(e.target.value)}
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter, speacial character"
            />
          </label>
          <p className="text-red-700 bg-blue-50 w-80 rounded-sm px-2">{error}</p>
          <p className="validator-hint hidden">
            Minimum 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
            <br />
            At least one special character
          </p>
          {/*  */}
          <div className="card-actions justify-center">
            <button onClick={handleLogin} className="btn">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
