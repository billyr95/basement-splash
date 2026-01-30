'use client'

import { useEffect, useRef, useState } from 'react'

export default function AsciiArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const asciiLines = [
      ' BBBS   _    _       _  _     _      _     _    _  RFC',
      ' ______／ ＼__／ ＼  ___／ ＼／ ＼___／ ＼ ___／ ＼___／ ＼__／ ＼____',
      '／  _  __ ／＼  _ ＼／  ___／＼  ___＼  ˇ  ／＼  ___＼    ＼__    ＼',
      '＼_／／  __ ＼／  ＼  ＼___  ＼／  __／  ＼／  ＼／  __／   ／ ／ ／ ／＼_／',
      '   ＼__   ／＼   ＼_／  ___／___  ＼__／   ／___  ＼__／  ＼／  ＼  ',
      ' 20   ＼_／  ＼__／ ＼_／       ＼_／  ＼__／    ＼_／  ＼__／＼__／ 26',
      '            Basement Bulletin Board System',
      '                   [WEBSITE LOADING]'
    ]

    const drawAscii = () => {
      // Responsive font sizing based on screen width
      const screenWidth = window.innerWidth
      let fontSize
      
      if (screenWidth >= 1200) {
        fontSize = 12
      } else if (screenWidth >= 1024) {
        fontSize = 10
      } else if (screenWidth >= 768) {
        fontSize = 10
      } else if (screenWidth >= 600) {
        fontSize = 10
      } else if (screenWidth >= 480) {
        fontSize = 9
      } else {
        fontSize = 8
      }
      
      // Set font first to measure text
      ctx.font = `${fontSize}px "CustomFont", monospace`
      
      // Measure the widest line
      const maxWidth = Math.max(...asciiLines.map(line => ctx.measureText(line).width))
      
      const padding = 20
      const topPadding = fontSize * 0.5 // Extra padding at top to prevent clipping
      
      canvas.width = maxWidth + (padding * 2) // Padding on both sides
      canvas.height = asciiLines.length * (fontSize * 1.5) + topPadding + padding // Add top and bottom padding

      setDimensions({ width: canvas.width, height: canvas.height })

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Style
      ctx.fillStyle = '#8bafc2'
      ctx.font = `${fontSize}px "CustomFont", monospace`
      ctx.textBaseline = 'top'

      // Draw text without glow first (with padding offset)
      asciiLines.forEach((line, i) => {
        ctx.fillText(line, padding, i * (fontSize * 1.5) + topPadding)
      })

      // Add glow effect
      ctx.shadowColor = 'rgba(139, 175, 194, 0.5)'
      ctx.shadowBlur = 10
      asciiLines.forEach((line, i) => {
        ctx.fillText(line, padding, i * (fontSize * 1.5) + topPadding)
      })
    }

    // Initial draw
    drawAscii()

    // Redraw on window resize
    const handleResize = () => {
      drawAscii()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="flex justify-center mb-8 overflow-x-auto px-4">
      <canvas 
        ref={canvasRef} 
        className="max-w-full h-auto"
        style={{ 
          imageRendering: 'crisp-edges',
          width: dimensions.width > 0 ? `${dimensions.width}px` : 'auto',
          height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto'
        }}
      />
    </div>
  )
}