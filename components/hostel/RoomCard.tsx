import React from 'react';
import { HostelRoom, Student } from '../../types';

interface RoomCardProps {
    room: HostelRoom;
    students: Student[];
    onManageClick: () => void;
    isClickable?: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, students, onManageClick, isClickable = true }) => {
    const occupancy = students.length;
    const capacity = room.capacity;
    const occupancyPercentage = capacity > 0 ? (occupancy / capacity) * 100 : 0;

    const getOccupancyColor = () => {
        if (occupancyPercentage >= 100) return 'bg-red-500';
        if (occupancyPercentage > 75) return 'bg-yellow-500';
        return 'bg-teal-500';
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md flex flex-col h-full border border-gray-100">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h4>
                    <p className="text-sm font-medium text-gray-500">{occupancy} / {capacity} Occupied</p>
                </div>
                {isClickable && (
                    <button onClick={onManageClick} className="text-xs bg-gray-100 text-gray-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-200">
                        Manage
                    </button>
                )}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 my-3">
                <div className={`h-2 rounded-full ${getOccupancyColor()}`} style={{ width: `${occupancyPercentage}%` }}></div>
            </div>

            <div className="flex-grow space-y-2 mt-2">
                 <h5 className="text-xs font-bold text-gray-500 uppercase">Assigned Students</h5>
                {students.length > 0 ? (
                    students.map(student => (
                        <div key={student.id} className="flex items-center text-sm">
                           <i className="fas fa-user text-gray-400 mr-2"></i>
                           <span className="text-gray-700">{student.name}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400 italic">No students assigned.</p>
                )}
            </div>
        </div>
    );
};

export default RoomCard;