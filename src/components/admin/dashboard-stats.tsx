import { FileText, Users, Eye, Heart, TrendingUp, MessageCircle } from "lucide-react"

const stats = [
  {
    name: "Total Articles",
    value: "42",
    change: "+3",
    changeType: "increase",
    icon: FileText,
    color: "blue"
  },
  {
    name: "Total Views",
    value: "12.3k",
    change: "+15%",
    changeType: "increase",
    icon: Eye,
    color: "green"
  },
  {
    name: "Comments",
    value: "234",
    change: "+8",
    changeType: "increase",
    icon: MessageCircle,
    color: "purple"
  },
  {
    name: "Likes",
    value: "1.2k",
    change: "+12%",
    changeType: "increase",
    icon: Heart,
    color: "red"
  },
  {
    name: "Active Users",
    value: "89",
    change: "+5",
    changeType: "increase",
    icon: Users,
    color: "indigo"
  },
  {
    name: "Donations",
    value: "$2.4k",
    change: "+23%",
    changeType: "increase",
    icon: TrendingUp,
    color: "emerald"
  }
]

const colorClasses = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500"
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${colorClasses[stat.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="mt-4 flex items-center">
            <span className={`text-sm font-medium ${
              stat.changeType === "increase" ? "text-green-600" : "text-red-600"
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  )
}
