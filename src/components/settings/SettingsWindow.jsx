import { useState } from 'react'

export function SettingsWindow({ wallpaper, setWallpaper, iconSize, setIconSize, soundsEnabled, setSoundsEnabled, availableWallpapers, onOpenDisplayWindow, onOpenSoundsWindow }) {
  const [selectedItem, setSelectedItem] = useState(null)

  const settingsItems = [
    { id: 'display', name: 'Экран', description: 'Настройка обоев рабочего стола, размера иконок и размера шрифта' },
    { id: 'sounds', name: 'Звуки и мультимедиа', description: 'Настройка системных звуков' },
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
      {/* Меню-бар */}
      <div style={{
        display: 'flex',
        background: '#ECE9D8',
        borderBottom: '1px solid #808080',
        padding: '2px 4px',
        fontSize: 'var(--font-size, 8pt)',
        gap: '12px',
      }}>
        {['Файл', 'Правка', 'Вид', 'Избранное', 'Сервис', 'Справка'].map((item) => (
          <span key={item} style={{ cursor: 'pointer', padding: '2px 4px' }}>
            {item}
          </span>
        ))}
      </div>

      {/* Панель инструментов */}
      <div style={{
        display: 'flex',
        background: '#ECE9D8',
        borderBottom: '1px solid #808080',
        padding: '2px',
        gap: '2px',
        alignItems: 'center',
      }}>
        <button style={{
          padding: '2px 8px',
          background: '#C0C0C0',
          border: '1px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#424142',
          borderBottomColor: '#424142',
          cursor: 'pointer',
          fontSize: 'var(--font-size, 8pt)',
          borderRadius: '0',
          outline: 'none',
        }}>Назад</button>
        <button style={{
          padding: '2px 8px',
          background: '#C0C0C0',
          border: '1px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#424142',
          borderBottomColor: '#424142',
          cursor: 'pointer',
          fontSize: 'var(--font-size, 8pt)',
          borderRadius: '0',
          outline: 'none',
        }}>Вперед</button>
        <div style={{ width: '1px', height: '20px', background: '#808080', margin: '0 4px' }} />
        <button style={{
          padding: '2px 8px',
          background: '#C0C0C0',
          border: '1px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#424142',
          borderBottomColor: '#424142',
          cursor: 'pointer',
          fontSize: 'var(--font-size, 8pt)',
          borderRadius: '0',
          outline: 'none',
        }}>Поиск</button>
        <button style={{
          padding: '2px 8px',
          background: '#C0C0C0',
          border: '1px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#424142',
          borderBottomColor: '#424142',
          cursor: 'pointer',
          fontSize: 'var(--font-size, 8pt)',
          borderRadius: '0',
          outline: 'none',
        }}>Папки</button>
      </div>

      {/* Адресная строка */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#ECE9D8',
        borderBottom: '1px solid #808080',
        padding: '4px 8px',
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
            src="/icons/settings.svg" 
            alt="" 
            width="16" 
            height="16"
            style={{
              imageRendering: 'pixelated',
              WebkitImageRendering: 'pixelated',
            }}
          />
          <span style={{ fontSize: 'var(--font-size, 8pt)' }}>Настройки</span>
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
          outline: 'none',
        }}>Перейти</button>
      </div>

      {/* Основная область - две панели */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {/* Левая панель - описание */}
        <div style={{
          width: '200px',
          background: '#ECE9D8',
          borderRight: '1px solid #808080',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: '12pt',
            fontWeight: 'bold',
            marginBottom: '12px',
            textAlign: 'center',
          }}>
            Настройки
          </div>
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#000000',
            textAlign: 'center',
            lineHeight: '1.4',
            marginBottom: '12px',
          }}>
            Используйте настройки для персонализации вашего компьютера.
          </div>
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#000000',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            Выберите элемент для просмотра его описания.
          </div>
          {selectedItem && (
            <div style={{
              marginTop: '16px',
              padding: '8px',
              background: '#FFFFFF',
              border: '1px solid #808080',
              fontSize: 'var(--font-size, 8pt)',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {selectedItem.name}
              </div>
              <div style={{ color: '#424142' }}>
                {selectedItem.description}
              </div>
            </div>
          )}
        </div>

        {/* Правая панель - иконки */}
        <div style={{
          flex: 1,
          background: '#FFFFFF',
          padding: '16px',
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '16px',
          alignContent: 'start',
        }}>
          {settingsItems.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item)
                if (item.id === 'display') {
                  onOpenDisplayWindow()
                } else if (item.id === 'sounds') {
                  onOpenSoundsWindow()
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E0E0E0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px',
                border: selectedItem?.id === item.id ? '2px dashed #000080' : '2px solid transparent',
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.id === 'display' ? (
                  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
                    <rect width="32" height="32" fill="#C0C0C0"/>
                    <rect x="2" y="2" width="28" height="20" fill="#000080" stroke="#000" strokeWidth="1"/>
                    <rect x="6" y="6" width="20" height="14" fill="#FFFFFF"/>
                    <rect x="6" y="22" width="20" height="2" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
                    <rect x="10" y="24" width="12" height="4" fill="#808080" stroke="#000" strokeWidth="1"/>
                    <line x1="8" y1="8" x2="24" y2="8" stroke="#000000" strokeWidth="1"/>
                    <line x1="8" y1="10" x2="24" y2="10" stroke="#000000" strokeWidth="1"/>
                    <rect x="20" y="12" width="4" height="6" fill="#000000"/>
                    <line x1="8" y1="12" x2="18" y2="12" stroke="#000000" strokeWidth="1"/>
                    <line x1="8" y1="14" x2="18" y2="14" stroke="#000000" strokeWidth="1"/>
                    <line x1="8" y1="16" x2="18" y2="16" stroke="#000000" strokeWidth="1"/>
                  </svg>
                ) : (
                  <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
                    <rect width="32" height="32" fill="#C0C0C0"/>
                    <rect x="2" y="2" width="28" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
                    <rect x="8" y="8" width="16" height="16" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
                    <rect x="10" y="10" width="12" height="12" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
                    <rect x="12" y="12" width="8" height="8" fill="#000000"/>
                    <rect x="6" y="6" width="4" height="4" fill="#000000"/>
                    <rect x="22" y="6" width="4" height="4" fill="#000000"/>
                    <rect x="6" y="22" width="4" height="4" fill="#000000"/>
                    <rect x="22" y="22" width="4" height="4" fill="#000000"/>
                    <line x1="14" y1="14" x2="18" y2="14" stroke="#FFFFFF" strokeWidth="1"/>
                    <line x1="14" y1="16" x2="18" y2="16" stroke="#FFFFFF" strokeWidth="1"/>
                    <line x1="14" y1="18" x2="18" y2="18" stroke="#FFFFFF" strokeWidth="1"/>
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 'var(--font-size, 8pt)',
                textAlign: 'center',
                wordBreak: 'break-word',
                maxWidth: '100px',
              }}>
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Строка состояния */}
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
        <span>{settingsItems.length} объект(ов)</span>
      </div>
    </div>
  )
}

