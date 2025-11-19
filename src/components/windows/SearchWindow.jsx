import { useState, useMemo } from 'react'

export function SearchWindow({ onOpenWindow }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all') // all, projects, skills, about
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768

  // Функция подсветки найденных слов
  const highlightText = (text, query) => {
    if (!query.trim()) return text
    
    const words = query.toLowerCase().trim().split(/\s+/).filter(w => w.length > 0)
    if (words.length === 0) return text
    
    let highlightedText = text
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi')
      highlightedText = highlightedText.replace(regex, (match) => {
        return `<mark style="background: #FFFF00; padding: 1px 2px;">${match}</mark>`
      })
    })
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />
  }

  // Данные проектов (из ProjectsWindow)
  const services = [
    {
      id: 1,
      title: 'Лендинги',
      type: 'website',
      subtype: 'landing',
      description: 'Одностраничные сайты для презентации продукта или услуги. Быстрая загрузка, адаптивный дизайн, оптимизация под конверсию. Разработка с нуля или на конструкторе по вашему выбору.',
      technologies: ['HTML/CSS', 'JavaScript', 'React', 'WordPress', 'Tilda'],
    },
    {
      id: 2,
      title: 'Многостраничные сайты',
      type: 'website',
      subtype: 'multipage',
      description: 'Корпоративные сайты, портфолио, информационные порталы. Полноценная структура с множеством разделов, удобная навигация, SEO-оптимизация. Разработка с нуля или на CMS.',
      technologies: ['React', 'Vue.js', 'WordPress', 'Next.js', 'PHP'],
    },
    {
      id: 3,
      title: 'Онлайн магазины',
      type: 'website',
      subtype: 'ecommerce',
      description: 'Интернет-магазины с корзиной, каталогом товаров, системой оплаты и доставки. Интеграция с платежными системами, CRM и складскими программами.',
      technologies: ['WooCommerce', 'Shopify', 'OpenCart', 'React', 'Node.js'],
    },
    {
      id: 4,
      title: 'Специальные заказы',
      type: 'website',
      subtype: 'custom',
      description: 'Уникальные решения под ваши задачи: веб-приложения, интерактивные платформы, системы бронирования, кабинеты пользователей. Разработка с нуля по техническому заданию.',
      technologies: ['React', 'Vue.js', 'Node.js', 'Python', 'PostgreSQL'],
    },
    {
      id: 5,
      title: 'Telegram боты',
      type: 'telegram-bot',
      description: 'Автоматизация бизнес-процессов через Telegram: боты для заказов, уведомлений, консультаций, игр, интеграций с CRM и другими системами. Под любые задачи и масштабы.',
      technologies: ['Python', 'aiogram', 'Node.js', 'Telegram Bot API', 'PostgreSQL'],
    },
    {
      id: 6,
      title: 'CRM системы',
      type: 'crm',
      description: 'Системы управления клиентами и продажами. Учет заявок, история взаимодействий, аналитика, интеграции с телефонией, почтой и мессенджерами. Адаптация под ваш бизнес.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'REST API', 'WebSocket'],
    },
    {
      id: 7,
      title: 'Web приложения',
      type: 'web-app',
      description: 'Веб-приложения любой сложности: дашборды, админ-панели, системы учета, платформы для работы с данными. Адаптивный интерфейс, быстрая работа, безопасность.',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      id: 8,
      title: 'Тестирование ПО',
      type: 'testing',
      description: 'Комплексное тестирование программного обеспечения: функциональное, юзабилити. Автоматизация тестирования, написание тест-кейсов, регрессионное тестирование. Обеспечение качества перед релизом. Подробный отчет и локализация дефектов.',
      technologies: ['Selenium', 'Android Studio', 'Charles', 'Postman', 'DevTools', 'SQL'],
    },
  ]

  // Навыки (из AboutWindow)
  const techStack = [
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'HTML/CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Language' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'Backend' },
    { name: 'PHP', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'SQL', category: 'Database' },
    { name: 'Telegram Bot API', category: 'API' },
    { name: 'aiogram', category: 'Library' },
    { name: 'WordPress', category: 'CMS' },
    { name: 'WooCommerce', category: 'E-commerce' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'OpenCart', category: 'E-commerce' },
    { name: 'Tilda', category: 'CMS' },
    { name: 'REST API', category: 'API' },
    { name: 'WebSocket', category: 'Protocol' },
    { name: 'Selenium', category: 'Testing' },
    { name: 'Postman', category: 'Testing' },
    { name: 'Charles', category: 'Testing' },
    { name: 'DevTools', category: 'Tools' },
    { name: 'Android Studio', category: 'Tools' },
    { name: 'Vite', category: 'Build Tool' },
    { name: 'PostCSS', category: 'Build Tool' },
    { name: 'ESLint', category: 'Build Tool' },
  ]

  // Данные команды (из AboutWindow)
  const teamMembers = [
    { 
      name: 'Никита', 
      role: 'FullStack developer',
      info: 'Опытный разработчик с глубокими знаниями в веб-технологиях. Специализируюсь на создании современных веб-приложений и Telegram ботов.'
    },
    { 
      name: 'Стефан', 
      role: 'FullStack developer',
      info: 'Профессиональный разработчик с фокусом на качество кода и пользовательский опыт. Эксперт в backend разработке и системах управления данными.'
    },
  ]

  // Специализации (из AboutWindow)
  const specializations = [
    { name: 'Веб-приложения', percentage: 95, description: 'Современные SPA и многостраничные сайты' },
    { name: 'Telegram боты', percentage: 90, description: 'Автоматизация и интеграции' },
    { name: 'Тестирование ПО', percentage: 60, description: 'Проверка качества и функциональности' },
  ]

  // Статистика (из AboutWindow)
  const stats = [
    { label: 'Проектов завершено', value: 18 },
    { label: 'Довольных клиентов', value: 18 },
    { label: 'Лет опыта', value: 2 },
    { label: 'Технологий освоено', value: techStack.length },
  ]

  // Подход к работе (из AboutWindow)
  const approachTexts = [
    'Качество превыше всего. Каждый проект проходит тщательное тестирование и код-ревью.',
    'Прозрачность и коммуникация. Регулярные обновления о прогрессе, открытое обсуждение задач.',
    'Современные технологии. Используем актуальные инструменты и лучшие практики разработки.',
    'Сроки и бюджет. Соблюдаем договоренности и предлагаем оптимальные решения.',
  ]

  // Функция подсчета релевантности
  const calculateRelevance = (item, queryWords) => {
    let score = 0
    const text = JSON.stringify(item).toLowerCase()
    
    queryWords.forEach(word => {
      // Больше очков за точное совпадение в начале
      if (text.startsWith(word)) score += 10
      // Очки за вхождение
      const matches = (text.match(new RegExp(word, 'g')) || []).length
      score += matches * 2
    })
    
    return score
  }

  // Функция поиска
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return { projects: [], skills: [], about: [] }
    }

    const query = searchQuery.toLowerCase().trim()
    const queryWords = query.split(/\s+/).filter(w => w.length > 0)
    const results = {
      projects: [],
      skills: [],
      about: [],
    }

    // Поиск по проектам (по нескольким словам - AND логика)
    services.forEach((service) => {
      const matches = []
      const allText = `${service.title} ${service.description} ${service.technologies.join(' ')}`.toLowerCase()
      
      // Проверяем, что все слова запроса присутствуют
      const allWordsMatch = queryWords.every(word => allText.includes(word))
      
      if (!allWordsMatch) return
      
      // Поиск в названии
      const titleMatches = queryWords.some(word => service.title.toLowerCase().includes(word))
      if (titleMatches) {
        matches.push({ type: 'title', text: service.title })
      }
      
      // Поиск в описании
      const descMatches = queryWords.some(word => service.description.toLowerCase().includes(word))
      if (descMatches) {
        matches.push({ type: 'description', text: service.description })
      }
      
      // Поиск в технологиях
      const matchingTechs = service.technologies.filter(tech => 
        queryWords.some(word => tech.toLowerCase().includes(word))
      )
      if (matchingTechs.length > 0) {
        matches.push({ type: 'technologies', text: matchingTechs.join(', ') })
      }

      if (matches.length > 0) {
        const relevance = calculateRelevance(service, queryWords)
        results.projects.push({
          service,
          matches,
          relevance,
        })
      }
    })
    
    // Сортировка проектов по релевантности
    results.projects.sort((a, b) => b.relevance - a.relevance)

    // Поиск по навыкам (по нескольким словам - AND логика)
    techStack.forEach((tech) => {
      const techText = `${tech.name} ${tech.category}`.toLowerCase()
      const allWordsMatch = queryWords.every(word => techText.includes(word))
      
      if (allWordsMatch) {
        const relevance = calculateRelevance(tech, queryWords)
        results.skills.push({ ...tech, relevance })
      }
    })
    
    // Сортировка навыков по релевантности
    results.skills.sort((a, b) => b.relevance - a.relevance)

    // Поиск по разделу "О нас"
    const aboutMatches = []

    // Поиск по команде (по нескольким словам - AND логика)
    teamMembers.forEach((member) => {
      const memberText = `${member.name} ${member.role} ${member.info}`.toLowerCase()
      const allWordsMatch = queryWords.every(word => memberText.includes(word))
      
      if (!allWordsMatch) return
      
      const memberMatches = []
      if (queryWords.some(word => member.name.toLowerCase().includes(word))) {
        memberMatches.push({ type: 'name', text: member.name })
      }
      if (queryWords.some(word => member.role.toLowerCase().includes(word))) {
        memberMatches.push({ type: 'role', text: member.role })
      }
      if (queryWords.some(word => member.info.toLowerCase().includes(word))) {
        memberMatches.push({ type: 'info', text: member.info })
      }
      if (memberMatches.length > 0) {
        const relevance = calculateRelevance(member, queryWords)
        aboutMatches.push({
          category: 'team',
          title: 'Команда',
          member,
          matches: memberMatches,
          relevance,
        })
      }
    })

    // Поиск по специализациям (по нескольким словам - AND логика)
    specializations.forEach((spec) => {
      const specText = `${spec.name} ${spec.description}`.toLowerCase()
      const allWordsMatch = queryWords.every(word => specText.includes(word))
      
      if (!allWordsMatch) return
      
      const specMatches = []
      if (queryWords.some(word => spec.name.toLowerCase().includes(word))) {
        specMatches.push({ type: 'name', text: spec.name })
      }
      if (queryWords.some(word => spec.description.toLowerCase().includes(word))) {
        specMatches.push({ type: 'description', text: spec.description })
      }
      if (specMatches.length > 0) {
        const relevance = calculateRelevance(spec, queryWords)
        aboutMatches.push({
          category: 'specialization',
          title: 'Специализации',
          spec,
          matches: specMatches,
          relevance,
        })
      }
    })

    // Поиск по статистике (по нескольким словам - AND логика)
    stats.forEach((stat) => {
      const statText = `${stat.label} ${stat.value}`.toLowerCase()
      const allWordsMatch = queryWords.every(word => statText.includes(word))
      
      if (allWordsMatch) {
        const relevance = calculateRelevance(stat, queryWords)
        aboutMatches.push({
          category: 'stats',
          title: 'Статистика',
          stat,
          matches: [{ type: 'stat', text: `${stat.label}: ${stat.value}` }],
          relevance,
        })
      }
    })

    // Поиск по подходу к работе (по нескольким словам - AND логика)
    approachTexts.forEach((text) => {
      const allWordsMatch = queryWords.every(word => text.toLowerCase().includes(word))
      
      if (allWordsMatch) {
        const relevance = calculateRelevance({ text }, queryWords)
        aboutMatches.push({
          category: 'approach',
          title: 'Наш подход',
          text,
          matches: [{ type: 'text', text }],
          relevance,
        })
      }
    })

    // Поиск по технологическому стеку (уже есть в skills, но добавим в about для контекста)
    const matchingTechStack = techStack.filter(tech => {
      const techText = `${tech.name} ${tech.category}`.toLowerCase()
      return queryWords.every(word => techText.includes(word))
    })
    if (matchingTechStack.length > 0) {
      const relevance = calculateRelevance({ technologies: matchingTechStack }, queryWords)
      aboutMatches.push({
        category: 'techStack',
        title: 'Технологический стек',
        technologies: matchingTechStack,
        matches: [{ type: 'techStack', text: matchingTechStack.map(t => t.name).join(', ') }],
        relevance,
      })
    }

    // Сортировка результатов "О нас" по релевантности
    aboutMatches.sort((a, b) => (b.relevance || 0) - (a.relevance || 0))

    results.about = aboutMatches

    return results
  }, [searchQuery])

  // Фильтрация результатов
  const filteredResults = useMemo(() => {
    if (activeFilter === 'all') return searchResults
    if (activeFilter === 'projects') return { ...searchResults, skills: [], about: [] }
    if (activeFilter === 'skills') return { ...searchResults, projects: [], about: [] }
    if (activeFilter === 'about') return { ...searchResults, projects: [], skills: [] }
    return searchResults
  }, [searchResults, activeFilter])

  const hasResults = filteredResults.projects.length > 0 || filteredResults.skills.length > 0 || filteredResults.about.length > 0
  const hasQuery = searchQuery.trim().length > 0

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
        padding: isMobile ? '12px' : '16px',
        overflow: 'auto',
      }}>
        {/* Поле поиска */}
        <div style={{
          marginBottom: isMobile ? '12px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'stretch',
        }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: 'var(--font-size, 9pt)',
            fontWeight: 'bold',
            color: '#000080',
            width: isMobile ? '100%' : 'auto',
            textAlign: isMobile ? 'center' : 'left',
          }}>
            Поиск:
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введите слово или несколько слов для поиска..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSearchQuery('')
              }
            }}
            style={{
              width: isMobile ? '90%' : '100%',
              maxWidth: isMobile ? '400px' : 'none',
              height: '23px',
              padding: '0 8px',
              background: '#FFFFFF',
              border: '1px solid',
              borderTopColor: '#424142',
              borderLeftColor: '#424142',
              borderRightColor: '#FFFFFF',
              borderBottomColor: '#FFFFFF',
              boxShadow: 'inset -1px -1px 0px #C0C0C0, inset 1px 1px 0px #808080',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontSize: 'var(--font-size, 8pt)',
              color: '#000000',
              textRendering: 'optimizeSpeed',
              WebkitFontSmoothing: 'none',
              MozOsxFontSmoothing: 'grayscale',
              fontSmooth: 'never',
              outline: 'none',
            }}
          />
        </div>

        {/* Фильтры */}
        {hasQuery && (
          <div style={{
            marginBottom: isMobile ? '10px' : '16px',
            display: 'flex',
            gap: '4px',
            flexWrap: 'wrap',
          }}>
            {[
              { id: 'all', label: 'Все' },
              { id: 'projects', label: 'Проекты' },
              { id: 'skills', label: 'Навыки' },
              { id: 'about', label: 'О нас' },
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  height: '23px',
                  padding: '0 12px',
                  background: activeFilter === filter.id ? '#C0C0C0' : '#ECE9D8',
                  border: '1px solid',
                  borderTopColor: activeFilter === filter.id ? '#424142' : '#FFFFFF',
                  borderLeftColor: activeFilter === filter.id ? '#424142' : '#FFFFFF',
                  borderRightColor: activeFilter === filter.id ? '#FFFFFF' : '#808080',
                  borderBottomColor: activeFilter === filter.id ? '#FFFFFF' : '#808080',
                  boxShadow: activeFilter === filter.id 
                    ? 'inset 1px 1px 0px rgba(0,0,0,0.3)'
                    : 'inset -1px -1px 0px #C0C0C0, inset 1px 1px 0px #FFFFFF',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size, 8pt)',
                  fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
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
                }}
                onMouseUp={(e) => {
                  if (activeFilter === filter.id) {
                    e.currentTarget.style.borderTopColor = '#424142'
                    e.currentTarget.style.borderLeftColor = '#424142'
                    e.currentTarget.style.borderRightColor = '#FFFFFF'
                    e.currentTarget.style.borderBottomColor = '#FFFFFF'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter === filter.id) {
                    e.currentTarget.style.borderTopColor = '#424142'
                    e.currentTarget.style.borderLeftColor = '#424142'
                    e.currentTarget.style.borderRightColor = '#FFFFFF'
                    e.currentTarget.style.borderBottomColor = '#FFFFFF'
                  }
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        )}

        {/* Результаты поиска */}
        {hasQuery && (
          <div>
            {!hasResults ? (
              <div style={{
                padding: isMobile ? '12px' : '20px',
                textAlign: 'center',
                color: '#808080',
                fontSize: 'var(--font-size, 9pt)',
              }}>
                Ничего не найдено по запросу "{searchQuery}"
                {searchQuery.split(/\s+/).length > 1 && (
                  <div style={{ marginTop: '8px', fontSize: 'var(--font-size, 7pt)' }}>
                    Поиск работает по всем словам одновременно (AND логика)
                  </div>
                )}
              </div>
            ) : (
              <div>
                {/* Проекты */}
                {filteredResults.projects.length > 0 && (
                  <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
                    <h3 style={{
                      margin: '0 0 12px 0',
                      padding: 0,
                      fontSize: isMobile ? 'var(--font-size, 9pt)' : 'var(--font-size, 10pt)',
                      fontWeight: 'bold',
                      color: '#000080',
                    }}>
                      Найдено в проектах ({filteredResults.projects.length}):
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: isMobile ? '8px' : '12px',
                    }}>
                      {filteredResults.projects.map((result) => (
                        <div
                          key={result.service.id}
                          onClick={() => onOpenWindow && onOpenWindow('projects')}
                          style={{
                            padding: isMobile ? '8px' : '12px',
                            background: '#FFFFFF',
                            border: '2px solid',
                            borderTopColor: '#FFFFFF',
                            borderLeftColor: '#FFFFFF',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
                            cursor: 'pointer',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F0F0F0'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#FFFFFF'
                          }}
                        >
                          <div style={{
                            fontSize: 'var(--font-size, 10pt)',
                            fontWeight: 'bold',
                            color: '#000080',
                            marginBottom: '8px',
                          }}>
                            {highlightText(result.service.title, searchQuery)}
                          </div>
                          <div style={{
                            fontSize: 'var(--font-size, 8pt)',
                            color: '#000000',
                            marginBottom: '8px',
                            lineHeight: '1.5',
                          }}>
                            {highlightText(result.service.description, searchQuery)}
                          </div>
                          {result.matches.some(m => m.type === 'technologies') && (
                            <div style={{
                              marginTop: '8px',
                            }}>
                              <div style={{
                                fontSize: 'var(--font-size, 7pt)',
                                color: '#808080',
                                marginBottom: '4px',
                              }}>
                                Технологии:
                              </div>
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                              }}>
                                {result.service.technologies.map((tech, index) => {
                                  const queryWords = searchQuery.toLowerCase().trim().split(/\s+/)
                                  const isMatch = queryWords.some(word => tech.toLowerCase().includes(word))
                                  return (
                                    <span
                                      key={index}
                                      style={{
                                        fontSize: 'var(--font-size, 7pt)',
                                        color: '#000000',
                                        padding: '1px 4px',
                                        background: isMatch ? '#FFFF00' : '#C0C0C0',
                                        border: '1px solid',
                                        borderTopColor: '#FFFFFF',
                                        borderLeftColor: '#FFFFFF',
                                        borderRightColor: '#808080',
                                        borderBottomColor: '#808080',
                                      }}
                                    >
                                      {tech}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                          <div style={{
                            marginTop: '8px',
                            fontSize: 'var(--font-size, 7pt)',
                            color: '#808080',
                          }}>
                            Найдено в: {result.matches.map(m => {
                              if (m.type === 'title') return 'названии'
                              if (m.type === 'description') return 'описании'
                              if (m.type === 'technologies') return 'технологиях'
                              return ''
                            }).filter(Boolean).join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Навыки */}
                {filteredResults.skills.length > 0 && (
                  <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
                    <h3 style={{
                      margin: '0 0 12px 0',
                      padding: 0,
                      fontSize: isMobile ? 'var(--font-size, 9pt)' : 'var(--font-size, 10pt)',
                      fontWeight: 'bold',
                      color: '#000080',
                    }}>
                      Найдено в навыках ({filteredResults.skills.length}):
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                    }}>
                      {filteredResults.skills.map((tech, index) => (
                        <div
                          key={index}
                          style={{
                            padding: '8px 12px',
                            background: '#FFFFFF',
                            border: '2px solid',
                            borderTopColor: '#FFFFFF',
                            borderLeftColor: '#FFFFFF',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
                          }}
                        >
                          <div style={{
                            fontSize: 'var(--font-size, 9pt)',
                            fontWeight: 'bold',
                            color: '#000080',
                            marginBottom: '4px',
                          }}>
                            {highlightText(tech.name, searchQuery)}
                          </div>
                          <div style={{
                            fontSize: 'var(--font-size, 7pt)',
                            color: '#808080',
                          }}>
                            {highlightText(tech.category, searchQuery)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Раздел "О нас" */}
                {filteredResults.about.length > 0 && (
                  <div>
                    <h3 style={{
                      margin: '0 0 12px 0',
                      padding: 0,
                      fontSize: isMobile ? 'var(--font-size, 9pt)' : 'var(--font-size, 10pt)',
                      fontWeight: 'bold',
                      color: '#000080',
                    }}>
                      Найдено в разделе "О нас" ({filteredResults.about.length}):
                    </h3>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: isMobile ? '8px' : '12px',
                    }}>
                      {filteredResults.about.map((result, index) => (
                        <div
                          key={index}
                          onClick={() => result.category === 'team' && onOpenWindow && onOpenWindow('about')}
                          style={{
                            padding: isMobile ? '8px' : '12px',
                            background: '#FFFFFF',
                            border: '2px solid',
                            borderTopColor: '#FFFFFF',
                            borderLeftColor: '#FFFFFF',
                            borderRightColor: '#808080',
                            borderBottomColor: '#808080',
                            boxShadow: 'inset -1px -1px 0px #424142, inset 1px 1px 0px #C0C0C0',
                            cursor: result.category === 'team' ? 'pointer' : 'default',
                          }}
                          onMouseEnter={(e) => {
                            if (result.category === 'team') {
                              e.currentTarget.style.background = '#F0F0F0'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (result.category === 'team') {
                              e.currentTarget.style.background = '#FFFFFF'
                            }
                          }}
                        >
                          <div style={{
                            fontSize: 'var(--font-size, 9pt)',
                            fontWeight: 'bold',
                            color: '#000080',
                            marginBottom: '8px',
                          }}>
                            {result.title}
                          </div>
                          
                          {result.category === 'team' && result.member && (
                            <div>
                              <div style={{
                                fontSize: 'var(--font-size, 10pt)',
                                fontWeight: 'bold',
                                color: '#000080',
                                marginBottom: '4px',
                              }}>
                                {highlightText(result.member.name, searchQuery)}
                              </div>
                              <div style={{
                                fontSize: 'var(--font-size, 8pt)',
                                color: '#000000',
                                marginBottom: '4px',
                              }}>
                                {highlightText(result.member.role, searchQuery)}
                              </div>
                              <div style={{
                                fontSize: 'var(--font-size, 8pt)',
                                color: '#000000',
                                lineHeight: '1.5',
                              }}>
                                {highlightText(result.member.info, searchQuery)}
                              </div>
                              <div style={{
                                marginTop: '8px',
                                fontSize: 'var(--font-size, 7pt)',
                                color: '#808080',
                              }}>
                                Найдено в: {result.matches.map(m => {
                                  if (m.type === 'name') return 'имени'
                                  if (m.type === 'role') return 'роли'
                                  if (m.type === 'info') return 'информации'
                                  return ''
                                }).filter(Boolean).join(', ')}
                              </div>
                            </div>
                          )}

                          {result.category === 'specialization' && result.spec && (
                            <div>
                              <div style={{
                                fontSize: 'var(--font-size, 10pt)',
                                fontWeight: 'bold',
                                color: '#000080',
                                marginBottom: '4px',
                              }}>
                                {highlightText(result.spec.name, searchQuery)}
                              </div>
                              <div style={{
                                fontSize: 'var(--font-size, 8pt)',
                                color: '#000000',
                                lineHeight: '1.5',
                              }}>
                                {highlightText(result.spec.description, searchQuery)}
                              </div>
                              <div style={{
                                marginTop: '8px',
                                fontSize: 'var(--font-size, 7pt)',
                                color: '#808080',
                              }}>
                                Найдено в: {result.matches.map(m => {
                                  if (m.type === 'name') return 'названии'
                                  if (m.type === 'description') return 'описании'
                                  return ''
                                }).filter(Boolean).join(', ')}
                              </div>
                            </div>
                          )}

                          {result.category === 'stats' && result.stat && (
                            <div>
                              <div style={{
                                fontSize: 'var(--font-size, 9pt)',
                                color: '#000000',
                              }}>
                                {result.stat.label}: {result.stat.value}
                              </div>
                            </div>
                          )}

                          {result.category === 'approach' && result.text && (
                            <div>
                              <div style={{
                                fontSize: 'var(--font-size, 8pt)',
                                color: '#000000',
                                lineHeight: '1.5',
                              }}>
                                {highlightText(result.text, searchQuery)}
                              </div>
                            </div>
                          )}

                          {result.category === 'techStack' && result.technologies && (
                            <div>
                              <div style={{
                                fontSize: 'var(--font-size, 8pt)',
                                color: '#000000',
                                marginBottom: '8px',
                              }}>
                                Найдено технологий: {result.technologies.length}
                              </div>
                              <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '4px',
                              }}>
                                {result.technologies.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    style={{
                                      fontSize: 'var(--font-size, 7pt)',
                                      color: '#000000',
                                      padding: '1px 4px',
                                      background: '#C0C0C0',
                                      border: '1px solid',
                                      borderTopColor: '#FFFFFF',
                                      borderLeftColor: '#FFFFFF',
                                      borderRightColor: '#808080',
                                      borderBottomColor: '#808080',
                                    }}
                                  >
                                    {tech.name}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Подсказка при пустом запросе */}
        {!hasQuery && (
          <div style={{
            padding: isMobile ? '12px' : '20px',
            textAlign: 'center',
            color: '#808080',
            fontSize: 'var(--font-size, 9pt)',
          }}>
            Введите слово для поиска по всему сайту
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
        <span>
          {hasQuery 
            ? `Найдено: ${filteredResults.projects.length} проект(ов), ${filteredResults.skills.length} навык(ов), ${filteredResults.about.length} в разделе "О нас"`
            : 'Готов к поиску'
          }
        </span>
      </div>
    </div>
  )
}

