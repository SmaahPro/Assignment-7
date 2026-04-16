import path from 'path';
import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import { FaPhone, FaComment, FaVideo, FaClock, FaArchive, FaTrash, FaEdit } from 'react-icons/fa';

export default async function FriendDetailsPage({ params }) {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'public', 'friends.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const friendsData = JSON.parse(fileContents);

    const friend = friendsData.find((f) => f.id === parseInt(id));
    if (!friend) notFound();

    const formattedDate = new Date(friend.next_due_date).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    });

    return (
        <main className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen mt-5">
            <div className="flex flex-col md:flex-row gap-8 items-start w-full">

                <div className="w-full md:w-[350px] flex-shrink-0 flex flex-col gap-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                            <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-red-950 mb-4">{friend.name}</h1>
                        </div>
                        <div className="flex flex-col gap-2 items-center mb-4">
                            <span className={`px-4 py-1 rounded-full text-xs font-bold w-fit uppercase ${friend.status === 'overdue'
                                    ? 'bg-red-100 text-red-700'
                                    : friend.status === 'almost due'
                                        ? 'bg-orange-100 text-orange-700'
                                        : 'bg-blue-100 text-blue-700'
                                }`}>
                                {friend.status}
                            </span>
                            {friend.tags && <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-[10px] font-bold w-fit capitalize">{friend.tags[0]}</span>}
                        </div>
                        <p className="text-gray-500 text-sm mt-4 italic">"{friend.bio}"</p>
                        <p className="text-gray-400 text-xs mt-2 font-medium">Preferred: email</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-center gap-3 shadow-sm text-gray-600 hover:bg-gray-50 transition"><FaClock /> <span className="text-sm font-semibold">Snooze 2 Weeks</span></button>
                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-center gap-3 shadow-sm text-gray-600 hover:bg-gray-50 transition"><FaArchive /> <span className="text-sm font-semibold">Archive</span></button>
                        <button className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-center gap-3 shadow-sm text-red-600 hover:bg-red-50 transition"><FaTrash /> <span className="text-sm font-semibold">Delete</span></button>
                    </div>
                </div>

                <div className="flex-1 w-full flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center"><h2 className="text-3xl font-extrabold text-[#1e463a]">{friend.days_since_contact}</h2><p className="text-gray-500 text-xs mt-2">Days Since Contact</p></div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center"><h2 className="text-3xl font-extrabold text-[#1e463a]">{friend.goal}</h2><p className="text-gray-500 text-xs mt-2">Goal (Days)</p></div>
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center"><h2 className="text-2xl font-extrabold text-[#1e463a]">{formattedDate}</h2><p className="text-gray-500 text-xs mt-2">Next Due</p></div>
                    </div>

                    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <h3 className="font-bold text-gray-800 text-lg">Relationship Goal</h3>
                            <button className="bg-white border border-gray-100 px-4 py-1.5 rounded-lg flex items-center gap-2 shadow-sm text-gray-600 hover:bg-gray-50 transition">
                                <FaEdit />
                                <span className="text-xs font-semibold">Edit</span>
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Connect every <span className="font-extrabold text-gray-900">{friend.goal} days</span>
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-5">
                        <h3 className="font-bold text-gray-800 text-lg mb-6">Quick Check-In</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <button className="bg-gray-50 border border-gray-200 p-8 rounded-2xl flex flex-col items-center gap-3"><FaPhone className="text-2xl text-[#1e463a]" /><span className="text-sm font-semibold">Call</span></button>
                            <button className="bg-gray-50 border border-gray-200 p-8 rounded-2xl flex flex-col items-center gap-3"><FaComment className="text-2xl text-[#1e463a]" /><span className="text-sm font-semibold">Text</span></button>
                            <button className="bg-gray-50 border border-gray-200 p-8 rounded-2xl flex flex-col items-center gap-3"><FaVideo className="text-2xl text-[#1e463a]" /><span className="text-sm font-semibold">Video</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}