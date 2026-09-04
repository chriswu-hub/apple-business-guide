import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      // 1. 監聽點擊複製事件：過濾註解 (# 開頭)
      document.addEventListener('copy', (e) => {
        const selection = window.getSelection()?.toString()
        if (selection) return

        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
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

      // 2. 徹底消除 button 上所有的 title/aria 屬性
      const cleanAllTitles = () => {
        document.querySelectorAll('button.copy').forEach(btn => {
          btn.removeAttribute('title')
        })
      }
      setTimeout(cleanAllTitles, 300)
      window.addEventListener('mouseover', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn) btn.removeAttribute('title')
        }
      }, true)

      // 3. 點擊按鈕時，動態在按鈕正左邊插入一個獨立乾淨的「已複製」標籤
      document.addEventListener('click', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn) {
            btn.removeAttribute('title')
            // 移除舊的提示
            btn.querySelector('.custom-copy-tooltip')?.remove()

            // 建立獨立的左側繁體浮塊
            const tooltip = document.createElement('span')
            tooltip.className = 'custom-copy-tooltip'
            tooltip.textContent = '已複製'
            btn.appendChild(tooltip)

            // 2 秒後淡出移除
            setTimeout(() => {
              tooltip.remove()
            }, 2000)
          }
        }
      }, true)
    }
  }
}
