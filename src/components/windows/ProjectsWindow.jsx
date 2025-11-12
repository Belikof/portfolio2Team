export function ProjectsWindow() {
  const services = [
    {
      id: 1,
      title: 'Лендинги',
      type: 'website',
      subtype: 'landing',
      description: 'Одностраничные сайты для презентации продукта или услуги. Быстрая загрузка, адаптивный дизайн, оптимизация под конверсию. Разработка с нуля или на конструкторе по вашему выбору.',
      image: '/lending.jpg',
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'WordPress', 'Tilda'],
    },
    {
      id: 2,
      title: 'Многостраничные сайты',
      type: 'website',
      subtype: 'multipage',
      description: 'Корпоративные сайты, портфолио, информационные порталы. Полноценная структура с множеством разделов, удобная навигация, SEO-оптимизация. Разработка с нуля или на CMS.',
      image: '/many-pages.png',
      technologies: ['React', 'Vue.js', 'WordPress', 'Next.js', 'PHP'],
    },
    {
      id: 3,
      title: 'Онлайн магазины',
      type: 'website',
      subtype: 'ecommerce',
      description: 'Интернет-магазины с корзиной, каталогом товаров, системой оплаты и доставки. Интеграция с платежными системами, CRM и складскими программами.',
      image: '/shop.jpeg',
      technologies: ['WooCommerce', 'Shopify', 'OpenCart', 'React', 'Node.js'],
    },
    {
      id: 4,
      title: 'Специальные заказы',
      type: 'website',
      subtype: 'custom',
      description: 'Уникальные решения под ваши задачи: веб-приложения, интерактивные платформы, системы бронирования, кабинеты пользователей. Разработка с нуля по техническому заданию.',
      image: '/special.jpg',
      technologies: ['React', 'Vue.js', 'Node.js', 'Python', 'PostgreSQL'],
    },
    {
      id: 5,
      title: 'Telegram боты',
      type: 'telegram-bot',
      description: 'Автоматизация бизнес-процессов через Telegram: боты для заказов, уведомлений, консультаций, игр, интеграций с CRM и другими системами. Под любые задачи и масштабы.',
      image: '/telegram-bots.jpg',
      technologies: ['Python', 'aiogram', 'Node.js', 'Telegram Bot API', 'PostgreSQL'],
    },
    {
      id: 6,
      title: 'CRM системы',
      type: 'crm',
      description: 'Системы управления клиентами и продажами. Учет заявок, история взаимодействий, аналитика, интеграции с телефонией, почтой и мессенджерами. Адаптация под ваш бизнес.',
      image: '/crm.png',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'REST API', 'WebSocket'],
    },
    {
      id: 7,
      title: 'Web приложения',
      type: 'web-app',
      description: 'Веб-приложения любой сложности: дашборды, админ-панели, системы учета, платформы для работы с данными. Адаптивный интерфейс, быстрая работа, безопасность.',
      image: '/web-app.jpeg',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      id: 8,
      title: 'Тестирование ПО',
      type: 'testing',
      description: 'Комплексное тестирование программного обеспечения: функциональное, юзабилити. Автоматизация тестирования, написание тест-кейсов, регрессионное тестирование. Обеспечение качества перед релизом. Подробный отчет и локализация дефектов.',
      image: '/testing.jpeg',
      technologies: ['Selenium', 'Android Studio', 'Charles', 'Postman', 'DevTools', 'SQL'],
    },
  ]

  const getTypeLabel = (type) => {
    switch (type) {
      case 'website':
        return 'Сайт'
      case 'telegram-bot':
        return 'Telegram бот'
      case 'crm':
        return 'CRM'
      case 'web-app':
        return 'Web приложение'
      case 'testing':
        return 'Тестирование'
      default:
        return 'Услуга'
    }
  }

  const getButtonLabel = (type) => {
    switch (type) {
      case 'website':
        return 'Примеры работ'
      case 'telegram-bot':
        return 'Примеры ботов'
      case 'crm':
        return 'Примеры CRM'
      case 'web-app':
        return 'Примеры приложений'
      case 'testing':
        return 'Примеры тестирования'
      default:
        return 'Подробнее'
    }
  }

  const handleOpenProject = (service) => {
    // Можно добавить логику открытия примеров работ или переход на страницу контактов
    // Пока просто заглушка
    console.log('Открыть примеры для:', service.title)
  }

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
      {/* Main Content */}
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        padding: '16px',
        overflow: 'auto',
      }}>
        {services.length === 0 ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#808080',
            fontSize: 'var(--font-size, 9pt)',
          }}>
            Услуги будут добавлены позже
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}>
            {services.map((service, index) => (
              <div
                key={service.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  background: '#FFFFFF',
                  border: '2px solid',
                  borderTopColor: '#FFFFFF',
                  borderLeftColor: '#FFFFFF',
                  borderRightColor: '#808080',
                  borderBottomColor: '#808080',
                  boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
                }}
              >
                {/* Изображение слева */}
                <div style={{
                  flexShrink: 0,
                  width: '180px',
                  height: '140px',
                  background: '#ECE9D8',
                  border: '1px solid',
                  borderTopColor: '#808080',
                  borderLeftColor: '#808080',
                  borderRightColor: '#FFFFFF',
                  borderBottomColor: '#FFFFFF',
                  boxShadow: 'inset 1px 1px 0px #424142',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      imageRendering: 'auto',
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const parent = e.target.parentElement
                      if (parent && !parent.querySelector('.error-message')) {
                        const errorDiv = document.createElement('div')
                        errorDiv.className = 'error-message'
                        errorDiv.style.cssText = 'color: #808080; font-size: var(--font-size, 8pt); text-align: center; padding: 8px; font-family: Tahoma, MS Sans Serif, sans-serif;'
                        errorDiv.textContent = 'Изображение\nне загружено'
                        parent.appendChild(errorDiv)
                      }
                    }}
                  />
                </div>

                {/* Текст и кнопка справа */}
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  paddingTop: '4px',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}>
                    <h3 style={{
                      margin: 0,
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
                      {service.title}
                    </h3>
                    <span style={{
                      fontSize: 'var(--font-size, 7pt)',
                      color: '#808080',
                      fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                      textRendering: 'optimizeSpeed',
                      WebkitFontSmoothing: 'none',
                      MozOsxFontSmoothing: 'grayscale',
                      fontSmooth: 'never',
                      padding: '2px 6px',
                      background: '#ECE9D8',
                      border: '1px solid',
                      borderTopColor: '#808080',
                      borderLeftColor: '#808080',
                      borderRightColor: '#FFFFFF',
                      borderBottomColor: '#FFFFFF',
                    }}>
                      {getTypeLabel(service.type)}
                    </span>
                  </div>
                  
                  <p style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 'var(--font-size, 8pt)',
                    color: '#000000',
                    fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                    lineHeight: '1.5',
                    textRendering: 'optimizeSpeed',
                    WebkitFontSmoothing: 'none',
                    MozOsxFontSmoothing: 'grayscale',
                    fontSmooth: 'never',
                  }}>
                    {service.description}
                  </p>

                  {service.technologies && service.technologies.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '4px',
                      marginTop: '4px',
                    }}>
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          style={{
                            fontSize: 'var(--font-size, 7pt)',
                            color: '#000000',
                            fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                            textRendering: 'optimizeSpeed',
                            WebkitFontSmoothing: 'none',
                            MozOsxFontSmoothing: 'grayscale',
                            fontSmooth: 'never',
                            padding: '1px 4px',
                            background: '#C0C0C0',
                            border: '1px solid',
                            borderTopColor: '#FFFFFF',
                            borderLeftColor: '#FFFFFF',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '8px',
                  }}>
                    <button
                      onClick={() => handleOpenProject(service)}
                      style={{
                        minWidth: '120px',
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
                    >
                      {getButtonLabel(service.type)}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
        <span>{services.length} услуг(и)</span>
      </div>
    </div>
  )
}

