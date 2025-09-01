import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { donationSchema } from "@/lib/validations"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil"
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const validatedData = donationSchema.parse(body)
    
    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: validatedData.currency.toLowerCase(),
            product_data: {
              name: "Donation to Selfless Advice",
              description: validatedData.message || "Supporting life-changing wisdom and advice"
            },
            unit_amount: Math.round(validatedData.amount * 100) // Convert to cents
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/donation/cancel`,
      metadata: {
        donorName: validatedData.donorName || "",
        donorEmail: validatedData.donorEmail || "",
        message: validatedData.message || "",
        anonymous: validatedData.anonymous.toString(),
        userId: session?.user?.id || ""
      }
    })
    
    return NextResponse.json({
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id
    })
    
  } catch (error) {
    console.error("Create checkout session error:", error)
    
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Invalid input data", details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
