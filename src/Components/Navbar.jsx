import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/Constants'
import { removeUser } from '../utils/userSlice'
import UserConnections from './UserConnections'
import { clearFeed } from '../utils/feedSlice'

const Navbar = () => {

  const user = useSelector(store=> store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async ()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      dispatch(clearFeed())
      navigate("/login");
    }
    catch(err){
      
    }

  }


  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    {user&&<div className="dropdown dropdown-end ">
      <div className="flex items-center">
              <p className='mx-2'>{user.firstName}</p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
        
          <img
            alt="photo"
            src={user.photoUrl}/>
            
        </div>
      </div>

      </div>

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1  w-52 p-2 shadow">
        <li>
          <Link to={"/profile"} className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to={"/user/connections"}>Connections</Link></li>
        <li><Link to={"/requests"}>Requests</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
    </div>
  )
}

export default Navbar
