import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constants";
import { addFeed } from "../utils/feedSlice";

const Login = () => {

  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [error , setError] = useState('');
  const [user,setUser] = useState(true);

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

      navigate('/');
    }
    catch(err){
      setError(err?.respaonse?.data|| err?.message || "something went wrong!");
    }
  }


  const handleSignUp = async ()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{
        firstName,lastName,emailId,password},{withCredentials:true});
        dispatch(addUser(res.data.data));
        navigate("/profile");
    }
    catch(err){
      setError(err?.response?.data|| err?.message || "something went wrong!");
    }
  }


  return (
    <div className="flex justify-center items-center mt-6">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">{user?"Login":"Sign Up"}</h2>
          <p>{!user?"already a user: ":"don`t have an account: "}<a onClick={()=>setUser(!user)} className="cursor-pointer font-semibold">{!user?"Sign In":"Sign Up"}</a></p>
          {/*  */}
          
          {!user &&  <label data-theme="light" className="input validator my-2">
            <input
              value={firstName}
              onChange={e=>setFirstName(e.target.value)}
              type="text"
              minLength={2}
              maxLength={26}
              placeholder="Enter first Name"
              required
            />
          </label>}
          <div className="validator-hint hidden">Must contain 2-26 characters</div>

          {!user && <label data-theme="light" className="input validator my-2">
            <input
              value={lastName}
              onChange={e=>setLastName(e.target.value)}
              type="text"
              minLength={2}
              maxLength={26}
              placeholder="Enter last Name"
              required
            />
          </label>}
          <div className="validator-hint hidden">Must contain 2-26 characters</div>

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
          <p className="text-red-700 bg-blue-50 w-80 rounded-sm px-2">{error.message||error}</p>
          <p className="validator-hint hidden">
            Minimum 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
            <br />
            At least one special character
          </p>
          
          <div className="card-actions justify-center">
            {user?
            (<button onClick={handleLogin} className="btn">Login</button>):
            (<button onClick={handleSignUp} className="btn">Sign Up</button>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
