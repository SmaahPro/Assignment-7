"use client";
import { FaPhone, FaComment, FaVideo } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QuickCheckIn({ friendName }) {

    const handleCheckIn = (type) => {
        const newEntry = {
            type: type,
            friendName: friendName,
            date: new Date().toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
            })
        };

        const existingData = JSON.parse(localStorage.getItem('myTimeline') || '[]');
        const updatedData = [newEntry, ...existingData];
        localStorage.setItem('myTimeline', JSON.stringify(updatedData));

        toast.success(`${type} with ${friendName}!`, {
            position: "top-center",
            autoClose: 2000,
        });
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-5 w-full">
            <ToastContainer />
            <h3 className="font-bold text-gray-800 text-lg mb-6">Quick Check-In</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                    onClick={() => handleCheckIn('Call')}
                    className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-100 transition w-full"
                >
                    <FaPhone className="text-2xl text-[#1e463a]" />
                    <span className="text-sm font-semibold">Call</span>
                </button>
                <button
                    onClick={() => handleCheckIn('Text')}
                    className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-100 transition w-full"
                >
                    <FaComment className="text-2xl text-[#1e463a]" />
                    <span className="text-sm font-semibold">Text</span>
                </button>
                <button
                    onClick={() => handleCheckIn('Video')}
                    className="bg-gray-50 border border-gray-200 p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-gray-100 transition w-full"
                >
                    <FaVideo className="text-2xl text-[#1e463a]" />
                    <span className="text-sm font-semibold">Video</span>
                </button>
            </div>
        </div>
    );
}