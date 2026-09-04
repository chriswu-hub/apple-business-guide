import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      // 1. 監聽點擊複製事件，自訂過濾掉註解行 (# 開頭)
      document.addEventListener('copy', (e) => {
        const selection = window.getSelection()?.toString()
        if (selection) return

        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('.copy')
          if (btn) {
            const pre = btn.parentElement?.querySelector('pre')
            if (pre) {
              const text = pre.innerText || ''
              const cleanText = text
                .split('\n')
                .map(line => line.trim())
                .filter(line => line && !line.startsWith('#'))
                .join('\n')

              if (cleanText) {
                e.clipboardData?.setData('text/plain', cleanText)
                e.preventDefault()
              }
            }
          }
        }
      }, true)

      // 2. 監聽按鈕點擊，防止 VitePress 預設行為干擾，確保強制替換 title/aria-label/dataset
      document.addEventListener('click', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn) {
            btn.setAttribute('title', '已複製')
            btn.setAttribute('aria-label', '已複製')
            setTimeout(() => {
              btn.setAttribute('title', '已複製')
              btn.setAttribute('aria-label', '已複製')
            }, 50)
          }
        }
      }, true)
    }
  }
}
