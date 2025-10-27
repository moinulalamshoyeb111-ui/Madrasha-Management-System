import React, { useState } from 'react';
import { BankAccount, BankTransactionType } from '../../types';

interface BankTransactionModalProps {
    accounts: BankAccount[];
    onSave: (data: { accountId: string; type: BankTransactionType; amount: number; description: string; date: string; }) => void;
    onCancel: () => void;
}

const BankTransactionModal: React.FC<BankTransactionModalProps> = ({ accounts, onSave, onCancel }) => {
    const [type, setType] = useState<BankTransactionType>('Deposit');
    const [accountId, setAccountId] = useState<string>(accounts[0]?.id || '');
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!accountId || amount <= 0) {
            alert('Please select an account and enter a valid amount.');
            return;
        }
        onSave({ accountId, type, amount, description, date });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">New Bank Transaction</h2>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Transaction Type</label>
                        <div className="mt-2 flex rounded-md shadow-sm">
                             <button type="button" onClick={() => setType('Deposit')} className={`px-4 py-2 text-sm font-medium rounded-l-md w-1/2 border border-gray-300 ${type === 'Deposit' ? 'bg-teal-500 text-white border-teal-500' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                                Deposit
                            </button>
                            <button type="button" onClick={() => setType('Withdrawal')} className={`-ml-px px-4 py-2 text-sm font-medium rounded-r-md w-1/2 border border-gray-300 ${type === 'Withdrawal' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                                Withdrawal
                            </button>
                        </div>
                    </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account</label>
                            <select id="account" value={accountId} onChange={e => setAccountId(e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500">
                                <option value="" disabled>Select an account</option>
                                {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.name}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" id="amount" value={amount} onChange={e => setAmount(Number(e.target.value))} min="0.01" step="0.01" required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                        </div>
                     </div>
                     <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" />
                    </div>
                     <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500" placeholder="e.g., Monthly bank deposit" />
                    </div>


                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Transaction</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BankTransactionModal;
