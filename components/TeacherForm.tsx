import React, { useState, useEffect } from 'react';
import { Teacher, SalaryAdjustment, Subject } from '../types';

interface TeacherFormProps {
    teacher: Teacher | null;
    onSave: (teacherData: Omit<Teacher, 'id'> & { id?: string }) => void;
    onCancel: () => void;
    subjects: Subject[];
}

const TeacherForm: React.FC<TeacherFormProps> = ({ teacher, onSave, onCancel, subjects }) => {
    const [formData, setFormData] = useState<Omit<Teacher, 'id'>>({
        name: '', subjectId: '', phone: '', email: '', joiningDate: '',
        type: 'Regular', baseSalary: 0, residentialDeduction: 0, adjustments: [], remarks: ''
    });

    useEffect(() => {
        if (teacher) {
            setFormData(teacher);
        }
    }, [teacher]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'baseSalary' || name === 'residentialDeduction' ? Number(value) : value }));
    };

    const handleAdjustmentChange = (index: number, field: keyof SalaryAdjustment, value: string | number) => {
        const newAdjustments = [...formData.adjustments];
        // @ts-ignore
        newAdjustments[index][field] = field === 'amount' ? Number(value) : value;
        setFormData(prev => ({...prev, adjustments: newAdjustments}));
    }

    const addAdjustment = () => {
        setFormData(prev => ({...prev, adjustments: [...prev.adjustments, { description: '', amount: 0}]}));
    }
    
    const removeAdjustment = (index: number) => {
        setFormData(prev => ({...prev, adjustments: formData.adjustments.filter((_, i) => i !== index)}));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: teacher?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{teacher ? 'Edit Teacher' : 'Add New Teacher'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Primary Subject</label>
                            <select name="subjectId" value={formData.subjectId} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
                            <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select name="type" value={formData.type} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                <option>Regular</option>
                                <option>Residential</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Base Salary</label>
                            <input type="number" name="baseSalary" value={formData.baseSalary} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Residential Deduction</label>
                            <input type="number" name="residentialDeduction" value={formData.residentialDeduction} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">Salary Adjustments (Bonus/Deduction)</label>
                             {formData.adjustments.map((adj, index) => (
                                <div key={index} className="flex items-center space-x-2 mt-2">
                                    <input type="text" placeholder="Description" value={adj.description} onChange={(e) => handleAdjustmentChange(index, 'description', e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm" />
                                    <input type="number" placeholder="Amount" value={adj.amount} onChange={(e) => handleAdjustmentChange(index, 'amount', e.target.value)} className="w-48 rounded-md border-gray-300 shadow-sm" />
                                    <button type="button" onClick={() => removeAdjustment(index)} className="text-red-500"><i className="fas fa-trash"></i></button>
                                </div>
                             ))}
                             <button type="button" onClick={addAdjustment} className="mt-2 text-sm text-teal-600 hover:text-teal-800 font-semibold"><i className="fas fa-plus mr-1"></i> Add Adjustment</button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Teacher</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherForm;
