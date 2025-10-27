import React from 'react';
import { Student } from '../types';

interface StudentDetailModalProps {
    student: Student;
    onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-md text-gray-900 font-semibold">{value}</p>
    </div>
);

const StudentDetailModal: React.FC<StudentDetailModalProps> = ({ student, onClose }) => {
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);
    }
    
    const getTypeStyle = (type: Student['studentType']) => {
        switch (type) {
            case 'Residential':
                return 'bg-sky-100 text-sky-800';
            case 'Lillah Boarding':
                return 'bg-purple-100 text-purple-800';
            case 'Regular':
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    const totalExtraFees = student.extraFees.reduce((acc, fee) => acc + fee.amount, 0);
    const totalPayable = student.tuitionFee + student.hostelFee + totalExtraFees;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" role="dialog" aria-modal="true">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Student Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <DetailItem label="Student ID" value={student.id} />
                        <DetailItem label="Full Name" value={student.name} />
                        <DetailItem label="Student Type" value={
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeStyle(student.studentType)}`}>
                                {student.studentType}
                            </span>
                        } />
                        <DetailItem label="Department" value={student.department} />
                        <DetailItem label="Class" value={`${student.class} - Section ${student.section}`} />
                        <DetailItem label="Admission Date" value={new Date(student.admissionDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
                        <DetailItem label="Guardian's Name" value={student.guardianName} />
                        <DetailItem label="Guardian's Phone" value={student.guardianPhone} />
                    </div>

                    <div className="border-t mt-6 pt-6">
                         <h3 className="text-lg font-bold text-gray-800 mb-4">Fee Details</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <DetailItem label="Tuition Fee" value={formatCurrency(student.tuitionFee)} />
                            <DetailItem label="Hostel Fee" value={formatCurrency(student.hostelFee)} />
                            <div className="md:col-span-2 space-y-2">
                                <p className="text-sm font-medium text-gray-500">Extra Fees / Fines</p>
                                {student.extraFees.length > 0 ? (
                                    <ul className="text-md text-gray-900 font-semibold list-disc list-inside">
                                        {student.extraFees.map((fee, index) => (
                                            <li key={index} className="flex justify-between">
                                                <span>{fee.description}</span>
                                                <span className="text-orange-600">{formatCurrency(fee.amount)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-1 text-md text-gray-500 font-semibold">None</p>
                                )}
                            </div>
                             <div className="md:col-span-2 border-t mt-4 pt-4">
                                <DetailItem label="Total Payable" value={
                                    <span className="text-green-600 text-xl">{formatCurrency(totalPayable)}</span>
                                } />
                             </div>
                        </div>
                    </div>

                    {student.remarks && (
                        <div className="border-t mt-6 pt-6">
                             <h3 className="text-lg font-bold text-gray-800 mb-4">Remarks</h3>
                             <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{student.remarks}</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDetailModal;