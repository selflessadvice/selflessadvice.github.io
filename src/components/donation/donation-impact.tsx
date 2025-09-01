import { BookOpen, Users, Globe, Heart } from "lucide-react"

const impactLevels = [
  {
    amount: 5,
    title: "Spread One Article",
    description: "Your $5 helps us share one transformative article with hundreds of readers",
    icon: BookOpen,
    color: "bg-blue-500",
    impact: "Reaches ~200 people"
  },
  {
    amount: 25,
    title: "Support Weekly Content", 
    description: "Fund the research and creation of meaningful content for an entire week",
    icon: Users,
    color: "bg-green-500",
    impact: "Impacts ~1,000 lives"
  },
  {
    amount: 50,
    title: "Enable Translation",
    description: "Help translate articles to reach non-English speaking communities",
    icon: Globe,
    color: "bg-purple-500",
    impact: "Connects with ~2,500 people"
  },
  {
    amount: 100,
    title: "Monthly Impact",
    description: "Support our entire monthly operation and reach thousands more souls",
    icon: Heart,
    color: "bg-red-500",
    impact: "Transforms ~5,000 lives"
  }
]

export function DonationImpact() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Your Impact</h3>
      
      <div className="space-y-4">
        {impactLevels.map((level) => (
          <div
            key={level.amount}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 ${level.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <level.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{level.title}</h4>
                  <span className="text-lg font-bold text-gray-900">${level.amount}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{level.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                  {level.impact}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Donations */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
        <h4 className="font-semibold text-gray-900 mb-4">Recent Support</h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Anonymous donor</span>
            <span className="font-medium">$50</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sarah M.</span>
            <span className="font-medium">$25</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Michael R.</span>
            <span className="font-medium">$100</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Anonymous donor</span>
            <span className="font-medium">$15</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-purple-200">
          <div className="flex justify-between font-semibold">
            <span className="text-gray-700">This month's total:</span>
            <span className="text-purple-700">$2,340</span>
          </div>
        </div>
      </div>
    </div>
  )
}
