import { useState, useEffect, useCallback, useRef } from 'react'

const GRID_SIZE = 20
const CELL_SIZE = 16
const INITIAL_SPEED = 150

export function SnakeGame({ onSizeChange }) {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }])
  const [food, setFood] = useState({ x: 15, y: 15 })
  const [direction, setDirection] = useState({ x: 1, y: 0 })
  const [gameState, setGameState] = useState('ready') // ready, playing, paused, gameOver
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const gameLoopRef = useRef(null)
  const directionRef = useRef({ x: 1, y: 0 })
  const containerRef = useRef(null)
  const sizeUpdaterRef = useRef(null)

  // Обновляем directionRef при изменении direction
  useEffect(() => {
    directionRef.current = direction
  }, [direction])

  // Генерация новой еды
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
    // Проверяем, что еда не на змейке
    const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    if (isOnSnake) {
      return generateFood()
    }
    return newFood
  }, [snake])

  // Инициализация игры
  const initGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }])
    setDirection({ x: 1, y: 0 })
    directionRef.current = { x: 1, y: 0 }
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setGameState('ready')
    const newFood = generateFood()
    setFood(newFood)
  }, [generateFood])

  // Обработка нажатий клавиш
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState === 'gameOver' || gameState === 'ready') return

      const key = e.key.toLowerCase()
      const currentDir = directionRef.current

      if (key === 'arrowup' || key === 'w') {
        if (currentDir.y === 0) {
          setDirection({ x: 0, y: -1 })
        }
      } else if (key === 'arrowdown' || key === 's') {
        if (currentDir.y === 0) {
          setDirection({ x: 0, y: 1 })
        }
      } else if (key === 'arrowleft' || key === 'a') {
        if (currentDir.x === 0) {
          setDirection({ x: -1, y: 0 })
        }
      } else if (key === 'arrowright' || key === 'd') {
        if (currentDir.x === 0) {
          setDirection({ x: 1, y: 0 })
        }
      } else if (key === ' ') {
        e.preventDefault()
        if (gameState === 'playing') {
          setGameState('paused')
        } else if (gameState === 'paused') {
          setGameState('playing')
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState])

  // Игровой цикл
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
      return
    }

    gameLoopRef.current = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0]
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        }

        // Проверка столкновения со стенами
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameState('gameOver')
          return prevSnake
        }

        // Проверка столкновения с собой
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameState('gameOver')
          return prevSnake
        }

        const newSnake = [newHead, ...prevSnake]

        // Проверка поедания еды
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => {
            const newScore = prev + 1
            // Увеличиваем скорость каждые 5 очков
            if (newScore % 5 === 0) {
              setSpeed(prevSpeed => Math.max(50, prevSpeed - 10))
            }
            return newScore
          })
          setFood(generateFood())
          return newSnake
        }

        // Удаляем хвост, если не съели еду
        newSnake.pop()
        return newSnake
      })
    }, speed)

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }
  }, [gameState, speed, food, generateFood])

  const handleStart = () => {
    if (gameState === 'ready' || gameState === 'gameOver') {
      initGame()
      setGameState('playing')
    } else if (gameState === 'paused') {
      setGameState('playing')
    }
  }

  const handleReset = () => {
    initGame()
  }

  // Получаем функцию обновления размера окна
  useEffect(() => {
    if (onSizeChange) {
      sizeUpdaterRef.current = onSizeChange
    }
    return () => {
      sizeUpdaterRef.current = null
    }
  }, [onSizeChange])

  // Обновляем размер окна
  useEffect(() => {
    const boardWidth = GRID_SIZE * CELL_SIZE + 4 + 4 // 320 + 8 = 328
    // Высота: padding контейнера (8) + инструкции (~18) + marginBottom (4) + панель управления (~28) + marginBottom (4) + игровое поле (324) = 386
    const totalHeight = 8 + 18 + 4 + 28 + 4 + (GRID_SIZE * CELL_SIZE + 4)
    const contentWidth = boardWidth + 8
    const contentHeight = totalHeight

    const windowWidth = contentWidth + 4 + 4 + 2
    const windowHeight = contentHeight + 4 + 4 + 2 + 18

    if (sizeUpdaterRef.current && windowWidth > 0 && windowHeight > 0) {
      const timer = setTimeout(() => {
        if (sizeUpdaterRef.current) {
          try {
            sizeUpdaterRef.current({ width: windowWidth, height: windowHeight })
          } catch (error) {
            console.error('Error updating window size:', error)
          }
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  const boardWidth = GRID_SIZE * CELL_SIZE + 4 + 4
  const totalHeight = 8 + 18 + 4 + 28 + 4 + (GRID_SIZE * CELL_SIZE + 4)
  const contentWidth = boardWidth + 8
  const contentHeight = totalHeight

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#C0C0C0',
        padding: '4px',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: 'var(--font-size, 8pt)',
        userSelect: 'none',
        width: `${contentWidth}px`,
        height: `${contentHeight}px`,
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Инструкции - перемещены вверх */}
      <div
        style={{
          marginBottom: '4px',
          padding: '2px 4px',
          background: '#C0C0C0',
          border: '1px solid',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#FFFFFF',
          borderBottomColor: '#FFFFFF',
          fontSize: 'var(--font-size, 8pt)',
        }}
      >
        Управление: Стрелки или WASD, Пробел - пауза
      </div>

      {/* Панель управления */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px',
          padding: '2px 4px',
          background: '#C0C0C0',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#000000',
            color: '#FF0000',
            padding: '2px 6px',
            fontFamily: 'monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            minWidth: '80px',
            justifyContent: 'center',
            border: '1px inset #808080',
          }}
        >
          Очки: {String(score).padStart(3, '0')}
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={handleStart}
            style={{
              padding: '2px 8px',
              background: '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              cursor: 'pointer',
              fontSize: 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              borderRadius: 0,
            }}
          >
            {gameState === 'ready' || gameState === 'gameOver' ? 'Старт' : gameState === 'paused' ? 'Продолжить' : 'Пауза'}
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '2px 8px',
              background: '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              cursor: 'pointer',
              fontSize: 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              borderRadius: 0,
            }}
          >
            Сброс
          </button>
        </div>
      </div>

      {/* Игровое поле */}
      <div
        style={{
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: 0,
          border: '2px solid',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#FFFFFF',
          borderBottomColor: '#FFFFFF',
          background: '#000000',
          padding: '2px',
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const x = index % GRID_SIZE
          const y = Math.floor(index / GRID_SIZE)
          const isSnake = snake.some(segment => segment.x === x && segment.y === y)
          const isHead = snake[0]?.x === x && snake[0]?.y === y
          const isFood = food.x === x && food.y === y

          let cellColor = '#000000'
          if (isFood) {
            cellColor = '#FF0000'
          } else if (isSnake) {
            cellColor = isHead ? '#00FF00' : '#008000'
          }

          return (
            <div
              key={`${x}-${y}`}
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                background: cellColor,
                border: isSnake || isFood ? '1px solid #FFFFFF' : 'none',
                boxSizing: 'border-box',
              }}
            />
          )
        })}
      </div>

      {/* Сообщение о состоянии игры */}
      {(gameState === 'gameOver' || gameState === 'paused') && (
        <div
          style={{
            marginTop: '4px',
            padding: '2px 4px',
            background: '#C0C0C0',
            border: '1px solid',
            borderTopColor: '#808080',
            borderLeftColor: '#808080',
            borderRightColor: '#FFFFFF',
            borderBottomColor: '#FFFFFF',
            textAlign: 'center',
            fontSize: 'var(--font-size, 8pt)',
          }}
        >
          {gameState === 'gameOver' ? 'Игра окончена!' : 'Пауза'}
        </div>
      )}
    </div>
  )
}

