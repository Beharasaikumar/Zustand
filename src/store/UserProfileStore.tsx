 import { create } from "zustand";

 export interface PersonalDetails {
  name: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  nationality: string;
  aadharNo: string;
  mobile: string;
  email: string;
  passportNo: string;
  passportIssueDate: string;
  passportExpiry: string;
  bloodGroup: string;
   presentAddressSameAsPermanent: boolean;
  presentHouseNoFlatNo: string;
  presentVillageWardName: string;
  presentLandmark: string;
  presentState: string;
  presentDistrict: string;
  presentPinCode: string;
  permanentHouseNoFlatNo: string;
  permanentVillageWardName: string;
  permanentLandmark: string;
  permanentState: string;
  permanentDistrict: string;
  permanentPinCode: string;
}

export interface MedicalQualificationDetails {
  candidateName: string;
  universityName: string;
  collegeName: string;
  universityCountry: string;
  degreeIssuedDate: string;
  courseStartDate: string;
  courseEndDate: string;
}

export interface IntermediateDetails {
  board: string;
  rollNo: string;
  year: string;
  month: string;
  totalMarks: string;
  securedMarks: string;
  percentage: string;
}

export interface ScreeningTestDetails {
  hallTicket: string;
  passedYear: string;
  passedMonth: string;
  obtainedMarks: string;
}

export interface MedicalQualification {
  medicalQualification: MedicalQualificationDetails;
  intermediate: IntermediateDetails;
  screeningTest: ScreeningTestDetails;
}

export interface InternshipDetails {
  isAbroad: boolean;
  startDate: string;
  endDate: string;
}

export interface VisaDetails {
  country: string;
  admissionDate: string;
  courseCompletionDate: string;
  totalCourseDuration: string;
  arrivalDateAfterCompletion: string;
  internshipDetails?: InternshipDetails;
}

export interface VisaEntryRecord {
  stayInAbroadIndia: string;  
  visaNo: string;
  arrivalPlace: string;
  arrivalDate: string;
  arrivalPassportPage: string;
  departurePlace: string;
  departureDate: string;
  departurePassportPage: string;
  durationMonths: string;
  durationDays: string;
}

export interface SemesterVisaInfo {
  semesterNumber: number;
  entries: VisaEntryRecord[];
  onlineStudyMonthsInIndia: string;
  totalAbroad: { months: string; days: string };
  totalIndia: { months: string; days: string };
}

export interface YearlyVisaEntry {
  year: number;
  semesters: SemesterVisaInfo[];
  totalStayAbroad: string;
  totalStayIndia: string;
}

export interface VisaEntryFormData {
  visaDetails: VisaDetails;
  visaEntriesByYear: YearlyVisaEntry[];
}

export interface PaymentDetails {
  method: string;
  agreeTerms: boolean;
  totalAmount: number;
  transactionStatus: string;
  transactionId: string;
}

export interface Receipt {
  applicantName: string;
  registrationNumber: string;
  gender: string;
  mobile: string;
  transactionDate: string;
  amount: number;
  paymentRefNo: string;
  status: string;
  paymentMethod: string;
}

export interface EducationalDetail {
  className: string;
  year: string;
  state: string;
  district: string;
  institute: string;
  certificateFile: File | null;
}

export interface EducationInfo {
  educationalDetails: EducationalDetail[];
  region: "Local" | "Non-Local";
}

 
export interface UploadedDocument {
  id: number;
  name: string;
  file: File | null;
  previewUrl: string | null;
  isPhotoSignature?: boolean; 
}

export interface UploadDocuments {
  documents: UploadedDocument[];
  photo: UploadedDocument | null;
  signature: UploadedDocument | null;
  isPreviewActive: boolean;  
}

interface FormStore {
  step: number;
  personalDetails: PersonalDetails;
  medicalQualification: MedicalQualification;
  educationInfo: EducationInfo;
  visaEntryForm: VisaEntryFormData;
  paymentDetails: PaymentDetails;
  receipt: Receipt | null;
  uploadDocuments: UploadDocuments;  

