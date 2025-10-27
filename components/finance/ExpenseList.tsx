
import React, { useState } from 'react';
import { EXPENSES_DATA } from '../../constants';
import { Expense } from '../../types';
import ExpenseForm from './ExpenseForm';

const ExpenseList: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>(EXPENSES_DATA);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    const handleAddExpense = () => {
        setEditingExpense(null);
        setIsFormModalOpen(true);
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
        setIsFormModalOpen(true);
    };

    const handleDeleteExpense = (expenseId: string) => {
        if (window.confirm('Are you sure you want to delete this expense record?')) {
            setExpenses(expenses.filter(e => e.id !== expenseId));
        }
    };

    const handleSaveExpense = (expenseData: Omit<Expense, 'id'> & { id?: string }) => {
        if (expenseData.id) {
            setExpenses(expenses.map(e => e.id === expenseData.id ? { ...e, ...expenseData } as Expense : e));
        } else {
            const newIdNumber = Math.max(...expenses.map(e => parseInt(e.id.substring(1))), 0) + 1;
            const newId = `X${String(newIdNumber).padStart(3, '0')}`;
            const newExpense: Expense = { ...expenseData, id: newId } as Expense;
            setExpenses([newExpense, ...expenses]);
        }
        setIsFormModalOpen(false);
        setEditingExpense(null);
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Manage Expenses</h3>
                    <button onClick={handleAddExpense} title="Record a new expense" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Expense
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Payment Method</th>
                                <th scope="col" className="px-6 py-3 text-right">Amount</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expenses.map((expense) => (
                                <tr key={expense.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{formatDate(expense.date)}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{expense.description}</td>
                                    <td className="px-6 py-4">{expense.paymentMethod}</td>
                                    <td className="px-6 py-4 text-right font-semibold text-red-600">{formatCurrency(expense.amount)}</td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleEditExpense(expense)} title="Edit Expense" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteExpense(expense.id)} title="Delete Expense" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isFormModalOpen && (
                <ExpenseForm
                    expense={editingExpense}
                    onSave={handleSaveExpense}
                    onCancel={() => { setIsFormModalOpen(false); setEditingExpense(null); }}
                />
            )}
        </div>
    );
};

export default ExpenseList;
