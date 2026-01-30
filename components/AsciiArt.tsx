'use client'

import { useEffect, useRef } from 'react'

export default function AsciiArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const asciiLines = [
      ' BBBS   _    _       _  _     _      _     _    _  RFC',
      ' ______/ \\__/ \\  ___/ \\/  \\___/  \\ ___/  \\___/  \\__/  \\____',
      '/  _  __ /\\  _ \\/  ___/\\  ___\\  ^  /\\  ___\\    \\__    \\',
      '\\_//  __ \\/  \\  \\___  \\/  __/  \\/  \\/  __/   / / / /\\_/',
      '   \\__   /\\   \\_/  ___/___  \\__/   /___  \\__/  \\/  \\  ',
      ' 20   \\_/  \\__/ \\_/       \\_/  \\__/    \\_/  \\__/\\__/ 26',
      '            Basement Bulletin Board System',
      '                   [WEBSITE LOADING]'
    ]

    // Set canvas size based on text
    const charWidth = 9
    const lineHeight = 18
    const maxWidth = Math.max(...asciiLines.map(line => line.length))
    
    canvas.width = maxWidth * charWidth
    canvas.height = asciiLines.length * lineHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Style
    ctx.fillStyle = '#8bafc2'
    ctx.font = '16px "Courier New", monospace'
    ctx.textBaseline = 'top'

    // Draw text without glow first
    asciiLines.forEach((line, i) => {
      ctx.fillText(line, 0, i * lineHeight)
    })

    // Add glow effect
    ctx.shadowColor = 'rgba(139, 175, 194, 0.5)'
    ctx.shadowBlur = 10
    asciiLines.forEach((line, i) => {
      ctx.fillText(line, 0, i * lineHeight)
    })

  }, [])

  return (
    <div className="flex justify-center mb-8 overflow-x-auto">
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto"
        style={{ imageRendering: 'crisp-edges' }}
      />
    </div>
  )
}