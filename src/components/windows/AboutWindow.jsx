// Компонент круговой диаграммы в стиле Windows 2000 (пиксельный, 3D)
function CircularChart({ percentage, label, size = 120, color = '#0A246A', uniqueId }) {
  const radius = (size - 20) / 2
  const center = size / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  // Градиенты для 3D эффекта в стиле Windows 2000
  const gradientId = `grad-${uniqueId}`
  const lightGradientId = `light-${uniqueId}`

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      width: size,
    }}>
      <div style={{
        width: size,
        height: size,
        position: 'relative',
      }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <defs>
            {/* Темный градиент для нижней части (тень) */}
            <linearGradient id={`dark-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
            </linearGradient>
            {/* Светлый градиент для верхней части (подсветка) */}
            <linearGradient id={`light-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="50%" stopColor={color} />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
            {/* Основной цвет */}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          
          {/* Фоновая окружность - убрана серая рамка */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#ECE9D8"
            strokeWidth="14"
            style={{
              imageRendering: 'pixelated',
            }}
          />
          
          {/* Нижний слой - тень для 3D эффекта */}
          <circle
            cx={center}
            cy={center + 1}
            r={radius}
            fill="none"
            stroke={`url(#dark-${gradientId})`}
            strokeWidth="12"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.5s ease',
              imageRendering: 'pixelated',
              opacity: 0.6,
            }}
          />
          
          {/* Основной слой прогресса */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="12"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.5s ease',
              imageRendering: 'pixelated',
              filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.4))',
            }}
          />
          
          {/* Верхний слой - подсветка для 3D */}
          <circle
            cx={center}
            cy={center - 1}
            r={radius}
            fill="none"
            stroke={`url(#light-${gradientId})`}
            strokeWidth="8"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.5s ease',
              imageRendering: 'pixelated',
              opacity: 0.7,
            }}
          />
        </svg>
        
        {/* Текст с процентом - читаемый слева направо */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: size - 20,
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: 'var(--font-size, 16pt)',
            fontWeight: 'bold',
            color: '#000080',
            lineHeight: '1.2',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            {percentage}%
          </div>
          <div style={{
            fontSize: 'var(--font-size, 7pt)',
            color: '#000000',
            marginTop: '4px',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
            whiteSpace: 'normal',
            lineHeight: '1.2',
          }}>
            {label.split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function AboutWindow() {
  // Данные команды
  const teamMembers = [
    { 
      name: 'Никита', 
      role: 'FullStack developer',
      photo: '/nikita.jpeg',
      info: 'Опытный разработчик с глубокими знаниями в веб-технологиях. Специализируюсь на создании современных веб-приложений и Telegram ботов.'
    },
    { 
      name: 'Стефан', 
      role: 'FullStack developer',
      photo: '/stefan.jpeg',
      info: 'Профессиональный разработчик с фокусом на качество кода и пользовательский опыт. Эксперт в backend разработке и системах управления данными.'
    },
  ]

  // Технологический стек (собран из всего проекта)
  const techStack = [
    // Frontend
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'HTML/CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    // Backend
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    // Databases
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'SQL', category: 'Database' },
    // Telegram
    { name: 'Telegram Bot API', category: 'API' },
    { name: 'aiogram', category: 'Library' },
    // CMS & E-commerce
    { name: 'WordPress', category: 'CMS' },
    { name: 'WooCommerce', category: 'E-commerce' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'OpenCart', category: 'E-commerce' },
    { name: 'Tilda', category: 'CMS' },
    // APIs & Protocols
    { name: 'REST API', category: 'API' },
    { name: 'WebSocket', category: 'Protocol' },
    // Testing & Tools
    { name: 'Selenium', category: 'Testing' },
    { name: 'Postman', category: 'Testing' },
    { name: 'Charles', category: 'Testing' },
    { name: 'DevTools', category: 'Tools' },
    { name: 'Android Studio', category: 'Tools' },
    // Build Tools
    { name: 'Vite', category: 'Build Tool' },
    { name: 'PostCSS', category: 'Build Tool' },
    { name: 'ESLint', category: 'Build Tool' },
  ]

  // Статистика с обновленными значениями
  const stats = [
    { label: 'Проектов завершено', value: 18, max: 18, percentage: 100, showValue: true },
    { label: 'Довольных клиентов', value: 18, max: 18, percentage: 100, showValue: true },
    { label: 'Лет опыта', value: 2, max: 10, percentage: 20, showValue: true },
    { label: 'Технологий освоено', value: techStack.length, max: 100, percentage: 23, showValue: true },
  ]

  // Дополнительная статистика для круговых диаграмм (не дублирует основную статистику)
  const circularStats = [
    { label: 'Успешных\nпроектов', percentage: 100, color: '#0A246A' },
    { label: 'Соблюдение\nсроков', percentage: 100, color: '#008000' },
    { label: 'Время\nотклика', percentage: 95, color: '#FF8C00' },
    { label: 'Повторные\nзаказы', percentage: 78, color: '#8B008B' },
  ]

  // Специализации
  const specializations = [
    { name: 'Веб-приложения', percentage: 95, description: 'Современные SPA и многостраничные сайты' },
    { name: 'Telegram боты', percentage: 90, description: 'Автоматизация и интеграции' },
    { name: 'Тестирование ПО', percentage: 60, description: 'Проверка качества и функциональности' },
  ]

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      background: '#ECE9D8',
      fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
      fontSize: 'var(--font-size, 8pt)',
      color: '#000000',
      textRendering: 'optimizeSpeed',
      WebkitFontSmoothing: 'none',
      MozOsxFontSmoothing: 'grayscale',
      fontSmooth: 'never',
    }}>
      {/* Main Content */}
      <div style={{
        flex: 1,
        minHeight: 0,
        background: '#FFFFFF',
        padding: '16px',
        paddingBottom: '100px',
        overflow: 'auto',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
      }}>
        {/* Команда - карточки с фото */}
        <div style={{
          marginBottom: '24px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            padding: 0,
            fontSize: 'var(--font-size, 10pt)',
            fontWeight: 'bold',
            color: '#000080',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Наша команда
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            alignItems: 'flex-start',
          }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '12px',
                  background: '#FFFFFF',
                  border: '2px solid',
                  borderTopColor: '#FFFFFF',
                  borderLeftColor: '#FFFFFF',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080',
                  boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
                  minHeight: '450px',
                  maxWidth: '100%',
                }}
              >
                {/* Фото */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  marginBottom: '12px',
                  background: '#ECE9D8',
                  border: '1px solid',
                  borderTopColor: '#424142',
                  borderLeftColor: '#424142',
                  borderRightColor: '#FFFFFF',
                  borderBottomColor: '#FFFFFF',
                  boxShadow: 'inset -1px -1px 0px #C0C0C0, inset 1px 1px 0px #808080',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="team-photo"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      imageRendering: 'auto',
                      filter: 'none !important',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const parent = e.target.parentElement
                      if (parent && !parent.querySelector('.placeholder')) {
                        const placeholder = document.createElement('div')
                        placeholder.className = 'placeholder'
                        placeholder.style.cssText = 'color: #808080; font-size: var(--font-size, 9pt); text-align: center; padding: 20px; font-family: Tahoma, MS Sans Serif, sans-serif;'
                        placeholder.textContent = `Фото ${member.name}`
                        parent.appendChild(placeholder)
                      }
                    }}
                  />
                </div>
                
                {/* Имя и роль */}
                <div style={{
                  marginBottom: '8px',
                }}>
                  <div style={{
                    fontSize: 'var(--font-size, 10pt)',
                    fontWeight: 'bold',
                    color: '#000080',
                    marginBottom: '4px',
                  }}>
                    {member.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--font-size, 9pt)',
                    color: '#000000',
                    fontWeight: 'normal',
                  }}>
                    {member.role}
                  </div>
                </div>
                
                {/* Краткая информация */}
                <div style={{
                  fontSize: 'var(--font-size, 8pt)',
                  color: '#000000',
                  lineHeight: '1.5',
                  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                  textRendering: 'optimizeSpeed',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale',
                  fontSmooth: 'never',
                }}>
                  {member.info}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Технологический стек */}
        <div style={{
          marginBottom: '24px',
          padding: '12px',
          background: '#FFFFFF',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
        }}>
          <h2 style={{
            margin: '0 0 12px 0',
            padding: 0,
            fontSize: 'var(--font-size, 10pt)',
            fontWeight: 'bold',
            color: '#000080',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Технологический стек
          </h2>
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#000000',
            marginBottom: '12px',
            lineHeight: '1.5',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Работаем с современными технологиями и инструментами разработки. Постоянно изучаем новые фреймворки и библиотеки для создания эффективных решений.
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
          }}>
            {techStack.map((tech, index) => (
              <span
                key={index}
                style={{
                  fontSize: 'var(--font-size, 8pt)',
                  color: '#000000',
                  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                  textRendering: 'optimizeSpeed',
                  WebkitFontSmoothing: 'none',
                  MozOsxFontSmoothing: 'grayscale',
                  fontSmooth: 'never',
                  padding: '4px 8px',
                  background: '#C0C0C0',
                  border: '1px solid',
                  borderTopColor: '#FFFFFF',
                  borderLeftColor: '#FFFFFF',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080',
                  display: 'inline-block',
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Круговые диаграммы */}
        <div style={{
          marginBottom: '24px',
          padding: '12px',
          background: '#FFFFFF',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            padding: 0,
            fontSize: 'var(--font-size, 10pt)',
            fontWeight: 'bold',
            color: '#000080',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Ключевые показатели
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, auto)',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            {circularStats.map((stat, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularChart
                  percentage={stat.percentage}
                  label={stat.label}
                  color={stat.color}
                  size={150}
                  uniqueId={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Статистика с прогресс-барами */}
        <div style={{
          padding: '12px',
          background: '#FFFFFF',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
          marginBottom: '24px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            padding: 0,
            fontSize: 'var(--font-size, 10pt)',
            fontWeight: 'bold',
            color: '#000080',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Статистика
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            {stats.map((stat, index) => {
              const percentage = stat.percentage || (stat.value / stat.max) * 100
              return (
                <div key={index}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                    fontSize: 'var(--font-size, 8pt)',
                  }}>
                    <span>{stat.label}</span>
                    {stat.showValue && (
                      <span style={{ fontWeight: 'bold' }}>
                        {stat.label === 'Довольных клиентов' 
                          ? `${stat.value}`
                          : stat.label === 'Лет опыта'
                          ? `${stat.value} ${stat.value === 1 ? 'год' : stat.value < 5 ? 'года' : 'лет'}`
                          : stat.label === 'Проектов завершено'
                          ? `${stat.value}`
                          : `${stat.value}`}
                      </span>
                    )}
                  </div>
                  {/* Прогресс-бар в стиле Windows 2000 */}
                  <div style={{
                    width: '100%',
                    height: '18px',
                    background: '#ECE9D8',
                    border: '1px solid',
                    borderTopColor: '#424142',
                    borderLeftColor: '#424142',
                    borderRightColor: '#FFFFFF',
                    borderBottomColor: '#FFFFFF',
                    boxShadow: 'inset -1px -1px 0px #C0C0C0, inset 1px 1px 0px #808080',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${percentage}%`,
                      height: '100%',
                      background: 'linear-gradient(to bottom, #A6CAF0 0%, #0A246A 50%, #A6CAF0 100%)',
                      borderRight: '1px solid #000080',
                      transition: 'width 0.3s ease',
                    }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: 'var(--font-size, 7pt)',
                      fontWeight: 'bold',
                      color: percentage > 50 ? '#FFFFFF' : '#000000',
                      textShadow: percentage > 50 ? '1px 1px 1px rgba(0,0,0,0.5)' : 'none',
                      pointerEvents: 'none',
                    }}>
                      {Math.round(percentage)}%
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Специализации */}
        <div style={{
          padding: '12px',
          background: '#FFFFFF',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
          marginBottom: '24px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            padding: 0,
            fontSize: 'var(--font-size, 10pt)',
            fontWeight: 'bold',
            color: '#000080',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Наши специализации
          </h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {specializations.map((spec, index) => (
              <div key={index} style={{
                padding: '8px',
                background: '#F5F5F5',
                border: '1px solid',
                borderTopColor: '#FFFFFF',
                borderLeftColor: '#FFFFFF',
                borderRightColor: '#808080',
                borderBottomColor: '#808080',
              }}>
                <div style={{
                  marginBottom: '4px',
                  fontSize: 'var(--font-size, 9pt)',
                  fontWeight: 'bold',
                  color: '#000080',
                }}>
                  <span>{spec.name}</span>
                </div>
                <div style={{
                  fontSize: 'var(--font-size, 7pt)',
                  color: '#000000',
                  marginBottom: '6px',
                }}>
                  {spec.description}
                </div>
                <div style={{
                  width: '100%',
                  height: '18px',
                  background: '#ECE9D8',
                  border: '1px solid',
                  borderTopColor: '#424142',
                  borderLeftColor: '#424142',
                  borderRightColor: '#FFFFFF',
                  borderBottomColor: '#FFFFFF',
                  boxShadow: 'inset -1px -1px 0px #C0C0C0, inset 1px 1px 0px #808080',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${spec.percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(to bottom, #A6CAF0 0%, #0A246A 50%, #A6CAF0 100%)',
                    borderRight: '1px solid #000080',
                    transition: 'width 0.3s ease',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: 'var(--font-size, 7pt)',
                    fontWeight: 'bold',
                    color: spec.percentage > 50 ? '#FFFFFF' : '#000000',
                    textShadow: spec.percentage > 50 ? '1px 1px 1px rgba(0,0,0,0.5)' : 'none',
                    pointerEvents: 'none',
                  }}>
                    {spec.percentage}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Подход к работе */}
        <div style={{
          padding: '12px',
          background: '#FFFFFF',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
          marginBottom: '0',
        }}>
          <h2 style={{
            margin: '0 0 12px 0',
            padding: 0,
            fontSize: 'var(--font-size, 10pt)',
            fontWeight: 'bold',
            color: '#000080',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            Наш подход
          </h2>
          <div style={{
            fontSize: 'var(--font-size, 8pt)',
            color: '#000000',
            lineHeight: '1.6',
            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
            textRendering: 'optimizeSpeed',
            WebkitFontSmoothing: 'none',
            MozOsxFontSmoothing: 'grayscale',
            fontSmooth: 'never',
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Качество превыше всего.</strong> Каждый проект проходит тщательное тестирование и код-ревью.
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Прозрачность и коммуникация.</strong> Регулярные обновления о прогрессе, открытое обсуждение задач.
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Современные технологии.</strong> Используем актуальные инструменты и лучшие практики разработки.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>Сроки и бюджет.</strong> Соблюдаем договоренности и предлагаем оптимальные решения.
            </p>
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
        flexShrink: 0,
      }}>
        <span>Команда: {teamMembers.length} человек(а)</span>
        <span>Технологий: {techStack.length}</span>
      </div>
    </div>
  )
}

