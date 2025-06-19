import React, { useState } from 'react'
import { BASE_URL } from '../utils/Constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
    const {firstName, lastName,age,gender,photoUrl,about,skills} = user

    const [firstNameState, setFirstNameState] = useState(firstName);
    const [lastNameState, setLastNameState] = useState(lastName);
    const [ageState, setAgeState] = useState(age||"");
    const [genderState, setGenderState] = useState(gender);
    const [photoUrlState, setPhotoUrlState] = useState(photoUrl);
    const [aboutState, setAboutState] = useState(about);
    const [skillsState, setSkillsState] = useState(skills);

    const [showToast,setShowToast] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

      const handleSaveProfile = async()=>{
        setError("");
        try{
            const res = await axios.patch(BASE_URL+"/profile/edit",{  
            firstName: firstNameState,
            lastName: lastNameState,
            age: Number(ageState),
            gender: genderState,
            photoUrl: photoUrlState,
            about: aboutState,
            skills: skillsState
        },{withCredentials:true})

            dispatch(addUser(res?.data?.data))
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
            
        }
        catch(err){
            setError(err.response.data)
        }
      }
    return (
    <div className="flex justify-center items-center mt-6">

      <div className="card bg-primary text-primary-content w-96 mx-4">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          {/*  */}
          <label data-theme="light" className="input validator my-2">
            <input
              value={firstNameState}
              onChange={e=>setFirstNameState(e.target.value)}
              type="text"
              placeholder="firstName"
              required
            />
          </label>
          <label data-theme="light" className="input validator my-2">
            <input
              value={lastNameState}
              onChange={e=>setLastNameState(e.target.value)}
              type="text"
              placeholder="lastName"
              required
            />
          </label>
          <label data-theme="light" className="input validator my-2">
            <input
              value={ageState}
              onChange={e=>setAgeState(e.target.value)}
              type="text"
              placeholder="age"
              required
            />
          </label>
<label data-theme="light" className="input validator my-2">
  <select
    value={genderState}
    onChange={e => setGenderState(e.target.value)}
    required
    className="w-full bg-transparent outline-none"
  >
    <option value="" disabled>Select gender</option>
    <option value="male">male</option>
    <option value="female">female</option>
    <option value="others">others</option>
  </select>
</label>

          <label data-theme="light" className="input validator my-2">
            <input
              value={photoUrlState}
              onChange={e=>setPhotoUrlState(e.target.value)}
              type="text"
              placeholder="photoUrl"
              required
            />
          </label>
          <label data-theme="light" className="input validator my-2">
            <input
              value={aboutState}
              onChange={e=>setAboutState(e.target.value)}
              type="text"
              placeholder="About"
              required
            />
          </label>
          <label data-theme="light" className="input validator my-2">
            <input
              value={skillsState}
              onChange={e=>setSkillsState(e.target.value)}
              type="text"
              placeholder="Skills"
            />
          </label>
          <p>{error}</p>
          {/*  */}

          {/*  */}
          <div className="card-actions justify-center">
            <button onClick={handleSaveProfile} className="btn">Save Profile</button>
          </div>
        </div>

    {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
            <span>Profile updated successfully.</span>
        </div>
    </div>}

      </div>

        <div className='m-2 live-card-update'>
        
      <div className="card bg-cyan-200 text-black w-60 items-center ">
        <div className='flex justify-center'>
            < img src={photoUrlState} alt=""  className='w-52 h-48 m-2 rounded-md'/>
        </div>
  <div className="text-1 mx-2 font-medium">
    <h2 className="card-title">{firstNameState+" "+lastNameState}</h2>
    {ageState&& genderState&&<p className='font-medium'>{ageState+", "+genderState}</p>}
    <p className='font-normal'>{aboutState}</p>
    <p className='font-normal'>{skillsState}</p>
    <div className="card-actions justify-end w-52 m-2">
      <button className="btn btn-secondary">Intrested</button>
      <button className="btn btn-primary">Ignore</button>
    </div>
  </div>
</div>
    </div>

    </div>
  );
}

export default EditProfile
