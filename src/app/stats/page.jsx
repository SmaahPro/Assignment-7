"use client";

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function StatsPage() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    const COLORS = {
        Text: '#3B82F6',
        Call: '#22C55E',
        Video: '#A855F7'
    };

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('myTimeline') || '[]');

        const counts = { Text: 0, Call: 0, Video: 0 };
        savedData.forEach(item => {
            const type = item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase();
            if (counts[type] !== undefined) {
                counts[type]++;
            }
        });

        const chartData = [
            { name: 'Text', value: counts.Text },
            { name: 'Call', value: counts.Call },
            { name: 'Video', value: counts.Video },
        ].filter(item => item.value > 0);

        setData(chartData);
        setTotal(savedData.length);
    }, []);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const { name, value } = payload[0];
            const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
            return (
                <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-sm text-sm">
                    <p className="font-bold text-gray-700">{`${name}: ${value} (${percentage}%)`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <main className="w-full min-h-screen py-10 px-4 bg-gray-50 mb-10">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
                    Friendship Analytics
                </h1>

                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <p className="text-gray-500 font-bold self-start mb-4">By Interaction Type</p>

                    <div className="w-full h-[300px]">
                        {data.length === 0 ? (
                            <p className="text-gray-400 text-center py-20">No data available.</p>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        isAnimationActive={true}
                                        stroke="none"
                                        activeIndex={undefined}
                                        activeShape={undefined}
                                    >
                                        {data.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[entry.name]}
                                                stroke="none"
                                                style={{ outline: 'none' }}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'none' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    <div className="w-full flex justify-center gap-8 text-sm mt-4">
                        {Object.keys(COLORS).map((key) => (
                            <div key={key} className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[key] }}></span>
                                <span className="text-gray-500 font-semibold">{key}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}