  setStep: (step: number) => void;
  updatePersonalDetails: (data: Partial<PersonalDetails>) => void;
  updateMedicalQualification: (data: Partial<MedicalQualification>) => void;
  updateEducationalDetail: (index: number, field: keyof EducationalDetail, value: string | File | null) => void;
  updateEducationInfo: (field: keyof EducationInfo, value: any) => void;
  computeRegion: () => void; 
  updatePaymentDetails: (data: Partial<PaymentDetails>) => void;
  generateReceipt: () => void;
  updateVisaDetails: (data: Partial<VisaDetails>) => void;
  updateInternshipDetails: (data: Partial<InternshipDetails>) => void;
  updateVisaEntryByYear: (yearIndex: number, data: Partial<YearlyVisaEntry>) => void;
  updateSemesterEntry: (yearIndex: number, semesterIndex: number, entryIndex: number, data: Partial<VisaEntryRecord>) => void;
  calculateCourseDuration: () => void;  
  updateDocumentFile: (id: number, file: File) => void;
  updatePhoto: (file: File) => void;
  updateSignature: (file: File) => void;
  setPreviewActive: (active: boolean) => void;
  clearAllUploads: () => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
  step: 1,

   personalDetails: {
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    nationality: "",
    aadharNo: "",
    mobile: "",
    email: "",
    passportNo: "",
    passportIssueDate: "",
    passportExpiry: "",
    bloodGroup: "",
    presentAddressSameAsPermanent: false,
    presentHouseNoFlatNo: "",
    presentVillageWardName: "",
    presentLandmark: "",
    presentState: "",
    presentDistrict: "",
    presentPinCode: "",
    permanentHouseNoFlatNo: "",
    permanentVillageWardName: "",
    permanentLandmark: "",
    permanentState: "",
    permanentDistrict: "",
    permanentPinCode: "",
  },

  medicalQualification: {
    medicalQualification: {
      candidateName: "",
      universityName: "",
      collegeName: "",
      universityCountry: "",
      degreeIssuedDate: "",
      courseStartDate: "",
      courseEndDate: "",
    },
    intermediate: {
      board: "",
      rollNo: "",
      year: "",
      month: "",
      totalMarks: "",
      securedMarks: "",
      percentage: "",
    },
    screeningTest: {
      hallTicket: "",
      passedYear: "",
      passedMonth: "",
      obtainedMarks: "",
    },
  },

  educationInfo: {
    educationalDetails: [
      { className: "VI", year: "", state: "", district: "", institute: "", certificateFile: null },
      { className: "VII", year: "", state: "", district: "", institute: "", certificateFile: null },
      { className: "VIII", year: "", state: "", district: "", institute: "", certificateFile: null },
      { className: "IX", year: "", state: "", district: "", institute: "", certificateFile: null },
      { className: "X", year: "", state: "", district: "", institute: "", certificateFile: null },
      { className: "XI", year: "", state: "", district: "", institute: "", certificateFile: null },
      { className: "XII", year: "", state: "", district: "", institute: "", certificateFile: null },
    ],
    region: "Local", 
  },

  paymentDetails: {
    method: "",
    agreeTerms: false,
    totalAmount: 2000,
    transactionStatus: "",
    transactionId: "",
  },

  receipt: null,

