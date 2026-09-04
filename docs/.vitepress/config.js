import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apple Business 實務指南',
  description: '現代化企業 Apple 裝置管理與部署完整教學',
  base: '/apple-business-guide/',
  lang: 'zh-Hant',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/' },
      { text: '教學指引', link: '/guide/introduction' },
      { text: 'MDM 指令手冊', link: '/guide/mdm-commands' }
    ],
    sidebar: [
      {
        text: '基礎概念',
        items: [
          { text: 'Apple Business 介紹', link: '/guide/introduction' },
          { text: '帳號與身分整合', link: '/guide/identity' }
        ]
      },
      {
        text: '裝置部署與管理',
        items: [
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
    }
  }
})
