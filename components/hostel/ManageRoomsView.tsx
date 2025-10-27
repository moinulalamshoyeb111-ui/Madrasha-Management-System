import React, { useState, useMemo } from 'react';
import { HostelRoom, Student } from '../../types';
import RoomFormModal from './RoomFormModal';

interface ManageRoomsViewProps {
    rooms: HostelRoom[];
    setRooms: React.Dispatch<React.SetStateAction<HostelRoom[]>>;
    students: Student[];
}

const ManageRoomsView: React.FC<ManageRoomsViewProps> = ({ rooms, setRooms, students }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<HostelRoom | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleAddRoom = () => {
        setEditingRoom(null);
        setIsFormOpen(true);
    };

    const handleEditRoom = (room: HostelRoom) => {
        setEditingRoom(room);
        setIsFormOpen(true);
    };

    const handleDeleteRoom = (roomId: string) => {
        if (window.confirm('Are you sure you want to delete this room? Any assigned students will be unallocated.')) {
            setRooms(prev => prev.filter(r => r.id !== roomId));
        }
    };

    const handleSaveRoom = (roomData: Omit<HostelRoom, 'id' | 'studentIds'> & { id?: string }) => {
        if (roomData.id) {
            setRooms(prev => prev.map(r => r.id === roomData.id ? {...r, roomNumber: roomData.roomNumber, capacity: roomData.capacity } : r));
        } else {
            const newId = `HR${String(Date.now()).slice(-4)}`;
            const newRoom: HostelRoom = {...roomData, id: newId, studentIds: []};
            setRooms(prev => [...prev, newRoom].sort((a, b) => a.roomNumber.localeCompare(b.roomNumber)));
        }
        setIsFormOpen(false);
    };
    
    const filteredRooms = useMemo(() => 
        rooms.filter(room => room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())),
        [rooms, searchTerm]
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-700">Manage Rooms</h3>
                <button onClick={handleAddRoom} className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                    <i className="fas fa-plus mr-2"></i> Add Room
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by room number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">Room Number</th>
                            <th className="px-6 py-3">Capacity</th>
                            <th className="px-6 py-3">Occupancy</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRooms.map(room => {
                            const occupancy = room.studentIds.length;
                            const isFull = occupancy >= room.capacity;
                            return (
                                <tr key={room.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{room.roomNumber}</td>
                                    <td className="px-6 py-4">{room.capacity}</td>
                                    <td className="px-6 py-4">{occupancy}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isFull ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {isFull ? 'Full' : 'Available'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleEditRoom(room)} title="Edit Room" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteRoom(room.id)} title="Delete Room" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isFormOpen && <RoomFormModal onSave={handleSaveRoom} onCancel={() => setIsFormOpen(false)} room={editingRoom} />}
        </div>
    );
};

export default ManageRoomsView;