import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { View, BankAccount } from '../../types';
import { FINANCE_CHART_DATA, EARNINGS_DATA, EXPENSES_DATA } from '../../constants';
import BankTransactionModal from './BankTransactionModal';

interface FinanceDashboardProps {
    setCurrentView: (view: View) => void;
    bankAccounts: BankAccount[];
    setBankAccounts: React.Dispatch<React.SetStateAction<BankAccount[]>>;
}

const StatCard: React.FC<{ title: string; value: string; icon: string; color: string; }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center">
        <div className={`p-4 rounded-full mr-4 ${color}`}>
            <i className={`fas ${icon} text-2xl`}></i>
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const FinanceDashboard: React.FC<FinanceDashboardProps> = ({ setCurrentView, bankAccounts, setBankAccounts }) => {
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    
    const totalEarnings = EARNINGS_DATA.reduce((acc, e) => acc + e.amount, 0);
    const totalExpenses = EXPENSES_DATA.reduce((acc, e) => acc + e.amount, 0);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);

    const handleSaveTransaction = (data: { accountId: string; type: 'Deposit' | 'Withdrawal'; amount: number; }) => {
        setBankAccounts(prevAccounts =>
            prevAccounts.map(acc => {
                if (acc.id === data.accountId) {
                    const newBalance = data.type === 'Deposit'
                        ? acc.balance + data.amount
                        : acc.balance - data.amount;
                    return { ...acc, balance: newBalance };
                }
                return acc;
            })
        );
        setIsTransactionModalOpen(false);
    };

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Total Earnings (May)" value={formatCurrency(totalEarnings)} icon="fa-arrow-up" color="bg-green-100 text-green-500" />
                 <StatCard title="Total Expenses (May)" value={formatCurrency(totalExpenses)} icon="fa-arrow-down" color="bg-red-100 text-red-500" />
                {bankAccounts.map(acc => (
                     <StatCard key={acc.id} title={acc.name} value={formatCurrency(acc.balance)} icon={acc.id === 'acc_cash' ? 'fa-wallet' : 'fa-university'} color="bg-blue-100 text-blue-500" />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                     <h3 className="text-lg font-semibold text-gray-700 mb-4">Earnings vs Expenses (YTD)</h3>
                     <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={FINANCE_CHART_DATA}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={formatCurrency}/>
                            <Tooltip formatter={(value: number) => formatCurrency(value)} />
                            <Legend />
                            <Bar dataKey="Earnings" fill="#14b8a6" />
                            <Bar dataKey="Expenses" fill="#f43f5e" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
                    <div className="space-y-4">
                        <button onClick={() => setCurrentView(View.EARNINGS)} className="w-full flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                            <i className="fas fa-plus-circle text-green-500 text-2xl mr-4"></i>
                            <div>
                                <p className="font-semibold text-gray-800">Add New Earning</p>
                                <p className="text-sm text-gray-500">Record income from fees, donations, etc.</p>
                            </div>
                        </button>
                        <button onClick={() => setCurrentView(View.EXPENSES)} className="w-full flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                            <i className="fas fa-minus-circle text-red-500 text-2xl mr-4"></i>
                            <div>
                                <p className="font-semibold text-gray-800">Add New Expense</p>
                                <p className="text-sm text-gray-500">Record expenses like salaries, bills, etc.</p>
                            </div>
                        </button>
                        <button onClick={() => setIsTransactionModalOpen(true)} className="w-full flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                            <i className="fas fa-exchange-alt text-blue-500 text-2xl mr-4"></i>
                            <div>
                                <p className="font-semibold text-gray-800">Bank Transaction</p>
                                <p className="text-sm text-gray-500">Deposit or withdraw from accounts.</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            {isTransactionModalOpen && (
                <BankTransactionModal 
                    accounts={bankAccounts}
                    onSave={handleSaveTransaction}
                    onCancel={() => setIsTransactionModalOpen(false)}
                />
            )}
        </div>
    );
};

export default FinanceDashboard;