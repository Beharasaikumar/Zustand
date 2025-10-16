import React from 'react'
import UserProfileStore from './store/UserProfileStore';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import FinalStep from './components/FinalStep';
import './index.css'

function App() {
  const { step } = UserProfileStore();
  return (
    <div className='flex items-center justify-center min-h-96 flex-col gap-4  '>
      <h1 className='text-xl md:text-3xl font-bold'>Profile Setup (poc using Zustand)</h1>

      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <FinalStep />}
    </div>
  )
}

export default App
