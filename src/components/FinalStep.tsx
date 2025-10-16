import React, { ChangeEvent } from "react";
import { UserProfileStore } from "../store/UserProfileStore";

const FinalStep: React.FC = () => {
  const { profile, reset, prevStep, updateProfile } = UserProfileStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({ [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Profile Submitted!\n" + JSON.stringify(profile, null, 2));
    reset();
  };

  return (
    <div className="gap-5 flex flex-col">
      <h2 className="text-xl font-semibold">Final Step</h2>

      <div>
        <p>
          <strong>First Name:</strong> {profile.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {profile.lastName}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>City:</strong> {profile.city}
        </p>
        <p>
          <strong>State:</strong> {profile.state}
        </p>
        <p>
          <strong>Country:</strong> {profile.country}
        </p>
      </div>

      <label htmlFor="occupation">Occupation</label>
      <input
        id="occupation"
        className="border border-gray-300 p-2 rounded"
        type="text"
        name="occupation"
        placeholder="Enter your occupation"
        value={profile.occupation}
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
          onClick={handleSubmit}
          className="border w-full p-1 bg-green-500 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FinalStep;
