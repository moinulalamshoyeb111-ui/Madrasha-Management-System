import React from 'react';
import { Teacher } from '../types';
import { SUBJECTS_DATA } from '../constants';

interface TeacherDetailModalProps {
    teacher: Teacher;
    onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-md text-gray-900 font-semibold">{value}</p>
    </div>
);

const TeacherDetailModal: React.FC<TeacherDetailModalProps> = ({ teacher, onClose }) => {
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);
    }
    
    const getSubjectName = (subjectId: string) => {
        return SUBJECTS_DATA.find(s => s.id === subjectId)?.name || 'N/A';
    };
    
    const totalAdjustments = teacher.adjustments.reduce((acc, adj) => acc + adj.amount, 0);
    const totalPayable = teacher.baseSalary - teacher.residentialDeduction + totalAdjustments;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" role="dialog" aria-modal="true">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Teacher Details</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <DetailItem label="Teacher ID" value={teacher.id} />
                        <DetailItem label="Full Name" value={teacher.name} />
                        <DetailItem label="Teacher Type" value={
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${teacher.type === 'Residential' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-800'}`}>
                                {teacher.type}
                            </span>
                        } />
                        <DetailItem label="Primary Subject" value={getSubjectName(teacher.subjectId)} />
                        <DetailItem label="Email Address" value={teacher.email} />
                        <DetailItem label="Phone Number" value={teacher.phone} />
                        <DetailItem label="Joining Date" value={new Date(teacher.joiningDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} />
                    </div>

                    <div className="border-t mt-6 pt-6">
                         <h3 className="text-lg font-bold text-gray-800 mb-4">Salary Details</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <DetailItem label="Base Salary" value={formatCurrency(teacher.baseSalary)} />
                            <DetailItem label="Hostel Fee (Deduction)" value={formatCurrency(teacher.residentialDeduction)} />
                            <div className="md:col-span-2 space-y-2">
                                <p className="text-sm font-medium text-gray-500">Bonuses / Deductions</p>
                                {teacher.adjustments.length > 0 ? (
                                    <ul className="text-md text-gray-900 font-semibold list-disc list-inside">
                                        {teacher.adjustments.map((adj, index) => (
                                            <li key={index} className="flex justify-between">
                                                <span>{adj.description}</span>
                                                <span className={adj.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                                                    {formatCurrency(adj.amount)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="mt-1 text-md text-gray-500 font-semibold">None</p>
                                )}
                            </div>
                             <div className="md:col-span-2 border-t mt-4 pt-4">
                                <DetailItem label="Total Payable Salary" value={
                                    <span className="text-teal-600 text-xl">{formatCurrency(totalPayable)}</span>
                                 } />
                             </div>
                        </div>
                    </div>
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

export default TeacherDetailModal;