import { useState, useEffect, useRef, useCallback } from 'react'

export function Window({ id, title, icon, isOpen, onClose, onMinimize, onMaximize, isMinimized, isMaximized, position, onPositionChange, onFocus, zIndex, children, initialSize, onSizeChangeRequest }) {
  const windowRef = useRef(null)
  const titleBarRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const wasDraggingRef = useRef(false)
  const defaultSize = initialSize || { width: 600, height: 400 }
  const [size, setSize] = useState(defaultSize)
  const savedSizeRef = useRef(defaultSize)
  const savedPositionRef = useRef({ x: 100, y: 100 })
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const updateWindowSize = useCallback((newSize) => {
    if (!isMaximized && newSize && newSize.width && newSize.height) {
      // Обновляем только если размер действительно изменился
      setSize(prevSize => {
        if (prevSize.width === newSize.width && prevSize.height === newSize.height) {
          return prevSize
        }
        return newSize
      })
    }
  }, [isMaximized])

  // Предоставляем функцию обновления размера через callback
  useEffect(() => {
    if (onSizeChangeRequest) {
      onSizeChangeRequest(updateWindowSize)
    }
  }, [onSizeChangeRequest, updateWindowSize])

  const handleTitleBarMouseDown = (e) => {
    if (e.button !== 0 || isMaximized) return
    
    const rect = windowRef.current.getBoundingClientRect()
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    setIsDragging(true)
    wasDraggingRef.current = false
    e.preventDefault()
  }

  useEffect(() => {
    if (!isDragging || isMaximized) return

    const handleMouseMove = (e) => {
      const newX = e.clientX - dragOffsetRef.current.x
      const newY = e.clientY - dragOffsetRef.current.y
      
      const maxX = window.innerWidth - 50
      const maxY = window.innerHeight - 100
      
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
  }, [isDragging, id, onPositionChange, isMaximized])

  const handleMaximize = () => {
    if (isMaximized) {
      setSize(savedSizeRef.current)
      onPositionChange(id, savedPositionRef.current)
      onMaximize(id, false)
    } else {
      savedSizeRef.current = size
      savedPositionRef.current = position
      setSize({ width: window.innerWidth, height: window.innerHeight - 36 })
      onPositionChange(id, { x: 0, y: 0 })
      onMaximize(id, true)
    }
  }

  // Анимация открытия
  useEffect(() => {
    if (isOpen && !isClosing) {
      setIsOpening(true)
      let frameId1, frameId2
      frameId1 = requestAnimationFrame(() => {
        frameId2 = requestAnimationFrame(() => {
          setIsOpening(false)
        })
      })
      return () => {
        if (frameId1) cancelAnimationFrame(frameId1)
        if (frameId2) cancelAnimationFrame(frameId2)
      }
    } else if (!isOpen && !isClosing) {
      setIsOpening(false)
    }
  }, [isOpen, isClosing])

  // Обработка закрытия с анимацией
  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose(id)
      setIsClosing(false)
    }, 200)
  }

  if (!isOpen && !isClosing) return null

  const windowStyle = {
    position: 'absolute',
    left: isMaximized ? 0 : `${position.x}px`,
    top: isMaximized ? 0 : `${position.y}px`,
    width: isMaximized ? '100%' : `${size.width}px`,
    height: isMaximized ? 'calc(100% - 30px)' : `${size.height}px`,
    display: isMinimized ? 'none' : 'flex',
    flexDirection: 'column',
    background: '#ECE9D8',
    border: '2px solid',
    borderTopColor: '#FFFFFF',
    borderLeftColor: '#FFFFFF',
    borderRightColor: '#424142',
    borderBottomColor: '#424142',
    borderRadius: '0',
    boxShadow: 'inset -1px -1px 0px #808080, inset 1px 1px 0px #FFFFFF',
    zIndex: zIndex,
    fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
    padding: '2px',
    transform: isClosing ? 'scale(0.7)' : isOpening ? 'scale(0.7)' : 'scale(1)',
    opacity: isClosing ? 0 : isOpening ? 0 : 1,
    transition: isClosing 
      ? 'transform 0.2s ease-in, opacity 0.2s ease-in' 
      : isOpening 
        ? 'transform 0.2s ease-out, opacity 0.2s ease-out' 
        : 'none',
    transformOrigin: 'center center',
  }

  const handleWindowMouseDown = (e) => {
    onFocus(id)
  }

  return (
    <div 
      ref={windowRef} 
      style={windowStyle}
      onMouseDown={handleWindowMouseDown}
    >
      {/* Title Bar */}
      <div
        ref={titleBarRef}
        onMouseDown={handleTitleBarMouseDown}
        style={{
          height: '18px',
          background: 'linear-gradient(to bottom, #0A246A 0%, #A6CAF0 50%, #0A246A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2px 0 3px',
          cursor: isMaximized ? 'default' : 'move',
          userSelect: 'none',
          borderBottom: '1px solid #424142',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, minWidth: 0, paddingLeft: '3px' }}>
          {icon && (
            <img
              src={icon}
              alt=""
              width="20"
              height="20"
              style={{
                imageRendering: 'pixelated',
                WebkitImageRendering: 'pixelated',
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 'var(--font-size, 9pt)',
              fontWeight: 'normal',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              lineHeight: '18px',
            }}
          >
            {title}
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1px', marginRight: '1px' }}>
          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMinimize(id, !isMinimized)
            }}
            style={{
              width: '18px',
              height: '16px',
              background: '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#424142',
              borderBottomColor: '#424142',
              borderRadius: '0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              boxSizing: 'border-box',
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.currentTarget.style.borderTopColor = '#424142'
              e.currentTarget.style.borderLeftColor = '#424142'
              e.currentTarget.style.borderRightColor = '#FFFFFF'
              e.currentTarget.style.borderBottomColor = '#FFFFFF'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderTopColor = '#FFFFFF'
              e.currentTarget.style.borderLeftColor = '#FFFFFF'
              e.currentTarget.style.borderRightColor = '#424142'
              e.currentTarget.style.borderBottomColor = '#424142'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D4D0C8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C0C0C0'
            }}
          >
            <span style={{ 
              color: '#000000', 
              fontSize: 'var(--font-size, 9pt)', 
              lineHeight: '1',
              fontFamily: 'Tahoma, sans-serif',
              marginTop: '-2px',
            }}>_</span>
          </button>
          {/* Maximize/Restore Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleMaximize()
            }}
            style={{
              width: '18px',
              height: '16px',
              background: '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#424142',
              borderBottomColor: '#424142',
              borderRadius: '0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              boxSizing: 'border-box',
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.currentTarget.style.borderTopColor = '#424142'
              e.currentTarget.style.borderLeftColor = '#424142'
              e.currentTarget.style.borderRightColor = '#FFFFFF'
              e.currentTarget.style.borderBottomColor = '#FFFFFF'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderTopColor = '#FFFFFF'
              e.currentTarget.style.borderLeftColor = '#FFFFFF'
              e.currentTarget.style.borderRightColor = '#424142'
              e.currentTarget.style.borderBottomColor = '#424142'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D4D0C8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C0C0C0'
            }}
          >
            {isMaximized ? (
              <div style={{ 
                width: '10px', 
                height: '10px', 
                border: '1px solid #000', 
                background: '#C0C0C0',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1px',
                  left: '1px',
                  width: '6px',
                  height: '6px',
                  border: '1px solid #000',
                  background: '#FFFFFF',
                }} />
              </div>
            ) : (
              <div style={{ 
                width: '10px', 
                height: '10px', 
                border: '1px solid #000', 
                background: '#C0C0C0', 
                position: 'relative' 
              }}>
                <div style={{ 
                  position: 'absolute', 
                  top: '-2px', 
                  left: '-2px', 
                  width: '8px', 
                  height: '8px', 
                  border: '1px solid #000', 
                  background: '#FFFFFF' 
                }} />
              </div>
            )}
          </button>
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            style={{
              width: '18px',
              height: '16px',
              background: '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#424142',
              borderBottomColor: '#424142',
              borderRadius: '0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              margin: 0,
              boxSizing: 'border-box',
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              e.currentTarget.style.borderTopColor = '#424142'
              e.currentTarget.style.borderLeftColor = '#424142'
              e.currentTarget.style.borderRightColor = '#FFFFFF'
              e.currentTarget.style.borderBottomColor = '#FFFFFF'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderTopColor = '#FFFFFF'
              e.currentTarget.style.borderLeftColor = '#FFFFFF'
              e.currentTarget.style.borderRightColor = '#424142'
              e.currentTarget.style.borderBottomColor = '#424142'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#C00000'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C0C0C0'
              e.currentTarget.style.color = '#000000'
            }}
          >
            <span style={{ 
              color: 'inherit', 
              fontSize: 'var(--font-size, 9pt)', 
              lineHeight: '1',
              fontFamily: 'Tahoma, sans-serif',
              fontWeight: 'bold',
            }}>×</span>
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="window-content"
        style={{
          flex: (id === 'minesweeper' || id === 'snake') ? '0 0 auto' : 1,
          background: '#ECE9D8',
          overflow: (id === 'minesweeper' || id === 'snake') ? 'hidden' : 'auto',
          padding: '0',
          border: '1px solid',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#FFFFFF',
          borderBottomColor: '#FFFFFF',
          boxShadow: 'inset 1px 1px 0px #424142',
        }}
        onClick={() => onFocus(id)}
      >
        {children}
      </div>
    </div>
  )
}

