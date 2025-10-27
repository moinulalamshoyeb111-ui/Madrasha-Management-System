import React, { useState, useEffect } from 'react';
import { Employee } from '../types';

interface EmployeeFormProps {
    employee: Employee | null;
    onSave: (employeeData: Omit<Employee, 'id'> & { id?: string }) => void;
    onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
        name: '', role: 'Admin Staff', phone: '', email: '', joiningDate: '',
        type: 'Regular', salary: 0, remarks: ''
    });

    useEffect(() => {
        if (employee) {
            setFormData(employee);
        }
    }, [employee]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: employee?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{employee ? 'Edit Employee' : 'Add New Employee'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Role</label>
                            <select name="role" value={formData.role} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                <option>Accountant</option>
                                <option>Admin Staff</option>
                                <option>Cleaner</option>
                                <option>Security Guard</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
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
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Salary</label>
                            <input type="number" name="salary" value={formData.salary} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Remarks</label>
                            <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
