import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

interface UserHomeProps {
  email?: string | null;
}

function UserHome({ email }: UserHomeProps) {
  return (
    <div className="max-w-4xl mx-auto mt-16 px-6">
      <div className="bg-white shadow-md rounded-xl p-6 text-center border border-gray-400">
        <h1 className="text-2xl font-semibold">
          Welcome back, <span className="text-blue-600">{email}!</span>
        </h1>
      </div>

      <div className="mt-8">
        <nav className="flex justify-center gap-6 border-b border-gray-200 pb-2">
          <Link
            href={ROUTES.REST}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            REST Client
          </Link>
          <Link
            href={ROUTES.HISTORY}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            History
          </Link>
          <Link
            href={ROUTES.VARIABLE}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            Variables
          </Link>
        </nav>
      </div>
    </div>
  );
}
export default UserHome;
