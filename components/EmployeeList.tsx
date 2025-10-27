
import React, { useState } from 'react';
import { Employee } from '../types';
import EmployeeForm from './EmployeeForm';

interface EmployeeListProps {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees, setEmployees }) => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const handleAddEmployee = () => {
        setEditingEmployee(null);
        setIsFormModalOpen(true);
    };

    const handleEditEmployee = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsFormModalOpen(true);
    };
    
    const handleDeleteEmployee = (employeeId: string) => {
        if (window.confirm('Are you sure you want to delete this employee record? This action cannot be undone.')) {
            setEmployees(currentEmployees => currentEmployees.filter(e => e.id !== employeeId));
        }
    };

    const handleSaveEmployee = (employeeData: Omit<Employee, 'id'> & { id?: string }) => {
        if (employeeData.id) {
            setEmployees(currentEmployees => currentEmployees.map(e => e.id === employeeData.id ? { ...e, ...employeeData } as Employee : e));
        } else {
            const newIdNumber = Math.max(0, ...employees.map(e => parseInt(e.id.substring(1)))) + 1;
            const newId = `E${String(newIdNumber).padStart(2, '0')}`;
            const newEmployee: Employee = { ...employeeData, id: newId } as Employee;
            setEmployees(currentEmployees => [...currentEmployees, newEmployee]);
        }
        setIsFormModalOpen(false);
        setEditingEmployee(null);
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Other Employees</h3>
                    <button onClick={handleAddEmployee} title="Add a new employee" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Employee
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">ID</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Phone</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                                <th scope="col" className="px-6 py-3">Salary</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{employee.id}</td>
                                    <td className="px-6 py-4">{employee.name}</td>
                                    <td className="px-6 py-4">{employee.role}</td>
                                    <td className="px-6 py-4">{employee.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                            employee.type === 'Residential' ? 'bg-sky-100 text-sky-800' : 'bg-gray-100 text-gray-800'
                                        }`}>{employee.type}</span>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-800">{formatCurrency(employee.salary)}</td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleEditEmployee(employee)} title="Edit Employee" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteEmployee(employee.id)} title="Delete Employee" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isFormModalOpen && (
                <EmployeeForm 
                    employee={editingEmployee} 
                    onSave={handleSaveEmployee} 
                    onCancel={() => { setIsFormModalOpen(false); setEditingEmployee(null); }} 
                />
            )}
        </div>
    );
};

export default EmployeeList;
