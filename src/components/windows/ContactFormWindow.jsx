import { useState } from 'react'
import { Windows2000Dialog } from './Windows2000Dialog'

export function ContactFormWindow() {
  const [formData, setFormData] = useState({
    name: '',
    contactType: '',
    contact: ''
  })
  const [errorDialog, setErrorDialog] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => {
      // Если меняется тип контакта, очищаем поле контакта
      if (name === 'contactType') {
        return {
          ...prev,
          [name]: value,
          contact: ''
        }
      }
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10
  }

  const validateTelegram = (username) => {
    const re = /^@?[a-zA-Z0-9_]{5,32}$/
    return re.test(username.replace('@', ''))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Валидация
    if (!formData.name.trim()) {
      setErrorDialog('Пожалуйста, введите ваше имя.')
      return
    }
    
    if (!formData.contactType) {
      setErrorDialog('Пожалуйста, выберите способ связи.')
      return
    }
    
    if (!formData.contact.trim()) {
      setErrorDialog('Пожалуйста, введите контакт для связи.')
      return
    }
    
    // Валидация в зависимости от типа контакта
    if (formData.contactType === 'email') {
      if (!validateEmail(formData.contact)) {
        setErrorDialog('Пожалуйста, введите корректный email адрес.')
        return
      }
    } else if (formData.contactType === 'whatsapp') {
      if (!validatePhone(formData.contact)) {
        setErrorDialog('Пожалуйста, введите корректный номер телефона.')
        return
      }
    } else if (formData.contactType === 'telegram') {
      if (!validateTelegram(formData.contact)) {
        setErrorDialog('Пожалуйста, введите корректный Telegram username (например: @username).')
        return
      }
    }
    
    // Если все валидно, показываем успешное сообщение
    setErrorDialog('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.\n\n(Пока это демо-версия, данные никуда не отправляются)')
  }

  const handleCancel = () => {
    setFormData({
      name: '',
      contactType: '',
      contact: ''
    })
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
      padding: '12px',
    }}>
      <div style={{
        fontSize: '9pt',
        fontWeight: 'bold',
        marginBottom: '12px',
        color: '#000000',
      }}>
        Заполните форму для связи с нами
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Имя */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '4px',
            fontSize: 'var(--font-size, 8pt)',
            fontWeight: 'normal',
          }}>
            Имя:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '20px',
              padding: '2px 4px',
              background: '#FFFFFF',
              border: '1px solid',
              borderTopColor: '#808080',
              borderLeftColor: '#808080',
              borderRightColor: '#FFFFFF',
              borderBottomColor: '#FFFFFF',
              boxShadow: 'inset 1px 1px 0px #424142',
              fontSize: 'var(--font-size, 8pt)',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderTopColor = '#000080'
              e.currentTarget.style.borderLeftColor = '#000080'
              e.currentTarget.style.borderRightColor = '#000080'
              e.currentTarget.style.borderBottomColor = '#000080'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderTopColor = '#808080'
              e.currentTarget.style.borderLeftColor = '#808080'
              e.currentTarget.style.borderRightColor = '#FFFFFF'
              e.currentTarget.style.borderBottomColor = '#FFFFFF'
            }}
          />
        </div>

        {/* Контакт для связи */}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '4px',
            fontSize: 'var(--font-size, 8pt)',
            fontWeight: 'normal',
          }}>
            Контакт для связи:
          </label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              name="contactType"
              value={formData.contactType}
              onChange={handleChange}
              style={{
                height: '20px',
                padding: '2px 4px',
                background: '#FFFFFF',
                border: '1px solid',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#FFFFFF',
                borderBottomColor: '#FFFFFF',
                boxShadow: 'inset 1px 1px 0px #424142',
                fontSize: 'var(--font-size, 8pt)',
                fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                color: '#000000',
                textRendering: 'optimizeSpeed',
                WebkitFontSmoothing: 'none',
                MozOsxFontSmoothing: 'grayscale',
                fontSmooth: 'never',
                outline: 'none',
                boxSizing: 'border-box',
                cursor: 'pointer',
                minWidth: '120px',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderTopColor = '#000080'
                e.currentTarget.style.borderLeftColor = '#000080'
                e.currentTarget.style.borderRightColor = '#000080'
                e.currentTarget.style.borderBottomColor = '#000080'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderTopColor = '#808080'
                e.currentTarget.style.borderLeftColor = '#808080'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
            >
              <option value="">Выберите способ связи</option>
              <option value="telegram">Telegram</option>
              <option value="whatsapp">WhatsApp / Телефон</option>
              <option value="email">Email</option>
            </select>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder={formData.contactType === 'telegram' ? '@username' : formData.contactType === 'whatsapp' ? '+7 (999) 123-45-67' : formData.contactType === 'email' ? 'example@mail.com' : 'Выберите удобный способ связи'}
              style={{
                flex: 1,
                maxWidth: '250px',
                height: '20px',
                padding: '2px 4px',
                background: formData.contactType ? '#FFFFFF' : '#ECE9D8',
                border: '1px solid',
                borderTopColor: '#808080',
                borderLeftColor: '#808080',
                borderRightColor: '#FFFFFF',
                borderBottomColor: '#FFFFFF',
                boxShadow: 'inset 1px 1px 0px #424142',
                fontSize: 'var(--font-size, 8pt)',
                fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
                outline: 'none',
                boxSizing: 'border-box',
                color: formData.contact ? '#000000' : '#808080',
                cursor: formData.contactType ? 'text' : 'not-allowed',
              }}
              disabled={!formData.contactType}
              onFocus={(e) => {
                if (formData.contactType) {
                  e.currentTarget.style.borderTopColor = '#000080'
                  e.currentTarget.style.borderLeftColor = '#000080'
                  e.currentTarget.style.borderRightColor = '#000080'
                  e.currentTarget.style.borderBottomColor = '#000080'
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderTopColor = '#808080'
                e.currentTarget.style.borderLeftColor = '#808080'
                e.currentTarget.style.borderRightColor = '#FFFFFF'
                e.currentTarget.style.borderBottomColor = '#FFFFFF'
              }}
            />
          </div>
        </div>

        {/* Кнопки */}
        <div style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
          marginTop: '16px',
        }}>
          <button
            type="button"
            onClick={handleCancel}
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
            Отмена
          </button>
          <button
            type="submit"
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
            Отправить
          </button>
        </div>
      </form>

      {errorDialog && (
        <Windows2000Dialog
          message={errorDialog}
          title={errorDialog.includes('Спасибо') ? 'Информация' : 'Ошибка'}
          type={errorDialog.includes('Спасибо') ? 'info' : 'error'}
          onClose={() => setErrorDialog(null)}
        />
      )}
    </div>
  )
}

