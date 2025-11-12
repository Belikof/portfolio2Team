import { useState } from 'react'
import { iconPaths } from '../../constants/iconPaths'
import { Windows2000Dialog } from './Windows2000Dialog'

export function RecycleBinWindow() {
  const [dialogMessage, setDialogMessage] = useState(null)
  const files = [
    { name: 'секретный_файл.txt', location: 'C:\\Documents', date: '01.01.2000', type: 'Текстовый документ', size: '2 КБ' },
    { name: 'важные_данные.doc', location: 'C:\\Мои документы', date: '15.03.1999', type: 'Microsoft Word', size: '45 КБ' },
    { name: 'пароли.xls', location: 'C:\\Работа', date: '22.11.2001', type: 'Microsoft Excel', size: '128 КБ' },
    { name: 'мой_дневник.txt', location: 'C:\\Личное', date: '05.07.2000', type: 'Текстовый документ', size: '15 КБ' },
    { name: 'рецепт_борща.txt', location: 'C:\\Рецепты', date: '10.09.2000', type: 'Текстовый документ', size: '3 КБ' },
    { name: 'список_покупок.txt', location: 'C:\\Documents', date: '18.12.2000', type: 'Текстовый документ', size: '1 КБ' },
    { name: 'любимые_песни.mp3', location: 'C:\\Музыка', date: '03.05.2000', type: 'MP3 Audio', size: '3.2 МБ' },
    { name: 'фото_отпуска.jpg', location: 'C:\\Изображения', date: '25.08.2000', type: 'JPEG Image', size: '256 КБ' },
    { name: 'резюме_2000.doc', location: 'C:\\Documents', date: '12.01.2000', type: 'Microsoft Word', size: '32 КБ' },
    { name: 'план_мирового_господства.txt', location: 'C:\\Секретно', date: '31.12.1999', type: 'Текстовый документ', size: '5 КБ' },
    { name: 'секреты_вселенной.txt', location: 'C:\\Documents', date: '01.01.2000', type: 'Текстовый документ', size: '8 КБ' },
    { name: 'как_работать_меньше.txt', location: 'C:\\Работа', date: '14.02.2000', type: 'Текстовый документ', size: '4 КБ' },
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
            src={iconPaths.recycleBin} 
            alt="" 
            width="16" 
            height="16"
            style={{
              imageRendering: 'pixelated',
              WebkitImageRendering: 'pixelated',
            }}
          />
          <span style={{ fontSize: 'var(--font-size, 8pt)' }}>Корзина</span>
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

      {/* Main Content - Two Panes */}
      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      }}>
        {/* Left Pane - Task Pane */}
        <div style={{
          width: '200px',
          background: '#ECE9D8',
          borderRight: '1px solid #808080',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <img 
            src={iconPaths.recycleBin} 
            alt="Корзина" 
            width="64" 
            height="64"
            style={{
              imageRendering: 'pixelated',
              WebkitImageRendering: 'pixelated',
              marginBottom: '12px',
            }}
          />
          <div style={{
            fontWeight: 'bold',
            fontSize: '9pt',
            marginBottom: '8px',
            textAlign: 'center',
          }}>Корзина</div>
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#000000',
            textAlign: 'center',
            lineHeight: '1.4',
            marginBottom: '12px',
          }}>
            Эта папка содержит файлы и папки, которые вы удалили с компьютера.
          </div>
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#000000',
            textAlign: 'center',
            fontStyle: 'italic',
          }}>
            Элементы в корзине можно восстановить или окончательно удалить.
          </div>
        </div>

        {/* Right Pane - File List */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF',
          overflow: 'auto',
          overflowX: 'hidden',
        }}>
          {/* Table Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr',
            background: '#ECE9D8',
            borderBottom: '1px solid #808080',
            position: 'sticky',
            top: 0,
            zIndex: 10,
            width: '100%',
            minWidth: 0,
          }}>
            {['Имя', 'Исходное расположение', 'Дата удаления', 'Тип', 'Размер'].map((header, idx) => (
              <div
                key={header}
                style={{
                  padding: '4px 8px',
                  borderRight: idx < 4 ? '1px solid #808080' : 'none',
                  fontSize: 'var(--font-size, 8pt)',
                  fontWeight: 'normal',
                  background: '#ECE9D8',
                  cursor: 'default',
                }}
              >
                {header}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          <div style={{ flex: 1, width: '100%', minWidth: 0 }}>
            {files.map((file, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr',
                  borderBottom: '1px solid #E0E0E0',
                  cursor: 'pointer',
                  background: index % 2 === 0 ? '#FFFFFF' : '#F8F8F8',
                  color: '#000000',
                  width: '100%',
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#000080'
                  e.currentTarget.style.color = '#FFFFFF'
                  const cells = e.currentTarget.querySelectorAll('div')
                  cells.forEach(cell => {
                    cell.style.background = '#000080'
                    cell.style.color = '#FFFFFF'
                  })
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = index % 2 === 0 ? '#FFFFFF' : '#F8F8F8'
                  e.currentTarget.style.color = '#000000'
                  const cells = e.currentTarget.querySelectorAll('div')
                  cells.forEach((cell, cellIdx) => {
                    cell.style.background = index % 2 === 0 ? 'transparent' : '#F8F8F8'
                    cell.style.color = '#000000'
                  })
                }}
                onClick={() => {
                  setDialogMessage(`Файл "${file.name}" удален и его невозможно восстановить.`)
                }}
              >
                {[file.name, file.location, file.date, file.type, file.size].map((cell, cellIdx) => (
                  <div
                    key={cellIdx}
                    style={{
                      padding: '4px 8px',
                      borderRight: cellIdx < 4 ? '1px solid #E0E0E0' : 'none',
                      fontSize: 'var(--font-size, 8pt)',
                      background: index % 2 === 0 ? 'transparent' : '#F8F8F8',
                      color: '#000000',
                    }}
                  >
                    {cellIdx === 0 && (
                      <span style={{ marginRight: '4px' }}>📄</span>
                    )}
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
        <span>12 объект(ов)</span>
        <span>3.5 МБ</span>
      </div>

      {dialogMessage && (
        <Windows2000Dialog
          message={dialogMessage}
          title="Ошибка"
          type="error"
          onClose={() => setDialogMessage(null)}
        />
      )}
    </div>
  )
}

