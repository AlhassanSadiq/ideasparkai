export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin-reverse"></div>
            </div>
            <p className="text-gray-400 animate-pulse text-sm font-medium">Sparking creativity...</p>
        </div>
    );
}
