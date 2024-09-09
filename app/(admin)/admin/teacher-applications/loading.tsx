export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="grid grid-cols-2 gap-4 w-full max-w-4xl">
                <div className="flex items-center justify-center">
                    <div className="animate-spin">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v1m0 14v1m8-8h1M4 12H3m16.24-6.24l-.707.707M5.76 18.36l-.707.707M18.36 18.36l-.707-.707M5.76 5.76l-.707-.707"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <p className="text-lg text-gray-700">Cargando, por favor espere...</p>
                </div>
            </div>
        </div>
    );
}