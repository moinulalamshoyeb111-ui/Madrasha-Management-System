import { Student, Teacher, Department, ClassInfo, Subject, Earning, Expense, BankAccount, HostelRoom, Employee } from './types';

// Academic Data
export const DEPARTMENTS_DATA: Department[] = [
    { id: 'D01', name: 'Hifz', remarks: 'Memorization of the Holy Quran' },
    { id: 'D02', name: 'Kitab', remarks: 'General Islamic Studies' },
    { id: 'D03', name: 'Ifta', remarks: 'Advanced Islamic Jurisprudence' },
];

export const SUBJECTS_DATA: Subject[] = [
    { id: 'SUB01', name: 'Tajweed', departmentId: 'D01' },
    { id: 'SUB02', name: 'Quran Memorization', departmentId: 'D01' },
    { id: 'SUB03', name: 'Fiqh', departmentId: 'D02' },
    { id: 'SUB04', name: 'Hadith', departmentId: 'D02' },
    { id: 'SUB05', name: 'Aqidah', departmentId: 'D02' },
    { id: 'SUB06', name: 'Usul al-Fiqh', departmentId: 'D03' },
    { id: 'SUB07', name: 'Fatwa Practice', departmentId: 'D03' },
];

export const CLASSES_DATA: ClassInfo[] = [
    { id: 'C01', name: 'Noorani', departmentId: 'D01', subjectIds: ['SUB01'] },
    { id: 'C02', name: 'Amma Para', departmentId: 'D01', subjectIds: ['SUB01', 'SUB02'] },
    { id: 'C03', name: 'Mizan', departmentId: 'D02', subjectIds: ['SUB03', 'SUB05'] },
    { id: 'C04', name: 'Mishkat', departmentId: 'D02', subjectIds: ['SUB04', 'SUB03'] },
    { id: 'C05', name: 'Takhasus fil-Fiqh', departmentId: 'D03', subjectIds: ['SUB06', 'SUB07'] },
];

// People Data
export const STUDENTS_DATA: Student[] = [
    { id: 'S001', name: 'Abdullah Al Mamun', department: 'Hifz', class: 'Amma Para', section: 'A', guardianName: 'Rafiqul Islam', guardianPhone: '01712345678', admissionDate: '2023-01-15', studentType: 'Residential', tuitionFee: 5000, hostelFee: 3000, extraFees: [] },
    { id: 'S002', name: 'Fatima Akter', department: 'Kitab', class: 'Mizan', section: 'A', guardianName: 'Abdul Karim', guardianPhone: '01812345679', admissionDate: '2023-02-10', studentType: 'Regular', tuitionFee: 4000, hostelFee: 0, extraFees: [] },
    { id: 'S003', name: 'Yusuf Ahmed', department: 'Hifz', class: 'Amma Para', section: 'B', guardianName: 'Harun Rashid', guardianPhone: '01912345680', admissionDate: '2023-01-20', studentType: 'Lillah Boarding', tuitionFee: 0, hostelFee: 0, extraFees: [{ description: 'Book Fee', amount: 500 }] },
    { id: 'S004', name: 'Aisha Siddika', department: 'Ifta', class: 'Takhasus fil-Fiqh', section: 'A', guardianName: 'Jamal Uddin', guardianPhone: '01612345681', admissionDate: '2022-05-18', studentType: 'Residential', tuitionFee: 7000, hostelFee: 3500, extraFees: [] },
    { id: 'S005', name: 'Omar Farooq', department: 'Kitab', class: 'Mishkat', section: 'A', guardianName: 'Kamal Hasan', guardianPhone: '01512345682', admissionDate: '2023-03-01', studentType: 'Regular', tuitionFee: 6000, hostelFee: 0, extraFees: [] },
];

