# 套件部署簡介

::: tip 💡【非 App Store 應用程式部署解決方案】
如果你的應用程式沒有在 Mac App Store 上架，可透過 Apple Business 的「套件」功能，在 Mac 電腦上部署這些應用程式。
:::

---

## 8.1 套件檔案是甚麼？

你需要先建立套件檔案，才可透過 Apple Business 向你的用戶提供套件。建立套件檔案後，需要存放在可以透過 URL 取用的網路伺服器或檔案共享服務上。套件檔案是：

- **標準 macOS 安裝技術**：一種標準 macOS 技術，用於安裝 Mac App Store 中沒有的 App。
- **自訂檔案放置路徑**：能夠將檔案和資料夾直接放在目標 Mac 本機的預定位置。
- **自動化安裝前後指令**：能夠使用安裝前和安裝後指令（Pre-install & Post-install scripts）進一步自動化和自訂安裝過程。

---

## 8.2 管理式 App vs 套件安裝的 App

使用套件安裝的 App **不會被視為管理式 App**。這樣代表：

- **移除藍圖仍會保留**：如果從「藍圖」中移除應用程式，該應用程式仍會保留在用戶的 Mac 上。
- **取消註冊仍會保留**：如果用戶從內置裝置管理或與 Apple Business 連結的第三方裝置管理服務中取消註冊其裝置，該 App 仍會保留在用戶的 Mac 上。
- **資料儲存於本機一般空間**：使用此 App 儲存的檔案不會放置在單獨的空間。

---

## 8.3 建立與部署套件前置須知

在 Apple Business 中建立包含你要部署的新套件之前，你需要先安裝並細閲以下資訊。了解所需資訊後，你便可以開始建立套件。請參閱「建立套件」。

::: warning ⚠️ 附註
如果你要更改以下任何選項，你需要更新現有套件或建立新套件。
:::

進入 Apple 商務點選 **「裝置」>「內置管理」>「macOS 套裝」**，即可檢視並管理所有已建立的 macOS 套件清單：

<div class="step-image-container">
  <img src="/images/macos_packages_overview.png" alt="Apple 商務裝置 > macOS 套裝管理介面" class="step-image" />
</div>

<style>
.step-image-container {
  margin: 1.5rem 0;
  text-align: center;
}
.step-image {
  display: inline-block;
  max-width: 600px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
</style>
