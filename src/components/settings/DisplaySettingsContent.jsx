export function DisplaySettingsContent({ wallpaper, setWallpaper, iconSize, setIconSize, fontSize, setFontSize, availableWallpapers }) {
  return (
    <div style={{ 
      padding: '16px', 
      background: '#FFFFFF',
      fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
      fontSize: 'var(--font-size, 8pt)',
      color: '#000000',
    }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Обои рабочего стола:</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginLeft: '8px' }}>
          {availableWallpapers.map((wp) => (
            <label key={wp.path} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="wallpaper"
                value={wp.path}
                checked={wallpaper === wp.path}
                onChange={(e) => setWallpaper(e.target.value)}
                style={{ marginRight: '8px', cursor: 'pointer' }}
              />
              <span>{wp.name}</span>
            </label>
          ))}
        </div>
      </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Размер иконок:</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px' }}>
            <span style={{ minWidth: '60px', fontSize: 'var(--font-size, 8pt)' }}>Маленькие</span>
            <div style={{ 
              flex: 1, 
              position: 'relative', 
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid #C0C0C0',
              padding: '4px',
            }}>
              <div style={{
                position: 'absolute',
                left: '4px',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '12px',
                background: '#C0C0C0',
                border: '1px solid',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#FFFFFF',
                borderBottomColor: '#FFFFFF',
                boxShadow: 'inset 1px 1px 0px #424142',
                pointerEvents: 'none',
              }} />
              <input
                type="range"
                min="24"
                max="48"
                step="4"
                value={iconSize}
                onChange={(e) => setIconSize(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '20px',
                  cursor: 'pointer',
                  appearance: 'none',
                  background: 'transparent',
                  position: 'relative',
                  zIndex: 1,
                }}
                className="win2000-slider"
              />
            </div>
            <span style={{ minWidth: '60px', fontSize: 'var(--font-size, 8pt)', textAlign: 'right' }}>Большие</span>
          </div>
          <div style={{ marginTop: '4px', marginLeft: '8px', fontSize: 'var(--font-size, 8pt)', color: '#424142' }}>
            Текущий размер: {iconSize} пикселей
          </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>Размер шрифта:</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px' }}>
            <span style={{ minWidth: '60px', fontSize: 'var(--font-size, 8pt)' }}>Маленький</span>
            <div style={{ 
              flex: 1, 
              position: 'relative', 
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '1px solid #C0C0C0',
              padding: '4px',
            }}>
              <div style={{
                position: 'absolute',
                left: '4px',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                height: '12px',
                background: '#C0C0C0',
                border: '1px solid',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#FFFFFF',
                borderBottomColor: '#FFFFFF',
                boxShadow: 'inset 1px 1px 0px #424142',
                pointerEvents: 'none',
              }} />
              <input
                type="range"
                min="7"
                max="11"
                step="2"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '20px',
                  cursor: 'pointer',
                  appearance: 'none',
                  background: 'transparent',
                  position: 'relative',
                  zIndex: 1,
                }}
                className="win2000-slider"
              />
            </div>
            <span style={{ minWidth: '60px', fontSize: 'var(--font-size, 8pt)', textAlign: 'right' }}>Большой</span>
          </div>
          <div style={{ marginTop: '4px', marginLeft: '8px', fontSize: 'var(--font-size, 8pt)', color: '#424142' }}>
            Текущий размер: {fontSize} пунктов
          </div>
        </div>
    </div>
  )
}

