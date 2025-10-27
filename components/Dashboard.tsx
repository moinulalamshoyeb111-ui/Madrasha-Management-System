import React, { useState, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { DASHBOARD_KPIS, FEE_COLLECTION_DATA, ATTENDANCE_TREND_DATA } from '../constants';
import { generateDashboardReport } from '../services/geminiService';

const KpiCard: React.FC<{ title: string; value: string | number; icon: string; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`text-4xl p-4 rounded-full ${color}`}>
            <i className={`fas ${icon}`}></i>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const [report, setReport] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGenerateReport = useCallback(async () => {
        setIsLoading(true);
        setReport('');
        try {
            const result = await generateDashboardReport(DASHBOARD_KPIS);
            setReport(result);
        } catch (error) {
            setReport('Failed to generate report.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard title="Total Students" value={DASHBOARD_KPIS.totalStudents} icon="fa-user-graduate" color="bg-blue-100 text-blue-500" />
                <KpiCard title="Total Teachers" value={DASHBOARD_KPIS.totalTeachers} icon="fa-chalkboard-teacher" color="bg-green-100 text-green-500" />
                <KpiCard title="Fee Collection" value={`${DASHBOARD_KPIS.feeCollectionPercentage}%`} icon="fa-coins" color="bg-yellow-100 text-yellow-500" />
                <KpiCard title="Today's Attendance" value={`${DASHBOARD_KPIS.todayAttendancePercentage}%`} icon="fa-user-check" color="bg-indigo-100 text-indigo-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Fee Collection</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={FEE_COLLECTION_DATA}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="collected" fill="#14b8a6" name="Collected (BDT)" />
                            <Bar dataKey="due" fill="#f43f5e" name="Due (BDT)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Attendance Trend</h3>
                    <ResponsiveContainer width="100%" height={300}>
                         <LineChart data={ATTENDANCE_TREND_DATA}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis domain={[80, 100]}/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="attendance" stroke="#8b5cf6" strokeWidth={2} name="Attendance (%)" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">AI-Powered Executive Summary</h3>
                    <button
                        onClick={handleGenerateReport}
                        disabled={isLoading}
                        title="Generate an AI-powered summary of the dashboard KPIs"
                        className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 disabled:bg-gray-400 flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Generating...
                            </>
                        ) : (
                             <>
                                <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                Generate Report
                            </>
                        )}
                    </button>
                </div>
                 {report && (
                    <div className="prose max-w-none p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <pre className="whitespace-pre-wrap font-sans">{report}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;