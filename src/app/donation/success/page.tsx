import Link from "next/link"
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react"

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Thank You Message */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Thank You for Your
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              {" "}Generous Heart
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Your donation has been processed successfully. You are now part of our mission 
            to share life-changing wisdom and help people find genuine happiness and purpose.
          </p>

          {/* Impact Message */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-12">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Your Impact</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Your contribution will help us continue providing free access to transformative 
              content, reaching more souls who are seeking wisdom and authentic guidance in their lives.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">Free</div>
                <div className="text-gray-600">Always accessible to everyone</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">Global</div>
                <div className="text-gray-600">Reaching people worldwide</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">Authentic</div>
                <div className="text-gray-600">Genuine wisdom for real transformation</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">What's Next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/"
                className="group bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 mb-2">Explore More Wisdom</h4>
                    <p className="text-gray-600 text-sm">Continue reading our latest articles</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </Link>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 mb-2">Share Our Mission</h4>
                    <p className="text-gray-600 text-sm">Help others discover transformative wisdom</p>
                  </div>
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-700">
              📧 A confirmation email with your donation receipt has been sent to your email address. 
              Please keep it for your records.
            </p>
          </div>

          {/* Gratitude Quote */}
          <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "No act of kindness, no matter how small, is ever wasted."
            </blockquote>
            <cite className="text-gray-600">— Aesop</cite>
          </div>
        </div>
      </div>
    </div>
  )
}
