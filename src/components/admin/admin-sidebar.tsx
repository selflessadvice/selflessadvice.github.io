"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Tags, 
  DollarSign, 
  Settings, 
  BarChart3,
  MessageSquare,
  Heart,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminSidebarProps {
  user: {
    id: string
    name?: string | null
    email: string
    role: string
  }
}

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["ADMIN", "AUTHOR", "EDITOR"]
  },
  {
    name: "Articles",
    href: "/admin/articles",
    icon: FileText,
    roles: ["ADMIN", "AUTHOR", "EDITOR"]
  },
  {
    name: "New Article",
    href: "/admin/articles/new",
    icon: Plus,
    roles: ["ADMIN", "AUTHOR", "EDITOR"],
    highlight: true
  },
  {
    name: "Comments",
    href: "/admin/comments",
    icon: MessageSquare,
    roles: ["ADMIN", "EDITOR"]
  },
  {
    name: "Tags",
    href: "/admin/tags",
    icon: Tags,
    roles: ["ADMIN", "EDITOR"]
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
    roles: ["ADMIN"]
  },
  {
    name: "Donations",
    href: "/admin/donations",
    icon: Heart,
    roles: ["ADMIN"]
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    roles: ["ADMIN", "EDITOR"]
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["ADMIN"]
  }
]

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()

  const filteredNavigation = navigation.filter(item =>
    item.roles.includes(user.role as any)
  )

  return (
    <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        {/* User Info */}
        <div className="mb-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : item.highlight
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mr-3",
                  isActive ? "text-blue-700" : item.highlight ? "text-white" : "text-gray-500"
                )} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Articles</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">This Month</span>
              <span className="font-medium text-green-600">+8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Views</span>
              <span className="font-medium">12.3k</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
