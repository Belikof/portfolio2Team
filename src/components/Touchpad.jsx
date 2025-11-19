import { useState, useRef, useEffect, useCallback } from 'react'

export function Touchpad({ gameBoardRef, onCellClick, enabled = true }) {
  const touchpadRef = useRef(null)
  const touchAreaRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const virtualCursorRef = useRef({ x: 0, y: 0 })
  const startTouchRef = useRef(null)
  const lastMoveTimeRef = useRef(0)
  const processedMouseImageRef = useRef(null)

  // SVG файл уже имеет прозрачный фон, обработка не требуется

  const rafIdRef = useRef(null)
  const lastUpdatePosRef = useRef({ x: 0, y: 0 })
  const cursorElRef = useRef(null)
  
  const updateVisualCursor = useCallback(() => {
    if (!gameBoardRef?.current) return
    
    // Создаем элемент курсора если его нет
    if (!cursorElRef.current) {
      cursorElRef.current = document.getElementById('virtual-cursor-minesweeper')
      if (!cursorElRef.current) {
        cursorElRef.current = document.createElement('div')
        cursorElRef.current.id = 'virtual-cursor-minesweeper'
        document.body.appendChild(cursorElRef.current)
      }
    }
    
    const boardRect = gameBoardRef.current.getBoundingClientRect()
    if (boardRect.width === 0 || boardRect.height === 0) return
    
    const newX = boardRect.left + virtualCursorRef.current.x
    const newY = boardRect.top + virtualCursorRef.current.y
    
    // Всегда обновляем курсор
    cursorElRef.current.style.position = 'fixed'
    cursorElRef.current.style.width = '24px'
    cursorElRef.current.style.height = '24px'
    cursorElRef.current.style.backgroundImage = 'url("/23231.svg")'
    cursorElRef.current.style.backgroundSize = '24px 24px'
    cursorElRef.current.style.backgroundRepeat = 'no-repeat'
    cursorElRef.current.style.backgroundColor = 'transparent'
    cursorElRef.current.style.pointerEvents = 'none'
    cursorElRef.current.style.zIndex = '10001'
    cursorElRef.current.style.left = `${newX}px`
    cursorElRef.current.style.top = `${newY}px`
    cursorElRef.current.style.display = 'block'
    cursorElRef.current.style.imageRendering = 'pixelated'
    cursorElRef.current.style.webkitImageRendering = 'pixelated'
    cursorElRef.current.style.willChange = 'transform'
    
    lastUpdatePosRef.current = { x: newX, y: newY }
  }, [gameBoardRef])

  useEffect(() => {
    if (!enabled || !gameBoardRef?.current) return

    // Инициализация виртуального курсора в центре игрового поля
    const initCursor = () => {
      if (!gameBoardRef?.current) {
        setTimeout(initCursor, 100)
        return
      }
      
      const boardRect = gameBoardRef.current.getBoundingClientRect()
      if (boardRect.width === 0 || boardRect.height === 0) {
        // Поле еще не отрендерено, пробуем снова
        setTimeout(initCursor, 100)
        return
      }
      
      if (!virtualCursorRef.current.initialized) {
        virtualCursorRef.current.x = boardRect.width / 2
        virtualCursorRef.current.y = boardRect.height / 2
        virtualCursorRef.current.initialized = true
        lastUpdatePosRef.current = { x: 0, y: 0 } // Сбрасываем для принудительного обновления
      }
      
      // Обновляем курсор с небольшой задержкой для гарантии отображения
      setTimeout(() => {
        updateVisualCursor()
      }, 50)
    }
    
    initCursor()
  }, [enabled, gameBoardRef, updateVisualCursor])

  useEffect(() => {
    if (!enabled || !gameBoardRef?.current) return

    const handleTouchStart = (e) => {
      if (!enabled || !touchAreaRef.current) return
      e.preventDefault()
      const touch = e.touches[0]
      const touchArea = touchAreaRef.current.getBoundingClientRect()
      
      // Получаем позицию относительно области тачпада
      const x = touch.clientX - touchArea.left
      const y = touch.clientY - touchArea.top
      
      setIsActive(true)
      startTouchRef.current = { 
        touchpadX: x, 
        touchpadY: y,
        cursorX: virtualCursorRef.current.x,
        cursorY: virtualCursorRef.current.y,
        time: Date.now() 
      }
      setCursorPos({ x, y })
    }

    const handleTouchMove = (e) => {
      if (!enabled || !isActive || !gameBoardRef?.current || !touchAreaRef.current) return
      e.preventDefault()
      const touch = e.touches[0]
      const touchArea = touchAreaRef.current.getBoundingClientRect()
      
      // Получаем позицию относительно области тачпада
      const touchpadX = touch.clientX - touchArea.left
      const touchpadY = touch.clientY - touchArea.top
      
      // Ограничиваем позицию в пределах тачпада
      const clampedX = Math.max(0, Math.min(touchpadX, touchArea.width))
      const clampedY = Math.max(0, Math.min(touchpadY, touchArea.height))
      setCursorPos({ x: clampedX, y: clampedY })
      
      // Маппим позицию на тачпаде в позицию на игровом поле
      if (startTouchRef.current) {
        const boardRect = gameBoardRef.current.getBoundingClientRect()
        
        // Вычисляем смещение от начальной позиции на тачпаде
        const deltaX = clampedX - startTouchRef.current.touchpadX
        const deltaY = clampedY - startTouchRef.current.touchpadY
        
        // Масштабируем движение (можно настроить чувствительность)
        const sensitivity = 1.0
        const newX = startTouchRef.current.cursorX + (deltaX * sensitivity)
        const newY = startTouchRef.current.cursorY + (deltaY * sensitivity)
        
        // Ограничиваем позицию в пределах игрового поля
        virtualCursorRef.current.x = Math.max(0, Math.min(boardRect.width, newX))
        virtualCursorRef.current.y = Math.max(0, Math.min(boardRect.height, newY))
        
        lastMoveTimeRef.current = Date.now()
      }
      
      // Обновляем визуальный курсор через requestAnimationFrame для плавности
      updateVisualCursor()
    }

    const handleTouchEnd = (e) => {
      if (!enabled || !isActive || !gameBoardRef?.current) return
      e.preventDefault()
      
      const touchDuration = Date.now() - (startTouchRef.current?.time || 0)
      const totalMovement = startTouchRef.current ? 
        Math.abs(virtualCursorRef.current.x - startTouchRef.current.cursorX) + 
        Math.abs(virtualCursorRef.current.y - startTouchRef.current.cursorY) : 0
      
      // Если было короткое нажатие с минимальным движением - это клик
      // Или если движение было очень маленьким (меньше 10px) - тоже клик
      if (touchDuration < 500 && totalMovement < 15) {
        const boardRect = gameBoardRef.current.getBoundingClientRect()
        const x = boardRect.left + virtualCursorRef.current.x
        const y = boardRect.top + virtualCursorRef.current.y
        
        // Находим элемент под курсором
        const element = document.elementFromPoint(x, y)
        
        if (element) {
          // Симулируем события мыши для корректной работы
          const mouseDownEvent = new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            button: 0,
          })
          const mouseUpEvent = new MouseEvent('mouseup', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            button: 0,
          })
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y,
            button: 0,
          })
          
          element.dispatchEvent(mouseDownEvent)
          setTimeout(() => {
            element.dispatchEvent(mouseUpEvent)
            element.dispatchEvent(clickEvent)
          }, 10)
        }
      }
      
      setIsActive(false)
      startTouchRef.current = null
      updateVisualCursor()
    }

    const touchpad = touchpadRef.current
    if (touchpad) {
      touchpad.addEventListener('touchstart', handleTouchStart, { passive: false })
      touchpad.addEventListener('touchmove', handleTouchMove, { passive: false })
      touchpad.addEventListener('touchend', handleTouchEnd, { passive: false })
      
      return () => {
        touchpad.removeEventListener('touchstart', handleTouchStart)
        touchpad.removeEventListener('touchmove', handleTouchMove)
        touchpad.removeEventListener('touchend', handleTouchEnd)
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current)
        }
      }
    }
  }, [enabled, isActive, gameBoardRef, updateVisualCursor, touchAreaRef])

  if (!enabled) return null

  return (
    <div
      ref={touchpadRef}
      style={{
        position: 'relative',
        width: '100%',
        flex: '0 0 auto',
        height: '300px',
        minHeight: '280px',
        maxHeight: '400px',
        background: '#C0C0C0',
        border: '2px solid',
        borderTopColor: '#808080',
        borderLeftColor: '#808080',
        borderRightColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        marginTop: '8px',
        touchAction: 'none',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{
        padding: '4px 8px',
        fontSize: 'var(--font-size, 8pt)',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        color: '#000000',
        textAlign: 'center',
        borderBottom: '1px solid #808080',
      }}>
        Тачпад
      </div>
      <div 
        ref={touchAreaRef}
        style={{
          flex: 1,
          background: '#D4D0C8',
          border: '1px inset #808080',
          margin: '8px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '200px',
        }}
      >
        {isActive && (
          <div style={{
            position: 'absolute',
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            width: '12px',
            height: '12px',
            background: '#000080',
            border: '1px solid #FFFFFF',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }} />
        )}
        {!isActive && (
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#808080',
            textAlign: 'center',
          }}>
            Двигайте пальцем для управления
          </div>
        )}
      </div>
    </div>
  )
}

