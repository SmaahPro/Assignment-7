"use client";

import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AnalyticsPage() {
    const [timelineData, setTimelineData] = useState([]);

    const COLORS = {
        text: '#3B82F6',
        call: '#22C55E',
        video: '#A855F7'
    };

    const [chartData, setChartData] = useState({
        datasets: [{
            data: [0, 0, 0],
            backgroundColor: [COLORS.text, COLORS.call, COLORS.video],
            borderWidth: 0,
        }],
        labels: ['Text', 'Call', 'Video']
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('myTimeline') || '[]');
        setTimelineData(savedData);

        const counts = { text: 0, call: 0, video: 0 };

        savedData.forEach(item => {
            const type = item.type.toLowerCase();
            if (counts[type] !== undefined) {
                counts[type]++;
            }
        });

        setChartData({
            labels: ['Text', 'Call', 'Video'],
            datasets: [{
                data: [counts.text, counts.call, counts.video],
                backgroundColor: [COLORS.text, COLORS.call, COLORS.video],
                borderWidth: 0,
                hoverOffset: 0,
            }]
        });
    }, []);

    const options = {
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
                        const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '85%',
    };

    return (
        <main className="w-full min-h-screen py-10 px-4 bg-gray-50 mb-10">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
                    Friendship Analytics
                </h1>

                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center gap-10">
                    <p className="text-gray-500 font-bold self-start -mb-6">By Interaction Type</p>

                    <div className="w-[300px] h-[300px] flex items-center justify-center">
                        {timelineData.length === 0 ? (
                            <p className="text-gray-400 text-center">No data available.</p>
                        ) : (
                            <Doughnut data={chartData} options={options} />
                        )}
                    </div>

                    <div className="w-full flex justify-center gap-8 text-sm mt-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>
                            <span className="text-gray-500 font-semibold">Text</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#22C55E]"></span>
                            <span className="text-gray-500 font-semibold">Call</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#A855F7]"></span>
                            <span className="text-gray-500 font-semibold">Video</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}