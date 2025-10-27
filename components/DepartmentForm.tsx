import React, { useState, useEffect } from 'react';
import { Department } from '../types';

interface DepartmentFormProps {
    department: Department | null;
    onSave: (departmentData: Omit<Department, 'id'> & { id?: string }) => void;
    onCancel: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Department, 'id'>>({
        name: '', remarks: ''
    });

    useEffect(() => {
        if (department) {
            setFormData(department);
        }
    }, [department]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: department?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{department ? 'Edit Department' : 'Add New Department'}</h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Department</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentForm;
