import React from "react";
import { useFormStore } from "../store/UserProfileStore";

const PaymentReceipt: React.FC = () => {
  const { receipt, setStep } = useFormStore();

  if (!receipt)
    return (
      <p className="text-center text-gray-500 mt-10">
        No receipt found.
      </p>
    );

  return (
    <div
      className="max-w-[90%] mx-auto p-5"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Payment Receipt
        </h2>

        {/* Receipt Table */}
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <table className="w-full border-collapse text-sm md:text-base">
            <tbody className="divide-y divide-gray-200">
              <tr className="bg-gray-50">
                <td className="p-3 font-semibold text-gray-700 border-r border-gray-300">
                  Applicant Name:
                </td>
                <td className="p-3 font-medium text-blue-600">
                  {receipt.applicantName}
                </td>
                <td className="p-3 font-semibold text-gray-700 border-l border-gray-300">
                  Registration Number:
                </td>
                <td className="p-3 font-medium text-gray-800">
                  {receipt.registrationNumber}
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-gray-700 border-r border-gray-300">
                  Mobile Number:
                </td>
                <td className="p-3 text-gray-700">{receipt.mobile}</td>
                <td className="p-3 font-semibold text-gray-700 border-l border-gray-300">
                  Gender:
                </td>
                <td className="p-3 text-gray-700">{receipt.gender}</td>
              </tr>

              <tr className="bg-gray-50">
                <td className="p-3 font-semibold text-gray-700 border-r border-gray-300">
                  Transaction Number:
                </td>
                <td className="p-3 text-gray-700">{receipt.paymentRefNo}</td>
                <td className="p-3 font-semibold text-gray-700 border-l border-gray-300">
                  Payment Ref. No:
                </td>
                <td className="p-3 font-medium text-gray-800">
                  {receipt.paymentRefNo}
                </td>
              </tr>

              <tr>
                <td className="p-3 font-semibold text-gray-700 border-r border-gray-300">
                  Payment Method:
                </td>
                <td className="p-3 text-gray-700">{receipt.paymentMethod}</td>
                <td className="p-3 font-semibold text-gray-700 border-l border-gray-300">
                  Payment Status:
                </td>
                <td
                  className={`p-3 font-bold ${
                    receipt.status === "Success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {receipt.status}
                </td>
              </tr>

              <tr className="bg-gray-50">
                <td className="p-3 font-semibold text-gray-700 border-r border-gray-300">
                  Payment Amount:
                </td>
                <td className="p-3 font-medium text-gray-800">
                  ₹{receipt.amount || "2000.00"}
                </td>
                <td className="p-3 font-semibold text-gray-700 border-l border-gray-300">
                  Date & Time:
                </td>
                <td className="p-3 font-medium text-gray-800">
                  {new Date().toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={() => setStep(1)}
            className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-green-700 w-full sm:w-auto transition"
          >
            Back to Personal Details
          </button>
          <button
            onClick={() => setStep(3)}
            className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-green-700 w-full sm:w-auto transition"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
