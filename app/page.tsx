'use client'

import { useState } from 'react'

export default function SplashPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('✓ Successfully subscribed! We\'ll notify you when we launch.')
        setEmail('')
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
        {/* ASCII Art */}
        <pre className="ascii-art text-center mb-8 overflow-x-auto">
{` BBBS   _    _       _  _     _      _     _    _  RFC
 ______／ ＼__／ ＼  ___／ ＼／ ＼___／ ＼ ___／ ＼___／ ＼__／ ＼____
／  _  __ ／＼  _ ＼／  ___／＼  ___＼  ˇ  ／＼  ___＼    ＼__    ＼
＼_／／  __ ＼／  ＼  ＼___  ＼／  __／  ＼／  ＼／  __／   ／ ／ ／ ／＼_／
   ＼__   ／＼   ＼_／  ___／___  ＼__／   ／___  ＼__／  ＼／  ＼  
 20   ＼_／  ＼__／ ＼_／       ＼_／  ＼__／    ＼_／  ＼__／＼__／ 26
            Basement Bulletin Board System
                   [WEBSITE LOADING]`}
        </pre>

        {/* Subscription Form */}
        <div className="terminal-box mx-auto max-w-md">
          <div className="terminal-header mb-4">
            <span className="text-terminal">&gt; EARLY ACCESS NOTIFICATION</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="input-line">
              <span className="prompt-symbol text-terminal">&gt;</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter email address"
                required
                disabled={status === 'loading'}
                className="flex-1 bg-transparent border-none text-terminal outline-none ml-2 font-mono"
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