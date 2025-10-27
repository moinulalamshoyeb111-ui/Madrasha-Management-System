import React, { useState } from 'react';
import { Student, Teacher, ClassInfo } from '../types';

const Attendance: React.FC<{ students: Student[], teachers: Teacher[], classes: ClassInfo[] }> = ({ students, teachers, classes }) => {
    const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [studentAttendance, setStudentAttendance] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({});

    const studentsInClass = students.filter(s => {
        const classInfo = classes.find(c => c.id === selectedClassId);
        return classInfo && s.class === classInfo.name;
    });

    const handleStudentStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
        setStudentAttendance(prev => ({ ...prev, [studentId]: status }));
    };

    const getStatusButtonClass = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
        const currentStatus = studentAttendance[studentId];
        if (currentStatus === status) {
            switch(status) {
                case 'Present': return 'bg-teal-500 text-white';
                case 'Absent': return 'bg-red-500 text-white';
                case 'Late': return 'bg-yellow-500 text-white';
            }
        }
        return 'bg-gray-200 text-gray-700';
    };

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-6">Take Attendance</h3>
                <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                    <div>
                        <label htmlFor="class-select" className="block text-sm font-medium text-gray-700">Select Class</label>
                        <select
                            id="class-select"
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                        >
                            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date-select" className="block text-sm font-medium text-gray-700">Select Date</label>
                        <input
                            type="date"
                            id="date-select"
                            value={attendanceDate}
                            onChange={(e) => setAttendanceDate(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Student ID</th>
                                <th scope="col" className="px-6 py-3">Student Name</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsInClass.map(student => (
                                <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{student.id}</td>
                                    <td className="px-6 py-4">{student.name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleStudentStatusChange(student.id, 'Present')} className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusButtonClass(student.id, 'Present')}`}>Present</button>
                                            <button onClick={() => handleStudentStatusChange(student.id, 'Absent')} className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusButtonClass(student.id, 'Absent')}`}>Absent</button>
                                            <button onClick={() => handleStudentStatusChange(student.id, 'Late')} className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusButtonClass(student.id, 'Late')}`}>Late</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <div className="mt-6 flex justify-end">
                    <button className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600">Submit Attendance</button>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
