import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { DashboardStats } from "@/components/admin/dashboard-stats"
import { RecentArticles } from "@/components/admin/recent-articles"
import { QuickActions } from "@/components/admin/quick-actions"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with Selfless Advice today.
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Articles */}
      <RecentArticles />
    </div>
  )
}
