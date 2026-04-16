import path from 'path';
import { promises as fs } from 'fs';

export default async function HomePage() {
  const filePath = path.join(process.cwd(), 'public', 'friends.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const friendsData = JSON.parse(fileContents);

  const totalFriends = friendsData.length;
  const onTrack = friendsData.filter(f => f.status === "on track").length;
  const needAttention = friendsData.filter(f => f.status === "overdue" || f.status === "almost due").length;
  const interactions = friendsData.filter(f => f.days_since_contact <= 30).length;

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="text-center py-10 mb-10 shadow-md rounded-[2rem] bg-white border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-800">Friends to keep close in your life</h1>
        <p className="text-gray-500 text-sm mt-3">Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
        <button className="mt-6 bg-[#1e463a] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#15352c] transition">+ Add a Friend</button>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 p-6 rounded-[2rem] shadow-md bg-white border border-gray-100">
        <div className="text-center"><h2 className="text-3xl font-bold">{totalFriends}</h2><p className="text-gray-500 text-sm">Total Friends</p></div>
        <div className="text-center"><h2 className="text-3xl font-bold">{onTrack}</h2><p className="text-gray-500 text-sm">On Track</p></div>
        <div className="text-center"><h2 className="text-3xl font-bold">{needAttention}</h2><p className="text-gray-500 text-sm">Need Attention</p></div>
        <div className="text-center"><h2 className="text-3xl font-bold">{interactions}</h2><p className="text-gray-500 text-sm">Interactions This Month</p></div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {friendsData.map((friend) => (
            <div key={friend.id} className="border border-amber-100 p-6 rounded-3xl flex flex-col items-center shadow-sm hover:shadow-lg transition bg-white">
              <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <img src={friend.picture} alt={friend.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-red-950 text-lg">{friend.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{friend.days_since_contact}d ago</p>

              <div className="flex flex-col gap-2 items-center">
                <div className="flex gap-1 flex-wrap justify-center">
                  {friend.tags.map((tag, i) => (
                    <span key={i} className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded-full font-bold uppercase">{tag}</span>
                  ))}
                </div>

                <span className={`text-[10px] px-4 py-1 rounded-full font-bold uppercase ${friend.status === 'overdue' ? 'bg-red-100 text-red-700' :
                  friend.status === 'almost due' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                  {friend.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}