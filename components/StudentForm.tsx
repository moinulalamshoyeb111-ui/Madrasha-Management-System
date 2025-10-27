
import React, { useState, useEffect } from 'react';
import { Student, ExtraFee, Department, ClassInfo } from '../types';

interface StudentFormProps {
    student: Student | null;
    onSave: (studentData: Omit<Student, 'id'> & { id?: string }) => void;
    onCancel: () => void;
    departments: Department[];
    classes: ClassInfo[];
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onSave, onCancel, departments, classes }) => {
    const [formData, setFormData] = useState<Omit<Student, 'id'>>({
        name: '', department: '', class: '', section: 'A', guardianName: '', guardianPhone: '', admissionDate: '',
        studentType: 'Regular', tuitionFee: 0, hostelFee: 0, extraFees: [], remarks: ''
    });

    useEffect(() => {
        if (student) {
            setFormData(student);
        }
    }, [student]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const isNumeric = ['tuitionFee', 'hostelFee'].includes(name);
        const updatedState: Partial<Omit<Student, 'id'>> = { [name]: isNumeric ? Number(value) : value };

        if (name === 'studentType' && value !== 'Residential') {
            updatedState.hostelFee = 0;
        }
        
        setFormData(prev => ({ ...prev, ...updatedState }));
    };
    
    const handleFeeChange = (index: number, field: keyof ExtraFee, value: string | number) => {
        const newFees = [...formData.extraFees];
        // @ts-ignore
        newFees[index][field] = field === 'amount' ? Number(value) : value;
        setFormData(prev => ({...prev, extraFees: newFees}));
    }

    const addFee = () => {
        setFormData(prev => ({...prev, extraFees: [...prev.extraFees, { description: '', amount: 0}]}));
    }
    
    const removeFee = (index: number) => {
        setFormData(prev => ({...prev, extraFees: formData.extraFees.filter((_, i) => i !== index)}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: student?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{student ? 'Edit Student' : 'Add New Student'}</h2>
                    
                    {/* Main Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Student Type</label>
                            <select name="studentType" value={formData.studentType} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                <option>Regular</option>
                                <option>Residential</option>
                                <option>Lillah Boarding</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Department</label>
                            <select name="department" value={formData.department} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Select Department</option>
                                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Class</label>
                                <select name="class" value={formData.class} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                     <option value="">Select Class</option>
                                     {classes.filter(c => c.departmentId === departments.find(d => d.name === formData.department)?.id).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Section</label>
                                <select name="section" value={formData.section} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                    <option>A</option>
                                    <option>B</option>
                                    <option>C</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Guardian's Name</label>
                            <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Guardian's Phone</label>
                            <input type="tel" name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Admission Date</label>
                            <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                    </div>

                    {/* Fee Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tuition Fee (Monthly)</label>
                            <input type="number" name="tuitionFee" value={formData.tuitionFee} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        {formData.studentType === 'Residential' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hostel Fee (Monthly)</label>
                                <input type="number" name="hostelFee" value={formData.hostelFee} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                            </div>
                        )}
                         <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">Extra Fees / Fines</label>
                             {formData.extraFees.map((fee, index) => (
                                <div key={index} className="flex items-center space-x-2 mt-2">
                                    <input type="text" placeholder="Description" value={fee.description} onChange={(e) => handleFeeChange(index, 'description', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm" />
                                    <input type="number" placeholder="Amount" value={fee.amount} onChange={(e) => handleFeeChange(index, 'amount', e.target.value)} className="w-48 rounded-md border-gray-300 shadow-sm" />
                                    <button type="button" onClick={() => removeFee(index)} className="text-red-500"><i className="fas fa-trash"></i></button>
                                </div>
                             ))}
                             <button type="button" onClick={addFee} className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-semibold"><i className="fas fa-plus mr-1"></i> Add Fee</button>
                        </div>
                    </div>
                    
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Student</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
