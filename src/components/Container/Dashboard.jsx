import AvatarCard from '../Card/AvatarCard'
import TrendingCard from '../Card/TrendingCard'
import FloatingMessageWidget from '../Container/FloatingMessaging/FloatingMessageWidget'
export default function Dashboard() {
    return (
        <div className="min-h-screen bg-[var(--thistle-2)] flex justify-center py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-7xl">
                {/* Left Sidebar */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <AvatarCard username="CoolZoomer" connections={1200} />
                    <TrendingCard />
                </div>

                {/* Middle Feed */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    {/* Create Post */}
                    <div className="p-4 bg-white rounded-2xl shadow-md">
                        <input
                            type="text"
                            placeholder="Start a post..."
                            className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[var(--ultra-violet)]"
                        />
                    </div>

                    {/* Example Posts */}
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <h3 className="font-semibold text-lg text-[var(--dark-slate-gray)]">
                            CoolZoomer shared a post
                        </h3>
                        <p className="text-gray-600 mt-2">
                            Excited to start a new project this week! 🚀
                        </p>
                        <img
                            className="rounded-xl mt-3"
                            src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=800&q=80"
                            alt="post"
                        />
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <h3 className="font-semibold text-lg text-[var(--dark-slate-gray)]">
                            dev_guru posted
                        </h3>
                        <p className="text-gray-600 mt-2">
                            React 19 is coming soon! Time to refactor that
                            codebase 😉
                        </p>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <h2 className="font-semibold text-[var(--dark-slate-gray)]">
                            Recent Activity
                        </h2>
                        <ul className="mt-3 text-sm text-gray-600 space-y-2">
                            <li>• Liked post by @ui_master</li>
                            <li>• Commented on “Design Trends 2025”</li>
                            <li>• New follower: @techiequeen</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-white rounded-2xl shadow-md">
                        <h2 className="font-semibold text-[var(--dark-slate-gray)]">
                            Suggestions for You
                        </h2>
                        <ul className="mt-3 text-sm text-gray-600 space-y-2">
                            <li>@frontend_fella</li>
                            <li>@react_queen</li>
                            <li>@codewithsara</li>
                        </ul>
                    </div>
                </div>
            </div>
            <FloatingMessageWidget />
        </div>
    )
}
