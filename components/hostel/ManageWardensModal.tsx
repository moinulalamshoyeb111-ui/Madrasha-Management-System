import React, { useState, useMemo } from 'react';
import { Teacher, Employee } from '../../types';

interface ManageWardensModalProps {
    currentWardenIds: string[];
    allTeachers: Teacher[];
    allEmployees: Employee[];
    onSave: (newWardenIds: string[]) => void;
    onCancel: () => void;
}

const ManageWardensModal: React.FC<ManageWardensModalProps> = ({ currentWardenIds, allTeachers, allEmployees, onSave, onCancel }) => {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set(currentWardenIds));

    const { residentialTeachers, residentialEmployees } = useMemo(() => {
        return {
            residentialTeachers: allTeachers.filter(t => t.type === 'Residential'),
            residentialEmployees: allEmployees.filter(e => e.type === 'Residential')
        };
    }, [allTeachers, allEmployees]);

    const handleToggleWarden = (staffId: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(staffId)) {
                newSet.delete(staffId);
            } else {
                newSet.add(staffId);
            }
            return newSet;
        });
    };
    
    const handleSaveChanges = () => {
        onSave(Array.from(selectedIds));
    };

    const StaffList: React.FC<{ title: string, staff: (Teacher | Employee)[] }> = ({ title, staff }) => (
        <div className="bg-gray-50 p-4 rounded-lg flex-1">
            <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
                {staff.length > 0 ? staff.map(person => (
                    <div key={person.id} className="flex items-center bg-white p-2 rounded-md shadow-sm">
                        <input
                            type="checkbox"
                            id={`warden-${person.id}`}
                            checked={selectedIds.has(person.id)}
                            onChange={() => handleToggleWarden(person.id)}
                            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <label htmlFor={`warden-${person.id}`} className="ml-3 text-sm text-gray-800">{person.name}</label>
                    </div>
                )) : <p className="text-sm text-gray-500 italic">No available residential staff in this category.</p>}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" role="dialog" aria-modal="true">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Manage Hostel Wardens</h2>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">Select any residential teachers or employees to act as hostel wardens.</p>
                
                <div className="flex flex-col md:flex-row gap-6 mt-4 flex-grow overflow-y-auto">
                    <StaffList title="Residential Teachers" staff={residentialTeachers} />
                    <StaffList title="Residential Employees" staff={residentialEmployees} />
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold">Cancel</button>
                    <button type="button" onClick={handleSaveChanges} className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 font-semibold">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManageWardensModal;
