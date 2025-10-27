export enum View {
    DASHBOARD = 'Dashboard',
    STUDENTS = 'Students',
    TEACHERS = 'Teachers & Staff',
    EMPLOYEES = 'Other Employees',
    DEPARTMENTS = 'Departments',
    CLASSES = 'Classes',
    SUBJECTS = 'Subjects',
    ATTENDANCE = 'Attendance',
    HOSTEL = 'Hostel Management',
    FINANCE = 'Finance Dashboard',
    EARNINGS = 'Earnings',
    EXPENSES = 'Expenses',
}

export interface ExtraFee {
    description: string;
    amount: number;
}

export interface Student {
    id: string;
    name: string;
    department: string;
    class: string;
    section: 'A' | 'B' | 'C';
    guardianName: string;
    guardianPhone: string;
    admissionDate: string; // YYYY-MM-DD
    studentType: 'Regular' | 'Residential' | 'Lillah Boarding';
    tuitionFee: number;
    hostelFee: number;
    extraFees: ExtraFee[];
    remarks?: string;
}

export interface SalaryAdjustment {
    description: string;
    amount: number; // Can be positive (bonus) or negative (deduction)
}

export interface Teacher {
    id: string;
    name: string;
    subjectId: string;
    phone: string;
    email: string;
    joiningDate: string; // YYYY-MM-DD
    type: 'Regular' | 'Residential';
    baseSalary: number;
    residentialDeduction: number;
    adjustments: SalaryAdjustment[];
    remarks?: string;
}

export interface Employee {
    id: string;
    name: string;
    role: 'Accountant' | 'Admin Staff' | 'Cleaner' | 'Security Guard';
    phone: string;
    email: string;
    joiningDate: string; // YYYY-MM-DD
    type: 'Regular' | 'Residential';
    salary: number;
    remarks?: string;
}

export interface Department {
    id: string;
    name: string;
    remarks?: string;
}

export interface ClassInfo {
    id: string;
    name: string;
    departmentId: string;
    subjectIds: string[];
    remarks?: string;
}

export interface Subject {
    id: string;
    name: string;
    departmentId: string;
    remarks?: string;
}

export type EarningSource = 'Student Fees' | 'Donations' | 'Tannery Income' | 'Other';
export type PaymentMethod = 'Bank Transfer' | 'Cash' | 'Cheque';

export interface Earning {
    id: string;
    date: string; // YYYY-MM-DD
    source: EarningSource;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    remarks?: string;
}

export type ExpenseCategory = 'Salaries' | 'Utility Bills' | 'Hostel Meal' | 'Maintenance' | 'Administrative' | 'Other';

export interface Expense {
    id: string;
    date: string; // YYYY-MM-DD
    category: ExpenseCategory;
    description: string;
    amount: number;
    paymentMethod: PaymentMethod;
    remarks?: string;
}

export type BankTransactionType = 'Deposit' | 'Withdrawal';

export interface BankAccount {
    id: string;
    name: string;
    balance: number;
}

export interface HostelRoom {
    id: string;
    roomNumber: string;
    capacity: number;
    studentIds: string[];
}
