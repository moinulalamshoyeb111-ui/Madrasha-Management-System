import React from 'react';
import { HostelRoom, Student, Teacher, Employee } from '../../types';

// Import the new view components
import HostelDashboardView from './HostelDashboardView';
import ManageWardensView from './ManageWardensView';
import ManageRoomsView from './ManageRoomsView';
import StudentAllocationView from './StudentAllocationView';
import ReportsView from './ReportsView';

interface HostelManagementProps {
    subView: string;
    rooms: HostelRoom[];
    setRooms: React.Dispatch<React.SetStateAction<HostelRoom[]>>;
    wardenIds: string[];
    setWardenIds: React.Dispatch<React.SetStateAction<string[]>>;
    students: Student[];
    teachers: Teacher[];
    employees: Employee[];
}

const HostelManagement: React.FC<HostelManagementProps> = (props) => {
    const { subView } = props;

    const renderSubView = () => {
        switch (subView) {
            case 'dashboard':
                return <HostelDashboardView {...props} />;
            case 'manage_wardens':
                return <ManageWardensView {...props} />;
            case 'manage_rooms':
                return <ManageRoomsView {...props} />;
            case 'student_allocation':
                return <StudentAllocationView {...props} />;
            case 'reports':
                return <ReportsView {...props} />;
            default:
                return <HostelDashboardView {...props} />;
        }
    };

    return (
        <div className="p-8">
            {renderSubView()}
        </div>
    );
};

export default HostelManagement;