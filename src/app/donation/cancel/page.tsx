import Link from "next/link"
import { XCircle, Heart, ArrowLeft } from "lucide-react"

export default function DonationCancelPage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Cancel Icon */}
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8">
            <XCircle className="w-12 h-12 text-gray-500" />
          </div>

          {/* Message */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Donation Cancelled
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            No worries! Your donation was not processed. You can still support our mission 
            anytime you feel called to do so.
          </p>

          {/* Alternative Support */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Other Ways to Support</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-3">Share Our Content</h3>
                <p className="text-gray-600 text-sm">
                  Help spread wisdom by sharing our articles with friends and family who might benefit.
                </p>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-xl border border-purple-100">
                <h3 className="font-semibold text-gray-900 mb-3">Join Our Community</h3>
                <p className="text-gray-600 text-sm">
                  Engage with our content, leave thoughtful comments, and help build a supportive community.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/donate"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium flex items-center"
            >
              <Heart className="w-5 h-5 mr-2" />
              Try Donating Again
            </Link>
            
            <Link
              href="/"
              className="px-8 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 border border-gray-300 transition-all duration-200 font-medium flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Continue Reading
            </Link>
          </div>

          {/* Encouragement */}
          <div className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
            <p className="text-gray-700 mb-4">
              Remember, our content will always remain free and accessible to everyone. 
              Your presence and engagement in our community are valuable contributions too.
            </p>
            <blockquote className="text-lg italic text-gray-700">
              "The best way to help yourself is to help others."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  )
}
