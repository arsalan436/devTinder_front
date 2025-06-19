import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed);

useEffect(() => {
  getFeed();
}, []);

  

  const getFeed =  async ()=>{
    if(feed) return;
    try{
        const res = await axios.get(BASE_URL+"/user/feed",{withCredentials:true})
        dispatch(addFeed(res.data));
    }
    catch(err){
      console.error(res.message);
    }

  }

  useEffect(()=>{
    getFeed();
  },[])

  if(!feed) return;
  if(feed.length === 0){
    return(
      <h1 className='text-center font-semibold mt-4 text-2xl'>😟 No new Users found!</h1>
    )
  }

  return (feed && (
    <div className='flex justify-center mt-4'>
      <UserCard user ={feed[0]}/>
    </div>
  ))
}

export default Feed
