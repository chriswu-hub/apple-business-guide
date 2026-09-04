import DefaultTheme from 'vitepress/theme'
import VerifyCompletion from '../components/VerifyCompletion.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 註冊全域結訓驗證組件
    app.component('VerifyCompletion', VerifyCompletion)

    if (typeof window !== 'undefined') {
      // 1. 複製過濾：過濾以 # 開頭的註解行
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

      // 2. 徹底移除按鈕原生 title，避免瀏覽器在按鈕下方彈出原生框
      const cleanTitles = () => {
        document.querySelectorAll('button.copy').forEach(btn => {
          btn.removeAttribute('title')
        })
      }
      setTimeout(cleanTitles, 300)

      document.addEventListener('mouseover', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn) btn.removeAttribute('title')
        }
      }, true)

      // 3. 點擊複製按鈕時，在代碼區塊容器內建立獨立的左側標籤
      document.addEventListener('click', (e) => {
        const target = e.target
        if (target && target.closest) {
          const btn = target.closest('button.copy')
          if (btn) {
            btn.removeAttribute('title')
            const parent = btn.parentElement
            if (parent) {
              parent.querySelectorAll('.custom-copy-badge').forEach(el => el.remove())
              const badge = document.createElement('span')
              badge.className = 'custom-copy-badge'
              badge.textContent = '已複製'
              parent.appendChild(badge)

              setTimeout(() => {
                badge.remove()
              }, 2000)
            }
          }
        }
      }, true)
    }
  }
}
