import React from 'react';

interface ReportsViewProps {
    // Props can be added here as the component is developed
}

const ReportsView: React.FC<ReportsViewProps> = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md animate-fade-in">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Reports & Overview</h3>
            <div className="text-gray-500">
                <p>This section is under construction.</p>
                <p className="mt-2">Future reports will be available here, including:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Warden Duty Roster & Report</li>
                    <li>Student Accommodation Summary</li>
                    <li>Room Maintenance Logs</li>
                </ul>
            </div>
        </div>
    );
};

export default ReportsView;