  visaEntryForm: {
    visaDetails: {
      country: "",
      admissionDate: "",
      courseCompletionDate: "",
      totalCourseDuration: "",
      arrivalDateAfterCompletion: "",
      internshipDetails: {
        isAbroad: false,
        startDate: "",
        endDate: "",
      },
    },
    visaEntriesByYear: [], 
  },

 
  uploadDocuments: {
    documents: [
      { id: 1, name: "Eligibility Certificate issued by MCI/NMC for seat allotment", file: null, previewUrl: null },
      { id: 2, name: "Admission/Acceptance letter issued by Foreign Medical College/University", file: null, previewUrl: null },
      { id: 3, name: "Provisional/Original Degree Certificate issued by Foreign Medical College/University", file: null, previewUrl: null },
      { id: 4, name: "Embassy Certification in shape of Apostille on Degree Certificate/Credential Report/Notarial Certificates", file: null, previewUrl: null },
      { id: 5, name: "Academic Record/Transcripts/Marks List with Embassy Certification", file: null, previewUrl: null },
      { id: 6, name: "FMGE Screening Test Pass Certificate", file: null, previewUrl: null },
      { id: 7, name: "SSC/CBSE/Equivalent Certificate for proof of Date of Birth", file: null, previewUrl: null },
      { id: 8, name: "10th/Intermediate Verification Letter from Concerned State Board for CBSE Students (Submit 10+2 verification)", file: null, previewUrl: null },
      { id: 9, name: "Original scanned copy of passport (all pages)", file: null, previewUrl: null },
      { id: 10, name: "Affidavit form duly attested by Notary Public on ₹20/- non-judicial Stamp Paper", file: null, previewUrl: null },
      { id: 11, name: "Proof of Identity", file: null, previewUrl: null },
      { id: 12, name: "Notarial Certificate/Notarized Certificate issued by the Indian Embassy", file: null, previewUrl: null },
      { id: 13, name: "Non-Criminal Record issued by the Police Department", file: null, previewUrl: null },
    ],
    photo: { id: 14, name: "Photo", file: null, previewUrl: null, isPhotoSignature: true },
    signature: { id: 15, name: "Signature", file: null, previewUrl: null, isPhotoSignature: true },
    isPreviewActive: false,
  },

  
  updateVisaDetails: (data) =>
    set((state) => ({
      visaEntryForm: {
        ...state.visaEntryForm,
        visaDetails: {
          ...state.visaEntryForm.visaDetails,
          ...data,
        },
      },
    })),

  updateInternshipDetails: (data: Partial<InternshipDetails>) =>
    set((state) => {
      const currentVisaDetails = state.visaEntryForm.visaDetails;
      const updatedInternship = {
        ...(currentVisaDetails.internshipDetails || { isAbroad: false, startDate: "", endDate: "" }),
        ...data,
      };

      return {
        visaEntryForm: {
          ...state.visaEntryForm,
          visaDetails: {
            ...currentVisaDetails,
            internshipDetails: updatedInternship,
          },
        },
      };
    }),

  updateVisaEntryByYear: (yearIndex, data) =>
    set((state) => {
      const updatedYears = [...state.visaEntryForm.visaEntriesByYear];

      if (!updatedYears[yearIndex]) {
        updatedYears[yearIndex] = {
          year: yearIndex + 1,
          semesters: [
            {
              semesterNumber: 1,
              entries: [],
              onlineStudyMonthsInIndia: "",
              totalAbroad: { months: "", days: "" },
              totalIndia: { months: "", days: "" },
            },
            {
              semesterNumber: 2,
              entries: [],
              onlineStudyMonthsInIndia: "",
              totalAbroad: { months: "", days: "" },
              totalIndia: { months: "", days: "" },
            },
          ],
          totalStayAbroad: "",
          totalStayIndia: "",
        };
      }

      updatedYears[yearIndex] = {
        ...updatedYears[yearIndex],
        ...data,
      };

      return {
        visaEntryForm: {
          ...state.visaEntryForm,
          visaEntriesByYear: updatedYears,
        },
      };
    }),

  updateSemesterEntry: (yearIndex, semesterIndex, entryIndex, data) =>
    set((state) => {
      const updatedVisaYears = [...state.visaEntryForm.visaEntriesByYear];

      if (!updatedVisaYears[yearIndex]) return state;

      const updatedSemester = updatedVisaYears[yearIndex].semesters[semesterIndex];

      if (!updatedSemester) return state;

      const updatedEntries = [...updatedSemester.entries];

      if (!updatedEntries[entryIndex]) {
        updatedEntries[entryIndex] = {
          stayInAbroadIndia: "",
          visaNo: "",
          arrivalPlace: "",
          arrivalDate: "",
          arrivalPassportPage: "",
          departurePlace: "",
          departureDate: "",
          departurePassportPage: "",
          durationMonths: "",
          durationDays: "",
        };
      }

      updatedEntries[entryIndex] = {
        ...updatedEntries[entryIndex],
        ...data,
      };

      updatedVisaYears[yearIndex].semesters[semesterIndex] = {
        ...updatedSemester,
        entries: updatedEntries,
      };

      return {
        visaEntryForm: {
          ...state.visaEntryForm,
          visaEntriesByYear: updatedVisaYears,
        },
      };
    }),

