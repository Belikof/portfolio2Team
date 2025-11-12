import { iconPaths } from '../../constants/iconPaths'

export function GamesWindow({ onGameClick }) {
  const games = [
    {
      id: 'minesweeper',
      name: 'Сапёр',
      icon: '/icons/minesweeper.svg',
    },
    {
      id: 'snake',
      name: 'Змейка',
      icon: '/icons/snake.svg',
    },
  ]

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#ECE9D8',
      fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
      fontSize: 'var(--font-size, 8pt)',
      color: '#000000',
      textRendering: 'optimizeSpeed',
      WebkitFontSmoothing: 'none',
      MozOsxFontSmoothing: 'grayscale',
      fontSmooth: 'never',
    }}>
      {/* Address Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        background: '#ECE9D8',
        borderBottom: '1px solid #808080',
        gap: '8px',
      }}>
        <span style={{ fontSize: 'var(--font-size, 8pt)', whiteSpace: 'nowrap' }}>Адрес:</span>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          background: '#FFFFFF',
          border: '1px solid',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#FFFFFF',
          borderBottomColor: '#FFFFFF',
          padding: '2px 4px',
          gap: '4px',
        }}>
          <img 
            src={iconPaths.games} 
            alt="" 
            width="16" 
            height="16"
            style={{
              imageRendering: 'pixelated',
              WebkitImageRendering: 'pixelated',
            }}
          />
          <span style={{ fontSize: 'var(--font-size, 8pt)' }}>Игры</span>
        </div>
        <button style={{
          padding: '2px 8px',
          background: '#C0C0C0',
          border: '1px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#424142',
          borderBottomColor: '#424142',
          fontSize: 'var(--font-size, 8pt)',
          cursor: 'pointer',
          borderRadius: '0',
          fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        }}>Перейти</button>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        padding: '16px',
        overflow: 'auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignContent: 'flex-start',
      }}>
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px',
              width: '80px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000080'
              const label = e.currentTarget.querySelector('.game-label')
              if (label) label.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              const label = e.currentTarget.querySelector('.game-label')
              if (label) label.style.color = '#000000'
            }}
            onClick={() => {
              if (onGameClick) {
                onGameClick(game.id)
              }
            }}
          >
            <img
              src={game.icon}
              alt={game.name}
              width="32"
              height="32"
              style={{
                imageRendering: 'pixelated',
                WebkitImageRendering: 'pixelated',
                marginBottom: '4px',
              }}
            />
            <span
              className="game-label"
              style={{
                fontSize: 'var(--font-size, 8pt)',
                color: '#000000',
                textAlign: 'center',
                wordBreak: 'break-word',
                lineHeight: '1.2',
              }}
            >
              {game.name}
            </span>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2px 8px',
        background: '#ECE9D8',
        borderTop: '1px solid #808080',
        fontSize: 'var(--font-size, 8pt)',
        height: '22px',
        alignItems: 'center',
      }}>
        <span>{games.length} объект(ов)</span>
      </div>
    </div>
  )
}

