import React, { useState, useEffect } from 'react';
import { Subject, Department } from '../types';

interface SubjectFormProps {
    subject: Subject | null;
    onSave: (subjectData: Omit<Subject, 'id'> & { id?: string }) => void;
    onCancel: () => void;
    departments: Department[];
}

const SubjectForm: React.FC<SubjectFormProps> = ({ subject, onSave, onCancel, departments }) => {
    const [formData, setFormData] = useState<Omit<Subject, 'id'>>({
        name: '', departmentId: '', remarks: ''
    });

    useEffect(() => {
        if (subject) {
            setFormData(subject);
        }
    }, [subject]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: subject?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{subject ? 'Edit Subject' : 'Add New Subject'}</h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="departmentId" value={formData.departmentId} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Select Department</option>
                            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Subject</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubjectForm;
