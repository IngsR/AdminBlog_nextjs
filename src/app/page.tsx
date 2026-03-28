import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Welcome to AdminBLog
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This is the management portal for your blog application. 
          Use the dashboard to manage posts, categories, and author profiles.
        </p>
        <Link 
          href="/admin" 
          className="inline-block bg-indigo-600 text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow transition-all"
        >
          Go to Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
