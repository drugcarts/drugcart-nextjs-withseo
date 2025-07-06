import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12">
      <h1 className="text-6xl font-bold text-[#bf0d47] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 text-center max-w-md mb-6">
        Sorry, the page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-[#2ab241] text-white font-medium rounded hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
