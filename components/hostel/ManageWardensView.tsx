import React, { useState, useMemo } from 'react';
import { Teacher, Employee } from '../../types';
import ManageWardensModal from './ManageWardensModal';

interface ManageWardensViewProps {
    wardenIds: string[];
    setWardenIds: React.Dispatch<React.SetStateAction<string[]>>;
    teachers: Teacher[];
    employees: Employee[];
}

const ManageWardensView: React.FC<ManageWardensViewProps> = ({ wardenIds, setWardenIds, teachers, employees }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const wardens = useMemo(() => {
        const allStaff: (Teacher | Employee)[] = [...teachers, ...employees];
        return allStaff.filter(staff => wardenIds.includes(staff.id));
    }, [wardenIds, teachers, employees]);

    const handleSaveWardens = (newWardenIds: string[]) => {
        setWardenIds(newWardenIds);
        setIsModalOpen(false);
    };
    
    const filteredWardens = useMemo(() => 
        wardens.filter(warden => warden.name.toLowerCase().includes(searchTerm.toLowerCase())),
        [wardens, searchTerm]
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Manage Wardens</h3>
                <button onClick={() => setIsModalOpen(true)} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                    <i className="fas fa-users-cog mr-2"></i> Add / Remove Wardens
                </button>
            </div>
            
             <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by warden name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Role / Primary Subject</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWardens.length > 0 ? filteredWardens.map(warden => (
                            <tr key={warden.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{warden.name}</td>
                                <td className="px-6 py-4">{'role' in warden ? warden.role : 'Teacher'}</td>
                                <td className="px-6 py-4">{warden.phone}</td>
                                <td className="px-6 py-4">{warden.email}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">No wardens found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ManageWardensModal
                    currentWardenIds={wardenIds}
                    allTeachers={teachers}
                    allEmployees={employees}
                    onSave={handleSaveWardens}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ManageWardensView;