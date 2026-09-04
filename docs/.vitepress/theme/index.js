import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      // 監聽點擊複製事件，自訂過濾掉註解行
      document.addEventListener('copy', (e) => {
        // 如果使用者有自行反白選取文字，遵照原生選取邏輯
        const selection = window.getSelection()?.toString()
        if (selection) return

        // 若是透過 VitePress 複製按鈕觸發
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('.copy')
          if (btn) {
            const pre = btn.parentElement?.querySelector('pre')
            if (pre) {
              const text = pre.innerText || ''
              // 過濾掉以 # 開頭的註解行或 inline 註解，或是只過濾全行註解
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
    }
  }
}
