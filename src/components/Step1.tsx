import React, { ChangeEvent } from "react";
import { UserProfileStore } from "../store/UserProfileStore";

const Step1: React.FC = () => {
  const { profile, nextStep, updateProfile } = UserProfileStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({ [e.target.name]: e.target.value });
  };

  return (
    <div className="gap-5 flex flex-col">
      <h2 className="text-xl font-semibold">Step 1: Personal Info</h2>

      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={profile.firstName}
        onChange={handleChange}
      />

      <input
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={profile.lastName}
        onChange={handleChange}
      />

      <input
        className="border border-gray-300 p-2 rounded"
        type="email"
        name="email"
        placeholder="Email"
        value={profile.email}
        onChange={handleChange}
      />

      <button
        onClick={nextStep}
        className="border w-full p-1 bg-green-500 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Step1;
