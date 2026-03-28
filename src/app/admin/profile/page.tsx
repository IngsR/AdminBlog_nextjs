export const dynamic = 'force-dynamic';

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Profile</h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-600 mb-6">
          Profile management requires Supabase Auth to be properly configured.
          The profiles table uses `auth.users.id` as its primary key.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
          <h2 className="text-indigo-800 font-semibold mb-2">Next Steps for Authentication</h2>
          <ol className="list-decimal list-inside text-indigo-700 space-y-2 text-sm">
            <li>Initialize Supabase Auth in your Next.js application using `@supabase/ssr`</li>
            <li>Create a Sign In page</li>
            <li>Protect the `/admin` routes using Next.js Middleware</li>
            <li>Use the logged-in user's ID to fetch and update their profile data here</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
