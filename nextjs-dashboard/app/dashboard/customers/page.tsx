import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import { fetchUserXP } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Users XP',
};

// async function fetchUsers() {
//   const response = await fetch('/api/users');
//   if (!response.ok) {
//     throw new Error('Failed to fetch user data');
//   }
//   const data = await response.json();
//   return data.users;
// }

export default async function Page() {
    const users = await fetchUserXP();
  
    return (
      <main className="w-full px-4 py-8">
        <h1 className={`${lusitana.className} text-3xl font-bold mb-6 text-center`}>
          XP Leaderboard
        </h1>
        <div className="overflow-hidden rounded-lg shadow-lg bg-white">
          {/* Desktop Table */}
          <table className="hidden md:table w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-6 py-4 text-left font-semibold text-gray-600">
                  Name
                </th>
                <th className="border px-6 py-4 text-left font-semibold text-gray-600">
                  Email
                </th>
                <th className="border px-6 py-4 text-center font-semibold text-gray-600">
                  XP
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="border px-6 py-4">{user.name}</td>
                  <td className="border px-6 py-4">{user.email}</td>
                  <td className="border px-6 py-4 text-center font-bold">{user.xp}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-lg bg-gray-50 p-4 shadow-md"
              >
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="mt-2 text-lg font-bold text-blue-600">XP: {user.xp}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }