'use client'
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function HomePage() {
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [recommendations, setRecommendations] = useState<any[]>([])
  
  // Simulasi realtime cek status order setiap 5 detik
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch('/api/order/status?userId=1')
      const data = await res.json()
      if(data.completed) {
        toast.success('Order Completed!')
        clearInterval(interval)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleCheckout = async () => {
    const items = [
      { id: 1, name: "Pizza", price: 10, qty: 1 },
      { id: 2, name: "Burger", price: 8, qty: 2 }
    ]
    const res = await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({ userId: 1, items }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    setCheckoutUrl(data.checkoutUrl)
  }

  const getRecommendation = async () => {
    const res = await fetch('/api/ai/recommend', {
      method: 'POST',
      body: JSON.stringify({ userId: 1 }),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    setRecommendations(data.recommendations)
  }

  useEffect(() => {
    if(checkoutUrl) window.location.href = checkoutUrl
  }, [checkoutUrl])

  return (
    <div className="p-8">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Restaurant AI</h1>

      <button onClick={handleCheckout} className="p-2 bg-green-500 text-white mr-2">Checkout Test</button>
      <button onClick={getRecommendation} className="p-2 bg-blue-500 text-white">Get AI Recommendation</button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">AI Recommendations:</h2>
        {recommendations.length > 0 ? (
          <ul className="list-disc ml-6">
            {recommendations.map((r, idx) => (
              <li key={idx}><strong>{r.name}</strong>: {r.reason}</li>
            ))}
          </ul>
        ) : <p>No recommendations yet.</p>}
      </div>
    </div>
  )
}

<div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Upload Food Image for AI Recommendation:</h2>
  <input type="file" id="foodImage" accept="image/*" className="mb-2"/>
  <button onClick={async () => {
    const fileInput = document.getElementById('foodImage') as HTMLInputElement
    if(!fileInput.files?.length) return alert('Select an image')
    const formData = new FormData()
    formData.append('image', fileInput.files[0])
    const res = await fetch('/api/ai/image', { method: 'POST', body: formData })
    const data = await res.json()
    setRecommendations(data.recommendations)
  }} className="p-2 bg-purple-500 text-white">Upload & Analyze</button>
</div>

<div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Voice Interaction:</h2>
  <button onClick={startVoiceRecognition} className="p-2 bg-yellow-500 text-white mr-2">Speak</button>
  <p id="voiceOutput" className="mt-2 text-gray-700"></p>
</div>

<script>
  const startVoiceRecognition = () => {
    const output = document.getElementById('voiceOutput')
    if (!('webkitSpeechRecognition' in window)) {
      output.textContent = 'Voice recognition not supported in this browser.'
      return
    }

    const recognition = new webkitSpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript
      output.textContent = 'You said: ' + transcript

      // Kirim ke AI untuk respon
      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        body: JSON.stringify({ text: transcript }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await res.json()

      // Mainkan balasan AI
      const utterance = new SpeechSynthesisUtterance(data.reply)
      speechSynthesis.speak(utterance)
    }

    recognition.start()
  }
</script>

<div className="mt-6">
  <h2 className="text-xl font-semibold mb-2">Scan Menu via Image:</h2>
  <input type="file" id="menuImage" accept="image/*" className="mb-2"/>
  <button onClick={async () => {
    const fileInput = document.getElementById('menuImage') as HTMLInputElement
    if(!fileInput.files?.length) return alert('Select an image')
    const formData = new FormData()
    formData.append('image', fileInput.files[0])
    const res = await fetch('/api/ai/ocr', { method: 'POST', body: formData })
    const data = await res.json()
    setRecommendations(data.menuItems)
  }} className="p-2 bg-orange-500 text-white">Scan & Recommend</button>
</div>
