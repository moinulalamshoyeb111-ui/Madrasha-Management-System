import React, { useMemo } from 'react';
import { HostelRoom, Student } from '../../types';
import RoomCard from './RoomCard';

interface HostelDashboardViewProps {
    rooms: HostelRoom[];
    students: Student[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: string; }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center border border-gray-200">
        <div className="p-3 rounded-full bg-teal-100 text-teal-500 mr-4">
            <i className={`fas ${icon} text-xl`}></i>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const HostelDashboardView: React.FC<HostelDashboardViewProps> = ({ rooms, students }) => {
    const allocatedStudentIds = useMemo(() => new Set(rooms.flatMap(r => r.studentIds)), [rooms]);
    const totalCapacity = useMemo(() => rooms.reduce((acc, room) => acc + room.capacity, 0), [rooms]);
    const totalOccupied = allocatedStudentIds.size;
     const unassignedStudentsCount = useMemo(() => {
        return students.filter(s => 
            (s.studentType === 'Residential' || s.studentType === 'Lillah Boarding') &&
            !allocatedStudentIds.has(s.id)
        ).length;
    }, [students, allocatedStudentIds]);


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Rooms" value={rooms.length} icon="fa-door-open" />
                <StatCard title="Total Capacity" value={totalCapacity} icon="fa-users" />
                <StatCard title="Students in Hostel" value={totalOccupied} icon="fa-user-check" />
                <StatCard title="Unassigned Students" value={unassignedStudentsCount} icon="fa-user-plus" />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-6">Room Occupancy Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {rooms.map(room => (
                        <RoomCard 
                            key={room.id}
                            room={room}
                            students={students.filter(s => room.studentIds.includes(s.id))}
                            onManageClick={() => { /* Navigation handled by sidebar */ }}
                            isClickable={false}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HostelDashboardView;
