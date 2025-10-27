
import React, { useState } from 'react';
import { EARNINGS_DATA } from '../../constants';
import { Earning } from '../../types';
import EarningForm from './EarningForm';

const EarningsList: React.FC = () => {
    const [earnings, setEarnings] = useState<Earning[]>(EARNINGS_DATA);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingEarning, setEditingEarning] = useState<Earning | null>(null);

    const handleAddEarning = () => {
        setEditingEarning(null);
        setIsFormModalOpen(true);
    };

    const handleEditEarning = (earning: Earning) => {
        setEditingEarning(earning);
        setIsFormModalOpen(true);
    };

    const handleDeleteEarning = (earningId: string) => {
        if (window.confirm('Are you sure you want to delete this earning record?')) {
            setEarnings(earnings.filter(e => e.id !== earningId));
        }
    };

    const handleSaveEarning = (earningData: Omit<Earning, 'id'> & { id?: string }) => {
        if (earningData.id) {
            setEarnings(earnings.map(e => e.id === earningData.id ? { ...e, ...earningData } as Earning : e));
        } else {
            const newIdNumber = Math.max(...earnings.map(e => parseInt(e.id.substring(1))), 0) + 1;
            const newId = `E${String(newIdNumber).padStart(3, '0')}`;
            const newEarning: Earning = { ...earningData, id: newId } as Earning;
            setEarnings([newEarning, ...earnings]);
        }
        setIsFormModalOpen(false);
        setEditingEarning(null);
    };

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    return (
        <div className="p-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-700">Manage Earnings</h3>
                    <button onClick={handleAddEarning} title="Record a new earning" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 flex items-center">
                        <i className="fas fa-plus mr-2"></i> Add Earning
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Source</th>
                                <th scope="col" className="px-6 py-3">Description</th>
                                <th scope="col" className="px-6 py-3">Payment Method</th>
                                <th scope="col" className="px-6 py-3 text-right">Amount</th>
                                <th scope="col" className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.map((earning) => (
                                <tr key={earning.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">{formatDate(earning.date)}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                            {earning.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{earning.description}</td>
                                    <td className="px-6 py-4">{earning.paymentMethod}</td>
                                    <td className="px-6 py-4 text-right font-semibold text-green-600">{formatCurrency(earning.amount)}</td>
                                    <td className="px-6 py-4 flex items-center space-x-3">
                                        <button onClick={() => handleEditEarning(earning)} title="Edit Earning" className="text-yellow-500 hover:text-yellow-700"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDeleteEarning(earning.id)} title="Delete Earning" className="text-red-500 hover:text-red-700"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isFormModalOpen && (
                <EarningForm
                    earning={editingEarning}
                    onSave={handleSaveEarning}
                    onCancel={() => { setIsFormModalOpen(false); setEditingEarning(null); }}
                />
            )}
        </div>
    );
};

export default EarningsList;
