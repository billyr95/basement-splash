'use client'

import { useState } from 'react'
import AsciiArt from '@/components/AsciiArt'

export default function SplashPage() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '')
    // Limit to 10 digits (US/Canada format)
    setPhone(value.slice(0, 10))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Require at least one input
    if (!email && !phone) {
      setStatus('error')
      setMessage('✗ Please provide an email or phone number.')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
      return
    }

    // Validate phone if provided (must be 10 digits)
    if (phone && phone.length !== 10) {
      setStatus('error')
      setMessage('✗ Please enter a valid 10-digit phone number.')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
      return
    }

    setStatus('loading')

    // Format phone with +1 prefix for Laylo
    const formattedPhone = phone ? `+1${phone}` : null

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email || null, phone: formattedPhone }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        const subscribed = []
        if (data.email?.synced) subscribed.push('email')
        if (data.phone?.synced) subscribed.push('phone')
        setMessage(`✓ Successfully subscribed with ${subscribed.join(' and ')}! We'll notify you when we launch.`)
        setEmail('')
        setPhone('')
      } else {
        setStatus('error')
        setMessage(data.error || '✗ Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('✗ Network error. Please try again.')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 5000)
  }

  return (
    <main className="min-h-screen bg-black text-terminal flex flex-col items-center justify-center p-4">
      <div className="container max-w-4xl">
        {/* ASCII Art Canvas */}
        <AsciiArt />

        {/* Subscription Form */}
        <div className="terminal-box mx-auto max-w-md">
          <div className="terminal-header mb-4">
            <span className="text-terminal">&gt; EARLY ACCESS NOTIFICATION</span>
          </div>

          <p className="text-terminal text-sm mb-6 opacity-70 text-center">
            Enter your email or phone number (or both) to get notified when we launch.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="input-line">
              <span className="prompt-symbol text-terminal">&gt;</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email address (optional)"
                disabled={status === 'loading'}
                className="flex-1 bg-transparent border-none text-terminal outline-none ml-2 font-mono"
              />
            </div>

            {/* Phone Input with +1 prefix */}
            <div className="input-line">
              <span className="prompt-symbol text-terminal">&gt;</span>
              <span className="text-terminal ml-2 font-mono">+1</span>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="phone number (optional)"
                disabled={status === 'loading'}
                className="flex-1 bg-transparent border-none text-terminal outline-none ml-1 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="terminal-button w-full"
            >
              {status === 'loading' ? '[ SUBMITTING... ]' : '[ NOTIFY ME ]'}
            </button>

            {message && (
              <div className={`message ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                {message}
              </div>
            )}
          </form>

          <div className="terminal-footer mt-6 text-center text-xs opacity-70">
            <p>© 2026 BASEMENT BBS - LAUNCHING SOON</p>
          </div>
        </div>
      </div>
    </main>
  )
}