import React, { useState } from 'react';
import { Student, HostelRoom } from '../types';

interface AssignRoomToStudentModalProps {
    student: Student;
    rooms: HostelRoom[];
    onSave: (studentId: string, roomId: string) => void;
    onCancel: () => void;
}

const AssignRoomToStudentModal: React.FC<AssignRoomToStudentModalProps> = ({ student, rooms, onSave, onCancel }) => {
    const [selectedRoomId, setSelectedRoomId] = useState<string>('');
    
    const availableRooms = rooms.filter(r => r.studentIds.length < r.capacity);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(selectedRoomId) {
            onSave(student.id, selectedRoomId);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">Assign Room to {student.name}</h2>
                    
                    <div>
                        <label htmlFor="room-select" className="block text-sm font-medium text-gray-700">Select an available room</label>
                        <select
                            id="room-select"
                            value={selectedRoomId}
                            onChange={(e) => setSelectedRoomId(e.target.value)}
                            required
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Choose a room</option>
                            {availableRooms.map(room => (
                                <option key={room.id} value={room.id}>
                                    Room {room.roomNumber} ({room.studentIds.length}/{room.capacity})
                                </option>
                            ))}
                        </select>
                         {availableRooms.length === 0 && <p className="text-sm text-red-500 mt-2">No rooms with available capacity.</p>}
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" disabled={!selectedRoomId} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-400">Assign</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AssignRoomToStudentModal;