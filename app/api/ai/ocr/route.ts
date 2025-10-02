import { NextResponse } from 'next/server'
import formidable from 'formidable'
import fs from 'fs'
import OpenAI from 'openai'

export const config = { api: { bodyParser: false } }

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const form = new formidable.IncomingForm()
  const data = await new Promise<{ filePath: string }>((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if(err) reject(err)
      resolve({ filePath: (files.image as any).filepath })
    })
  })

  const imageData = fs.readFileSync(data.filePath)

  // OCR + AI recognition
  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: [
      {
        role: 'user',
        content: [
          { type: 'input_text', text: 'Extract menu items from this image and suggest which ones are popular.' },
          { type: 'input_image', image: imageData }
        ]
      }
    ]
  })

  const menuItems = response.output_text?.split('\n').filter(Boolean).map(name => ({ name, reason: 'Detected from image' })) || []

  return NextResponse.json({ menuItems })
}
