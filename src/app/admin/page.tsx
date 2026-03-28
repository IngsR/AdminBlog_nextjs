export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700">Total Posts</h2>
          <p className="text-4xl font-bold text-indigo-600 mt-4">--</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700">Total Categories</h2>
          <p className="text-4xl font-bold text-indigo-600 mt-4">--</p>
        </div>
      </div>
    </div>
  );
}
