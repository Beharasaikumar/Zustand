import { useFormStore } from "../store/UserProfileStore";

export default function MedicalQualification() {
  const { medicalQualification, updateMedicalQualification, setStep } = useFormStore();

  const handleChange = (section: string, field: string, value: string) => {
    updateMedicalQualification({
      [section]: {
        ...medicalQualification[section as keyof typeof medicalQualification],
        [field]: value,
      },
    });
  };

  const handleNext = () => setStep(4);
  const handleBack = () => setStep(2);

  return (
    <div className="max-w-[90%] mx-auto bg-white p-6 border border-gray-300 rounded-lg shadow-md space-y-10 font-sans">
     
      <section>
        <div className="text-2xl font-semibold text-teal-700 mb-4 border-b pb-1">
          Medical Qualification Details
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Candidate Name</label>
            <input
              placeholder="Enter candidate name"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.candidateName}
              onChange={(e) => handleChange("medicalQualification", "candidateName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">University Name</label>
            <input
              placeholder="Enter university name"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.universityName}
              onChange={(e) => handleChange("medicalQualification", "universityName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              placeholder="Enter college name"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.collegeName}
              onChange={(e) => handleChange("medicalQualification", "collegeName", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">University Country</label>
            <input
              placeholder="Enter country of university"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.universityCountry}
              onChange={(e) => handleChange("medicalQualification", "universityCountry", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Degree Issued Date</label>
            <input
              type="date"
              placeholder="Select degree issued date"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.degreeIssuedDate}
              onChange={(e) => handleChange("medicalQualification", "degreeIssuedDate", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course Start Date</label>
            <input
              type="date"
              placeholder="Select course start date"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.courseStartDate}
              onChange={(e) => handleChange("medicalQualification", "courseStartDate", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course End Date</label>
            <input
              type="date"
              placeholder="Select course end date"
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={medicalQualification.medicalQualification.courseEndDate}
              onChange={(e) => handleChange("medicalQualification", "courseEndDate", e.target.value)}
            />
          </div>
        </div>
      </section>


      <section>
        <div className="text-2xl font-semibold text-teal-700 mb-4 border-b pb-1">
          Intermediate/Equivalent
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Board", "board", "Enter board name"],
            ["Roll Number", "rollNo", "Enter roll number"],
            ["Year", "year", "Enter passing year"],
            ["Month", "month", "Enter passing month"],
            ["Total Marks", "totalMarks", "Enter total marks"],
            ["Secured Marks", "securedMarks", "Enter secured marks"],
            ["Percentage", "percentage", "Enter percentage"],
          ].map(([label, field, placeholder]) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                value={(medicalQualification.intermediate as any)[field]}
                onChange={(e) => handleChange("intermediate", field, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

       <section>
        <div className="text-2xl font-semibold text-teal-700 mb-4 border-b pb-1">
          Screening Test Details
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Hall Ticket", "hallTicket", "Enter hall ticket number"],
            ["Passed Year", "passedYear", "Enter year of passing"],
            ["Passed Month", "passedMonth", "Enter month of passing"],
            ["Obtained Marks", "obtainedMarks", "Enter obtained marks"],
          ].map(([label, field, placeholder]) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                placeholder={placeholder}
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                value={(medicalQualification.screeningTest as any)[field]}
                onChange={(e) => handleChange("screeningTest", field, e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
