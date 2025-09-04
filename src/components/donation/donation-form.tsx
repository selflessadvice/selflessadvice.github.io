"use client"

import { useState } from "react"
import { Heart, CreditCard, Lock } from "lucide-react"
import { motion } from "framer-motion"

const predefinedAmounts = [
  { value: 5, label: "$5" },
  { value: 10, label: "$10" },
  { value: 25, label: "$25" },
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: 0, label: "Custom" }
]

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState(25)
  const [customAmount, setCustomAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    message: "",
    anonymous: false
  })

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    if (amount > 0) {
      setCustomAmount("")
    }
  }

  const getEffectiveAmount = () => {
    return selectedAmount === 0 ? parseFloat(customAmount) || 0 : selectedAmount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = getEffectiveAmount()
    
    if (amount < 1) {
      alert("Please enter a valid donation amount")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/donations/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          ...formData
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { checkoutUrl } = await response.json()
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("Error creating donation:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const effectiveAmount = getEffectiveAmount()

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Amount Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Choose your donation amount
        </label>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount.value}
              type="button"
              onClick={() => handleAmountSelect(amount.value)}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedAmount === amount.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              {amount.label}
            </button>
          ))}
        </div>
        
        {selectedAmount === 0 && (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {/* Donor Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Donor Information (Optional)</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.donorName}
            onChange={(e) => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
            placeholder="Your name"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="email"
            value={formData.donorEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, donorEmail: e.target.value }))}
            placeholder="Your email"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Share a message or why you're supporting us (optional)"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.anonymous}
            onChange={(e) => setFormData(prev => ({ ...prev, anonymous: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Make this donation anonymous</span>
        </label>
      </div>

      {/* Donation Summary */}
      {effectiveAmount > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Donation Amount:</span>
            <span className="text-2xl font-bold text-gray-900">${effectiveAmount.toFixed(2)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Your donation helps us continue providing free, life-changing content to people worldwide.
          </p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || effectiveAmount < 1}
        className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center font-medium text-lg shadow-lg hover:shadow-xl"
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Donate ${effectiveAmount.toFixed(2)}
          </div>
        )}
      </button>

      {/* Security Notice */}
      <div className="flex items-center justify-center text-sm text-gray-600">
        <Lock className="w-4 h-4 mr-2" />
        <span>Secure payment powered by Stripe</span>
      </div>

      {/* Payment Methods */}
      <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-200">
        <CreditCard className="w-8 h-8 text-gray-400" />
        <span className="text-sm text-gray-500">
          We accept all major credit cards and PayPal
        </span>
      </div>
    </motion.form>
  )
}
