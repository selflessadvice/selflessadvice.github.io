import Link from "next/link"
import { Plus, Edit, BarChart3, Settings, Users, MessageCircle } from "lucide-react"

const actions = [
  {
    name: "Write New Article",
    description: "Share your wisdom with the world",
    href: "/admin/articles/new",
    icon: Plus,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    featured: true
  },
  {
    name: "Manage Articles",
    description: "Edit and organize your content",
    href: "/admin/articles",
    icon: Edit,
    color: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  {
    name: "View Analytics",
    description: "Track your impact and reach",
    href: "/admin/analytics",
    icon: BarChart3,
    color: "bg-gradient-to-r from-green-500 to-green-600"
  },
  {
    name: "Moderate Comments",
    description: "Engage with your community",
    href: "/admin/comments",
    icon: MessageCircle,
    color: "bg-gradient-to-r from-orange-500 to-orange-600"
  },
  {
    name: "Manage Users",
    description: "Oversee community members",
    href: "/admin/users",
    icon: Users,
    color: "bg-gradient-to-r from-indigo-500 to-indigo-600"
  },
  {
    name: "Site Settings",
    description: "Configure your platform",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-gradient-to-r from-gray-500 to-gray-600"
  }
]

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => (
          <Link
            key={action.name}
            href={action.href}
            className={`group relative overflow-hidden rounded-lg p-6 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${action.color} ${
              action.featured ? "md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{action.name}</h3>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
              <action.icon className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full" />
          </Link>
        ))}
      </div>
    </div>
  )
}
