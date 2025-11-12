import { useState, useEffect, useRef } from 'react'
import { IconSVG } from './IconSVG'

export function DesktopIcon({ iconType, label, onClick, iconSrc, position, onPositionChange, id, iconSize = 32 }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const iconRef = useRef(null)
  const wasDraggingRef = useRef(false)

  const handleMouseDown = (e) => {
    if (e.button !== 0) return // Только левая кнопка мыши
    
    const rect = iconRef.current.getBoundingClientRect()
    const desktopRect = iconRef.current.parentElement.getBoundingClientRect()
    
    dragOffsetRef.current = {
      x: e.clientX - rect.left - desktopRect.left,
      y: e.clientY - rect.top - desktopRect.top
    }
    setIsDragging(true)
    wasDraggingRef.current = false
    e.preventDefault()
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e) => {
      const desktopRect = iconRef.current.parentElement.getBoundingClientRect()
      const newX = e.clientX - desktopRect.left - dragOffsetRef.current.x
      const newY = e.clientY - desktopRect.top - dragOffsetRef.current.y
      
      // Ограничиваем перемещение в пределах рабочего стола
      const maxX = desktopRect.width - 80
      const maxY = desktopRect.height - 60
      
      const clampedX = Math.max(0, Math.min(newX, maxX))
      const clampedY = Math.max(0, Math.min(newY, maxY))
      
      onPositionChange(id, { x: clampedX, y: clampedY })
      wasDraggingRef.current = true
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, id, onPositionChange])

  return (
    <div
      ref={iconRef}
      className="flex flex-col items-center cursor-pointer select-none absolute"
      style={{ 
        width: '80px',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isDragging ? 1000 : 1,
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'pointer',
        opacity: isDragging ? 0.8 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        // Клик срабатывает только если не было перетаскивания
        if (!wasDraggingRef.current) {
          onClick()
        }
        wasDraggingRef.current = false
      }}
    >
      {/* Иконка без рамки */}
      <div 
        className="mb-1 flex items-center justify-center" 
        style={{ 
          width: `${iconSize || 32}px`, 
          height: `${iconSize || 32}px`,
          imageRendering: 'pixelated',
          WebkitImageRendering: 'pixelated',
          MozImageRendering: 'crisp-edges',
          msInterpolationMode: 'nearest-neighbor',
        }}
      >
        <IconSVG type={iconType} customIcon={iconSrc} iconSize={iconSize || 32} />
      </div>
      {/* Подпись с тенью */}
      <span
        className="text-center px-1"
        style={{
          color: '#FFFFFF',
          textShadow: '1px 1px 0px #000000, -1px -1px 0px #000000, 1px -1px 0px #000000, -1px 1px 0px #000000',
          backgroundColor: isHovered ? '#000080' : 'transparent',
          lineHeight: '1.1',
          maxWidth: '80px',
          fontSize: 'var(--font-size, 9pt)',
          fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
          wordBreak: 'break-word',
          hyphens: 'auto',
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
          textRendering: 'optimizeSpeed',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
          fontSmooth: 'never',
          imageRendering: 'pixelated',
          WebkitImageRendering: 'pixelated',
        }}
      >
        {label}
      </span>
    </div>
  )
}

