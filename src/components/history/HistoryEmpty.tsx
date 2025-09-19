import Link from 'next/link';

function HistoryEmpty() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 border border-gray-200 rounded shadow-xl mt-4 text-center">
      <h1 className="text-2xl font-bold mb-4">
        You haven&lsquo;t executed any requests yet
      </h1>
      <p className="text-gray-600 mb-6">Try:</p>
      <Link
        href="/rest"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        REST Client
      </Link>
    </div>
  );
}

export default HistoryEmpty;
