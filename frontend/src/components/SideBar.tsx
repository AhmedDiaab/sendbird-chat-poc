export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 space-y-4">
      <div className="text-xl font-bold">Dashboard</div>
      <nav className="space-y-2">
        <a href="/users" className="block hover:underline">
          Users
        </a>
        {/* Add more links */}
      </nav>
    </div>
  );
}
