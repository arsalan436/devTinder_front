import { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData  = useSelector((store)=>store.user);
  const fetchUser = async () => {
    if(userData?._id) return;
    try {
      
            const res = await axios.get(BASE_URL + "/profile/view", {
              withCredentials: true,
      });
        dispatch(addUser(res.data));
      

      
    } catch (err) {
      if(err?.response?.status === 401){

        navigate('/login')
      }
      else{
        
        console.error("Fetch failed:", err.message);
      }
    }
    
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow"><Outlet /></div>
      <Footer />
    </div>
  );
};

export default Body;
