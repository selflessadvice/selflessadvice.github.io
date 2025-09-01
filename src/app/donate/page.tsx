import { DonationForm } from "@/components/donation/donation-form"
import { DonationImpact } from "@/components/donation/donation-impact"
import { Heart, Globe, Users, BookOpen } from "lucide-react"

export default function DonatePage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 rounded-full text-red-700 text-sm font-medium mb-8">
            <Heart className="w-4 h-4 mr-2" />
            Support Our Mission
          </div>
          
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Help Us Share
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              {" "}Life-Changing Wisdom
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your generous donation helps us continue providing free, transformative content 
            that brings happiness, purpose, and spiritual growth to thousands of lives worldwide.
          </p>

          {/* Mission Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">10k+</div>
              <div className="text-gray-600">Lives Touched</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Articles Shared</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Countries Reached</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-gray-600">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Donation</h2>
              <DonationForm />
            </div>

            {/* Impact Information */}
            <div className="space-y-8">
              <DonationImpact />
              
              {/* Why Donate */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Why Your Support Matters</h3>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Keeps all content completely free and accessible to everyone, regardless of financial situation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Enables us to create more profound, well-researched articles on life's deepest questions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Supports translation efforts to reach non-English speaking communities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Helps maintain and improve the platform for better user experience</span>
                  </li>
                </ul>
              </div>

              {/* Transparency */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Commitment to Transparency</h3>
                <p className="text-gray-700 mb-4">
                  We believe in complete transparency about how your donations are used:
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Content Creation & Research</span>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Maintenance & Development</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Translation & Accessibility</span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Administrative Costs</span>
                    <span className="font-medium">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Kindness
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Every donation, no matter the size, helps us continue our mission of sharing 
            authentic wisdom and helping people find genuine happiness and purpose in life.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <blockquote className="text-lg italic text-gray-700">
              "The best way to find yourself is to lose yourself in the service of others."
            </blockquote>
            <cite className="text-gray-500 mt-2 block">— Mahatma Gandhi</cite>
          </div>
        </div>
      </section>
    </div>
  )
}
