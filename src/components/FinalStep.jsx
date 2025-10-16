import React from 'react'
import UserProfileStore from '../store/UserProfileStore';

const FinalStep = () => {
    const { profile, reset, prevStep, updateProfile } = UserProfileStore();

    function handlersubmit() {
        alert("Profile Submitted!\n" + JSON.stringify(profile, null, 2));
        reset();
    }
    return (
        <div className='gap-5 flex flex-col'>
            <h2 className='text-xl font-semibold'>Final Step</h2>
            <div>
                <p><strong>FirstName:</strong> {profile.firstName}</p>
                <p><strong>LastName:</strong> {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>City:</strong> {profile.city}</p>
                <p><strong>State:</strong> {profile.state}</p>
                <p><strong>Country:</strong> {profile.country}</p>
            </div>
            <div>
                <label>Occupation</label>
                </div>
                <div>     
                <input
                    className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder='enter your occupation'
                    value={profile.occupation}
                    onChange={(e) => updateProfile({ occupation: e.target.value })}
                />
            </div>
            <div className='flex'>
                <button onClick={prevStep} className='border w-[100%] p-1 bg-green-500 text-white'>prev</button>
                <button onClick={handlersubmit} className='border w-[100%] p-1 bg-green-500 text-white'>submit</button>
            </div>
        </div>
    )
}

export default FinalStep
