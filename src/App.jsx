import './index.css'
import { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense, memo } from 'react'
import { addScrollbarStyles } from './utils/scrollbarStyles'
import { iconPaths } from './constants/iconPaths'
import { DesktopIcon } from './components/DesktopIcon'
import { Window } from './components/Window'
import { LoadingScreen } from './components/LoadingScreen'
import { StartMenu } from './components/StartMenu'

// Lazy loading для окон
const SettingsWindow = lazy(() => import('./components/settings/SettingsWindow').then(m => ({ default: m.SettingsWindow })))
const DisplaySettingsContent = lazy(() => import('./components/settings/DisplaySettingsContent').then(m => ({ default: m.DisplaySettingsContent })))
const SoundsSettingsContent = lazy(() => import('./components/settings/SoundsSettingsContent').then(m => ({ default: m.SoundsSettingsContent })))
const RecycleBinWindow = lazy(() => import('./components/windows/RecycleBinWindow').then(m => ({ default: m.RecycleBinWindow })))
const ContactFormWindow = lazy(() => import('./components/windows/ContactFormWindow').then(m => ({ default: m.ContactFormWindow })))
const GamesWindow = lazy(() => import('./components/windows/GamesWindow').then(m => ({ default: m.GamesWindow })))
const MinesweeperGame = lazy(() => import('./components/windows/MinesweeperGame').then(m => ({ default: m.MinesweeperGame })))
const SnakeGame = lazy(() => import('./components/windows/SnakeGame').then(m => ({ default: m.SnakeGame })))
const ProjectsWindow = lazy(() => import('./components/windows/ProjectsWindow').then(m => ({ default: m.ProjectsWindow })))
const AboutWindow = lazy(() => import('./components/windows/AboutWindow').then(m => ({ default: m.AboutWindow })))
const SearchWindow = lazy(() => import('./components/windows/SearchWindow').then(m => ({ default: m.SearchWindow })))
const WinampPlayer = lazy(() => import('./components/windows/WinampPlayer').then(m => ({ default: m.WinampPlayer })))


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [colonVisible, setColonVisible] = useState(true)
  const [nextZIndex, setNextZIndex] = useState(1000)

  // Настройки
  const [wallpaper, setWallpaper] = useState(() => {
    const saved = localStorage.getItem('wallpaper')
    return saved || '/wallpapers/pole-oblaka-nebo-windows.jpg'
  })
  const [iconSize, setIconSize] = useState(() => {
    const saved = localStorage.getItem('iconSize')
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    return saved ? parseInt(saved) : (isMobile ? 24 : 32)
  })
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize')
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    return saved ? parseInt(saved) : (isMobile ? 10 : 9)
  })
  const [soundsEnabled, setSoundsEnabled] = useState(() => {
    const saved = localStorage.getItem('soundsEnabled')
    return saved ? saved === 'true' : true
  })

  // Добавляем стили скроллбаров при монтировании
  useEffect(() => {
    addScrollbarStyles()
  }, [])
  
  // Обновляем время каждую секунду и мигаем двоеточием
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setColonVisible(prev => !prev)
    }, 1000)
    return () => clearInterval(timer)
  }, [])


  // Загружаем позиции иконок из localStorage или используем значения по умолчанию
  const loadIconPositions = () => {
    const saved = localStorage.getItem('desktopIconPositions')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return null
      }
    }
    return null
  }

  const getDefaultPositions = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
    if (isMobile) {
      return {
        about: { x: 10, y: 10 },
        projects: { x: 10, y: 80 },
        contact: { x: 10, y: 150 },
        dev: { x: 10, y: 220 },
        games: { x: 100, y: 10 },
        recycleBin: { x: 100, y: 80 },
        winamp: { x: 100, y: 150 },
      }
    }
    return {
      about: { x: 20, y: 20 },
      projects: { x: 20, y: 100 },
      contact: { x: 20, y: 180 },
      dev: { x: 20, y: 260 },
      games: { x: 20, y: 340 },
      recycleBin: { x: 20, y: 420 },
      winamp: { x: 20, y: 500 },
    }
  }

  const defaultPositions = getDefaultPositions()

  const [iconPositions, setIconPositions] = useState(() => {
    const saved = loadIconPositions()
    return saved || defaultPositions
  })

  // Debounce для сохранения позиций в localStorage
  const saveTimeoutRef = useRef(null)
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('desktopIconPositions', JSON.stringify(iconPositions))
    }, 300)
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [iconPositions])

  const handlePositionChange = useCallback((id, newPosition) => {
    setIconPositions(prev => ({
      ...prev,
      [id]: newPosition
    }))
  }, [])

  // Управление окнами
  const [windows, setWindows] = useState({})
  const [windowPositions, setWindowPositions] = useState({})
  const [windowZIndexes, setWindowZIndexes] = useState({})
  const windowRefs = useRef({})

  // Callback для регистрации функции обновления размера окна minesweeper
  const handleMinesweeperSizeChangeRequest = useCallback((updateSizeFn) => {
    if (updateSizeFn) {
      windowRefs.current['minesweeper'] = { updateSize: updateSizeFn }
    } else {
      delete windowRefs.current['minesweeper']
    }
  }, [])

  // Callback для обновления размера окна minesweeper
  const handleMinesweeperSizeChange = useCallback((newSize) => {
    const windowRef = windowRefs.current['minesweeper']
    if (windowRef && windowRef.updateSize && newSize && newSize.width && newSize.height) {
      try {
        windowRef.updateSize(newSize)
      } catch (error) {
        console.error('Error updating minesweeper window size:', error)
      }
    }
  }, [])

  // Callback для регистрации функции обновления размера окна snake
  const handleSnakeSizeChangeRequest = useCallback((updateSizeFn) => {
    if (updateSizeFn) {
      windowRefs.current['snake'] = { updateSize: updateSizeFn }
    } else {
      delete windowRefs.current['snake']
    }
  }, [])

  // Callback для обновления размера окна snake
  const handleSnakeSizeChange = useCallback((newSize) => {
    const windowRef = windowRefs.current['snake']
    if (windowRef && windowRef.updateSize && newSize && newSize.width && newSize.height) {
      try {
        windowRef.updateSize(newSize)
      } catch (error) {
        console.error('Error updating snake window size:', error)
      }
    }
  }, [])

  // Создаем иконки для окон настроек
  const displayIcon = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="shape-rendering: crispEdges">
      <rect width="16" height="16" fill="#C0C0C0"/>
      <rect x="1" y="1" width="14" height="10" fill="#000080" stroke="#000" stroke-width="1"/>
      <rect x="3" y="3" width="10" height="7" fill="#FFFFFF"/>
      <line x1="4" y1="4" x2="12" y2="4" stroke="#000" stroke-width="1"/>
      <line x1="4" y1="5" x2="12" y2="5" stroke="#000" stroke-width="1"/>
      <rect x="10" y="6" width="2" height="3" fill="#000"/>
      <line x1="4" y1="6" x2="9" y2="6" stroke="#000" stroke-width="1"/>
      <line x1="4" y1="7" x2="9" y2="7" stroke="#000" stroke-width="1"/>
      <line x1="4" y1="8" x2="9" y2="8" stroke="#000" stroke-width="1"/>
      <rect x="3" y="11" width="10" height="1" fill="#C0C0C0" stroke="#000" stroke-width="1"/>
      <rect x="5" y="12" width="6" height="2" fill="#808080" stroke="#000" stroke-width="1"/>
    </svg>
  `)
  
  const soundsIcon = 'data:image/svg+xml,' + encodeURIComponent(`
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="shape-rendering: crispEdges">
      <rect width="16" height="16" fill="#C0C0C0"/>
      <rect x="1" y="1" width="14" height="14" fill="#FFFFFF" stroke="#000" stroke-width="1"/>
      <rect x="4" y="4" width="8" height="8" fill="#C0C0C0" stroke="#000" stroke-width="1"/>
      <rect x="5" y="5" width="6" height="6" fill="#FFFFFF" stroke="#000" stroke-width="1"/>
      <rect x="6" y="6" width="4" height="4" fill="#000"/>
      <rect x="3" y="3" width="2" height="2" fill="#000"/>
      <rect x="11" y="3" width="2" height="2" fill="#000"/>
      <rect x="3" y="11" width="2" height="2" fill="#000"/>
      <rect x="11" y="11" width="2" height="2" fill="#000"/>
      <line x1="7" y1="7" x2="9" y2="7" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="7" y1="8" x2="9" y2="8" stroke="#FFFFFF" stroke-width="1"/>
      <line x1="7" y1="9" x2="9" y2="9" stroke="#FFFFFF" stroke-width="1"/>
    </svg>
  `)

  const windowConfigs = useMemo(() => ({
    search: { title: 'Поиск', icon: iconPaths.search },
    about: { title: 'О нас', icon: iconPaths.about },
    projects: { title: 'Наши проекты', icon: iconPaths.projects },
    contact: { title: 'Записаться на созвон', icon: iconPaths.contact },
    dev: { title: 'В разработке', icon: iconPaths.dev },
    games: { title: 'Игры', icon: iconPaths.games },
    minesweeper: { title: 'Сапёр', icon: iconPaths.minesweeper },
    snake: { title: 'Змейка', icon: iconPaths.snake },
    recycleBin: { title: 'Корзина', icon: iconPaths.recycleBin },
    settings: { title: 'Настройки', icon: iconPaths.settings },
    displaySettings: { title: 'Свойства: Экран', icon: displayIcon },
    soundsSettings: { title: 'Свойства: Звуки и мультимедиа', icon: soundsIcon },
    winamp: { title: 'Winamp', icon: iconPaths.winamp },
  }), [displayIcon, soundsIcon])

  const openWindow = (id) => {
    const isMobile = window.innerWidth <= 768
    // Окно contact не разворачиваем на весь экран на мобильных
    const shouldMaximize = isMobile && id !== 'contact'
    setWindows(prev => ({
      ...prev,
      [id]: {
        isOpen: true,
        isMinimized: false,
        isMaximized: shouldMaximize, // На мобильных сразу разворачиваем, кроме contact
      }
    }))
    
    setWindowPositions(prev => {
      if (!prev[id]) {
        if (isMobile && shouldMaximize) {
          return {
            ...prev,
            [id]: { x: 0, y: 0 }
          }
        }
        if (isMobile && id === 'contact') {
          // Для окна contact на мобильных центрируем по вертикали
          return {
            ...prev,
            [id]: { x: 10, y: Math.max(10, (window.innerHeight - 240) / 2) }
          }
        }
        // Окна открываются снизу справа от кнопки "Пуск"
        const startButtonWidth = 75
        const offsetX = startButtonWidth + 10
        const offsetY = window.innerHeight - 30 - 400 - 10 - (Object.keys(prev).length * 30)
        return {
          ...prev,
          [id]: { x: offsetX, y: Math.max(10, offsetY) }
        }
      }
      return prev
    })

    setNextZIndex(prev => {
      // Если открывается окно настроек из окна settings, делаем его выше
      let newZIndex
      if (id === 'displaySettings' || id === 'soundsSettings') {
        // Получаем текущий максимальный z-index из состояния через функциональное обновление
        setWindowZIndexes(prevZIndexes => {
          const currentMaxZIndex = Math.max(...Object.values(prevZIndexes).filter(v => v && typeof v === 'number'), 1000)
          newZIndex = currentMaxZIndex + 10  // Делаем намного выше, чтобы было поверх settings
          return {
            ...prevZIndexes,
            [id]: newZIndex
          }
        })
      } else {
        newZIndex = prev + 1
        setWindowZIndexes(prevZIndexes => ({
          ...prevZIndexes,
        [id]: newZIndex
      }))
      }
      return Math.max(newZIndex || prev + 1, prev + 1)
    })
  }

  const closeWindow = (id) => {
    // Удаляем окно из состояния (анимация закрытия обрабатывается в компоненте Window)
    setWindows(prev => {
      const newWindows = { ...prev }
      delete newWindows[id]
      return newWindows
    })
    // Очищаем позицию и z-index
    setWindowPositions(prev => {
      const newPositions = { ...prev }
      delete newPositions[id]
      return newPositions
    })
    setWindowZIndexes(prev => {
      const newZIndexes = { ...prev }
      delete newZIndexes[id]
      return newZIndexes
    })
  }

  const minimizeWindow = (id, minimized) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: minimized
      }
    }))
  }

  const maximizeWindow = (id, maximized) => {
    setWindows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: maximized
      }
    }))
  }

  const focusWindow = (id) => {
    setNextZIndex(prev => {
      const newZIndex = prev + 1
      setWindowZIndexes(windowZIndexes => ({
        ...windowZIndexes,
        [id]: newZIndex
      }))
      return newZIndex
    })
  }

  const updateWindowPosition = (id, position) => {
    setWindowPositions(prev => ({
      ...prev,
      [id]: position
    }))
  }


  const handleIconClick = useCallback((id) => {
    if (id === 'logoff') {
      if (window.confirm('Вы действительно хотите выйти из системы?')) {
        window.location.reload()
      }
      return
    }
    if (id === 'shutdown') {
      if (window.confirm('Вы действительно хотите выключить компьютер?')) {
        // Можно добавить анимацию выключения или просто перезагрузку
        window.location.reload()
      }
      return
    }
    if (windows[id]?.isOpen) {
      if (windows[id].isMinimized) {
        minimizeWindow(id, false)
      }
      focusWindow(id)
    } else {
      openWindow(id)
    }
  }, [windows])

  const desktopIcons = useMemo(() => [
    { iconType: 'about', label: 'О нас', id: 'about', iconSrc: iconPaths.about },
    { iconType: 'projects', label: 'Наши проекты', id: 'projects', iconSrc: iconPaths.projects },
    { iconType: 'contact', label: 'Записаться на созвон', id: 'contact', iconSrc: iconPaths.contact },
    { iconType: 'dev', label: 'В разработке', id: 'dev', iconSrc: iconPaths.dev },
    { iconType: 'games', label: 'Игры', id: 'games', iconSrc: iconPaths.games },
    { iconType: 'recycleBin', label: 'Корзина', id: 'recycleBin', iconSrc: iconPaths.recycleBin },
    { iconType: 'winamp', label: 'Winamp', id: 'winamp', iconSrc: iconPaths.winamp },
  ], [])

  // Debounce для сохранения настроек в localStorage
  const settingsTimeoutRef = useRef(null)
  useEffect(() => {
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current)
    }
    settingsTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('wallpaper', wallpaper)
      localStorage.setItem('iconSize', iconSize.toString())
      localStorage.setItem('fontSize', fontSize.toString())
      localStorage.setItem('soundsEnabled', soundsEnabled.toString())
    }, 300)
    return () => {
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current)
      }
    }
  }, [wallpaper, iconSize, fontSize, soundsEnabled])

  // Устанавливаем CSS переменную для размера шрифта
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${fontSize}pt`)
  }, [fontSize])

  const availableWallpapers = useMemo(() => [
    { name: 'Поле и облака', path: '/wallpapers/pole-oblaka-nebo-windows.jpg' },
    { name: 'Bliss', path: '/wallpapers/bliss.jpg' },
    { name: 'Пустыня', path: '/wallpapers/desert.jpeg' },
    { name: 'Айсберг', path: '/wallpapers/iceberg.jpeg' },
    { name: 'Горы', path: '/wallpapers/mountains.jpeg' },
  ], [])

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <div 
        className="w-screen h-screen flex flex-col overflow-hidden" 
        style={{ 
          fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
          fontSize: `${fontSize}pt`,
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.3s ease-in',
        }}
      >
      {/* Desktop */}
      <div 
        className="flex-1 relative" 
        style={{ 
          width: '100%', 
          height: '100%',
          paddingBottom: typeof window !== 'undefined' && window.innerWidth <= 768 ? '40px' : '30px',
        }}
      >
        {desktopIcons.map((item) => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            iconType={item.iconType}
            label={item.label}
            iconSrc={item.iconSrc}
            position={iconPositions[item.id] || defaultPositions[item.id]}
            onPositionChange={handlePositionChange}
            onClick={() => handleIconClick(item.id)}
            iconSize={iconSize}
          />
        ))}

        {/* Windows */}
        {Object.entries(windows).map(([id, windowState]) => {
          const config = windowConfigs[id]
          if (!config) return null

          return (
            <Window
              key={id}
              id={id}
              title={config.title}
              icon={config.icon}
              isOpen={windowState.isOpen}
              isMinimized={windowState.isMinimized}
              isMaximized={windowState.isMaximized}
              position={windowPositions[id] || { x: 100, y: 100 }}
              zIndex={windowZIndexes[id] || 1000}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={maximizeWindow}
              onPositionChange={updateWindowPosition}
              onFocus={focusWindow}
              onSizeChangeRequest={
                id === 'minesweeper' ? handleMinesweeperSizeChangeRequest :
                id === 'snake' ? handleSnakeSizeChangeRequest :
                undefined
              }
              initialSize={
                (() => {
                  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
                  if (id === 'search') {
                    return { 
                      width: isMobile ? window.innerWidth - 20 : 600, 
                      height: isMobile ? 350 : 500 
                    }
                  }
                  if (id === 'contact') {
                    return { 
                      width: isMobile ? window.innerWidth - 20 : 500, 
                      height: isMobile ? 240 : 220 
                    }
                  }
                  if (isMobile) {
                    return {
                      width: typeof window !== 'undefined' ? window.innerWidth - 20 : 600,
                      height: typeof window !== 'undefined' ? window.innerHeight - 50 : 400
                    }
                  }
                  return id === 'projects' ? { width: 700, height: 500 } :
                    id === 'about' ? { width: 600, height: 700 } :
                    id === 'minesweeper' ? { width: 300, height: 250 } :
                    id === 'snake' ? { width: 340, height: 370 } :
                    id === 'winamp' ? { width: 300, height: 500 } :
                    undefined
                })()
              }
            >
              <Suspense fallback={
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  height: '100%',
                  color: '#000000',
                  fontSize: 'var(--font-size, 8pt)',
                  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                }}>
                  Загрузка...
                </div>
              }>
                {id === 'settings' ? (
                  <SettingsWindow 
                    wallpaper={wallpaper}
                    setWallpaper={setWallpaper}
                    iconSize={iconSize}
                    setIconSize={setIconSize}
                    soundsEnabled={soundsEnabled}
                    setSoundsEnabled={setSoundsEnabled}
                    availableWallpapers={availableWallpapers}
                    onOpenDisplayWindow={() => {
                      openWindow('displaySettings')
                      setTimeout(() => focusWindow('displaySettings'), 0)
                    }}
                    onOpenSoundsWindow={() => {
                      openWindow('soundsSettings')
                      setTimeout(() => focusWindow('soundsSettings'), 0)
                    }}
                  />
                ) : id === 'displaySettings' ? (
                  <DisplaySettingsContent
                    wallpaper={wallpaper}
                    setWallpaper={setWallpaper}
                    iconSize={iconSize}
                    setIconSize={setIconSize}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    availableWallpapers={availableWallpapers}
                  />
                ) : id === 'soundsSettings' ? (
                  <SoundsSettingsContent
                    soundsEnabled={soundsEnabled}
                    setSoundsEnabled={setSoundsEnabled}
                  />
                ) : id === 'recycleBin' ? (
                  <RecycleBinWindow />
                ) : id === 'about' ? (
                  <AboutWindow />
                ) : id === 'contact' ? (
                  <ContactFormWindow />
                ) : id === 'projects' ? (
                  <ProjectsWindow />
                ) : id === 'games' ? (
                  <GamesWindow 
                    onGameClick={(gameId) => {
                      if (gameId === 'minesweeper') {
                        openWindow('minesweeper')
                        setTimeout(() => focusWindow('minesweeper'), 0)
                      } else if (gameId === 'snake') {
                        openWindow('snake')
                        setTimeout(() => focusWindow('snake'), 0)
                      }
                    }}
                  />
                ) : id === 'minesweeper' ? (
                  <MinesweeperGame 
                    onSizeChange={handleMinesweeperSizeChange}
                  />
                ) : id === 'snake' ? (
                  <SnakeGame 
                    onSizeChange={handleSnakeSizeChange}
                  />
                ) : id === 'search' ? (
                  <SearchWindow 
                    onOpenWindow={(windowId) => {
                      openWindow(windowId)
                      setTimeout(() => focusWindow(windowId), 0)
                    }}
                  />
                ) : id === 'winamp' ? (
                  <WinampPlayer />
                ) : (
                <div style={{ 
                  color: '#000000', 
                  fontSize: 'var(--font-size, 8pt)',
                  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                  textRendering: 'optimizeSpeed',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale',
                  fontSmooth: 'never',
                  padding: '8px',
                  minHeight: '500px',
                }}>
                  <p>Контент будет добавлен позже...</p>
                  <p>ID окна: {id}</p>
                  <p>Это тестовый контент для проверки скроллбаров.</p>
                  <p>Если текст выходит за пределы окна, появятся скроллбары в стиле Windows 2000.</p>
                  <br />
                  <p>Строка 1</p>
                  <p>Строка 2</p>
                  <p>Строка 3</p>
                  <p>Строка 4</p>
                  <p>Строка 5</p>
                  <p>Строка 6</p>
                  <p>Строка 7</p>
                  <p>Строка 8</p>
                  <p>Строка 9</p>
                  <p>Строка 10</p>
                  <p>Строка 11</p>
                  <p>Строка 12</p>
                  <p>Строка 13</p>
                  <p>Строка 14</p>
                  <p>Строка 15</p>
                  <p>Строка 16</p>
                  <p>Строка 17</p>
                  <p>Строка 18</p>
                  <p>Строка 19</p>
                  <p>Строка 20</p>
                </div>
                )}
              </Suspense>
            </Window>
          )
        })}
      </div>

      {/* Taskbar */}
      <div
        className="w-full flex items-center"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '40px' : '30px',
          background: '#C0C0C0',
          borderTop: '1px solid #000000',
          boxShadow: 'inset 0 1px 0 #FFFFFF',
          padding: '0',
          fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '10pt' : 'var(--font-size, 8pt)',
          zIndex: 9999,
        }}
      >
        {/* Start Menu */}
        {startMenuOpen && (
          <StartMenu
            isOpen={startMenuOpen}
            onClose={() => setStartMenuOpen(false)}
            onMenuItemClick={handleIconClick}
          />
        )}
        {/* Start Button with Windows Logo */}
        <button
          id="start-button"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className="h-full flex items-center border cursor-pointer"
          style={{
            background: startMenuOpen
              ? '#808080'
              : 'linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)',
            borderTopColor: '#FFFFFF',
            borderLeftColor: '#FFFFFF',
            borderRightColor: '#424142',
            borderBottomColor: '#424142',
            borderWidth: '1px',
            borderRadius: '0',
            boxShadow: startMenuOpen
              ? 'inset 1px 1px 0px rgba(0,0,0,0.3)'
              : 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.8)',
            color: '#000000',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            fontWeight: 'bold',
            minWidth: typeof window !== 'undefined' && window.innerWidth <= 768 ? '60px' : '75px',
            height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '40px' : '30px',
            fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '9pt' : 'var(--font-size, 8pt)',
            paddingLeft: '5px',
            paddingRight: '5px',
            gap: '4px',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.background = '#808080'
            e.currentTarget.style.boxShadow = 'inset 1px 1px 0px rgba(0,0,0,0.3)'
          }}
          onMouseUp={(e) => {
            if (!startMenuOpen) {
              e.currentTarget.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)'
              e.currentTarget.style.boxShadow = 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.8)'
            }
          }}
          onMouseLeave={(e) => {
            if (!startMenuOpen) {
              e.currentTarget.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)'
              e.currentTarget.style.boxShadow = 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.8)'
            }
          }}
        >
          <div style={{ position: 'relative', width: '20px', height: '20px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src="/icons/start.svg" 
              alt="Windows" 
              width="20" 
              height="20"
              style={{ 
                imageRendering: 'pixelated',
                WebkitImageRendering: 'pixelated',
                MozImageRendering: 'crisp-edges',
                msInterpolationMode: 'nearest-neighbor',
                display: 'block',
                filter: 'contrast(1.2)',
              }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <span style={{ 
            fontSize: 'var(--font-size, 9pt)', 
            fontWeight: 'bold', 
            whiteSpace: 'nowrap', 
            lineHeight: '1',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>Пуск</span>
        </button>

        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '22px',
            background: '#424142',
            borderLeft: '1px solid #FFFFFF',
            margin: '0 2px',
            alignSelf: 'center',
          }}
        />

        {/* Quick Launch Area - обычно пустая в Windows 2000 */}
        <div
          className="flex items-center"
          style={{
            height: '100%',
            width: '4px',
          }}
        />

        {/* Task Area (for open windows) */}
        <div 
          className="flex-1 flex items-center gap-1 overflow-x-auto" 
          style={{ 
            height: '100%',
            background: '#C0C0C0',
            paddingLeft: '2px',
            paddingRight: '2px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }} 
        >
          <style>{`
            .task-area::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {Object.entries(windows).map(([id, windowState]) => {
            const config = windowConfigs[id]
            if (!config) return null

            const isActive = windowZIndexes[id] === Math.max(...Object.values(windowZIndexes).filter(v => v), 1000)
            const isMobile = window.innerWidth <= 768

            return (
              <button
                key={id}
                onClick={() => {
                  if (windowState.isMinimized) {
                    minimizeWindow(id, false)
                  }
                  focusWindow(id)
                }}
                style={{
                  height: isMobile ? '32px' : '22px',
                  minWidth: isMobile ? '80px' : '120px',
                  maxWidth: isMobile ? '150px' : '200px',
                  background: isActive && !windowState.isMinimized
                    ? 'linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)'
                    : '#C0C0C0',
                  border: '1px solid',
                  borderTopColor: isActive && !windowState.isMinimized ? '#FFFFFF' : '#808080',
                  borderLeftColor: isActive && !windowState.isMinimized ? '#FFFFFF' : '#808080',
                  borderRightColor: isActive && !windowState.isMinimized ? '#424142' : '#424142',
                  borderBottomColor: isActive && !windowState.isMinimized ? '#424142' : '#424142',
                  borderRadius: '0',
                  boxShadow: isActive && !windowState.isMinimized
                    ? 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.8)'
                    : 'inset 1px 1px 0px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0 6px',
                  cursor: 'pointer',
                  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                  fontSize: 'var(--font-size, 8pt)',
                  textRendering: 'optimizeSpeed',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale',
                  fontSmooth: 'never',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.background = '#808080'
                  e.currentTarget.style.borderTopColor = '#424142'
                  e.currentTarget.style.borderLeftColor = '#424142'
                  e.currentTarget.style.borderRightColor = '#FFFFFF'
                  e.currentTarget.style.borderBottomColor = '#FFFFFF'
                  e.currentTarget.style.boxShadow = 'inset 1px 1px 0px rgba(0,0,0,0.3)'
                }}
                onMouseUp={(e) => {
                  if (isActive && !windowState.isMinimized) {
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)'
                    e.currentTarget.style.borderTopColor = '#FFFFFF'
                    e.currentTarget.style.borderLeftColor = '#FFFFFF'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                    e.currentTarget.style.boxShadow = 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.8)'
                  } else {
                    e.currentTarget.style.background = '#C0C0C0'
                    e.currentTarget.style.borderTopColor = '#808080'
                    e.currentTarget.style.borderLeftColor = '#808080'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                    e.currentTarget.style.boxShadow = 'inset 1px 1px 0px rgba(0,0,0,0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (isActive && !windowState.isMinimized) {
                    e.currentTarget.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)'
                    e.currentTarget.style.borderTopColor = '#FFFFFF'
                    e.currentTarget.style.borderLeftColor = '#FFFFFF'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                    e.currentTarget.style.boxShadow = 'inset -1px -1px 0px rgba(0,0,0,0.2), inset 1px 1px 0px rgba(255,255,255,0.8)'
                  } else {
                    e.currentTarget.style.background = '#C0C0C0'
                    e.currentTarget.style.borderTopColor = '#808080'
                    e.currentTarget.style.borderLeftColor = '#808080'
                    e.currentTarget.style.borderRightColor = '#424142'
                    e.currentTarget.style.borderBottomColor = '#424142'
                    e.currentTarget.style.boxShadow = 'inset 1px 1px 0px rgba(0,0,0,0.3)'
                  }
                }}
              >
                {config.icon && (
                  <img
                    src={config.icon}
                    alt=""
                    width="16"
                    height="16"
                    style={{
                      imageRendering: 'pixelated',
                      WebkitImageRendering: 'pixelated',
                      flexShrink: 0,
                    }}
                  />
                )}
                <span style={{ 
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#000000',
                }}>
                  {config.title}
                </span>
              </button>
            )
          })}
        </div>

        {/* System Tray - встроенный в панель задач */}
        <div
          className="h-full flex items-center gap-1"
          style={{
            background: '#C0C0C0',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            color: '#000000',
            minWidth: typeof window !== 'undefined' && window.innerWidth <= 768 ? '100px' : '130px',
            justifyContent: 'flex-end',
            height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '40px' : '30px',
            paddingRight: '2px',
            paddingLeft: '2px',
          }}
        >
          {/* System Tray Icons Area */}
          <div className="flex items-center gap-1" style={{ height: '100%' }}>
            {/* Можно добавить иконки системного трея здесь */}
          </div>
          
          {/* Language/Keyboard Indicator - встроенный стиль */}
          <div
            className="px-2 flex items-center justify-center"
            style={{
              background: '#C0C0C0',
              borderTop: '1px solid #808080',
              borderLeft: '1px solid #808080',
              borderRight: '1px solid #FFFFFF',
              borderBottom: '1px solid #FFFFFF',
              minWidth: '28px',
              height: '22px',
              fontSize: 'var(--font-size, 8pt)',
              fontWeight: 'bold',
              marginRight: '2px',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            }}
          >
            RU
          </div>

          {/* Clock - встроенный стиль с анимацией Windows 2000 */}
          <div
            className="flex items-center justify-center"
            style={{
              background: '#C0C0C0',
              borderTop: '1px solid #808080',
              borderLeft: '1px solid #808080',
              borderRight: '1px solid #FFFFFF',
              borderBottom: '1px solid #FFFFFF',
              width: typeof window !== 'undefined' && window.innerWidth <= 768 ? '55px' : '45px',
              height: typeof window !== 'undefined' && window.innerWidth <= 768 ? '32px' : '22px',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontSize: typeof window !== 'undefined' && window.innerWidth <= 768 ? '9pt' : 'var(--font-size, 8pt)',
              lineHeight: '1',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
            }}
          >
            {String(currentTime.getHours()).padStart(2, '0')}
            {colonVisible ? ':' : ' '}
            {String(currentTime.getMinutes()).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
