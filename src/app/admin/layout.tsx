import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  if (!["ADMIN", "AUTHOR", "EDITOR"].includes(session.user.role)) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="flex">
        <AdminSidebar user={session.user} />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
