
import React, { useState } from 'react';
import { Teacher, Subject } from '../types';
import TeacherForm from './TeacherForm';
import TeacherDetailModal from './TeacherDetailModal';

interface TeacherListProps {
    teachers: Teacher[];
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    subjects: Subject[];
}

const TeacherList: React.FC<TeacherListProps> = ({ teachers, setTeachers, subjects }) => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);

    const handleAddTeacher = () => {
        setEditingTeacher(null);
        setIsFormModalOpen(true);
    };

    const handleEditTeacher = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        setIsFormModalOpen(true);
    };
    
    const handleViewDetails = (teacher: Teacher) => {
        setViewingTeacher(teacher);
        setIsDetailModalOpen(true);
    };
    
    const handleDeleteTeacher = (teacherId: string) => {
        if (window.confirm('Are you sure you want to delete this teacher record? This action cannot be undone.')) {
            setTeachers(currentTeachers => currentTeachers.filter(t => t.id !== teacherId));
        }
    };

    const handleSaveTeacher = (teacherData: Omit<Teacher, 'id'> & { id?: string }) => {
        if (teacherData.id) {
            // Editing existing teacher
            setTeachers(currentTeachers => currentTeachers.map(t => t.id === teacherData.id ? { ...t, ...teacherData } as Teacher : t));
        } else {
            // Adding new teacher
            const newIdNumber = Math.max(...teachers.map(t => parseInt(t.id.substring(1))), 0) + 1;
            const newId = `T${String(newIdNumber).padStart(2, '0')}`;
            const newTeacher: Teacher = {
                ...teacherData,
                id: newId,
            } as Teacher;
            setTeachers(currentTeachers => [...currentTeachers, newTeacher]);
        }
        setIsFormModalOpen(false);
        setEditingTeacher(null);
    };

    const getSubjectName = (subjectId: string) => {
        return subjects.find(s => s.id === subjectId)?.name || 'N/A';
    };


    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Teacher & Staff Information</h3>
                    <button onClick={handleAddTeacher} title="Add a new teacher" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Teacher
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Subject</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Total Salary</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher) => {
                                const totalSalary = teacher.baseSalary - teacher.residentialDeduction + teacher.adjustments.reduce((acc, adj) => acc + adj.amount, 0);
                                return (
                                <tr key={teacher.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{teacher.id}</td>
                                    <td className="px-6 py-4">{teacher.name}</td>
                                     <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            teacher.type === 'Residential' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-800'
                                        }`}>{teacher.type}</span>
                                    </td>
                                    <td className="px-6 py-4">{getSubjectName(teacher.subjectId)}</td>
                                    <td className="px-6 py-4">{teacher.phone}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(totalSalary)}
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleViewDetails(teacher)} title="View Details" className="text-blue-500 hover:text-blue-700"><i className="fas fa-eye"></i></button>
                                        <button onClick={() => handleEditTeacher(teacher)} title="Edit Teacher" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteTeacher(teacher.id)} title="Delete Teacher" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            {isFormModalOpen && (
                <TeacherForm 
                    teacher={editingTeacher} 
                    onSave={handleSaveTeacher} 
                    onCancel={() => { setIsFormModalOpen(false); setEditingTeacher(null); }}
                    subjects={subjects}
                />
            )}
             {isDetailModalOpen && viewingTeacher && (
                <TeacherDetailModal 
                    teacher={viewingTeacher} 
                    onClose={() => { setIsDetailModalOpen(false); setViewingTeacher(null); }} 
                />
            )}
        </div>
    );
};

export default TeacherList;
