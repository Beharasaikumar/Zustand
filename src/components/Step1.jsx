import React from 'react'
import UserProfileStore from '../store/UserProfileStore';

const Step1 = () => {
    const { profile, nextStep, updateProfile } = UserProfileStore();
    return (
        <div className='gap-5 flex flex-col'>
            <h2 className='text-xl font-semibold'>Step 1: Personal Info</h2>
            <div>
                <input
                   className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder="first Name"
                    value={profile.firstName}
                    onChange={(e) => updateProfile({ firstName: e.target.value })}
                />
            </div>
            <div>
                <input
                className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder="last Name"
                    value={profile.lastName}
                    onChange={(e) => updateProfile({ lastName: e.target.value })}
                />
            </div>
            <div>
                <input
                className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder="email"
                    value={profile.email}
                    onChange={(e) => updateProfile({ email: e.target.value })}
                />
            </div>
            <div>
                <button onClick={nextStep} className='border w-[100%] p-1 bg-green-500 text-white'>Next </button>
            </div>
        </div>
    )
}

export default Step1;
