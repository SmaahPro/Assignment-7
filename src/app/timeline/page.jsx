"use client";

import { useState, useEffect } from "react";
import { FaPhone, FaCommentDots, FaVideo } from "react-icons/fa";

export default function TimelinePage() {
    const [timelineData, setTimelineData] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("myTimeline") || "[]");
        setTimelineData(savedData);
    }, []);

    const getIcon = (type) => {
        switch (type.toLowerCase()) {
            case "text":
                return <FaCommentDots className="text-blue-500" />;
            case "video":
                return <FaVideo className="text-purple-500" />;
            case "call":
            case "audio":
                return <FaPhone className="text-green-500" />;
            default:
                return <FaPhone className="text-green-500" />;
        }
    };

    const filteredData = timelineData.filter((item) => {
        if (filter === "all") return true;
        return item.type.toLowerCase() === filter.toLowerCase();
    });

    return (
        <main className="w-full min-h-screen py-10 px-4">
            <div className="max-w-2xl mx-auto">

                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">
                    Timeline
                </h1>

                <div className="mb-10 pb-6 border-b border-gray-200">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg p-3 outline-none focus:outline-none focus:ring-0 focus:border-gray-200"
                        style={{ width: "200px" }}
                    >
                        <option value="all">Filter timeline</option>
                        <option value="audio">Audio</option>
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                    </select>
                </div>

                <div className="flex flex-col gap-6">
                    {filteredData.length === 0 ? (
                        <p className="text-gray-400">No activities recorded yet.</p>
                    ) : (
                        filteredData.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-full flex-shrink-0">
                                    {getIcon(item.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-gray-900 font-bold text-lg truncate">
                                        <span className="capitalize">{item.type}</span> with{" "}
                                        {item.friendName}
                                    </p>
                                    <p className="text-sm text-gray-400">{item.date}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}