import React from "react";
import { useFormStore } from "../store/UserProfileStore";

export default function PreviewApplication() {
  const { 
    personalDetails, 
    medicalQualification, 
    educationInfo, 
    visaEntryForm, 
    paymentDetails, 
    uploadDocuments,
    setStep
  } = useFormStore();

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-teal-700 mb-4">Application Recap</h2>

    
      <section className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-teal-600">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div><strong>Name:</strong> {personalDetails.name}</div>
          <div><strong>Father's Name:</strong> {personalDetails.fatherName}</div>
          <div><strong>Mother's Name:</strong> {personalDetails.motherName}</div>
          <div><strong>DOB:</strong> {personalDetails.dob}</div>
          <div><strong>Gender:</strong> {personalDetails.gender}</div>
          <div><strong>Nationality:</strong> {personalDetails.nationality}</div>
          <div><strong>Aadhar No:</strong> {personalDetails.aadharNo}</div>
          <div><strong>Mobile:</strong> {personalDetails.mobile}</div>
          <div><strong>Email:</strong> {personalDetails.email}</div>
          <div><strong>Blood Group:</strong> {personalDetails.bloodGroup}</div>
        </div>
        <div className="mt-2">
          <strong>Present Address:</strong> {personalDetails.presentHouseNoFlatNo}, {personalDetails.presentVillageWardName}, {personalDetails.presentLandmark}, {personalDetails.presentDistrict}, {personalDetails.presentState}, {personalDetails.presentPinCode}
        </div>
        <div className="mt-1">
          <strong>Permanent Address:</strong> {personalDetails.permanentHouseNoFlatNo}, {personalDetails.permanentVillageWardName}, {personalDetails.permanentLandmark}, {personalDetails.permanentDistrict}, {personalDetails.permanentState}, {personalDetails.permanentPinCode}
        </div>
      </section>

     
      <section className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-teal-600">Medical Qualification</h3>
        <div className="text-sm">
          <p><strong>Candidate Name:</strong> {medicalQualification.medicalQualification.candidateName}</p>
          <p><strong>University:</strong> {medicalQualification.medicalQualification.universityName}</p>
          <p><strong>College:</strong> {medicalQualification.medicalQualification.collegeName}</p>
          <p><strong>Country:</strong> {medicalQualification.medicalQualification.universityCountry}</p>
          <p><strong>Degree Issued:</strong> {medicalQualification.medicalQualification.degreeIssuedDate}</p>
          <p><strong>Course Start:</strong> {medicalQualification.medicalQualification.courseStartDate}</p>
          <p><strong>Course End:</strong> {medicalQualification.medicalQualification.courseEndDate}</p>
        </div>

        <div className="mt-2 text-sm">
          <h4 className="font-semibold">Intermediate</h4>
          <p>Board: {medicalQualification.intermediate.board}, Roll No: {medicalQualification.intermediate.rollNo}, Year: {medicalQualification.intermediate.year}, Month: {medicalQualification.intermediate.month}</p>
          <p>Total Marks: {medicalQualification.intermediate.totalMarks}, Secured: {medicalQualification.intermediate.securedMarks}, %: {medicalQualification.intermediate.percentage}</p>
        </div>

        <div className="mt-2 text-sm">
          <h4 className="font-semibold">Screening Test</h4>
          <p>Hall Ticket: {medicalQualification.screeningTest.hallTicket}, Passed Year: {medicalQualification.screeningTest.passedYear}, Passed Month: {medicalQualification.screeningTest.passedMonth}, Obtained Marks: {medicalQualification.screeningTest.obtainedMarks}</p>
        </div>
      </section>

     
      <section className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-teal-600">Educational Details</h3>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="border p-1">Class</th>
              <th className="border p-1">Year</th>
              <th className="border p-1">State</th>
              <th className="border p-1">District</th>
              <th className="border p-1">Institute</th>
            </tr>
          </thead>
          <tbody>
            {educationInfo.educationalDetails.map((edu, i) => (
              <tr key={i} className="even:bg-gray-50">
                <td className="border p-1">{edu.className}</td>
                <td className="border p-1">{edu.year || "N/A"}</td>
                <td className="border p-1">{edu.state || "N/A"}</td>
                <td className="border p-1">{edu.district || "N/A"}</td>
                <td className="border p-1">{edu.institute || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2"><strong>Region:</strong> {educationInfo.region}</p>
      </section>
 

      <section className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-teal-600">Visa Details</h3>
        <div className="text-sm">
          <p><strong>Country:</strong> {visaEntryForm.visaDetails.country}</p>
          <p><strong>Admission Date:</strong> {visaEntryForm.visaDetails.admissionDate}</p>
          <p><strong>Course Completion Date:</strong> {visaEntryForm.visaDetails.courseCompletionDate}</p>
          <p><strong>Total Course Duration:</strong> {visaEntryForm.visaDetails.totalCourseDuration}</p>
          {visaEntryForm.visaDetails.internshipDetails && (
            <p><strong>Internship Abroad:</strong> {visaEntryForm.visaDetails.internshipDetails.isAbroad ? "Yes" : "No"}</p>
          )}
        </div>
      </section>

      {/* Payment */}
      <section className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-teal-600">Payment Details</h3>
        <div className="text-sm">
          <p><strong>Method:</strong> {paymentDetails.method}</p>
          <p><strong>Total Amount:</strong> ₹{paymentDetails.totalAmount}</p>
          <p><strong>Status:</strong> {paymentDetails.transactionStatus || "Pending"}</p>
          <p><strong>Transaction ID:</strong> {paymentDetails.transactionId || "N/A"}</p>
        </div>
      </section>

     
      <section className="border p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2 text-teal-600">Uploaded Documents</h3>
        <ul className="list-disc list-inside text-sm">
          {uploadDocuments.documents.map(doc => (
            <li key={doc.id}>
              {doc.name}: {doc.file ? doc.file.name : "Not uploaded"}
            </li>
          ))}
          <li>Photo: {uploadDocuments.photo?.file?.name || "Not uploaded"}</li>
          <li>Signature: {uploadDocuments.signature?.file?.name || "Not uploaded"}</li>
        </ul>
      </section>

       <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(6)} 
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
        >
          Back
        </button>
        <button
          onClick={() => alert("Final Submission done!")}
          className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          Submit Application
        </button>
      </div>
    </div>
  );
}
