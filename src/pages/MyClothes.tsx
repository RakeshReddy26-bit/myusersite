import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../config/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const dummyAfterImage = 'https://dummyimage.com/120x120/00cc99/ffffff&text=Afterwash';
const dummyBeforeImage = 'https://dummyimage.com/120x120/cccccc/000000&text=Before';
const statusOptions = ['All', 'Pending', 'In Progress', 'Washed'];
const typeIcons: Record<string, string> = {
  'Shirt': '👔',
  'Jeans': '👖',
  'Jacket': '🧥',
  'T-Shirt': '👕',
  'Dress': '👗',
  'Skirt': '🩳',
  'Shorts': '🩳',
  'Other': '👚',
};

const statusColors: Record<string, string> = {
  'Pending': 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Washed': 'bg-green-100 text-green-800',
};

const MyClothes: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [clothes, setClothes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (!user) return;
    const fetchClothes = async () => {
      setLoading(true);
      let q = query(collection(db, 'clothes'), where('userId', '==', user.id), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      let items: any[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setClothes(items);
      setLoading(false);
    };
    fetchClothes();
  }, [user]);

  // Group clothes by status
  const grouped = clothes.reduce((acc, item) => {
    const status = item.status || 'Pending';
    if (!acc[status]) acc[status] = [];
    acc[status].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  const filteredStatuses = statusFilter === 'All' ? Object.keys(grouped) : [statusFilter];

  if (authLoading || loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-12 h-12 mx-auto animate-spin border-4 border-blue-200 border-t-blue-600 rounded-full mb-4" />
        <div className="text-lg text-gray-500">Loading your clothes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Hero Section */}
      <div className="bg-white py-10 shadow-sm mb-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">My Clothes</h1>
          <p className="text-lg text-gray-500 mb-4">Track your laundry items and see their status in real time.</p>
        </div>
      </div>
      {/* Filter Controls */}
      <div className="max-w-4xl mx-auto flex flex-wrap gap-4 items-center mb-8 px-4">
        <label className="font-semibold">Status:</label>
        <select
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          {statusOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {/* Grouped Clothes by Status */}
      <div className="max-w-4xl mx-auto space-y-10 px-4">
        {filteredStatuses.map(status => (
          <div key={status}>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded-full ${status === 'Pending' ? 'bg-yellow-400' : status === 'In Progress' ? 'bg-blue-400' : status === 'Washed' ? 'bg-green-400' : 'bg-gray-300'}`}></span>
              {status}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(grouped[status] || []).map(item => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 items-center group transition hover:shadow-2xl">
                  {/* Before Photo & Type Icon */}
                  <div className="flex flex-col items-center gap-2">
                    <img src={item.photoUrl || dummyBeforeImage} alt="Before" className="w-24 h-24 rounded border shadow-sm" />
                    <span className="text-3xl">{typeIcons[item.type] || '👚'}</span>
                  </div>
                  {/* Details */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-lg">{item.name}</span>
                      <span className="text-gray-400">({item.type})</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(item.washingPreference || []).map((wp: string) => (
                        <span key={wp} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{wp}</span>
                      ))}
                    </div>
                    <div className="text-gray-600 mb-2 text-sm">{item.notes || <span className="italic text-gray-400">No notes</span>}</div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${statusColors[item.status] || 'bg-gray-100 text-gray-600'}`}>{item.status || 'Pending'}</span>
                  </div>
                  {/* Afterwash Showcase */}
                  {item.status === 'Washed' && (
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative group">
                        <img
                          src={item.afterPhotoUrl || dummyAfterImage}
                          alt="Afterwash"
                          className="w-24 h-24 rounded border shadow-lg transform transition duration-300 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-2xl"
                          style={{ boxShadow: '0 0 0 4px #a7f3d0' }}
                        />
                        {/* Sparkle animation */}
                        <span className="absolute -top-2 -right-2 text-2xl animate-bounce">✨</span>
                        {/* Hover to preview before/after */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                          <img src={item.photoUrl || dummyBeforeImage} alt="Before" className="w-16 h-16 rounded border-2 border-white" />
                          <span className="ml-2 text-white font-bold">Before</span>
                        </div>
                      </div>
                      <span className="text-teal-600 font-semibold text-xs">Afterwash</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {(grouped[status] || []).length === 0 && <div className="text-gray-400 italic">No clothes in this status.</div>}
          </div>
        ))}
      </div>
      <style>{`
        .animate-bounce {
          animation: bounce 1s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default MyClothes; 