export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[var(--thistle-2)] flex flex-col items-center justify-center relative">
            <h1
                className="text-3xl font-bold mb-10"
                style={{ color: 'var(--ultra-violet)' }}
            >
                Welcome to Dashboard
            </h1>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl shadow-md">
                    <h2 className="font-semibold text-lg text-[var(--dark-slate-gray)]">
                        Your Stats
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-md">
                    <h2 className="font-semibold text-lg text-[var(--dark-slate-gray)]">
                        Recent Activity
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
                </div>
            </div>
        </div>
    )
}
