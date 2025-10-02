import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { text } = await req.json()

  // Kirim ke AI untuk respon percakapan restoran
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a smart restaurant assistant. Answer user questions about menu, orders, recommendations.' },
      { role: 'user', content: text }
    ]
  })

  const reply = response.choices?.[0]?.message?.content || 'Sorry, I could not understand.'

  return NextResponse.json({ reply })
}
