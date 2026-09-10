import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apple Business 實務指南',
  description: '現代化企業 Apple 裝置管理與部署完整教學',
  base: '/apple-business-guide/',
  lang: 'zh-Hant',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '基礎概念', link: '/guide/introduction' },
      { text: '裝置部署與管理', link: '/guide/enrollment' },
      { text: '結訓認證', link: '/guide/verify' }
    ],
    sidebar: [
      {
        text: '基礎概念',
        items: [
          { text: 'Apple 商務概覽', link: '/guide/introduction' },
          { text: '註冊與機構設定', link: '/guide/organization' },
          { text: '網域和識別身分', link: '/guide/identity' },
          { text: '管理式 Apple 帳號與使用者管理', link: '/guide/accounts' }
        ]
      },
      {
        text: '裝置部署與管理',
        items: [
          { text: '註冊方式與部署', link: '/guide/enrollment' },
          { text: '加入藍圖與配置設定', link: '/guide/presets' },
          { text: 'App 部署與訂閱管理', link: '/guide/apps' },
          { text: '自動裝置註冊 (ADE)', link: '/guide/ade' },
          { text: 'MDM 管理與設定檔', link: '/guide/mdm' },
          { text: 'macOS 終端機指令集', link: '/guide/mdm-commands' }
        ]
      },
      {
        text: '安全性與合規',
        items: [
          { text: 'FileVault 與安全防護', link: '/guide/security' }
        ]
      },
      {
        text: '培訓考核與實作',
        items: [
          { text: 'Lab 1: Entra ID 目錄同步實作', link: '/guide/lab1' },
          { text: 'Lab 2: 裝置自動註冊模擬', link: '/guide/lab2' },
          { text: 'Lab 3: 建立企業安全性藍圖', link: '/guide/lab3' },
          { text: 'Lab 4: App 大量部署實作', link: '/guide/lab4' },
          { text: '實作檢核與結訓認證', link: '/guide/verify' }
        ]
      }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Apple Business Guide'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outline: {
      label: '本頁目錄'
    },
    darkModeSwitchLabel: '切換外觀',
    lightModeSwitchTitle: '切換為淺色模式',
    darkModeSwitchTitle: '切換為深色模式',
    sidebarMenuLabel: '目錄選單',
    returnToTopLabel: '回到頂部'
  },
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
