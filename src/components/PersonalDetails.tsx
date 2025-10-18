import React from "react";
import { useFormStore } from "../store/UserProfileStore";

export default function PersonalDetails() {
  const { personalDetails, updatePersonalDetails, receipt, generateReceipt, setStep } = useFormStore();
  const {
    name,
    fatherName,
    motherName,
    dob,
    gender,
    nationality,
    aadharNo,
    mobile,
    email,
    passportNo,
    passportIssueDate,
    passportExpiry,
    bloodGroup,
    presentAddressSameAsPermanent,
    presentHouseNoFlatNo,
    presentVillageWardName,
    presentLandmark,
    presentState,
    presentDistrict,
    presentPinCode,
    permanentHouseNoFlatNo,
    permanentVillageWardName,
    permanentLandmark,
    permanentState,
    permanentDistrict,
    permanentPinCode,
  } = personalDetails;

  const handleChange = (
    field: keyof typeof personalDetails,
    value: string | boolean
  ) => {
    updatePersonalDetails({ [field]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    handleChange("presentAddressSameAsPermanent", isChecked);
    if (isChecked) {
      updatePersonalDetails({
        permanentHouseNoFlatNo: presentHouseNoFlatNo,
        permanentVillageWardName: presentVillageWardName,
        permanentLandmark: presentLandmark,
        permanentState: presentState,
        permanentDistrict: presentDistrict,
        permanentPinCode: presentPinCode,
      });
    }
  };

  return (
    <div className="p-6 max-w-[90%] mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4 text-teal-600">
          Personal Details
        </h2>
        <div className="text-sm text-gray-600 mb-4">
          <strong className="font-bold">Registration ID:</strong> {receipt?.registrationNumber || "Not generated"}
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="font-semibold text-sm block mb-1">
            Name (in capital letters)*:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => handleChange("name", e.target.value.toUpperCase())}
            className="border rounded-md w-full p-2"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Father's Name*:
          </label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) =>
              handleChange("fatherName", e.target.value.toUpperCase())
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter your father's full name"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Mother's Name*:
          </label>
          <input
            type="text"
            value={motherName}
            onChange={(e) =>
              handleChange("motherName", e.target.value.toUpperCase())
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter your mother's full name"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Date of Birth*:
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => handleChange("dob", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Select your date of birth"
            required
          />
        </div>
      </div>

      {/* Gender, Nationality, Aadhaar, Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="font-semibold text-sm block mb-1">Gender*:</label>
          <select
            value={gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="border rounded-md w-full p-2"
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Nationality*:
          </label>
          <input
            type="text"
            value={nationality}
            onChange={(e) =>
              handleChange("nationality", e.target.value.toUpperCase())
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter your nationality"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Aadhaar No*:
          </label>
          <input
            type="text"
            value={aadharNo}
            onChange={(e) => handleChange("aadharNo", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter your 12-digit Aadhaar number"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">Mobile*:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter your mobile number"
            required
          />
        </div>
      </div>

      {/* Email, Passport */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="font-semibold text-sm block mb-1">Email*:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Passport Number*:
          </label>
          <input
            type="text"
            value={passportNo}
            onChange={(e) =>
              handleChange("passportNo", e.target.value.toUpperCase())
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter your passport number"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Passport Issued Date*:
          </label>
          <input
            type="date"
            value={passportIssueDate}
            onChange={(e) => handleChange("passportIssueDate", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Select issue date"
            required
          />
        </div>
        <div>
          <label className="font-semibold text-sm block mb-1">
            Passport Expiry Date*:
          </label>
          <input
            type="date"
            value={passportExpiry}
            onChange={(e) => handleChange("passportExpiry", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Select expiry date"
            required
          />
        </div>
      </div>

      {/* Blood Group */}
      <div className="mb-4">
        <label className="font-semibold text-sm block mb-1">Blood Group*:</label>
        <select
          value={bloodGroup}
          onChange={(e) => handleChange("bloodGroup", e.target.value)}
          className="border rounded-md w-[24%] p-2"
          required
        >
          <option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>
      </div>

      {/* Present Address */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Present Address:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={presentHouseNoFlatNo}
            onChange={(e) =>
              handleChange("presentHouseNoFlatNo", e.target.value)
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter house/flat number"
            required
          />
          <input
            type="text"
            value={presentVillageWardName}
            onChange={(e) =>
              handleChange("presentVillageWardName", e.target.value)
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter village or ward name"
            required
          />
          <input
            type="text"
            value={presentLandmark}
            onChange={(e) => handleChange("presentLandmark", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter landmark (optional)"
            required
          />
          <select
            value={presentState}
            onChange={(e) => handleChange("presentState", e.target.value)}
            className="border rounded-md w-full p-2"
            required
          >
            <option value="">Select State</option>
            <option>Andhra Pradesh</option>
          </select>
          <select
            value={presentDistrict}
            onChange={(e) => handleChange("presentDistrict", e.target.value)}
            className="border rounded-md w-full p-2"
            required
          >
            <option value="">Select District</option>
            <option>Anantapur</option>
          </select>
          <input
            type="text"
            value={presentPinCode}
            onChange={(e) => handleChange("presentPinCode", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter pin code"
            required
          />
        </div>
      </div>

      {/* Same Address Checkbox */}
      <div className="mb-4">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={presentAddressSameAsPermanent}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Present Address same as Permanent Address
        </label>
      </div>

      {/* Permanent Address */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Permanent Address:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={permanentHouseNoFlatNo}
            onChange={(e) =>
              handleChange("permanentHouseNoFlatNo", e.target.value)
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter house/flat number"
            disabled={presentAddressSameAsPermanent}
            required
          />
          <input
            type="text"
            value={permanentVillageWardName}
            onChange={(e) =>
              handleChange("permanentVillageWardName", e.target.value)
            }
            className="border rounded-md w-full p-2"
            placeholder="Enter village or ward name"
            disabled={presentAddressSameAsPermanent}
            required
          />
          <input
            type="text"
            value={permanentLandmark}
            onChange={(e) => handleChange("permanentLandmark", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter landmark"
            disabled={presentAddressSameAsPermanent}
            required
          />
          <select
            value={permanentState}
            onChange={(e) => handleChange("permanentState", e.target.value)}
            className="border rounded-md w-full p-2"
            disabled={presentAddressSameAsPermanent}
            required
          >
            <option value="">Select State</option>
            <option>Andhra Pradesh</option>
          </select>
          <select
            value={permanentDistrict}
            onChange={(e) => handleChange("permanentDistrict", e.target.value)}
            className="border rounded-md w-full p-2"
            disabled={presentAddressSameAsPermanent}
            required
          >
            <option value="">Select District</option>
            <option>Anantapur</option>
          </select>
          <input
            type="text"
            value={permanentPinCode}
            onChange={(e) => handleChange("permanentPinCode", e.target.value)}
            className="border rounded-md w-full p-2"
            placeholder="Enter pin code"
            disabled={presentAddressSameAsPermanent}
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={() => setStep(2)}
        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
      >
        Save & Continue
      </button>
    </div>
  );
}
