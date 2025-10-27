import React, { useState, useEffect } from 'react';
import { HostelRoom } from '../types';

interface RoomFormModalProps {
    room: HostelRoom | null;
    onSave: (roomData: Omit<HostelRoom, 'id' | 'studentIds'> & { id?: string }) => void;
    onCancel: () => void;
}

const RoomFormModal: React.FC<RoomFormModalProps> = ({ room, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        roomNumber: '',
        capacity: 4
    });

    useEffect(() => {
        if (room) {
            setFormData({
                roomNumber: room.roomNumber,
                capacity: room.capacity
            });
        }
    }, [room]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'capacity' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: room?.id });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{room ? 'Edit Room' : 'Add New Room'}</h2>
                    
                    <div>
                        <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
                        <input
                            type="text"
                            name="roomNumber"
                            id="roomNumber"
                            value={formData.roomNumber}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            id="capacity"
                            value={formData.capacity}
                            onChange={handleChange}
                            required
                            min="1"
                            className="mt-1 w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Room</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoomFormModal;