'use client'

import { useState } from 'react'
import AsciiArt from '@/components/AsciiArt'

// Common country codes
const countryCodes = [
  { code: '+1', country: 'US/CA', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+52', country: 'MX', flag: '🇲🇽' },
  { code: '+55', country: 'BR', flag: '🇧🇷' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+7', country: 'RU', flag: '🇷🇺' },
  { code: '+82', country: 'KR', flag: '🇰🇷' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+46', country: 'SE', flag: '🇸🇪' },
  { code: '+47', country: 'NO', flag: '🇳🇴' },
  { code: '+45', country: 'DK', flag: '🇩🇰' },
  { code: '+358', country: 'FI', flag: '🇫🇮' },
  { code: '+48', country: 'PL', flag: '🇵🇱' },
  { code: '+420', country: 'CZ', flag: '🇨🇿' },
  { code: '+351', country: 'PT', flag: '🇵🇹' },
  { code: '+30', country: 'GR', flag: '🇬🇷' },
  { code: '+90', country: 'TR', flag: '🇹🇷' },
  { code: '+972', country: 'IL', flag: '🇮🇱' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
  { code: '+27', country: 'ZA', flag: '🇿🇦' },
  { code: '+234', country: 'NG', flag: '🇳🇬' },
  { code: '+20', country: 'EG', flag: '🇪🇬' },
  { code: '+54', country: 'AR', flag: '🇦🇷' },
  { code: '+56', country: 'CL', flag: '🇨🇱' },
  { code: '+57', country: 'CO', flag: '🇨🇴' },
  { code: '+51', country: 'PE', flag: '🇵🇪' },
  { code: '+66', country: 'TH', flag: '🇹🇭' },
  { code: '+65', country: 'SG', flag: '🇸🇬' },
  { code: '+60', country: 'MY', flag: '🇲🇾' },
  { code: '+62', country: 'ID', flag: '🇮🇩' },
  { code: '+63', country: 'PH', flag: '🇵🇭' },
  { code: '+84', country: 'VN', flag: '🇻🇳' },
  { code: '+64', country: 'NZ', flag: '🇳🇿' },
]

export default function SplashPage() {
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState('+1')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '')
    // Limit to 15 digits (international max)
    setPhone(value.slice(0, 15))
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

    // Validate phone if provided (must have at least 7 digits)
    if (phone && phone.length < 7) {
      setStatus('error')
      setMessage('✗ Please enter a valid phone number.')
      setTimeout(() => {
        setStatus('idle')
        setMessage('')
      }, 5000)
      return
    }

    setStatus('loading')

    // Format phone with selected country code for Laylo
    const formattedPhone = phone ? `${countryCode}${phone}` : null

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

            {/* Phone Input with country code dropdown */}
            <div className="input-line">
              <span className="prompt-symbol text-terminal">&gt;</span>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={status === 'loading'}
                className="bg-transparent border-none text-terminal outline-none ml-2 font-mono cursor-pointer"
                style={{ appearance: 'none', paddingRight: '4px' }}
              >
                {countryCodes.map((country) => (
                  <option 
                    key={country.code} 
                    value={country.code}
                    className="bg-black text-terminal"
                  >
                    {country.flag} {country.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="phone number (optional)"
                disabled={status === 'loading'}
                className="flex-1 bg-transparent border-none text-terminal outline-none pl-[5px] font-mono"
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