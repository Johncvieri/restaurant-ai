import { NextResponse } from 'next/server'
import formidable from 'formidable'
import fs from 'fs'
import OpenAI from 'openai'

export const config = {
  api: { bodyParser: false }
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const form = new formidable.IncomingForm()
  const data = await new Promise<{ filePath: string }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if(err) reject(err)
      resolve({ filePath: (files.image as any).filepath })
    })
  })

  // Kirim gambar ke OpenAI Image API / Vision
  const imageData = fs.readFileSync(data.filePath)
  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        role: 'user',
        content: [
          { type: 'input_text', text: 'Analyze this food image and recommend similar menu items.' },
          { type: 'input_image', image: imageData }
        ]
      }
    ]
  })

  // Ambil rekomendasi
  const recommendations = response.output_text?.split('\n').filter(Boolean).map(r => ({ name: r, reason: 'Image based AI' })) || []

  return NextResponse.json({ recommendations })
}
