
import React, { useState } from 'react';
import { ClassInfo, Department, Subject } from '../types';
import ClassForm from './ClassForm';

interface ClassListProps {
    classes: ClassInfo[];
    setClasses: React.Dispatch<React.SetStateAction<ClassInfo[]>>;
    departments: Department[];
    subjects: Subject[];
}

const ClassList: React.FC<ClassListProps> = ({ classes, setClasses, departments, subjects }) => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState<ClassInfo | null>(null);

    const handleAddClass = () => {
        setEditingClass(null);
        setIsFormModalOpen(true);
    };

    const handleEditClass = (classInfo: ClassInfo) => {
        setEditingClass(classInfo);
        setIsFormModalOpen(true);
    };

    const handleDeleteClass = (classId: string) => {
        if (window.confirm('Are you sure you want to delete this class? This may affect assigned students.')) {
            setClasses(currentClasses => currentClasses.filter(c => c.id !== classId));
        }
    };

    const handleSaveClass = (classData: Omit<ClassInfo, 'id'> & { id?: string }) => {
        if (classData.id) {
            setClasses(currentClasses => currentClasses.map(c => c.id === classData.id ? { ...c, ...classData } as ClassInfo : c));
        } else {
            const newIdNumber = Math.max(0, ...classes.map(c => parseInt(c.id.substring(1)))) + 1;
            const newId = `C${String(newIdNumber).padStart(2, '0')}`;
            const newClass: ClassInfo = {
                ...classData,
                id: newId,
            } as ClassInfo;
            setClasses(currentClasses => [...currentClasses, newClass]);
        }
        setIsFormModalOpen(false);
        setEditingClass(null);
    };

    const getDepartmentName = (departmentId: string) => {
        return departments.find(d => d.id === departmentId)?.name || 'Unknown';
    };

    const getSubjectNames = (subjectIds: string[]) => {
        return subjectIds.map(id => subjects.find(s => s.id === id)?.name).filter(Boolean).join(', ');
    };

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Class List</h3>
                     <button onClick={handleAddClass} title="Add a new class" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Class
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Class Name</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Subjects Taught</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((classInfo) => (
                                <tr key={classInfo.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{classInfo.name}</td>
                                    <td className="px-6 py-4">{getDepartmentName(classInfo.departmentId)}</td>
                                    <td className="px-6 py-4">{getSubjectNames(classInfo.subjectIds)}</td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleEditClass(classInfo)} title="Edit Class" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteClass(classInfo.id)} title="Delete Class" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
             {isFormModalOpen && (
                <ClassForm
                    classInfo={editingClass} 
                    onSave={handleSaveClass} 
                    onCancel={() => { setIsFormModalOpen(false); setEditingClass(null); }}
                    departments={departments}
                    subjects={subjects}
                />
            )}
        </div>
    );
};

export default ClassList;
