import React from 'react';
import { HostelRoom, Student } from '../../types';

interface RoomCardProps {
    room: HostelRoom;
    students: Student[];
    onManageClick: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, students, onManageClick, onEdit, onDelete }) => {
    const occupancy = students.length;
    const capacity = room.capacity;
    const occupancyPercentage = capacity > 0 ? (occupancy / capacity) * 100 : 0;

    const getOccupancyColor = () => {
        if (occupancyPercentage >= 100) return 'bg-red-500';
        if (occupancyPercentage > 75) return 'bg-yellow-500';
        return 'bg-teal-500';
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col h-full border border-gray-100 transition-shadow hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h4 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h4>
                    <p className="text-sm font-medium text-gray-500">{occupancy} / {capacity} Occupied</p>
                </div>
                <div className="flex items-center space-x-2">
                     <button onClick={onEdit} title="Edit Room" className="text-yellow-500 hover:text-yellow-700 text-sm"><i className="fas fa-edit"></i></button>
                     <button onClick={onDelete} title="Delete Room" className="text-red-500 hover:text-red-700 text-sm"><i className="fas fa-trash"></i></button>
                </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                <div className={`h-2 rounded-full ${getOccupancyColor()}`} style={{ width: `${occupancyPercentage}%` }}></div>
            </div>

            <div className="flex-grow space-y-2 mt-3 min-h-[80px]">
                 <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Assigned Students</h5>
                {students.length > 0 ? (
                    students.map(student => (
                        <div key={student.id} className="flex items-center text-sm">
                           <i className="fas fa-user text-gray-400 mr-2 text-xs"></i>
                           <span className="text-gray-700">{student.name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400 italic pt-2">No students assigned.</p>
                )}
            </div>
            
            <button onClick={onManageClick} className="mt-4 w-full text-center text-sm bg-gray-100 text-gray-700 font-semibold px-3 py-2 rounded-md hover:bg-gray-200 transition-colors">
                Add / Remove Students
            </button>
        </div>
    );
};

export default RoomCard;