import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const userId = parseInt(url.searchParams.get('userId') || '1')
  const order = await prisma.order.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ completed: order?.status === 'COMPLETED' })
}
