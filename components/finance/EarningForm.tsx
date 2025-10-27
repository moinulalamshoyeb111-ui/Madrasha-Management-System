import React, { useState, useEffect } from 'react';
import { Earning, EarningSource, PaymentMethod } from '../../types';

interface EarningFormProps {
    earning: Earning | null;
    onSave: (earningData: Omit<Earning, 'id'> & { id?: string }) => void;
    onCancel: () => void;
}

const EarningForm: React.FC<EarningFormProps> = ({ earning, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Earning, 'id'>>({
        date: new Date().toISOString().split('T')[0],
        source: 'Student Fees',
        description: '',
        amount: 0,
        paymentMethod: 'Bank Transfer',
        remarks: ''
    });

    useEffect(() => {
        if (earning) {
            setFormData(earning);
        }
    }, [earning]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, id: earning?.id });
    };
    
    const earningSources: EarningSource[] = ['Student Fees', 'Donations', 'Tannery Income', 'Other'];
    const paymentMethods: PaymentMethod[] = ['Bank Transfer', 'Cash', 'Cheque'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800">{earning ? 'Edit Earning' : 'Add New Earning'}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Amount</label>
                            <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Source</label>
                            <select name="source" value={formData.source} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                {earningSources.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 shadow-sm">
                                {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} required className="mt-1 w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Remarks</label>
                            <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 shadow-sm"></textarea>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">Save Earning</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EarningForm;
