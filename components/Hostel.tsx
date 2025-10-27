import React, { useState, useMemo } from 'react';
import { HostelRoom, Student } from '../types';
import RoomCard from './RoomCard';
import RoomFormModal from './RoomFormModal';
import AssignRoomToStudentModal from './AssignRoomToStudentModal';
import AllocateStudentModal from './AllocateStudentModal';

interface HostelProps {
    rooms: HostelRoom[];
    setRooms: React.Dispatch<React.SetStateAction<HostelRoom[]>>;
    students: Student[];
}

const Hostel: React.FC<HostelProps> = ({ rooms, setRooms, students }) => {
    const [isRoomFormOpen, setIsRoomFormOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isAllocateModalOpen, setIsAllocateModalOpen] = useState(false);
    
    const [editingRoom, setEditingRoom] = useState<HostelRoom | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedRoom, setSelectedRoom] = useState<HostelRoom | null>(null);

    const { unassignedStudents, allocatedStudentIds } = useMemo(() => {
        const allocatedIds = new Set(rooms.flatMap(r => r.studentIds));
        const unassigned = students.filter(s => 
            (s.studentType === 'Residential' || s.studentType === 'Lillah Boarding') &&
            !allocatedIds.has(s.id)
        );
        return { unassignedStudents: unassigned, allocatedStudentIds: allocatedIds };
    }, [students, rooms]);

    const handleAddRoom = () => {
        setEditingRoom(null);
        setIsRoomFormOpen(true);
    };
    
    const handleEditRoom = (room: HostelRoom) => {
        setEditingRoom(room);
        setIsRoomFormOpen(true);
    };

    const handleDeleteRoom = (roomId: string) => {
        if (window.confirm('Are you sure you want to delete this room? Assigned students will become unallocated.')) {
            setRooms(prev => prev.filter(r => r.id !== roomId));
        }
    };

    const handleSaveRoom = (roomData: Omit<HostelRoom, 'id' | 'studentIds'> & { id?: string }) => {
        if (roomData.id) {
            setRooms(prev => prev.map(r => r.id === roomData.id ? {...r, roomNumber: roomData.roomNumber, capacity: roomData.capacity } : r));
        } else {
            const newId = `HR${String(Date.now()).slice(-4)}`;
            const newRoom: HostelRoom = {...roomData, id: newId, studentIds: []};
            setRooms(prev => [...prev, newRoom].sort((a,b) => a.roomNumber.localeCompare(b.roomNumber)));
        }
        setIsRoomFormOpen(false);
    };
    
    const handleManageRoom = (room: HostelRoom) => {
        setSelectedRoom(room);
        setIsAllocateModalOpen(true);
    };
    
    const handleSaveAllocation = (roomId: string, newStudentIds: string[]) => {
        setRooms(prev => prev.map(r => r.id === roomId ? {...r, studentIds: newStudentIds} : r));
        setIsAllocateModalOpen(false);
    };

    const handleAssignClick = (student: Student) => {
        setSelectedStudent(student);
        setIsAssignModalOpen(true);
    };

    const handleSaveAssignment = (studentId: string, roomId: string) => {
        setRooms(prevRooms => {
            const roomsWithoutStudent = prevRooms.map(room => ({
                ...room,
                studentIds: room.studentIds.filter(id => id !== studentId)
            }));
            
            return roomsWithoutStudent.map(room => 
                room.id === roomId 
                    ? { ...room, studentIds: [...room.studentIds, studentId] } 
                    : room
            );
        });
        setIsAssignModalOpen(false);
    };

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-700">Hostel Rooms</h3>
                            <button onClick={handleAddRoom} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                                <i className="fas fa-plus mr-2"></i> Add Room
                            </button>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                             {rooms.length > 0 ? rooms.map(room => (
                                <RoomCard 
                                    key={room.id} 
                                    room={room} 
                                    students={students.filter(s => room.studentIds.includes(s.id))}
                                    onManageClick={() => handleManageRoom(room)}
                                    onEdit={() => handleEditRoom(room)}
                                    onDelete={() => handleDeleteRoom(room.id)}
                                />
                            )) : <p className="text-gray-500 italic">No rooms created yet. Click 'Add Room' to start.</p>}
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1">
                     <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Unassigned Students</h3>
                        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                            {unassignedStudents.map(student => (
                                <div key={student.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                    <p className="text-sm text-gray-800">{student.name}</p>
                                    <button onClick={() => handleAssignClick(student)} className="text-xs bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-md hover:bg-teal-200">
                                        Assign Room
                                    </button>
                                </div>
                            ))}
                            {unassignedStudents.length === 0 && <p className="text-sm text-gray-500 italic">No unassigned residential students.</p>}
                        </div>
                    </div>
                </div>
            </div>
            
            {isRoomFormOpen && <RoomFormModal onSave={handleSaveRoom} onCancel={() => setIsRoomFormOpen(false)} room={editingRoom} />}
            {isAssignModalOpen && selectedStudent && <AssignRoomToStudentModal student={selectedStudent} rooms={rooms} onSave={handleSaveAssignment} onCancel={() => setIsAssignModalOpen(false)} />}
            {isAllocateModalOpen && selectedRoom && <AllocateStudentModal room={selectedRoom} allStudents={students} allocatedStudentIds={allocatedStudentIds} onSave={handleSaveAllocation} onCancel={() => setIsAllocateModalOpen(false)}/>}
        </div>
    );
};

export default Hostel;