export const TEACHERS_DATA: Teacher[] = [
    { id: 'T01', name: 'Mawlana Zubair Ansari', subjectId: 'SUB02', phone: '01711223344', email: 'zubair.ansari@example.com', joiningDate: '2020-01-10', type: 'Residential', baseSalary: 35000, residentialDeduction: 5000, adjustments: [] },
    { id: 'T02', name: 'Qari Mukarram Hossain', subjectId: 'SUB01', phone: '01811223355', email: 'mukarram.h@example.com', joiningDate: '2021-06-15', type: 'Regular', baseSalary: 28000, residentialDeduction: 0, adjustments: [] },
    { id: 'T03', name: 'Mufti Lutfor Rahman', subjectId: 'SUB07', phone: '01911223366', email: 'lutfor.r@example.com', joiningDate: '2019-03-01', type: 'Residential', baseSalary: 45000, residentialDeduction: 5000, adjustments: [{ description: 'Head Mufti Allowance', amount: 5000 }] },
];

export const EMPLOYEES_DATA: Employee[] = [
    { id: 'E01', name: 'Abul Kashem', role: 'Accountant', phone: '01722334455', email: 'kashem.acc@example.com', joiningDate: '2021-02-01', salary: 25000, type: 'Regular' },
    { id: 'E02', name: 'Rahim Mia', role: 'Security Guard', phone: '01922334466', email: 'rahim.sec@example.com', joiningDate: '2022-08-10', salary: 15000, type: 'Residential' },
];

// Dashboard Data
export const DASHBOARD_KPIS = {
    totalStudents: 150,
    totalTeachers: 12,
    feeCollectionPercentage: 92,
    todayAttendancePercentage: 96,
};

export const FEE_COLLECTION_DATA = [
    { month: 'Jan', collected: 450000, due: 50000 },
    { month: 'Feb', collected: 480000, due: 20000 },
    { month: 'Mar', collected: 460000, due: 40000 },
    { month: 'Apr', collected: 490000, due: 10000 },
    { month: 'May', collected: 470000, due: 30000 },
];

export const ATTENDANCE_TREND_DATA = [
    { day: 'Mon', attendance: 96 },
    { day: 'Tue', attendance: 98 },
    { day: 'Wed', attendance: 95 },
    { day: 'Thu', attendance: 97 },
    { day: 'Fri', attendance: 92 },
];


// Finance Data
export const EARNINGS_DATA: Earning[] = [
    { id: 'E001', date: '2024-05-05', source: 'Student Fees', description: 'Monthly fee collection for May', amount: 470000, paymentMethod: 'Bank Transfer' },
    { id: 'E002', date: '2024-05-10', source: 'Donations', description: 'Donation from Mr. Abdullah', amount: 50000, paymentMethod: 'Cheque' },
    { id: 'E003', date: '2024-05-15', source: 'Tannery Income', description: 'Qurbani leather sale', amount: 120000, paymentMethod: 'Cash' },
];

export const EXPENSES_DATA: Expense[] = [
    { id: 'X001', date: '2024-05-01', category: 'Salaries', description: 'Staff salaries for April', amount: 350000, paymentMethod: 'Bank Transfer' },
    { id: 'X002', date: '2024-05-08', category: 'Utility Bills', description: 'Electricity and Water bill', amount: 25000, paymentMethod: 'Bank Transfer' },
    { id: 'X003', date: '2024-05-12', category: 'Hostel Meal', description: 'Weekly grocery for hostel kitchen', amount: 45000, paymentMethod: 'Cash' },
];

export const BANK_ACCOUNTS_DATA: BankAccount[] = [
    { id: 'acc_bank', name: 'Main Bank Account', balance: 1250000 },
    { id: 'acc_cash', name: 'Cash in Hand', balance: 75000 },
];

export const FINANCE_CHART_DATA = [
    { name: 'Jan', Earnings: 500000, Expenses: 400000 },
    { name: 'Feb', Earnings: 520000, Expenses: 410000 },
    { name: 'Mar', Earnings: 480000, Expenses: 420000 },
    { name: 'Apr', Earnings: 530000, Expenses: 390000 },
];

// Hostel Data
export const HOSTEL_ROOMS_DATA: HostelRoom[] = [
    { id: 'HR01', roomNumber: '101', capacity: 4, studentIds: ['S001'] },
    { id: 'HR02', roomNumber: '102', capacity: 4, studentIds: ['S004'] },
    { id: 'HR03', roomNumber: '201', capacity: 6, studentIds: ['S003'] },
    { id: 'HR04', roomNumber: '202', capacity: 6, studentIds: [] },
];

export const HOSTEL_WARDEN_IDS_DATA: string[] = ['T01', 'E02'];