  setStep: (step) => set({ step }),

  updatePersonalDetails: (data) =>
    set((state) => ({
      personalDetails: { ...state.personalDetails, ...data },
      medicalQualification: {
        ...state.medicalQualification,
        medicalQualification: {
          ...state.medicalQualification.medicalQualification,
          candidateName: data.name || state.personalDetails.name,  
        },
      },
    })),

  updateMedicalQualification: (data) =>
    set((state) => ({
      medicalQualification: {
        ...state.medicalQualification,
        ...data,
      },
    })),

  updateEducationalDetail: (index, field, value) =>
    set((state) => {
      const updatedDetails = [...state.educationInfo.educationalDetails];
      updatedDetails[index] = { ...updatedDetails[index], [field]: value };
      return {
        educationInfo: {
          ...state.educationInfo,
          educationalDetails: updatedDetails,
        },
      };
    }),

  updateEducationInfo: (field, value) =>
    set((state) => ({
      educationInfo: { ...state.educationInfo, [field]: value },
    })),

  computeRegion: () => {
    const { educationInfo } = get();
    const details = educationInfo.educationalDetails;
    const apYears = details.filter(d => d.state === "Andhra Pradesh").length;

    const auDistricts = ["Guntur", "East Godavari", "Bapatla"]; 
    const svuDistricts = ["Anantapur", "Kurnool"]; 
    const apInAU = details.filter(d => d.state === "Andhra Pradesh" && auDistricts.includes(d.district)).length;
    const apInSVU = details.filter(d => d.state === "Andhra Pradesh" && svuDistricts.includes(d.district)).length;

    let region: "Local" | "Non-Local" = "Non-Local";
    if (apYears >= 7) {
      region = apInAU >= apInSVU ? "Local" : "Local";
    } else if (apYears >= 4) {
       
      const recent4 = details.slice(-4).every(d => d.state === "Andhra Pradesh");
      if (recent4) region = "Local";
    }

    set((state) => ({
      educationInfo: { ...state.educationInfo, region },
    }));
  },

  updatePaymentDetails: (data) =>
    set((state) => ({
      paymentDetails: { ...state.paymentDetails, ...data },
    })),

