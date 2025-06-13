import React from 'react'

const UserCard = ({user}) => {
    const {firstName,lastName,age,gender,about,photoUrl} = user;
  return (
    <div className='m-2 '>
        
      <div className="card bg-cyan-200 text-black w-60 items-center ">
        <div className='w-48 h-48'>
            < img src={photoUrl} alt=""  className='w-48 h-48 m-2 rounded-md'/>
        </div>
  <div className="card-body   items-center text-center">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age&& gender&&<p className='font-medium'>{age+", "+gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-end w-52">
      <button className="btn btn-secondary">Intrested</button>
      <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
