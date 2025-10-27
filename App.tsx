import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import Department from './components/Department';
import ClassList from './components/ClassList';
import SubjectList from './components/SubjectList';
import Attendance from './components/Attendance';
import Hostel from './components/Hostel';
import FinanceDashboard from './components/finance/FinanceDashboard';
import EarningsList from './components/finance/EarningsList';
import ExpenseList from './components/finance/ExpenseList';
import EmployeeList from './components/EmployeeList';

import { View } from './types';
import { 
    STUDENTS_DATA, 
    TEACHERS_DATA, 
    EMPLOYEES_DATA,
    DEPARTMENTS_DATA,
    CLASSES_DATA,
    SUBJECTS_DATA,
    HOSTEL_ROOMS_DATA,
    BANK_ACCOUNTS_DATA,
} from './constants';


const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

    // Lifted State
    const [students, setStudents] = useState(STUDENTS_DATA);
    const [teachers, setTeachers] = useState(TEACHERS_DATA);
    const [employees, setEmployees] = useState(EMPLOYEES_DATA);
    const [departments, setDepartments] = useState(DEPARTMENTS_DATA);
    const [classes, setClasses] = useState(CLASSES_DATA);
    const [subjects, setSubjects] = useState(SUBJECTS_DATA);
    const [rooms, setRooms] = useState(HOSTEL_ROOMS_DATA);
    const [bankAccounts, setBankAccounts] = useState(BANK_ACCOUNTS_DATA);

    const handleNavigation = (view: View) => {
        setCurrentView(view);
    };

    const renderView = () => {
        switch (currentView) {
            case View.DASHBOARD:
                return <Dashboard />;
            case View.STUDENTS:
                return <StudentList students={students} setStudents={setStudents} departments={departments} classes={classes} />;
            case View.TEACHERS:
                return <TeacherList teachers={teachers} setTeachers={setTeachers} subjects={subjects} />;
            case View.EMPLOYEES:
                return <EmployeeList employees={employees} setEmployees={setEmployees} />;
            case View.DEPARTMENTS:
                return <Department departments={departments} setDepartments={setDepartments} classes={classes} students={students} subjects={subjects}/>;
            case View.CLASSES:
                return <ClassList classes={classes} setClasses={setClasses} departments={departments} subjects={subjects} />;
            case View.SUBJECTS:
                return <SubjectList subjects={subjects} setSubjects={setSubjects} departments={departments} />;
            case View.ATTENDANCE:
                return <Attendance students={students} teachers={teachers} classes={classes} />;
            case View.HOSTEL:
                return <Hostel 
                    rooms={rooms} setRooms={setRooms} 
                    students={students}
                />;
            case View.FINANCE:
                return <FinanceDashboard 
                    setCurrentView={setCurrentView} 
                    bankAccounts={bankAccounts}
                    setBankAccounts={setBankAccounts}
                />;
            case View.EARNINGS:
                return <EarningsList />;
            case View.EXPENSES:
                return <ExpenseList />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <Sidebar currentView={currentView} setCurrentView={handleNavigation} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header currentView={currentView} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;