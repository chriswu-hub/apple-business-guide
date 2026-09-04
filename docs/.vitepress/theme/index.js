import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      // 監聽點擊複製事件，自訂過濾掉註解行 (# 開頭)
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

      // 移除 button 上的 title 與 aria-label 屬性，避免瀏覽器在按鈕下方彈出原生 tooltip
      const cleanTooltips = () => {
        document.querySelectorAll('button.copy').forEach((btn) => {
          btn.removeAttribute('title')
        })
      }
      setTimeout(cleanTooltips, 300)

      document.addEventListener('mouseover', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn && btn.hasAttribute('title')) {
            btn.removeAttribute('title')
          }
        }
      }, true)

      document.addEventListener('click', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn) {
            btn.removeAttribute('title')
            setTimeout(() => btn.removeAttribute('title'), 0)
          }
        }
      }, true)
    }
  }
}
