import axios from "axios";
import {BASE_URL} from "../utils/Constants"
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";


const UserCard = ({user}) => {
    const {firstName,lastName,age,gender,about,photoUrl,_id} = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status,id)=>{
      try{
          const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+id,{},{withCredentials:true})
          dispatch(removeUserFromFeed(id))
      }
      catch(err){

      }
    }
  return (
    <div className='m-2 '>
        
      <div className="card bg-cyan-200 text-black w-60 flex justify-center ">
        <div className=' flex justify-center'>
            < img src={photoUrl} alt=""  className='w-52 h-52 m-2 rounded-md '/>
        </div>
  <div className="text-1 mx-2 my-2 font-medium   items-center ">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&& gender&&<p className='font-medium'>{age+", "+gender}</p>}
    <p className='font-normal'>{about}</p>
    <div className="card-actions justify-end w-52 mt-2">
      <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>Intrested</button>
      <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
