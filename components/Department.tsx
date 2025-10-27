
import React, { useState } from 'react';
import { Department as DepartmentType, ClassInfo, Student, Subject } from '../types';
import DepartmentForm from './DepartmentForm';

interface DepartmentProps {
    departments: DepartmentType[];
    setDepartments: React.Dispatch<React.SetStateAction<DepartmentType[]>>;
    classes: ClassInfo[];
    students: Student[];
    subjects: Subject[];
}

const Department: React.FC<DepartmentProps> = ({ departments, setDepartments, classes, students, subjects }) => {
    const [openDepartmentId, setOpenDepartmentId] = useState<string | null>(departments[0]?.id || null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<DepartmentType | null>(null);

    const toggleDepartment = (id: string) => {
        setOpenDepartmentId(openDepartmentId === id ? null : id);
    };
    
    const handleAddDepartment = () => {
        setEditingDepartment(null);
        setIsFormModalOpen(true);
    };

    const handleEditDepartment = (department: DepartmentType) => {
        setEditingDepartment(department);
        setIsFormModalOpen(true);
    };

    const handleDeleteDepartment = (departmentId: string) => {
        if (window.confirm('Are you sure you want to delete this department? This action may affect related classes, subjects, and students.')) {
            setDepartments(currentDepartments => currentDepartments.filter(d => d.id !== departmentId));
        }
    };

    const handleSaveDepartment = (departmentData: Omit<DepartmentType, 'id'> & { id?: string }) => {
        if (departmentData.id) {
            setDepartments(currentDepartments => currentDepartments.map(d => d.id === departmentData.id ? { ...d, ...departmentData } as DepartmentType : d));
        } else {
            const newIdNumber = Math.max(0, ...departments.map(d => parseInt(d.id.substring(1)))) + 1;
            const newId = `D${String(newIdNumber).padStart(2, '0')}`;
            const newDepartment: DepartmentType = {
                ...departmentData,
                id: newId,
            } as DepartmentType;
            setDepartments(currentDepartments => [...currentDepartments, newDepartment]);
        }
        setIsFormModalOpen(false);
        setEditingDepartment(null);
    };


    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Departments Overview</h3>
                    <button onClick={handleAddDepartment} title="Add a new department" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Department
                    </button>
                </div>
                <div className="space-y-4">
                    {departments.map((dept) => {
                        const isOpen = openDepartmentId === dept.id;
                        const departmentClasses = classes.filter(c => c.departmentId === dept.id);
                        const departmentStudents = students.filter(s => s.department === dept.name);
                        const departmentSubjects = subjects.filter(s => s.departmentId === dept.id);

                        return (
                            <div key={dept.id} className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100">
                                    <button
                                        onClick={() => toggleDepartment(dept.id)}
                                        className="flex items-center flex-grow text-left focus:outline-none"
                                    >
                                        <i className="fas fa-building text-teal-500 mr-4 text-xl"></i>
                                        <span className="text-gray-800 font-medium text-lg">{dept.name}</span>
                                    </button>
                                     <div className="flex items-center space-x-4">
                                        <button onClick={() => handleEditDepartment(dept)} title="Edit Department" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteDepartment(dept.id)} title="Delete Department" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                        <button onClick={() => toggleDepartment(dept.id)} className="focus:outline-none">
                                            <i className={`fas fa-chevron-down transform transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
                                        </button>
                                    </div>
                                </div>
                                {isOpen && (
                                    <div className="p-4 bg-white border-t border-gray-200">
                                        {dept.remarks && <p className="mb-4 text-sm text-gray-600 italic bg-gray-50 p-2 rounded-md">{dept.remarks}</p>}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-2">Subjects Offered</h4>
                                                {departmentSubjects.length > 0 ? (
                                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                        {departmentSubjects.map(s => <li key={s.id}>{s.name}</li>)}
                                                    </ul>
                                                ) : <p className="text-gray-500">No subjects found.</p>}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-2">Classes</h4>
                                                {departmentClasses.length > 0 ? (
                                                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                                                        {departmentClasses.map(c => <li key={c.id}>{c.name}</li>)}
                                                    </ul>
                                                ) : <p className="text-gray-500">No classes found.</p>}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-700 mb-2">Students ({departmentStudents.length})</h4>
                                                {departmentStudents.length > 0 ? (
                                                    <ul className="space-y-1 text-gray-600 max-h-48 overflow-y-auto pr-2">
                                                        {departmentStudents.map(s => <li key={s.id}>{s.name} - <span className="text-xs text-gray-500">{s.class}</span></li>)}
                                                    </ul>
                                                ) : <p className="text-gray-500">No students found.</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
             {isFormModalOpen && (
                <DepartmentForm
                    department={editingDepartment} 
                    onSave={handleSaveDepartment} 
                    onCancel={() => { setIsFormModalOpen(false); setEditingDepartment(null); }} 
                />
            )}
        </div>
    );
};

export default Department;
