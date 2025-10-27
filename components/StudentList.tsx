import React, { useState } from 'react';
import { Student, Department, ClassInfo } from '../types';
import StudentForm from './StudentForm';
import StudentDetailModal from './StudentDetailModal';

interface StudentListProps {
    students: Student[];
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
    departments: Department[];
    classes: ClassInfo[];
}

const StudentList: React.FC<StudentListProps> = ({ students, setStudents, departments, classes }) => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

    const handleAddStudent = () => {
        setEditingStudent(null);
        setIsFormModalOpen(true);
    };

    const handleEditStudent = (student: Student) => {
        setEditingStudent(student);
        setIsFormModalOpen(true);
    };
    
    const handleViewDetails = (student: Student) => {
        setViewingStudent(student);
        setIsDetailModalOpen(true);
    };
    
    const handleDeleteStudent = (studentId: string) => {
        if (window.confirm('Are you sure you want to delete this student record? This action cannot be undone.')) {
            setStudents(currentStudents => currentStudents.filter(s => s.id !== studentId));
        }
    };

    const handleSaveStudent = (studentData: Omit<Student, 'id'> & { id?: string }) => {
        if (studentData.id) {
            // Editing existing student
            setStudents(currentStudents => currentStudents.map(s => s.id === studentData.id ? { ...s, ...studentData } as Student : s));
        } else {
            // Adding new student
            const newIdNumber = Math.max(0, ...students.map(s => parseInt(s.id.substring(1)))) + 1;
            const newId = `S${String(newIdNumber).padStart(3, '0')}`;
            const newStudent: Student = {
                ...studentData,
                id: newId,
            } as Student;
            setStudents(currentStudents => [...currentStudents, newStudent]);
        }
        setIsFormModalOpen(false);
        setEditingStudent(null);
    };

    const getTypeStyle = (type: Student['studentType']) => {
        switch (type) {
            case 'Residential':
                return 'bg-sky-100 text-sky-800';
            case 'Lillah Boarding':
                return 'bg-purple-100 text-purple-800';
            case 'Regular':
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }


    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Student Information</h3>
                    <button onClick={handleAddStudent} title="Add a new student" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Student
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Department</th>
                                <th scope="col" className="px-6 py-3">Class</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Total Fee</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => {
                                const totalFee = student.tuitionFee + student.hostelFee + student.extraFees.reduce((acc, fee) => acc + fee.amount, 0);
                                return (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{student.id}</td>
                                    <td className="px-6 py-4">{student.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeStyle(student.studentType)}`}>
                                            {student.studentType}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{student.department}</td>
                                    <td className="px-6 py-4">{`${student.class} - ${student.section}`}</td>
                                    <td className="px-6 py-4">{student.guardianPhone}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(totalFee)}
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleViewDetails(student)} title="View Details" className="text-blue-500 hover:text-blue-700"><i className="fas fa-eye"></i></button>
                                        <button onClick={() => handleEditStudent(student)} title="Edit Student" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteStudent(student.id)} title="Delete Student" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
            </div>
            {isFormModalOpen && (
                <StudentForm 
                    student={editingStudent} 
                    onSave={handleSaveStudent} 
                    onCancel={() => { setIsFormModalOpen(false); setEditingStudent(null); }}
                    departments={departments}
                    classes={classes}
                />
            )}
             {isDetailModalOpen && viewingStudent && (
                <StudentDetailModal 
                    student={viewingStudent} 
                    onClose={() => { setIsDetailModalOpen(false); setViewingStudent(null); }} 
                />
            )}
        </div>
    );
};

export default StudentList;