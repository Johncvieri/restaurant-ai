import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' })

export async function POST(req: Request) {
  const { userId, items } = await req.json()

  // Kurangi stock
  for(const i of items){
    await prisma.menuItem.update({
      where: { id: i.id },
      data: { stock: { decrement: i.qty } }
    })
  }

  const line_items = items.map(i => ({
    price_data: {
      currency: 'usd',
      product_data: { name: i.name },
      unit_amount: Math.round(i.price * 100),
    },
    quantity: i.qty,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
  })

  const order = await prisma.order.create({
    data: {
      userId,
      total: items.reduce((a,b)=>a+b.price*b.qty,0),
      paymentId: session.id,
      items: { create: items.map(i => ({ menuItemId: i.id, qty: i.qty, price: i.price })) },
      status: 'PENDING'
    }
  })

  // Notify chef via SSE
  await prisma.notification.create({
    data: {
      message: `New order received: Order #${order.id}`,
      read: false
    }
  })

  return NextResponse.json({ checkoutUrl: session.url })
}
