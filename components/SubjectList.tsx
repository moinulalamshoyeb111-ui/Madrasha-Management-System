
import React, { useState } from 'react';
import { Subject, Department } from '../types';
import SubjectForm from './SubjectForm';

interface SubjectListProps {
    subjects: Subject[];
    setSubjects: React.Dispatch<React.SetStateAction<Subject[]>>;
    departments: Department[];
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, setSubjects, departments }) => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

    const handleAddSubject = () => {
        setEditingSubject(null);
        setIsFormModalOpen(true);
    };

    const handleEditSubject = (subject: Subject) => {
        setEditingSubject(subject);
        setIsFormModalOpen(true);
    };
    
    const handleDeleteSubject = (subjectId: string) => {
        if (window.confirm('Are you sure you want to delete this subject? This may affect assigned classes and teachers.')) {
            setSubjects(currentSubjects => currentSubjects.filter(s => s.id !== subjectId));
        }
    };

    const handleSaveSubject = (subjectData: Omit<Subject, 'id'> & { id?: string }) => {
        if (subjectData.id) {
            setSubjects(currentSubjects => currentSubjects.map(s => s.id === subjectData.id ? { ...s, ...subjectData } as Subject : s));
        } else {
            const newIdNumber = Math.max(0, ...subjects.map(s => parseInt(s.id.substring(3)))) + 1;
            const newId = `SUB${String(newIdNumber).padStart(2, '0')}`;
            const newSubject: Subject = {
                ...subjectData,
                id: newId,
            } as Subject;
            setSubjects(currentSubjects => [...currentSubjects, newSubject]);
        }
        setIsFormModalOpen(false);
        setEditingSubject(null);
    };

    const getDepartmentName = (departmentId: string) => {
        return departments.find(d => d.id === departmentId)?.name || 'Unknown';
    };

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Subject Management</h3>
                     <button onClick={handleAddSubject} title="Add a new subject" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Subject
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Subject ID</th>
                                <th scope="col" className="px-6 py-3">Subject Name</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr key={subject.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{subject.id}</td>
                                    <td className="px-6 py-4">{subject.name}</td>
                                    <td className="px-6 py-4">{getDepartmentName(subject.departmentId)}</td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleEditSubject(subject)} title="Edit Subject" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteSubject(subject.id)} title="Delete Subject" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {isFormModalOpen && (
                <SubjectForm
                    subject={editingSubject} 
                    onSave={handleSaveSubject} 
                    onCancel={() => { setIsFormModalOpen(false); setEditingSubject(null); }}
                    departments={departments}
                />
            )}
        </div>
    );
};

export default SubjectList;
