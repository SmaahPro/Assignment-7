import Link from 'next/link';


const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <div className="space-y-4">

                <h1 className="text-9xl font-extrabold text-blue-600 tracking-widest animate-pulse">
                    404
                </h1>

                <h2 className="text-3xl font-bold text-gray-800">
                    Oops! Page not found
                </h2>

                <div className="pt-6">
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;