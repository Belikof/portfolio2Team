import { useEffect } from 'react'

export function Windows2000Dialog({ message, onClose, title = 'Ошибка', type = 'error' }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: isMobile ? '16px' : '0',
        boxSizing: 'border-box',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ECE9D8',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#424142',
          borderBottomColor: '#424142',
          boxShadow: 'inset -1px -1px 0px #808080, inset 1px 1px 0px #FFFFFF',
          minWidth: isMobile ? 'calc(100% - 32px)' : '300px',
          maxWidth: isMobile ? 'calc(100% - 32px)' : '400px',
          width: isMobile ? 'calc(100% - 32px)' : 'auto',
          fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
          fontSize: 'var(--font-size, 8pt)',
          textRendering: 'optimizeSpeed',
          WebkitFontSmoothing: 'none',
          MozOsxFontSmoothing: 'grayscale',
          fontSmooth: 'never',
          margin: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Bar */}
        <div
          style={{
            height: '18px',
            background: 'linear-gradient(to bottom, #0A246A 0%, #A6CAF0 50%, #0A246A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2px 0 3px',
            cursor: 'default',
            userSelect: 'none',
            borderBottom: '1px solid #424142',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '3px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                background: '#FFFFFF',
                border: '1px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {type === 'error' ? (
                <span style={{ color: '#C00000', fontSize: '12px', fontWeight: 'bold', lineHeight: '1' }}>!</span>
              ) : (
                <span style={{ color: '#000080', fontSize: '10px', fontWeight: 'bold', lineHeight: '1', fontStyle: 'italic' }}>i</span>
              )}
            </div>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 'var(--font-size, 9pt)',
                fontWeight: 'normal',
                whiteSpace: 'nowrap',
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
        </div>

        {/* Content */}
        <div
          style={{
            padding: '16px',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              background: '#FFFFFF',
              border: '1px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {type === 'error' ? (
              <span style={{ color: '#C00000', fontSize: '24px', fontWeight: 'bold', lineHeight: '1' }}>!</span>
            ) : (
              <span style={{ color: '#000080', fontSize: '20px', fontWeight: 'bold', lineHeight: '1', fontStyle: 'italic' }}>i</span>
            )}
          </div>
          <div
            style={{
              flex: 1,
              color: '#000000',
              fontSize: 'var(--font-size, 8pt)',
              lineHeight: '1.4',
              whiteSpace: 'pre-line',
            }}
          >
            {message}
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            padding: '8px 16px 16px',
          }}
        >
          <button
            onClick={onClose}
            style={{
              minWidth: '75px',
              height: '23px',
              padding: '0 12px',
              background: '#C0C0C0',
              border: '1px solid',
              borderTopColor: '#FFFFFF',
              borderLeftColor: '#FFFFFF',
              borderRightColor: '#424142',
              borderBottomColor: '#424142',
              borderRadius: '0',
              cursor: 'pointer',
              fontSize: 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontWeight: 'normal',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
              outline: 'none',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.borderTopColor = '#424142'
              e.currentTarget.style.borderLeftColor = '#424142'
              e.currentTarget.style.borderRightColor = '#FFFFFF'
              e.currentTarget.style.borderBottomColor = '#FFFFFF'
              e.currentTarget.style.boxShadow = 'inset 1px 1px 0px rgba(0,0,0,0.3)'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderTopColor = '#FFFFFF'
              e.currentTarget.style.borderLeftColor = '#FFFFFF'
              e.currentTarget.style.borderRightColor = '#424142'
              e.currentTarget.style.borderBottomColor = '#424142'
              e.currentTarget.style.boxShadow = 'none'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderTopColor = '#FFFFFF'
              e.currentTarget.style.borderLeftColor = '#FFFFFF'
              e.currentTarget.style.borderRightColor = '#424142'
              e.currentTarget.style.borderBottomColor = '#424142'
              e.currentTarget.style.boxShadow = 'none'
            }}
            autoFocus
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

