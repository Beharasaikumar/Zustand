import React, { useState } from "react";
import { useFormStore } from "../store/UserProfileStore";
import { Menu, X } from "lucide-react"; 

const steps = [
  "Personal Details",
  "Payment Details",
  "Medical Qualification",
  "Local/Non-local",
  "Visa Details",
  "Upload Documents",
];

const Navbar: React.FC = () => {
  const { step, setStep } = useFormStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100 p-4 rounded-lg mx-auto my-5 max-w-[95%] relative">
     
      <div className="md:hidden flex justify-between items-center">
        <span className="font-semibold text-lg">Steps</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-teal-600 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

    
      {isOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isActive = step === stepNumber;
            const isCompleted = step > stepNumber;

            return (
              <div
                key={index}
                className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md transition
                  ${isActive ? "bg-teal-600 text-white" : ""}
                  ${isCompleted ? "text-teal-600 font-medium" : ""}
                  ${!isActive && !isCompleted ? "hover:bg-gray-200" : ""}
                `}
                onClick={() => {
                  if (isCompleted || isActive) {
                    setStep(stepNumber);
                    setIsOpen(false);
                  }
                }}
              >
                <span
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-sm border
                    ${isActive ? "bg-white text-teal-600 border-white" : "bg-white text-teal-600 border-teal-600"}
                  `}
                >
                  {stepNumber}
                </span>
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      )}

     
      <div className="hidden md:flex justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isCompleted = step > stepNumber;

          return (
            <div
              key={index}
              className={`flex flex-col items-center gap-2 cursor-pointer px-2 py-2 rounded-md transition
                ${isActive ? "bg-teal-600 text-white" : ""}
                ${isCompleted ? "text-teal-600 font-medium" : ""}
                ${!isActive && !isCompleted ? "hover:bg-gray-200" : ""}
              `}
              onClick={() => {
                if (isCompleted || isActive) setStep(stepNumber);
              }}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full text-sm border
                  ${isActive ? "bg-white text-teal-600 border-white" : "bg-white text-teal-600 border-teal-600"}
                `}
              >
                {stepNumber}
              </span>
              <span className="text-lg">{label}</span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
