// Стили для скроллбаров Windows 2000
export const scrollbarStyles = `
  .window-content::-webkit-scrollbar {
    width: 17px !important;
    height: 17px !important;
    background: #D4D0C8 !important;
  }
  .window-content::-webkit-scrollbar-track {
    background: #D4D0C8 !important;
    border: 1px solid !important;
    border-top-color: #FFFFFF !important;
    border-left-color: #FFFFFF !important;
    border-right-color: #808080 !important;
    border-bottom-color: #808080 !important;
  }
  .window-content::-webkit-scrollbar-thumb {
    background: #C0C0C0 !important;
    border: 1px solid !important;
    border-top-color: #FFFFFF !important;
    border-left-color: #FFFFFF !important;
    border-right-color: #808080 !important;
    border-bottom-color: #808080 !important;
    min-height: 20px !important;
    min-width: 20px !important;
  }
  .window-content::-webkit-scrollbar-thumb:hover {
    background: #B0B0B0 !important;
  }
  .window-content::-webkit-scrollbar-thumb:active {
    background: #808080 !important;
    border-top-color: #808080 !important;
    border-left-color: #808080 !important;
    border-right-color: #FFFFFF !important;
    border-bottom-color: #FFFFFF !important;
  }
  .window-content::-webkit-scrollbar-button {
    width: 17px !important;
    height: 17px !important;
    background: #D4D0C8 !important;
    border: 1px solid !important;
    border-top-color: #FFFFFF !important;
    border-left-color: #FFFFFF !important;
    border-right-color: #808080 !important;
    border-bottom-color: #808080 !important;
    display: block !important;
  }
  .window-content::-webkit-scrollbar-button:hover {
    background: #C0C0C0 !important;
  }
  .window-content::-webkit-scrollbar-button:active {
    background: #808080 !important;
    border-top-color: #808080 !important;
    border-left-color: #808080 !important;
    border-right-color: #FFFFFF !important;
    border-bottom-color: #FFFFFF !important;
  }
  .window-content::-webkit-scrollbar-button:vertical:start:decrement {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M8.5 5 L6 8 L11 8 Z' fill='%23000000'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: 9px 9px !important;
  }
  .window-content::-webkit-scrollbar-button:vertical:end:increment {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M8.5 12 L6 9 L11 9 Z' fill='%23000000'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: 9px 9px !important;
  }
  .window-content::-webkit-scrollbar-button:horizontal:start:decrement {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M5 8.5 L8 6 L8 11 Z' fill='%23000000'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: 9px 9px !important;
  }
  .window-content::-webkit-scrollbar-button:horizontal:end:increment {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17'%3E%3Cpath d='M12 8.5 L9 6 L9 11 Z' fill='%23000000'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: 9px 9px !important;
  }
  .window-content::-webkit-scrollbar-corner {
    background: #D4D0C8 !important;
    border: 1px solid !important;
    border-top-color: #FFFFFF !important;
    border-left-color: #FFFFFF !important;
    border-right-color: #808080 !important;
    border-bottom-color: #808080 !important;
  }
`

// Функция для добавления стилей скроллбаров
export const addScrollbarStyles = () => {
  if (typeof document !== 'undefined') {
    let styleElement = document.getElementById('win2000-scrollbar-styles')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'win2000-scrollbar-styles'
      styleElement.textContent = scrollbarStyles
      document.head.appendChild(styleElement)
    }
  }
}




