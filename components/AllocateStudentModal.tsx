import React, { useState, useMemo } from 'react';
import { HostelRoom, Student } from '../types';

interface AllocateStudentModalProps {
    room: HostelRoom;
    allStudents: Student[];
    allocatedStudentIds: Set<string>;
    onSave: (roomId: string, newStudentIds: string[]) => void;
    onCancel: () => void;
}

const AllocateStudentModal: React.FC<AllocateStudentModalProps> = ({ room, allStudents, allocatedStudentIds, onSave, onCancel }) => {
    const [currentStudentIds, setCurrentStudentIds] = useState<string[]>(room.studentIds);

    const { assignedStudents, availableStudents } = useMemo(() => {
        const assigned = allStudents.filter(s => currentStudentIds.includes(s.id));
        
        const available = allStudents.filter(s => 
            (s.studentType === 'Residential' || s.studentType === 'Lillah Boarding') &&
            !allocatedStudentIds.has(s.id)
        );

        return { assignedStudents: assigned, availableStudents: available };
    }, [allStudents, currentStudentIds, allocatedStudentIds]);
    
    const handleAddStudent = (studentId: string) => {
        if (currentStudentIds.length < room.capacity) {
            setCurrentStudentIds(prev => [...prev, studentId]);
        } else {
            alert('This room is already at full capacity.');
        }
    };
    
    const handleRemoveStudent = (studentId: string) => {
        setCurrentStudentIds(prev => prev.filter(id => id !== studentId));
    };

    const handleSaveChanges = () => {
        onSave(room.id, currentStudentIds);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" role="dialog" aria-modal="true">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Manage Room {room.roomNumber}</h2>
                        <p className="text-gray-600">Capacity: {currentStudentIds.length} / {room.capacity}</p>
                    </div>
                    <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 flex-grow overflow-y-auto">
                    {/* Assigned Students */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Assigned to this Room</h3>
                        <div className="space-y-2">
                            {assignedStudents.length > 0 ? assignedStudents.map(student => (
                                <div key={student.id} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                                    <span>{student.name}</span>
                                    <button onClick={() => handleRemoveStudent(student.id)} className="text-red-500 hover:text-red-700 text-sm">
                                        <i className="fas fa-times-circle mr-1"></i> Remove
                                    </button>
                                </div>
                            )) : <p className="text-sm text-gray-500 italic">No students assigned.</p>}
                        </div>
                    </div>
                    {/* Available Students */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Available Students</h3>
                         <div className="space-y-2">
                            {availableStudents.length > 0 ? availableStudents.map(student => (
                                <div key={student.id} className="flex justify-between items-center bg-white p-2 rounded-md shadow-sm">
                                    <span>{student.name}</span>
                                    <button 
                                        onClick={() => handleAddStudent(student.id)} 
                                        className="text-teal-500 hover:text-teal-700 text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
                                        disabled={currentStudentIds.length >= room.capacity}
                                    >
                                        <i className="fas fa-plus-circle mr-1"></i> Add
                                    </button>
                                </div>
                            )) : <p className="text-sm text-gray-500 italic">No unassigned residential students available.</p>}
                        </div>
                    </div>
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

export default AllocateStudentModal;