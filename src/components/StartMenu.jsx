import { useEffect, useRef } from 'react'

export function StartMenu({ isOpen, onClose, onMenuItemClick }) {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      const startButton = document.getElementById('start-button')
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          event.target !== startButton && !startButton?.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('touchstart', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const menuItems = [
    { icon: '/icons/search.svg', label: 'Поиск', id: 'search' },
    { icon: '/icons/about.svg', label: 'О нас', id: 'about' },
    { icon: '/icons/projects.svg', label: 'Наши проекты', id: 'projects' },
    { icon: '/icons/contact.svg', label: 'Записаться на созвон', id: 'contact' },
    { icon: '/icons/dev.svg', label: 'В разработке', id: 'dev' },
    { icon: '/icons/games.svg', label: 'Игры', id: 'games' },
    { icon: '/winapp-icon.png', label: 'Winamp', id: 'winamp' },
    { icon: '/icons/settings.svg', label: 'Настройки', id: 'settings', hasArrow: true },
  ]

  const bottomItems = [
    { icon: '/icons/logout.svg', label: 'Log Off Admin...', id: 'logoff' },
    { icon: '/icons/shutdown.svg', label: 'Shut Down...', id: 'shutdown' },
  ]

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div
      ref={menuRef}
      className="absolute flex"
      style={{
        bottom: isMobile ? '40px' : '30px',
        left: '0',
        background: '#C0C0C0',
        border: '1px solid',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#424142',
        borderBottomColor: '#424142',
        boxShadow: '2px 2px 0px rgba(0,0,0,0.1)',
        zIndex: 10000,
        minWidth: isMobile ? '200px' : '250px',
        maxWidth: isMobile ? '90vw' : 'none',
      }}
    >
      {/* Левая панель с текстом */}
      <div
        style={{
          width: '42px',
          background: 'linear-gradient(to bottom, #0A246A 0%, #A6CAF0 50%, #0A246A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px 2px',
          position: 'relative',
        }}
      >
        <div
          style={{
            color: '#FFFFFF',
            fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '16pt' : '18pt',
            fontWeight: 'bold',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            whiteSpace: 'nowrap',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          2Team
        </div>
      </div>

      {/* Правая часть с пунктами меню */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        {/* Основные пункты меню */}
        {menuItems.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center cursor-pointer"
            style={{
              height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '32px' : '22px',
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '10pt' : 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              color: '#000000',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
              paddingLeft: '12px',
              paddingRight: '8px',
              paddingTop: '1px',
              paddingBottom: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000080'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#000000'
            }}
            onClick={() => {
              if (onMenuItemClick) {
                onMenuItemClick(item.id)
              } else {
                console.log(`Clicked: ${item.label}`)
              }
              onClose()
            }}
          >
            <img
              src={item.icon}
              alt=""
              width="16"
              height="16"
              style={{
                marginRight: '6px',
                imageRendering: 'pixelated',
                WebkitImageRendering: 'pixelated',
                flexShrink: 0,
              }}
            />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.hasArrow && (
              <span style={{ fontSize: '8px', marginLeft: '4px' }}>▶</span>
            )}
          </div>
        ))}

        {/* Разделитель */}
        <div
          style={{
            height: '1px',
            background: '#808080',
            margin: '1px 0',
            borderTop: '1px solid #FFFFFF',
          }}
        />

        {/* Нижние пункты меню */}
        {bottomItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center cursor-pointer"
            style={{
              height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '32px' : '22px',
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '10pt' : 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              color: '#000000',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
              paddingLeft: '12px',
              paddingRight: '8px',
              paddingTop: '1px',
              paddingBottom: '1px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#000080'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#000000'
            }}
            onClick={() => {
              if (onMenuItemClick) {
                onMenuItemClick(item.id)
              } else {
                console.log(`Clicked: ${item.label}`)
              }
              onClose()
            }}
          >
            <img
              src={item.icon}
              alt=""
              width="16"
              height="16"
              style={{
                marginRight: '6px',
                imageRendering: 'pixelated',
                WebkitImageRendering: 'pixelated',
                flexShrink: 0,
              }}
            />
            <span style={{ flex: 1 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

