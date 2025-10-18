// UploadDocuments.tsx
import React from "react";
import { useFormStore, UploadedDocument } from "../store/UserProfileStore"; // Adjust path

const documentList: Omit<UploadedDocument, 'file' | 'previewUrl'>[] = [
  { id: 1, name: "Eligibility Certificate issued by MCI/NMC for seat allotment" },
  { id: 2, name: "Admission/Acceptance letter issued by Foreign Medical College/University" },
  { id: 3, name: "Provisional/Original Degree Certificate issued by Foreign Medical College/University" },
  { id: 4, name: "Embassy Certification in shape of Apostille on Degree Certificate/Credential Report/Notarial Certificates" },
  { id: 5, name: "Academic Record/Transcripts/Marks List with Embassy Certification" },
  { id: 6, name: "FMGE Screening Test Pass Certificate" },
  { id: 7, name: "SSC/CBSE/Equivalent Certificate for proof of Date of Birth" },
  { id: 8, name: "10th/Intermediate Verification Letter from Concerned State Board for CBSE Students (Submit 10+2 verification)" },
  { id: 9, name: "Original scanned copy of passport (all pages)" },
  { id: 10, name: "Affidavit form duly attested by Notary Public on ₹20/- non-judicial Stamp Paper" },
  { id: 11, name: "Proof of Identity" },
  { id: 12, name: "Notarial Certificate/Notarized Certificate issued by the Indian Embassy" },
  { id: 13, name: "Non-Criminal Record issued by the Police Department" },
];

export default function UploadDocuments() {
  const { uploadDocuments, updateDocumentFile, updatePhoto, updateSignature, setPreviewActive, setStep } = useFormStore();
  const { documents, photo, signature, isPreviewActive } = uploadDocuments;

  const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateDocumentFile(id, file);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updatePhoto(file);
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) updateSignature(file);
  };

  const handlePreviewClick = (doc: UploadedDocument) => {
    if (doc.previewUrl) window.open(doc.previewUrl, '_blank');
  };

  const handleSaveDocuments = () => {
     console.log('Saving documents...', documents.filter(d => d.file).map(d => d.name));
    setPreviewActive(true);
    alert('Documents saved. Preview Application button is now active.');
  };

  return (
    <div className="p-6 max-w-[90%] mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-teal-600">Upload Documents</h2>
      <p className="text-sm text-red-600 mb-4">
        Upload Photo & Signature must be in (JPG/PNG) formats & maximum size of 200KB
        <br />
        All uploads must be in PDF format & maximum size of 1MB
      </p>

      {/* Documents Table */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-teal-600 text-white">
              <th className="border p-2 text-left">S.No</th>
              <th className="border p-2 text-left">Document Name</th>
              <th className="border p-2 text-center">Choose File</th>
              <th className="border p-2 text-center">Preview</th>
             </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td className="border p-2">{doc.id}</td>
                <td className="border p-2">{doc.name}</td>
                <td className="border p-2">
                  <input
                    type="file"
                    accept={doc.id >= 14 ? "image/*" : "application/pdf"}
                    onChange={(e) => handleFileChange(doc.id, e)}
                    className="hidden"
                    id={`file-${doc.id}`}
                  />
                  <label htmlFor={`file-${doc.id}`} className="bg-gray-100 border border-teal-600 px-4 py-2 rounded cursor-pointer block text-center">
                    Choose File
                  </label>
                  {doc.file && <span className="block text-sm text-teal-600 mt-1">{doc.file.name}</span>}
                </td>
                <td className="border p-2 text-center">
                  {doc.previewUrl ? (
                    <button onClick={() => handlePreviewClick(doc)} className="text-teal-600 underline">Preview</button>
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </td>
               </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-md font-semibold mb-2">Photo & Signature</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-sm block mb-1">Photo</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="bg-teal-600 text-white px-4 py-2 rounded cursor-pointer block text-center">
              Choose Photo
            </label>
            {photo?.file && (
              <div className="mt-2">
                <span className="text-sm text-teal-600">{photo.file.name}</span>
                {photo.previewUrl && (
                  <button onClick={() => handlePreviewClick(photo)} className="ml-2 text-teal-600 underline">Preview</button>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="font-semibold text-sm block mb-1">Signature</label>
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleSignatureChange}
              className="hidden"
              id="signature-upload"
            />
            <label htmlFor="signature-upload" className="bg-teal-600 text-white px-4 py-2 rounded cursor-pointer block text-center">
              Choose Signature
            </label>
            {signature?.file && (
              <div className="mt-2">
                <span className="text-sm text-teal-600">{signature.file.name}</span>
                {signature.previewUrl && (
                  <button onClick={() => handlePreviewClick(signature)} className="ml-2 text-teal-600 underline">Preview</button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

  

      {/* Note */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p className="text-sm">
          NOTE: Please review the details before submitting; No editing option will be available throughout the admission process.
        </p>
        <p className="text-sm mt-1">
          After saving, the 'Preview Application' button will be activated. Click on the 'Preview Application' button to submit your application.
        </p>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(5)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
        >
           Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleSaveDocuments}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
          >
            Save Document
          </button>
          <button
            onClick={() => setStep(7)}
            disabled={!isPreviewActive}
            className={`px-4 py-2 rounded-md ${isPreviewActive ? 'bg-yellow-500 text-black hover:bg-yellow-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            Preview Application 
          </button>
        </div>
      </div>
    </div>
  );
}