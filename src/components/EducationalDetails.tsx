import React from "react";
import { useFormStore } from "../store/UserProfileStore";

export default function EducationalDetails() {
  const { educationInfo, updateEducationalDetail, updateEducationInfo, setStep } =
    useFormStore();

  const { educationalDetails, region } = educationInfo;

  const handleChange = (index: number, field: string, value: string | File | null) => {
    updateEducationalDetail(index, field as any, value);
  };

  const getFilePreviewUrl = (file: File | null) => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  const hardcodedClasses = [
    { className: 'XII', year: '', state: '', district: '', institute: '' },
    { className: 'XI', year: '', state: '', district: '', institute: '' },
    { className: 'X', year: '', state: '', district: '', institute: '' },
    { className: 'IX', year: '', state: '', district: '', institute: '' },
    { className: 'VIII', year: '', state: '', district: '', institute: '' },
    { className: 'VII', year: '', state: '', district: '', institute: '' },
    { className: 'VI', year: '', state: '', district: '', institute: '' },
  ];

  const districtOptions = ['Ananthapuramu', 'Guntur', 'Kurnool', 'Bapatla', 'East Godavari'];
  const instituteOptions = ['SR CHATANYA'];

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-teal-700">
        Educational Details (For Local Area / Region Validation)
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="border p-2 text-left font-semibold">S.No</th>
              <th className="border p-2 text-left font-semibold">Class</th>
              <th className="border p-2 text-left font-semibold">Year of Study</th>
              <th className="border p-2 text-left font-semibold">State</th>
              <th className="border p-2 text-left font-semibold">District</th>
              <th className="border p-2 text-left font-semibold">School/College/Institute</th>
              <th className="border p-2 text-left font-semibold">Upload Certificate (PDF only 500KB)</th>
              <th className="border p-2 text-left font-semibold">Preview</th>
            </tr>
          </thead>
          <tbody>
            {hardcodedClasses.map((item, index) => {
              const currentItem = educationalDetails[index] || item;
              const previewUrl = getFilePreviewUrl(currentItem.certificateFile);
              return (
                <tr key={index} className="even:bg-gray-50">
                  <td className="border p-2 text-center font-medium">{index + 1}</td>
                  <td className="border p-2 text-center font-medium">{item.className}</td>
                 <td className="border border-gray-300 p-2">
  <select
    value={currentItem.year || ''}
    onChange={(e) => handleChange(index, "year", e.target.value)}
    className="w-full border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm appearance-none bg-white"
  >
    <option value="">Select Your year</option>
    {['2013','2014','2015','2016','2017','2018','2019','2020'].map(y => (
      <option key={y} value={y}>{y}</option>
    ))}
  </select>
</td>

<td className="border border-gray-300 p-2">
  <select
    value={currentItem.state || ''}
    onChange={(e) => handleChange(index, "state", e.target.value)}
    className="w-full border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm appearance-none bg-white"
  >
    <option value="">Select Your state</option>
    {['Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu'].map(s => (
      <option key={s} value={s}>{s}</option>
    ))}
  </select>
</td>

                  <td className="border p-2">
                    <select
                      value={currentItem.district || ''}
                      onChange={(e) => handleChange(index, "district", e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm appearance-none bg-white"
                    >
                      <option value="">Select Your district</option>
                      {districtOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <select
                      value={currentItem.institute || ''}
                      onChange={(e) => handleChange(index, "institute", e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-1 focus:ring-1 focus:ring-blue-500 focus:outline-none text-sm appearance-none bg-white"
                    >
                      <option value="">Select Your institute</option>
                      {instituteOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                          handleChange(index, "certificateFile", e.target.files?.[0] || null)
                        }
                        className="hidden"
                        id={`file-${index}`}
                      />
                      <label
                        htmlFor={`file-${index}`}
                        className="text-teal-600 hover:text-teal-800 text-sm cursor-pointer"
                      >
                        Choose File
                      </label>
                      <span className="text-gray-500 text-sm">
                        {currentItem.certificateFile ? currentItem.certificateFile.name : 'No file chosen'}
                      </span>
                    </div>
                  </td>
                  <td className="border p-2">
                    {previewUrl ? (
                      <a
                        href={previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 text-sm underline"
                      >
                        Preview PDF
                      </a>
                    ) : (
                      <span className="text-gray-500 text-sm">NA</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <label className="font-semibold text-sm">Region:</label>
        <select
          value={region}
          onChange={(e) =>
            updateEducationInfo("region", e.target.value as "Local" | "Non-Local")
          }
          className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm w-32"
        >
          <option value="Local">Local</option>
          <option value="Non-Local">Non-Local</option>
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(3)}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition text-sm"
        >
           Back
        </button>
        <button
          onClick={() => setStep(5)}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition text-sm"
        >
          Save & Continue 
        </button>
      </div>
    </div>
  );
}
