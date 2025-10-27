import React from 'react';
import { View } from '../types';
import * as ModuleIcons from './icons/ModuleIcons';

interface SidebarProps {
    currentView: View;
    setCurrentView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
    
    const navItems = [
        { view: View.DASHBOARD, label: 'Dashboard', icon: <ModuleIcons.DashboardIcon /> },
        {
            category: 'Academics',
            items: [
                { view: View.STUDENTS, label: 'Students', icon: <ModuleIcons.StudentsIcon /> },
                { view: View.TEACHERS, label: 'Teachers & Staff', icon: <ModuleIcons.TeachersIcon /> },
                { view: View.EMPLOYEES, label: 'Other Employees', icon: <ModuleIcons.EmployeesIcon /> },
                { view: View.DEPARTMENTS, label: 'Departments', icon: <ModuleIcons.DepartmentsIcon /> },
                { view: View.CLASSES, label: 'Classes', icon: <ModuleIcons.ClassesIcon /> },
                { view: View.SUBJECTS, label: 'Subjects', icon: <ModuleIcons.SubjectsIcon /> },
                { view: View.ATTENDANCE, label: 'Attendance', icon: <ModuleIcons.AttendanceIcon /> },
            ]
        },
        {
            category: 'Management',
            items: [
                { view: View.HOSTEL, label: 'Hostel Management', icon: <ModuleIcons.HostelIcon /> }
            ]
        },
        {
            category: 'Finance',
            items: [
                { view: View.FINANCE, label: 'Finance Dashboard', icon: <ModuleIcons.FinanceIcon /> },
                { view: View.EARNINGS, label: 'Earnings', icon: <ModuleIcons.EarningsIcon /> },
                { view: View.EXPENSES, label: 'Expenses', icon: <ModuleIcons.ExpensesIcon /> },
            ]
        }
    ];

    const NavLink: React.FC<{ view: View, label: string, icon: React.ReactNode }> = ({ view, label, icon }) => {
        const isActive = currentView === view;
        return (
            <li
                onClick={() => setCurrentView(view)}
                className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-colors ${isActive ? 'bg-teal-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
                <span className="w-6 h-6 mr-3">{icon}</span>
                {label}
            </li>
        );
    };

    return (
        <aside className="w-64 bg-white shadow-lg flex flex-col">
            <div className="h-20 flex items-center justify-center border-b border-gray-200">
                <i className="fas fa-school text-teal-500 text-2xl mr-3"></i>
                <h1 className="text-xl font-bold text-gray-700">Madrasha MIS</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((navItem, index) => {
                    if ('category' in navItem) {
                        return (
                            <div key={index}>
                                <h3 className="px-2 pt-2 text-xs font-bold text-gray-400 uppercase tracking-wider">{navItem.category}</h3>
                                <ul className="mt-1 space-y-1">
                                    {navItem.items.map(item =>
                                        <NavLink key={item.view} {...item} />
                                    )}
                                </ul>
                            </div>
                        );
                    }
                    // For top-level items without a category
                    return <ul key={index}><NavLink {...navItem} /></ul>;
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;