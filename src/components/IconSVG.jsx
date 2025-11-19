import { useState } from 'react'

// Иконки в стиле Windows 2000 (заглушки, если пользовательские не загружены)
export function IconSVG({ type, customIcon, iconSize = 32 }) {
  const [imgError, setImgError] = useState(false)
  
  // Если есть пользовательская иконка и она загрузилась, используем её
  if (customIcon && !imgError) {
    // Увеличиваем масштаб только для иконки Winamp
    const isWinamp = type === 'winamp' || customIcon.includes('winapp-icon')
    const scale = isWinamp ? 1.5 : 1
    
    return (
      <div style={{
        width: `${iconSize}px`,
        height: `${iconSize}px`,
        overflow: 'hidden',
        imageRendering: 'pixelated',
        WebkitImageRendering: 'pixelated',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img 
          src={customIcon} 
          alt="" 
          style={{ 
            width: `${iconSize * scale}px`,
            height: `${iconSize * scale}px`,
            imageRendering: 'pixelated',
            WebkitImageRendering: 'pixelated',
            MozImageRendering: 'crisp-edges',
            msInterpolationMode: 'nearest-neighbor',
            display: 'block',
            objectFit: isWinamp ? 'cover' : 'contain',
          }}
          onError={() => setImgError(true)}
        />
      </div>
    )
  }

  // Иначе используем SVG заглушки
  const icons = {
    about: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect width="32" height="32" fill="#C0C0C0"/>
        <rect x="2" y="2" width="28" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <rect x="8" y="6" width="16" height="20" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <line x1="12" y1="10" x2="20" y2="10" stroke="#000" strokeWidth="1"/>
        <line x1="12" y1="14" x2="20" y2="14" stroke="#000" strokeWidth="1"/>
        <line x1="12" y1="18" x2="18" y2="18" stroke="#000" strokeWidth="1"/>
        <path d="M20 6 L24 10 L20 10 Z" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <line x1="20" y1="6" x2="20" y2="10" stroke="#000" strokeWidth="1"/>
        <line x1="20" y1="10" x2="24" y2="10" stroke="#000" strokeWidth="1"/>
      </svg>
    ),
    projects: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect width="32" height="32" fill="#C0C0C0"/>
        <rect x="2" y="2" width="28" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <path d="M6 8 L6 24 L26 24 L26 12 L18 12 L16 8 Z" fill="#FFFF00" stroke="#000" strokeWidth="1"/>
        <line x1="6" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="1"/>
      </svg>
    ),
    contact: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect width="32" height="32" fill="#C0C0C0"/>
        <rect x="2" y="2" width="28" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <rect x="10" y="8" width="12" height="16" rx="2" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
        <rect x="12" y="10" width="8" height="10" fill="#000"/>
        <circle cx="16" cy="22" r="1.5" fill="#000"/>
      </svg>
    ),
    dev: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect width="32" height="32" fill="#C0C0C0"/>
        <rect x="2" y="2" width="28" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <circle cx="16" cy="16" r="6" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
        <circle cx="16" cy="16" r="3" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <rect x="15" y="8" width="2" height="4" fill="#000"/>
        <rect x="15" y="20" width="2" height="4" fill="#000"/>
        <rect x="8" y="15" width="4" height="2" fill="#000"/>
        <rect x="20" y="15" width="4" height="2" fill="#000"/>
        <rect x="10.5" y="10.5" width="2" height="2" fill="#000" transform="rotate(45 11.5 11.5)"/>
        <rect x="19.5" y="19.5" width="2" height="2" fill="#000" transform="rotate(45 20.5 20.5)"/>
        <rect x="19.5" y="10.5" width="2" height="2" fill="#000" transform="rotate(-45 20.5 11.5)"/>
        <rect x="10.5" y="19.5" width="2" height="2" fill="#000" transform="rotate(-45 11.5 20.5)"/>
      </svg>
    ),
    recycleBin: (
      <svg width={iconSize} height={iconSize} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges', imageRendering: 'pixelated' }}>
        <rect width="32" height="32" fill="#C0C0C0"/>
        <rect x="2" y="2" width="28" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <rect x="8" y="8" width="16" height="18" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
        <rect x="9" y="9" width="14" height="16" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <rect x="6" y="6" width="20" height="4" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
        <rect x="7" y="7" width="18" height="2" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
        <rect x="12" y="6" width="8" height="2" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
        <line x1="11" y1="11" x2="11" y2="23" stroke="#000" strokeWidth="1"/>
        <line x1="15" y1="11" x2="15" y2="23" stroke="#000" strokeWidth="1"/>
        <line x1="19" y1="11" x2="19" y2="23" stroke="#000" strokeWidth="1"/>
        <line x1="21" y1="11" x2="21" y2="23" stroke="#000" strokeWidth="1"/>
      </svg>
    ),
  }
  return icons[type] || icons.about
}




