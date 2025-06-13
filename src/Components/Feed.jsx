import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/Constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector(store=>store.feed);
  console.log(feed);
  

  const getFeed =  async ()=>{
    if(feed) return;
    try{
        const res = await axios.get(BASE_URL+"/user/feed?page=1&limit=4",{withCredentials:true})
        dispatch(addFeed(res.data));
    }
    catch(err){
      console.error(res.message);
    }

  }

  useEffect(()=>{
    getFeed();
  },[])

  return (feed && (
    <div>
      <UserCard user ={feed[0]}/>
    </div>
  ))
}

export default Feed
