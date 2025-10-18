import React from "react";
import PaymentReceipt from "./PaymentReceipt";
import { useFormStore } from "../store/UserProfileStore";

const PaymentDetails: React.FC = () => {
  const {
    paymentDetails,
    personalDetails,
    updatePaymentDetails,
    generateReceipt,
    receipt,
    setStep,
  } = useFormStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    updatePaymentDetails({ [name]: type === "checkbox" ? checked : value });
  };

  const handlePayment = () => {
    generateReceipt();
  };

  const regNo = personalDetails.aadharNo
    ? `MCI${personalDetails.aadharNo.slice(-8)}`
    : "MC25010002";

  if (receipt) {
    return (
      <div>
        <PaymentReceipt />
      </div>
    );
  }

  return (
    <div
      className="max-w-[90%] mx-auto p-5"
      style={{ fontFamily: "sans-serif" }}
    >
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Select Payment Type */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Select Payment Type
            </h3>
            <div className="space-y-3">
              {[
                { label: "Visa", color: "text-blue-600", img: "https://logos-world.net/wp-content/uploads/2020/04/Visa-Symbol.png" },
                { label: "MasterCard", color: "text-orange-600", img: "https://s.yimg.com/fz/api/res/1.2/Stdvw1XQ1VtO_pAbezOn_Q--~C/YXBwaWQ9c3JjaGRkO2ZpPWZpdDtoPTI0MDtxPTgwO3c9MzMy/https://s.yimg.com/zb/imgv1/455282cf-009d-3ca7-8b79-db3c54e4138f/t_500x300" },
                { label: "Net Banking (HDFC)", color: "text-teal-600" },
                { label: "Net Banking (ICICI)", color: "text-teal-600" },
                { label: "Net Banking (Other Banks)", color: "text-teal-600" },
                { label: "Debit Card", color: "text-blue-600" },
                { label: "Credit Card", color: "text-blue-600" },
              ].map((option) => (
                <label
                  key={option.label}
                  className="flex items-center p-3 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="method"
                    value={option.label}
                    className={`mr-3 ${option.color}`}
                    checked={paymentDetails.method === option.label}
                    onChange={handleChange}
                  />
                  {option.img && (
                    <img
                      src={option.img}
                      alt={option.label}
                      className="h-6 w-auto mr-2"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>


          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Payment Summary
            </h3>
            <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex flex-col">
                <span className="text-gray-600 text-lg my-4">
                  Total Payment
                </span>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applicant Name</span>
                    <span className="font-medium">{personalDetails.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Registration No</span>
                    <span className="font-medium">{regNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fee Name</span>
                    <span className="font-medium">2000.00 (INCL GST)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Late Fee Amount</span>
                    <span className="font-medium">0.00 (INCLUDING GST)</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-semibold">
                      Convenience Charge
                    </span>
                    <span className="font-semibold">0.00</span>
                  </div>
                </div>
                <div className="flex justify-end">
                  <span className="font-bold text-teal-600 text-lg  flex mt-3">
                    ₹{paymentDetails.totalAmount || "2000.00"}
                  </span>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={!paymentDetails.agreeTerms}
                className="w-full mt-3 bg-teal-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>

        {/* Terms and Notes */}
        <div className="mt-6 pt-4 border-t">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={paymentDetails.agreeTerms}
              onChange={handleChange}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm text-gray-700">
              I agree to the terms & conditions and request for registration.
            </span>
          </label>
          <span className="text-sm text-red-600 mt-4 block leading-relaxed">
            Note: While making payments, if the amount is deducted but the
            transaction is not successful, click on "Verify & Continue". If the
            transaction is successful, the status will be updated within 7
            working days. If the action fails, the screen will redirect to the
            payment gateway page and you can attempt the payment again. The
            deducted amount will be refunded to your account.
          </span>
        </div>

        {/* Back Button */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="bg-teal-600 text-white py-2 px-6 rounded-md hover:bg-teal-700"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
