import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil"
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("stripe-signature")!
    
    let event: Stripe.Event
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      )
    }
    
    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        
        // Create donation record in database
        await prisma.donation.create({
          data: {
            amount: (session.amount_total! / 100), // Convert from cents
            currency: session.currency!.toUpperCase(),
            stripePaymentId: session.payment_intent as string,
            stripeSessionId: session.id,
            donorEmail: session.metadata?.donorEmail || session.customer_details?.email,
            donorName: session.metadata?.donorName || session.customer_details?.name,
            message: session.metadata?.message,
            anonymous: session.metadata?.anonymous === "true",
            userId: session.metadata?.userId || null,
            status: "COMPLETED"
          }
        })
        
        console.log("Donation recorded successfully:", session.id)
        break
        
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent
        
        // Update donation status to failed if exists
        const existingDonation = await prisma.donation.findFirst({
          where: {
            stripePaymentId: failedPayment.id
          }
        })
        
        if (existingDonation) {
          await prisma.donation.update({
            where: { id: existingDonation.id },
            data: { status: "FAILED" }
          })
        }
        
        console.log("Payment failed:", failedPayment.id)
        break
        
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
    
    return NextResponse.json({ received: true })
    
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }
}
