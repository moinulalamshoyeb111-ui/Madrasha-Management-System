import React, { useState, useMemo } from 'react';
import { Student, HostelRoom } from '../../types';
import AssignRoomToStudentModal from './AssignRoomToStudentModal';

interface StudentAllocationViewProps {
    students: Student[];
    rooms: HostelRoom[];
    setRooms: React.Dispatch<React.SetStateAction<HostelRoom[]>>;
}

const StudentAllocationView: React.FC<StudentAllocationViewProps> = ({ students, rooms, setRooms }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { allocatedStudents, unassignedStudents } = useMemo(() => {
        const allocatedIds = new Set(rooms.flatMap(r => r.studentIds));
        const studentRoomMap = new Map<string, string>();
        rooms.forEach(room => {
            room.studentIds.forEach(studentId => {
                studentRoomMap.set(studentId, room.roomNumber);
            });
        });

        const allResidential = students.filter(s => s.studentType === 'Residential' || s.studentType === 'Lillah Boarding');

        const allocated = allResidential
            .filter(s => allocatedIds.has(s.id))
            .map(s => ({ ...s, roomNumber: studentRoomMap.get(s.id) || 'N/A' }));

        const unassigned = allResidential.filter(s => !allocatedIds.has(s.id));

        return { allocatedStudents: allocated, unassignedStudents: unassigned };
    }, [students, rooms]);
    
    const filteredAllocated = allocatedStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredUnassigned = unassignedStudents.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleAssignClick = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleRemoveFromRoom = (studentId: string) => {
        if (window.confirm('Are you sure you want to remove this student from their room?')) {
            setRooms(prevRooms => prevRooms.map(room => ({
                ...room,
                studentIds: room.studentIds.filter(id => id !== studentId)
            })));
        }
    };
    
    const handleSaveAssignment = (studentId: string, roomId: string) => {
        setRooms(prevRooms => {
            // First, remove the student from any room they might currently be in
            const roomsWithoutStudent = prevRooms.map(room => ({
                ...room,
                studentIds: room.studentIds.filter(id => id !== studentId)
            }));
            
            // Then, add the student to the new room
            return roomsWithoutStudent.map(room => 
                room.id === roomId 
                    ? { ...room, studentIds: [...room.studentIds, studentId] } 
                    : room
            );
        });
        setIsModalOpen(false);
    };


    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Student Room Allocation</h3>
                 <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by student name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Allocated Students */}
                    <div>
                        <h4 className="font-semibold text-gray-600 mb-2">Allocated Students ({filteredAllocated.length})</h4>
                        <div className="border rounded-lg max-h-96 overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2">Student Name</th>
                                        <th className="px-4 py-2">Room</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAllocated.map(student => (
                                        <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium">{student.name}</td>
                                            <td className="px-4 py-2">{student.roomNumber}</td>
                                            <td className="px-4 py-2 flex space-x-2">
                                                <button onClick={() => handleAssignClick(student)} title="Move Student" className="text-blue-500"><i className="fas fa-random"></i></button>
                                                <button onClick={() => handleRemoveFromRoom(student.id)} title="Remove from Room" className="text-red-500"><i className="fas fa-sign-out-alt"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Unassigned Students */}
                    <div>
                        <h4 className="font-semibold text-gray-600 mb-2">Unassigned Students ({filteredUnassigned.length})</h4>
                         <div className="border rounded-lg max-h-96 overflow-y-auto">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-4 py-2">Student Name</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUnassigned.map(student => (
                                        <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium">{student.name}</td>
                                            <td className="px-4 py-2">
                                                 <button onClick={() => handleAssignClick(student)} className="text-xs bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-md hover:bg-teal-200">
                                                    Assign Room
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && selectedStudent && (
                <AssignRoomToStudentModal 
                    student={selectedStudent} 
                    rooms={rooms} 
                    onSave={handleSaveAssignment} 
                    onCancel={() => setIsModalOpen(false)} 
                />
            )}
        </div>
    );
};

export default StudentAllocationView;