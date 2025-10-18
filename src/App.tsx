import React from "react";
import PersonalDetails from "./components/PersonalDetails";
import PaymentDetails from "./components/PaymentDetails";
import { useFormStore } from "./store/UserProfileStore";
import Navbar from "./components/Navbar";
import MedicalQualificationDetails from "./components/MedicalQualification";
import EducationalDetails from "./components/EducationalDetails";
import VisaDetailsForm from "./components/VisaDetails";
import UploadDocuments from "./components/UploadDocuments";
import PreviewApplication from "./components/Recap";
 
const App: React.FC = () => {
  const { step } = useFormStore();

  return (
    <>
    <div className="w-full justify-center flex my-4">
    <div className="w-[90%] bg-white rounded-lg shadow-md p-4">
      <Navbar />
      {step === 1 && <PersonalDetails />}
      {step === 2 && <PaymentDetails />}
      {step === 3 && <MedicalQualificationDetails />}
      {step === 4 && <EducationalDetails />}
      {step === 5 && <VisaDetailsForm />}
      {step === 6 && <UploadDocuments />}
      {step === 7 && <PreviewApplication />}
    </div>
      
    </div>
    </>
  );
};

export default App;
