import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const UserConnections = () => {
    const connections  = useSelector(store=>store.connection)
    const dispatch = useDispatch();


        const fetchConnections = async ()=>{
            try{
                const res = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
                dispatch(addConnection(res.data.data))
            }
            catch(err){
            }      
        }

        useEffect(()=>{
            fetchConnections();
        },[])
        
        if(!connections) return;
        if(connections.length === 0){
            return (
                <h1>No Connections found!</h1>
            )
        }
    
    
  return (
    <>
    <h1 className='text-center font-semibold text-3xl mt-2'>Your connections</h1>
    <div className='flex flex-wrap  justify-center my-3 '>
        
      {connections.map((connection)=>{
        const {firstName,photoUrl,lastName,about,age,gender,_id} = connection;
        
    return (
        <div key={_id} className='mx-2 my-2'>
            <div  className="card bg-base-100 w-44 shadow-sm">
            <figure>
                <img
                className='w-44 h-48'
                src={photoUrl}
                alt="photo" />
            </figure>

            <div className=' bg-cyan-200'>
            <div className="text-[0.9rem] mx-2 font-medium">
                <p>{firstName + " "+ lastName} </p>
                {<p>{age + " "+ gender} </p>}
                <p className='font-normal'>{about} </p>
            </div>
            <Link to={`/chat/${_id}`} ><button className='btn btn-secondary w-[60%] mx-auto flex my-2'>Message</button></Link>
            </div>
            </div>
        </div>
        
)
      })} 
    </div>
    </>
  )
}

export default UserConnections
