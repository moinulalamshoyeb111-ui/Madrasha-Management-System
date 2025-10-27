import React, { useState, useEffect } from 'react';
import { ClassInfo, Department, Subject } from '../types';

interface ClassFormProps {
    classInfo: ClassInfo | null;
    onSave: (classData: Omit<ClassInfo, 'id'> & { id?: string }) => void;
    onCancel: () => void;
    departments: Department[];
    subjects: Subject[];
}

const ClassForm: React.FC<ClassFormProps> = ({ classInfo, onSave, onCancel, departments, subjects }) => {
    const [formData, setFormData] = useState<Omit<ClassInfo, 'id'>>({
        name: '', departmentId: '', subjectIds: [], remarks: ''
    });

    useEffect(() => {
        if (classInfo) {
            setFormData(classInfo);
        }
    }, [classInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubjectChange = (subjectId: string) => {
        setFormData(prev => {
            const newSubjectIds = prev.subjectIds.includes(subjectId)
                ? prev.subjectIds.filter(id => id !== subjectId)
                : [...prev.subjectIds, subjectId];
            return { ...prev, subjectIds: newSubjectIds };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: classInfo?.id });
    };
    
    const availableSubjects = subjects.filter(s => s.departmentId === formData.departmentId);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{classInfo ? 'Edit Class' : 'Add New Class'}</h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Class Name</label>
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
                        <label className="block text-sm font-medium text-gray-700">Subjects</label>
                        <div className="mt-2 grid grid-cols-2 gap-2 border p-3 rounded-md max-h-40 overflow-y-auto">
                            {availableSubjects.map(subject => (
                                <div key={subject.id} className="flex items-center">
                                    <input
                                        id={`subject-${subject.id}`}
                                        type="checkbox"
                                        checked={formData.subjectIds.includes(subject.id)}
                                        onChange={() => handleSubjectChange(subject.id)}
                                        className="h-4 w-4 text-teal-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`subject-${subject.id}`} className="ml-2 text-sm text-gray-700">{subject.name}</label>
                                </div>
                            ))}
                        </div>
                        {!formData.departmentId && <p className="text-xs text-gray-500 mt-1">Please select a department to see available subjects.</p>}
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Class</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClassForm;
