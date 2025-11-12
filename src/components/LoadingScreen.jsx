import { useState, useEffect, useRef } from 'react'

export function LoadingScreen({ onComplete }) {
  const [filledSegments, setFilledSegments] = useState(0)
  const totalSegments = 20
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const duration = 1800
    const segmentDuration = duration / totalSegments

    let currentSegment = 0
    const timer = setInterval(() => {
      currentSegment++
      setFilledSegments(currentSegment)
      
      if (currentSegment >= totalSegments) {
        clearInterval(timer)
        setTimeout(() => {
          if (onCompleteRef.current) {
            onCompleteRef.current()
          }
        }, 200)
      }
    }, segmentDuration)

    return () => clearInterval(timer)
  }, [totalSegments])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#FFFFFF',
        zIndex: 99999,
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Основной контент - логотип и текст */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-45%, -50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '50px',
        }}
      >
        {/* Логотип Windows 2000 */}
        <div>
          <img 
            src="/png-clipart-microsoft-windows-logo-windows-98-windows-95-windows-xp-windows-2000-windows-logos-text-rectangle-thumbnail.png" 
            alt="Windows 2000" 
            style={{
              maxWidth: '280px',
              maxHeight: '280px',
              imageRendering: 'auto',
              display: 'block',
            }}
          />
        </div>

        {/* Текст слева от логотипа */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            color: '#000000',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            marginLeft: '-20px',
          }}
        >
          <div style={{ fontSize: '24pt', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '6px', color: '#000000' }}>
            Разработано 2Team
          </div>
          <div style={{ fontSize: '26pt', fontWeight: 'bold', marginBottom: '10px', color: '#000000' }}>Web studio</div>
          <div style={{ fontSize: '9pt', color: '#000000' }}>Built on NT Technology</div>
        </div>
      </div>

      {/* Статус-бар внизу */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Светло-серая полоса */}
        <div
          style={{
            background: '#D4D0C8',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #808080',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '9pt', color: '#000000', fontFamily: 'Tahoma, MS Sans Serif, sans-serif' }}>
              Starting up...
            </span>
            <div
              style={{
                width: '200px',
                height: '16px',
                background: '#C0C0C0',
                border: '1px solid #808080',
                padding: '1px',
                boxSizing: 'border-box',
                display: 'flex',
                gap: '0.5px',
              }}
            >
              {Array.from({ length: totalSegments }).map((_, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    minWidth: '8px',
                    height: '100%',
                    background: index < filledSegments 
                      ? '#0078D4' 
                      : '#C0C0C0',
                    border: index < filledSegments 
                      ? '1px solid #005A9E' 
                      : '1px solid #808080',
                    transition: 'all 0.1s ease',
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{ fontSize: 'var(--font-size, 8pt)', color: '#000000', fontFamily: 'Tahoma, MS Sans Serif, sans-serif' }}>
            Copyright © 2024 2Team. All rights reserved.
          </div>
        </div>
        {/* Синяя полоса */}
        <div
          style={{
            background: '#0078D4',
            height: '4px',
          }}
        />
      </div>
    </div>
  )
}

