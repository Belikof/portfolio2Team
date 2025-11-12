export function SoundsSettingsContent({ soundsEnabled, setSoundsEnabled }) {
  return (
    <div style={{ 
      padding: '16px', 
      background: '#FFFFFF',
      fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
      fontSize: 'var(--font-size, 8pt)',
      color: '#000000',
    }}>
      <div style={{ marginBottom: '12px', fontWeight: 'bold' }}>Параметры звука:</div>
      <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: '8px' }}>
        <input
          type="checkbox"
          checked={soundsEnabled}
          onChange={(e) => setSoundsEnabled(e.target.checked)}
          style={{ marginRight: '8px', cursor: 'pointer' }}
        />
        <span>Включить системные звуки</span>
      </label>
      <div style={{
        marginTop: '12px',
        marginLeft: '8px',
        fontSize: 'var(--font-size, 8pt)',
        color: '#424142',
        fontStyle: 'italic',
      }}>
        При включении этой опции будут воспроизводиться звуки при выполнении системных действий.
      </div>
    </div>
  )
}

