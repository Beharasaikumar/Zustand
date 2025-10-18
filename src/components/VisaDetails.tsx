import React, { useState, useEffect } from "react";
import { useFormStore } from "../store/UserProfileStore";
import { VisaEntryRecord } from "../store/UserProfileStore";

export default function VisaDetailsForm() {
    const {
        visaEntryForm,
        updateVisaDetails,
        updateInternshipDetails,
        updateVisaEntryByYear,
        updateSemesterEntry,
        calculateCourseDuration,
        setStep
    } = useFormStore();

    const { visaDetails } = visaEntryForm;
    const internship = visaDetails.internshipDetails || {
        isAbroad: false,
        startDate: "",
        endDate: "",
    };


    const [selectedYear, setSelectedYear] = useState(0);
    const [numYears, setNumYears] = useState(1);

    const handleVisaChange = (field: keyof typeof visaDetails, value: string) => {
        updateVisaDetails({ [field]: value });
    };

    const handleInternshipChange = (field: keyof typeof internship, value: string | boolean) => {
        updateInternshipDetails({ [field]: value as any });
    };


    useEffect(() => {
        if (visaDetails.admissionDate && visaDetails.courseCompletionDate) {
            calculateCourseDuration();
            const durationMatch = visaDetails.totalCourseDuration.match(/(\d+) year/);
            const parsedYears = durationMatch ? Math.max(1, parseInt(durationMatch[1])) : 1;
            setNumYears(parsedYears);


            for (let y = 0; y < parsedYears; y++) {
                if (!visaEntryForm.visaEntriesByYear[y]) {
                    updateVisaEntryByYear(y, {
                        year: y + 1,
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
                    });
                }
            }
        }
    }, [visaDetails.admissionDate, visaDetails.courseCompletionDate, visaEntryForm.visaEntriesByYear, updateVisaEntryByYear]);

    const visaYears = visaEntryForm.visaEntriesByYear || [];
    const currentYearData = visaYears[selectedYear] || { semesters: [], totalStayAbroad: "", totalStayIndia: "" };

    // Safe access to semesters
    const getSemester = (semIndex: number) => {
        const sem = currentYearData.semesters?.[semIndex];
        return sem || {
            semesterNumber: semIndex + 1,
            entries: [],
            onlineStudyMonthsInIndia: "",
            totalAbroad: { months: "", days: "" },
            totalIndia: { months: "", days: "" },
        };
    };

    const sem1 = getSemester(0);
    const sem2 = getSemester(1);

    // Handlers
    const addEntry = (semesterIndex: number) => {
        const updatedSemesters = [...(currentYearData.semesters || [])];
        if (!updatedSemesters[semesterIndex]) updatedSemesters[semesterIndex] = getSemester(semesterIndex);
        updatedSemesters[semesterIndex].entries = [...(updatedSemesters[semesterIndex].entries || []), {} as VisaEntryRecord];
        updateVisaEntryByYear(selectedYear, { semesters: updatedSemesters });
    };

    const updateEntry = (semesterIndex: number, entryIndex: number, data: Partial<VisaEntryRecord>) => {
        updateSemesterEntry(selectedYear, semesterIndex, entryIndex, data);
    };

    const updateSemesterTotal = (semesterIndex: number, totalType: 'totalAbroad' | 'totalIndia', unit: 'months' | 'days', value: string) => {
        const updatedSemesters = [...(currentYearData.semesters || [])];
        if (!updatedSemesters[semesterIndex]) updatedSemesters[semesterIndex] = getSemester(semesterIndex);
        const currentTotal = updatedSemesters[semesterIndex][totalType] || { months: "", days: "" };
        updatedSemesters[semesterIndex][totalType] = { ...currentTotal, [unit]: value };
        updateVisaEntryByYear(selectedYear, { semesters: updatedSemesters });
    };

    const updateOnlineStudy = (semesterIndex: number, value: string) => {
        const updatedSemesters = [...(currentYearData.semesters || [])];
        if (!updatedSemesters[semesterIndex]) updatedSemesters[semesterIndex] = getSemester(semesterIndex);
        updatedSemesters[semesterIndex].onlineStudyMonthsInIndia = value;
        updateVisaEntryByYear(selectedYear, { semesters: updatedSemesters });
    };

    const updateYearlyTotal = (field: 'totalStayAbroad' | 'totalStayIndia', value: string) => {
        updateVisaEntryByYear(selectedYear, { [field]: value });
    };

    const renderSemesterSection = (semester: any, semesterIndex: number) => (
        <div key={semesterIndex} className="mb-6">
            <h4 className="text-sm font-semibold mb-2">
                {currentYearData.year || 1} Year - {semester.semesterNumber}st Semester
            </h4>
            <div className="overflow-x-auto mb-4">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">Stay in Abroad/India</th>
                            <th className="border p-2">Visa No</th>
                            <th className="border p-2">Place of Arrival</th>
                            <th className="border p-2">Date of Arrival</th>
                            <th className="border p-2">Arrival PP No.</th>
                            <th className="border p-2">Place of Departure</th>
                            <th className="border p-2">Date of Departure</th>
                            <th className="border p-2">Departure PP No.</th>
                            <th className="border p-2">Months</th>
                            <th className="border p-2">Days</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {semester.entries.map((entry: VisaEntryRecord, entryIdx: number) => (
                            <tr key={entryIdx}>
                                <td className="border p-2">
                                    <select
                                        value={entry.stayInAbroadIndia || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { stayInAbroadIndia: e.target.value })}
                                        className="border rounded p-1 w-full"
                                    >
                                        <option value="">Select</option>
                                        <option value="Abroad">Abroad</option>
                                        <option value="India">India</option>
                                    </select>
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={entry.visaNo || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { visaNo: e.target.value })}
                                        className="border rounded p-1 w-full"
                                        placeholder="Visa No"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={entry.arrivalPlace || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { arrivalPlace: e.target.value })}
                                        className="border rounded p-1 w-full"
                                        placeholder="Place"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="date"
                                        value={entry.arrivalDate || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { arrivalDate: e.target.value })}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={entry.arrivalPassportPage || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { arrivalPassportPage: e.target.value })}
                                        className="border rounded p-1 w-full"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={entry.departurePlace || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { departurePlace: e.target.value })}
                                        className="border rounded p-1 w-full"
                                        placeholder="Departure"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="date"
                                        value={entry.departureDate || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { departureDate: e.target.value })}
                                        className="border rounded p-1 w-full"
                                     />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="text"
                                        value={entry.departurePassportPage || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { departurePassportPage: e.target.value })}
                                        className="border rounded p-1 w-full"
                                        placeholder="PP.No"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={entry.durationMonths || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { durationMonths: e.target.value })}
                                        className="border rounded p-1 w-full"
                                        placeholder="Months"
                                    />
                                </td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        value={entry.durationDays || ""}
                                        onChange={(e) => updateEntry(semesterIndex, entryIdx, { durationDays: e.target.value })}
                                        className="border rounded p-1 w-full"
                                        placeholder="Days"
                                    />
                                </td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => updateEntry(semesterIndex, entryIdx, {})}
                                        className="bg-teal-600 text-white px-2 py-1 rounded text-sm"
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={11} className="border p-2 text-center font-light">
                                <button
                                    onClick={() => addEntry(semesterIndex)}
                                    className="bg-teal-600 text-white px-4 py-2 rounded"
                                >
                                    + Add Entry
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

    
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 border rounded">
                <div className="border-r border-gray-300">
                    <label className="font-semibold text-sm block mb-1">Total Period in {semester.semesterNumber}st Semester:</label>
                 
                </div>
                <div className="col-span-1 boder-r border-gray-300">
                    <label className="font-semibold text-sm block mb-1">Total Abroad:</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            value={semester.totalAbroad?.months || ""}
                            onChange={(e) => updateSemesterTotal(semesterIndex, 'totalAbroad', 'months', e.target.value)}
                            className="border rounded-md p-2"
                            placeholder="Months"
                        />
                        <input
                            type="number"
                            value={semester.totalAbroad?.days || ""}
                            onChange={(e) => updateSemesterTotal(semesterIndex, 'totalAbroad', 'days', e.target.value)}
                            className="border rounded-md p-2"
                            placeholder="Days"
                        />
                    </div>
                </div>
                <div className="col-span-1">
                    <label className="font-semibold text-sm block mb-1">Total India:</label>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            value={semester.totalIndia?.months || ""}
                            onChange={(e) => updateSemesterTotal(semesterIndex, 'totalIndia', 'months', e.target.value)}
                            className="border rounded-md p-2"
                            placeholder="Months"
                        />
                        <input
                            type="number"
                            value={semester.totalIndia?.days || ""}
                            onChange={(e) => updateSemesterTotal(semesterIndex, 'totalIndia', 'days', e.target.value)}
                            className="border rounded-md p-2"
                            placeholder="Days"
                        />
                    </div>
                </div>
            </div>

            {/* Online Study */}
            <div className="mb-4 p-4 border rounded">
                <label className="font-semibold text-sm block mb-1">
                    Period of online study during staying in India (Details of the semester and number of months):
                </label>
                <select
                    value={semester.onlineStudyMonthsInIndia}
                    onChange={(e) => updateOnlineStudy(semesterIndex, e.target.value)}
                    className="border rounded-md p-2 w-full"
                >
                    <option value="">Select</option>
                    <option value="1">1 Month</option>
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="4">4 Months</option>
                    <option value="5">5 Months</option>
                    <option value="6">6 Months</option>
                </select>
            </div>
          <div className="text-center">
            <button className="bg-teal-600 text-white px-4 py-2 rounded mb-6 w-56">Save</button>
          </div>
        </div>
    );

    return (
        <div className="p-6 max-w-[90%] mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">Visa Details</h2>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 border rounded">
                <div>
                    <label className="font-semibold text-sm block mb-1">Country*:</label>
                    <input
                        type="text"
                        value={visaDetails.country || ""}
                        onChange={(e) => handleVisaChange("country", e.target.value)}
                        className="border rounded-md w-full p-2"
                        placeholder="Enter your Country"
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold text-sm block mb-1">Date of Admission*:</label>
                    <input
                        type="date"
                        value={visaDetails.admissionDate || ""}
                        onChange={(e) => handleVisaChange("admissionDate", e.target.value)}
                        className="border rounded-md w-full p-2"
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold text-sm block mb-1">Date of Course Completion*:</label>
                    <input
                        type="date"
                        value={visaDetails.courseCompletionDate || ""}
                        onChange={(e) => handleVisaChange("courseCompletionDate", e.target.value)}
                        className="border rounded-md w-full p-2"
                        required
                    />
                </div>
                <div>
                    <label className="font-semibold text-sm block mb-1">Total Course Duration*:</label>
                    <input
                        type="text"
                        value={visaDetails.totalCourseDuration || "1 year 0 month 12 day"}
                        className="border rounded-md w-full p-2"
                        readOnly
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="font-semibold text-sm block mb-1">Date of Arrival in India after course completion (as per Visa entry):</label>
                    <input
                        type="date"
                        value={visaDetails.arrivalDateAfterCompletion || ""}
                        onChange={(e) => handleVisaChange("arrivalDateAfterCompletion", e.target.value)}
                        className="border rounded-md w-[49.5%] p-2"
                    />
                </div>
            </div>

             <div className="mb-6 p-4 border rounded">
                <h3 className="text-md font-semibold mb-2">Internship in Abroad*:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="font-semibold text-sm block mb-1">Select:</label>
                        <select
                            value={internship.isAbroad ? "Yes" : "No"}
                            onChange={(e) => handleInternshipChange("isAbroad", e.target.value === "Yes")}
                            className="border rounded-md p-2 w-full"
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                    {internship.isAbroad && (
                        <>
                            <div>
                                <label className="font-semibold text-sm block mb-1">Internship Start Date*:</label>
                                <input
                                    type="date"
                                    value={internship.startDate || ""}
                                    onChange={(e) => handleInternshipChange("startDate", e.target.value)}
                                    className="border rounded-md w-full p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="font-semibold text-sm block mb-1">Internship End Date*:</label>
                                <input
                                    type="date"
                                    value={internship.endDate || ""}
                                    onChange={(e) => handleInternshipChange("endDate", e.target.value)}
                                    className="border rounded-md w-full p-2"
                                    required
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

             {internship.isAbroad && visaDetails.admissionDate && visaDetails.courseCompletionDate && (
                <div className="mb-6 p-4 border rounded">
                    <h3 className="text-2xl text-teal-600 font-semibold mb-4">Visa Entry Form</h3>
                    <div className="flex gap-6 mb-4 items-center">
                        <div className="flex flex-col gap-3">
                        <label className="font-semibold text-sm">Select Year:</label>
                        <select
                            value={selectedYear + 1}
                            onChange={(e) => setSelectedYear(parseInt(e.target.value) - 1)}
                            className="border rounded-md p-2"
                            >
                            {Array.from({ length: Math.min(6, numYears) }, (_, i) => (
                                <option key={i} value={i + 1}>{(i + 1)}st Year</option>
                            ))}
                        </select>
                            </div>

                        <label className="font-semibold text-sm"> semesters</label>
                        <input type="checkbox" checked className="w-4 h-4" disabled />
                    </div>

                    {renderSemesterSection(sem1, 0)}
                    {renderSemesterSection(sem2, 1)}

                  
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-semibold text-sm block mb-1">Total Abroad in {currentYearData.year || 1} Year:</label>
                            <input
                                type="text"
                                value={currentYearData.totalStayAbroad || ""}
                                onChange={(e) => updateYearlyTotal('totalStayAbroad', e.target.value)}
                                className="border rounded-md w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-semibold text-sm block mb-1">Total Stay in India in {currentYearData.year || 1} Year:</label>
                            <input
                                type="text"
                                value={currentYearData.totalStayIndia || ""}
                                onChange={(e) => updateYearlyTotal('totalStayIndia', e.target.value)}
                                className="border rounded-md w-full p-2"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button className="bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-700 text-white"> Back</button>
                        <button
                            onClick={() => setStep(6)}
                            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Navigation - Only if no visa entry form or at bottom */}
            {!internship.isAbroad && (
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => setStep(4)}
                        className="bg-teal-300 px-4 py-2 rounded-md hover:bg-teal-700 text-white"
                    >
                        Back
                    </button>
                    <button
                        onClick={() => setStep(6)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700"
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}