import React, { ChangeEvent } from "react";
import { UserProfileStore } from "../store/UserProfileStore";

const Step2: React.FC = () => {
  const { profile, updateProfile, nextStep, prevStep } = UserProfileStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({ [e.target.name]: e.target.value });
  };

  return (
    <div className="gap-5 flex flex-col">
      <h2 className="text-xl font-semibold">Step 2: Address Info</h2>

      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="city"
        placeholder="Enter your city"
        value={profile.city}
        onChange={handleChange}
      />

      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="state"
        placeholder="Enter your state"
        value={profile.state}
        onChange={handleChange}
      />

      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="country"
        placeholder="Enter your country"
        value={profile.country}
        onChange={handleChange}
      />

      <div className="flex">
        <button
          onClick={prevStep}
          className="border w-full p-1 bg-green-500 text-white"
        >
          Prev
        </button>
        <button
          onClick={nextStep}
          className="border w-full p-1 bg-green-500 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
