import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for does not exist.</p>
      <Link to="/" className="text-cyan-400 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