  calculateCourseDuration: () => {
    const { visaEntryForm } = get();
    const { admissionDate, courseCompletionDate } = visaEntryForm.visaDetails;
    if (!admissionDate || !courseCompletionDate) return;

    const start = new Date(admissionDate);
    const end = new Date(courseCompletionDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;

    const durationStr = `${years} year${years !== 1 ? 's' : ''} ${months} month${months !== 1 ? 's' : ''} ${days} day${days !== 1 ? 's' : ''}`.trim();

    set((state) => ({
      visaEntryForm: {
        ...state.visaEntryForm,
        visaDetails: {
          ...state.visaEntryForm.visaDetails,
          totalCourseDuration: durationStr,
        },
      },
    }));
  },

  generateReceipt: () => {
    const { personalDetails, paymentDetails } = get();
     const refNo = paymentDetails.transactionId || `PAY${Date.now()}`;
    const regNo = personalDetails.aadharNo ? `MCI${personalDetails.aadharNo.substring(-8)}` : `MCI${Date.now().toString().slice(-9)}`; 
    set({
      receipt: {
        applicantName: personalDetails.name,
        registrationNumber: regNo,
        gender: personalDetails.gender,
        mobile: personalDetails.mobile,
        transactionDate: new Date().toLocaleString(),
        amount: paymentDetails.totalAmount,
        paymentRefNo: refNo,
        status: paymentDetails.transactionStatus || "Success",
        paymentMethod: paymentDetails.method,
      },
    });
  },

  updateDocumentFile: (id, file) =>
    set((state) => {
      const maxSize = file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.png') ? 200 * 1024 : 1 * 1024 * 1024; // 200KB for photo/sig, 1MB for PDF
      if (file.size > maxSize) {
        alert(`File size exceeds limit: ${maxSize / 1024} KB for this type.`);
        return state;
      }
      const previewUrl = URL.createObjectURL(file);
      const updatedDocs = state.uploadDocuments.documents.map(doc => 
        doc.id === id ? { ...doc, file, previewUrl } : doc
      );
      return { uploadDocuments: { ...state.uploadDocuments, documents: updatedDocs } };
    }),

  updatePhoto: (file) => {
    const maxSize = 200 * 1024;
    if (file.size > maxSize) {
      alert(`Photo size exceeds 200KB limit.`);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    set((state) => ({ 
      uploadDocuments: { 
        ...state.uploadDocuments, 
        photo: { id: 14, name: "Photo", file, previewUrl, isPhotoSignature: true } 
      } 
    }));
  },

  updateSignature: (file) => {
    const maxSize = 200 * 1024;
    if (file.size > maxSize) {
      alert(`Signature size exceeds 200KB limit.`);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    set((state) => ({ 
      uploadDocuments: { 
        ...state.uploadDocuments, 
        signature: { id: 15, name: "Signature", file, previewUrl, isPhotoSignature: true } 
      } 
    }));
  },

  setPreviewActive: (active) => set((state) => ({ uploadDocuments: { ...state.uploadDocuments, isPreviewActive: active } })),

  resetForm: () =>
  set((state) => ({
    step: 1,
    personalDetails: {
      name: "",
      fatherName: "",
      motherName: "",
      dob: "",
      gender: "",
      nationality: "",
      aadharNo: "",
      mobile: "",
      email: "",
      passportNo: "",
      passportIssueDate: "",
      passportExpiry: "",
      bloodGroup: "",
      presentAddressSameAsPermanent: false,
      presentHouseNoFlatNo: "",
      presentVillageWardName: "",
      presentLandmark: "",
      presentState: "",
      presentDistrict: "",
      presentPinCode: "",
      permanentHouseNoFlatNo: "",
      permanentVillageWardName: "",
      permanentLandmark: "",
      permanentState: "",
      permanentDistrict: "",
      permanentPinCode: "",
    },
    medicalQualification: {
      medicalQualification: {
        candidateName: "",
        universityName: "",
        collegeName: "",
        universityCountry: "",
        degreeIssuedDate: "",
        courseStartDate: "",
        courseEndDate: "",
      },
      intermediate: {
        board: "",
        rollNo: "",
        year: "",
        month: "",
        totalMarks: "",
        securedMarks: "",
        percentage: "",
      },
      screeningTest: {
        hallTicket: "",
        passedYear: "",
        passedMonth: "",
        obtainedMarks: "",
      },
    },
    educationInfo: {
      educationalDetails: state.educationInfo.educationalDetails.map((edu) => ({
        ...edu,
        year: "",
        state: "",
        district: "",
        institute: "",
        certificateFile: null,
      })),
      region: "Local",
    },
    paymentDetails: {
      method: "",
      agreeTerms: false,
      totalAmount: 2000,
      transactionStatus: "",
      transactionId: "",
    },
    receipt: null,
    visaEntryForm: {
      visaDetails: {
        country: "",
        admissionDate: "",
        courseCompletionDate: "",
        totalCourseDuration: "",
        arrivalDateAfterCompletion: "",
        internshipDetails: {
          isAbroad: false,
          startDate: "",
          endDate: "",
        },
      },
      visaEntriesByYear: [],
    },
    uploadDocuments: {
      documents: state.uploadDocuments.documents.map((doc) => ({
        ...doc,
        file: null,
        previewUrl: null,
      })),
      photo: state.uploadDocuments.photo
        ? { ...state.uploadDocuments.photo, file: null, previewUrl: null }
        : null,
      signature: state.uploadDocuments.signature
        ? { ...state.uploadDocuments.signature, file: null, previewUrl: null }
        : null,
      isPreviewActive: false,
    },
  })),
  
  clearAllUploads: () => set((state) => ({
    uploadDocuments: {
      ...state.uploadDocuments,
      documents: state.uploadDocuments.documents.map(doc => ({ ...doc, file: null, previewUrl: null })),
      photo: state.uploadDocuments.photo ? { ...state.uploadDocuments.photo, file: null, previewUrl: null } : null,
      signature: state.uploadDocuments.signature ? { ...state.uploadDocuments.signature, file: null, previewUrl: null } : null,
    }
  })),
}));