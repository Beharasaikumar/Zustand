import React from 'react'
import UserProfileStore from '../store/UserProfileStore';

const Step2 = () => {
    const { profile, updateProfile, nextStep, prevStep } = UserProfileStore();
    return (
        <div className='gap-5 flex flex-col'>
            <h2 className='text-xl font-semibold'>Personal address</h2>
            <div>
                <input
                className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder='enter your city'
                    value={profile.city}
                    onChange={(e) => updateProfile({ city: e.target.value })}
                />
            </div>
            <div>
                <input
                className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder='enter your state'
                    value={profile.state}
                    onChange={(e) => updateProfile({ state: e.target.value })}
                />
            </div>
            <div>
                <input
                className='border border-gray-300 p-2 rounded'
                    type="text"
                    placeholder='enter your country'
                    value={profile.country}
                    onChange={(e) => updateProfile({ country: e.target.value })}
                />
            </div>
            <div className='flex'>
                <button onClick={prevStep} className='border w-[100%] p-1 bg-green-500 text-white'>prev</button>
                <button onClick={nextStep} className='border w-[100%] p-1 bg-green-500 text-white'>next</button>
            </div>
        </div>
    )
}

export default Step2
