import { useState, useEffect, useCallback, useRef } from 'react'

const BOARD_SIZES = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
}

export function MinesweeperGame({ onSizeChange }) {
  const [board, setBoard] = useState([])
  const [gameState, setGameState] = useState('ready') // ready, playing, won, lost
  const [minesCount, setMinesCount] = useState(10)
  const [flagsCount, setFlagsCount] = useState(0)
  const [time, setTime] = useState(0)
  const [size, setSize] = useState('beginner')
  const containerRef = useRef(null)
  const sizeUpdaterRef = useRef(null)

  const { rows, cols, mines } = BOARD_SIZES[size]

  // Инициализация доски
  const initializeBoard = useCallback(() => {
    const newBoard = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      }))
    )

    // Размещение мин
    let minesPlaced = 0
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

    // Подсчёт соседних мин
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i
              const newCol = col + j
              if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (newBoard[newRow][newCol].isMine) {
                  count++
                }
              }
            }
          }
          newBoard[row][col].adjacentMines = count
        }
      }
    }

    return newBoard
  }, [rows, cols, mines])

  useEffect(() => {
    const newBoard = initializeBoard()
    setBoard(newBoard)
    setGameState('ready')
    setMinesCount(mines)
    setFlagsCount(0)
    setTime(0)
  }, [initializeBoard, mines])

  // Таймер
  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [gameState])

  // Раскрытие пустых клеток
  const revealEmptyCells = (row, col, boardCopy) => {
    const stack = [[row, col]]
    
    while (stack.length > 0) {
      const [r, c] = stack.pop()
      
      if (r < 0 || r >= rows || c < 0 || c >= cols) continue
      if (boardCopy[r][c].isRevealed || boardCopy[r][c].isFlagged) continue
      if (boardCopy[r][c].isMine) continue

      boardCopy[r][c].isRevealed = true

      if (boardCopy[r][c].adjacentMines === 0) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue
            stack.push([r + i, c + j])
          }
        }
      }
    }
  }

  // Обработка клика
  const handleCellClick = (row, col, isRightClick = false) => {
    if (gameState === 'won' || gameState === 'lost') return
    if (board[row][col].isRevealed) return

    const boardCopy = board.map(row => row.map(cell => ({ ...cell })))

    if (isRightClick) {
      // Установка/снятие флага
      if (boardCopy[row][col].isFlagged) {
        boardCopy[row][col].isFlagged = false
        setFlagsCount(prev => prev - 1)
      } else if (!boardCopy[row][col].isRevealed) {
        boardCopy[row][col].isFlagged = true
        setFlagsCount(prev => prev + 1)
      }
      setBoard(boardCopy)
      return
    }

    if (boardCopy[row][col].isFlagged) return

    if (gameState === 'ready') {
      setGameState('playing')
    }

    if (boardCopy[row][col].isMine) {
      // Игра проиграна
      boardCopy[row][col].isRevealed = true
      // Раскрываем все мины
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (boardCopy[r][c].isMine) {
            boardCopy[r][c].isRevealed = true
          }
        }
      }
      setBoard(boardCopy)
      setGameState('lost')
      return
    }

    revealEmptyCells(row, col, boardCopy)
    setBoard(boardCopy)

    // Проверка на победу
    let revealedCount = 0
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (boardCopy[r][c].isRevealed && !boardCopy[r][c].isMine) {
          revealedCount++
        }
      }
    }

    if (revealedCount === rows * cols - mines) {
      setGameState('won')
      // Помечаем все мины как флаги
      const finalBoard = boardCopy.map(row => row.map(cell => {
        if (cell.isMine) {
          return { ...cell, isFlagged: true }
        }
        return cell
      }))
      setBoard(finalBoard)
      setFlagsCount(mines)
    }
  }

  const handleReset = () => {
    const newBoard = initializeBoard()
    setBoard(newBoard)
    setGameState('ready')
    setMinesCount(mines)
    setFlagsCount(0)
    setTime(0)
  }

  const getSmileyFace = () => {
    if (gameState === 'lost') return '/icons/smiley-lost.svg'
    if (gameState === 'won') return '/icons/smiley-won.svg'
    return '/icons/smiley.svg'
  }

  const getCellContent = (cell) => {
    if (cell.isFlagged) return '🚩'
    if (!cell.isRevealed) return ''
    if (cell.isMine) return '💣'
    if (cell.adjacentMines === 0) return ''
    return cell.adjacentMines
  }

  const getCellColor = (cell) => {
    if (!cell.isRevealed) return '#C0C0C0'
    if (cell.isMine) return '#FF0000'
    return '#FFFFFF'
  }

  const getNumberColor = (num) => {
    const colors = {
      1: '#0000FF',
      2: '#008000',
      3: '#FF0000',
      4: '#000080',
      5: '#800000',
      6: '#008080',
      7: '#000000',
      8: '#808080',
    }
    return colors[num] || '#000000'
  }

  // Получаем функцию обновления размера окна от Window компонента
  useEffect(() => {
    if (onSizeChange) {
      sizeUpdaterRef.current = onSizeChange
    }
    return () => {
      sizeUpdaterRef.current = null
    }
  }, [onSizeChange])

  // Обновляем размер окна при изменении сложности или при первом рендере
  const prevSizeRef = useRef(size)
  const isInitialMount = useRef(true)
  
  const boardWidth = cols * 16 + 4 + 4
  const totalHeight = rows * 16 + 4 + 4 + 60 + 40
  const contentWidth = Math.max(300, boardWidth + 16)
  const contentHeight = totalHeight

  useEffect(() => {
    // Пересчитываем размеры внутри useEffect
    const boardWidth = cols * 16 + 4 + 4
    const totalHeight = rows * 16 + 4 + 4 + 60 + 40
    const contentWidth = Math.max(300, boardWidth + 16)
    const contentHeight = totalHeight
    
    // Размер окна = размер контента + padding окна (2px со всех сторон) + border окна (2px со всех сторон) + border content (1px со всех сторон) + title bar (18px)
    // padding: 2px слева + 2px справа = 4px, border: 2px слева + 2px справа = 4px, border content: 1px слева + 1px справа = 2px
    const windowWidth = contentWidth + 4 + 4 + 2 // padding + border window + border content
    // padding: 2px сверху + 2px снизу = 4px, border: 2px сверху + 2px снизу = 4px, border content: 1px сверху + 1px снизу = 2px, title bar = 18px
    const windowHeight = contentHeight + 4 + 4 + 2 + 18 // padding + border window + border content + title bar
    
    if (sizeUpdaterRef.current && windowWidth > 0 && windowHeight > 0) {
      // Обновляем при первом рендере или при изменении сложности
      if (isInitialMount.current || prevSizeRef.current !== size) {
        const timer = setTimeout(() => {
          if (sizeUpdaterRef.current) {
            try {
              sizeUpdaterRef.current({ width: windowWidth, height: windowHeight })
            } catch (error) {
              console.error('Error updating window size:', error)
            }
          }
        }, isInitialMount.current ? 100 : 50)
        
        prevSizeRef.current = size
        isInitialMount.current = false
        return () => clearTimeout(timer)
      }
    }
  }, [size, rows, cols])

  return (
    <div 
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#C0C0C0',
        padding: '8px',
        paddingBottom: '8px',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: 'var(--font-size, 8pt)',
        userSelect: 'none',
        width: `${contentWidth}px`,
        minHeight: `${contentHeight}px`,
        boxSizing: 'border-box',
      }}>
      {/* Панель управления */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        padding: '4px',
        background: '#C0C0C0',
        border: '2px solid',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
      }}>
        {/* Счётчик мин */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#000000',
          color: '#FF0000',
          padding: '2px 6px',
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 'bold',
          minWidth: '50px',
          justifyContent: 'center',
          border: '1px inset #808080',
        }}>
          {String(Math.max(0, minesCount - flagsCount)).padStart(3, '0')}
        </div>

        {/* Кнопка смайлика */}
        <button
          onClick={handleReset}
          style={{
            width: '26px',
            height: '26px',
            background: '#C0C0C0',
            border: '2px solid',
            borderTopColor: '#FFFFFF',
            borderLeftColor: '#FFFFFF',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            borderRadius: 0,
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.borderTopColor = '#808080'
            e.currentTarget.style.borderLeftColor = '#808080'
            e.currentTarget.style.borderRightColor = '#FFFFFF'
            e.currentTarget.style.borderBottomColor = '#FFFFFF'
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.borderTopColor = '#FFFFFF'
            e.currentTarget.style.borderLeftColor = '#FFFFFF'
            e.currentTarget.style.borderRightColor = '#808080'
            e.currentTarget.style.borderBottomColor = '#808080'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderTopColor = '#FFFFFF'
            e.currentTarget.style.borderLeftColor = '#FFFFFF'
            e.currentTarget.style.borderRightColor = '#808080'
            e.currentTarget.style.borderBottomColor = '#808080'
          }}
        >
          <img
            src={getSmileyFace()}
            alt=""
            width="20"
            height="20"
            style={{
              imageRendering: 'pixelated',
              WebkitImageRendering: 'pixelated',
            }}
          />
        </button>

        {/* Таймер */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#000000',
          color: '#FF0000',
          padding: '2px 6px',
          fontFamily: 'monospace',
          fontSize: '14px',
          fontWeight: 'bold',
          minWidth: '50px',
          justifyContent: 'center',
          border: '1px inset #808080',
        }}>
          {String(Math.min(999, time)).padStart(3, '0')}
        </div>
      </div>

      {/* Игровое поле */}
      <div style={{
        display: 'inline-grid',
        gridTemplateColumns: `repeat(${cols}, 16px)`,
        gap: 0,
        border: '2px solid',
        borderTopColor: '#808080',
        borderLeftColor: '#808080',
        borderRightColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        background: '#C0C0C0',
        padding: '2px',
      }}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex, false)}
              onContextMenu={(e) => {
                e.preventDefault()
                handleCellClick(rowIndex, colIndex, true)
              }}
              style={{
                width: '16px',
                height: '16px',
                background: getCellColor(cell),
                border: '1px solid',
                borderTopColor: cell.isRevealed ? '#808080' : '#FFFFFF',
                borderLeftColor: cell.isRevealed ? '#808080' : '#FFFFFF',
                borderRightColor: cell.isRevealed ? '#FFFFFF' : '#808080',
                borderBottomColor: cell.isRevealed ? '#FFFFFF' : '#808080',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: getNumberColor(cell.adjacentMines),
                boxSizing: 'border-box',
              }}
              onMouseDown={(e) => {
                if (e.button === 0 && !cell.isRevealed && !cell.isFlagged) {
                  e.currentTarget.style.borderTopColor = '#808080'
                  e.currentTarget.style.borderLeftColor = '#808080'
                  e.currentTarget.style.borderRightColor = '#FFFFFF'
                  e.currentTarget.style.borderBottomColor = '#FFFFFF'
                }
              }}
              onMouseUp={(e) => {
                if (e.button === 0) {
                  e.currentTarget.style.borderTopColor = cell.isRevealed ? '#808080' : '#FFFFFF'
                  e.currentTarget.style.borderLeftColor = cell.isRevealed ? '#808080' : '#FFFFFF'
                  e.currentTarget.style.borderRightColor = cell.isRevealed ? '#FFFFFF' : '#808080'
                  e.currentTarget.style.borderBottomColor = cell.isRevealed ? '#FFFFFF' : '#808080'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = cell.isRevealed ? '#808080' : '#FFFFFF'
                e.currentTarget.style.borderLeftColor = cell.isRevealed ? '#808080' : '#FFFFFF'
                e.currentTarget.style.borderRightColor = cell.isRevealed ? '#FFFFFF' : '#808080'
                e.currentTarget.style.borderBottomColor = cell.isRevealed ? '#FFFFFF' : '#808080'
              }}
            >
              {getCellContent(cell)}
            </div>
          ))
        )}
      </div>

      {/* Меню выбора сложности */}
      <div style={{
        marginTop: '8px',
        display: 'flex',
        gap: '4px',
        justifyContent: 'center',
        marginBottom: 0,
        paddingBottom: 0,
      }}>
        {Object.keys(BOARD_SIZES).map((level) => (
          <button
            key={level}
            onClick={() => setSize(level)}
            style={{
              padding: '2px 8px',
              background: size === level ? '#C0C0C0' : '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              cursor: 'pointer',
              fontSize: 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              textTransform: 'capitalize',
              borderRadius: 0,
            }}
          >
            {level === 'beginner' ? 'Новичок' : level === 'intermediate' ? 'Любитель' : 'Эксперт'}
          </button>
        ))}
      </div>
    </div>
  )
}

