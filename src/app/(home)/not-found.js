import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 bg-white">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Post Not Found
      </h2>
      <p className="text-gray-500 text-center mb-6">
        The blog post you’re looking for does not exist.
      </p>
      <Link
        href="/product"
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Back to Product
      </Link>
    </div>
  );
};

export default NotFound;
