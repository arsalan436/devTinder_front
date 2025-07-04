import { useEffect } from "react";
import {BASE_URL} from "../utils/Constants"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store=> store.requests);


            const reviewRequest = async (status,request_id)=>{
            try{
                await axios.post(BASE_URL+"/request/review/"+status+"/"+request_id,{},{withCredentials:true})
                dispatch(removeRequest(request_id))
            }
            catch(err){

            }
        }

    const fetchrequest = async ()=>{


        try{
            const res = await axios.get(BASE_URL+"/user/request/recieved",{withCredentials:true})
            dispatch(addRequests(res.data.data))
            
        }
        catch(err){
            
        }
    }

    useEffect(()=>{
        fetchrequest();
    },[])

            if(!requests) return;
        if(requests.length === 0){
            return (
                <h1 className="text-center font-semibold text-2xl mt-4">😟 No requests found!</h1>
            )
        }

  return (
    <div>
        <h1 className="text-center font-semibold text-3xl my-1">Recieved Requests</h1>
      {
       requests && requests.map((request)=>{
            const {fromUserId,toUserId,status,_id,createdAt} = request;
            const {firstName,lastName,about,age,photoUrl,gender} = fromUserId;
           return (<div key={_id} className=" flex justify-center">
                    
                <div className="card card-side bg-base-100 shadow-sm my-2">
                    <figure>
                        <img className="min-h-40 w-32"
                        src={photoUrl}
                        alt="photo" />
                    </figure>
                    <div className="card-body bg-cyan-100">
                        <h2 className="card-title">{firstName+" "+lastName +" (" +age+"-"+gender+")"}</h2>
                        <p>{about}</p>
                        <p className="m-0">Has sent you a friend request on {new Date(createdAt).toLocaleDateString("en-IN")} at {new Date(createdAt).toLocaleTimeString("en-IN")}</p>
                        
                        <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={()=>reviewRequest("accepted",_id)}>Accept</button>
                        <button className="btn btn-secondary" onClick={()=>reviewRequest("rejected",_id)}>Reject</button>
                        </div>
                    </div>
                </div>
            </div>)
        })
      }
    </div>
  )
}

export default Requests
