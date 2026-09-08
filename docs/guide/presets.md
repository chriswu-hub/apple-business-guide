# 加入藍圖與配置設定

本單元探討 Apple 商務中「藍圖」的核心架構、企業關鍵安全性與網路設定，以及 Microsoft 365 混合環境的黃金組態範本。

---

### 🎯 學習目標
- 能建立和管理藍圖
- 能設定企業安全性所需的關鍵組態
- **能為 M365 環境設定 Wi-Fi、VPN、憑證**
- 理解各設定對使用者體驗的影響

---

## 6.1 藍圖 (Blueprints) 概念

在 Apple 商務與原生裝置管理中，**藍圖 (Blueprints)** 是將「應用程式」與「各項組態設定」打包在一起的容器：

- **藍圖 = App + 組態設定的組合包**。
- **指派對象彈性**：可直接指派給個別使用者、使用者群組（如業務部、研發部），或是依裝置序號指派。
- **一次設定，全面部署**：IT 人員只需維護藍圖範本，新裝置加入時自動繼承所有設定。
- **動態即時同步**：後續在後台變更藍圖內容（例如更新 Wi-Fi 密碼或新增 App），所有已綁定該藍圖的受管裝置會**在背景自動套用更新**。

---

## 6.2 關鍵設定項目

在 Apple 商務中，管理員可前往 **「裝置」>「設定」**，針對不同平台（macOS、iOS、iPadOS、visionOS）配置各類原則。

### 🛡️ 1. 保安設定（必要基準線）

進入 Apple 商務點選 **「裝置」>「設定」>「保安」**，即可檢視並建立各項系統安全組態：

<div class="step-image-container">
  <img src="/images/settings_security_grid.png" alt="裝置 > 設定 > 保安 組態列表" class="step-image" />
</div>

| 設定項目 | 用途說明 | 支援平台 | 企業建議值 |
| :--- | :--- | :--- | :--- |
| **守衛 (Gatekeeper)** | 設定用戶可開啟的 App 的保安設定 | macOS | **App Store + 已識別開發者** |
| **密碼和螢幕解鎖** | 配置密碼、自動解鎖、智慧卡和螢幕解鎖的保安設定 | macOS / iOS / visionOS | 最少 8 位數，含英數，閒置 5 分鐘鎖定 |
| **軟件更新 (Software Update)** | 定期強制更新軟件，控制升級與重啟時間 | macOS / iOS / visionOS | 設定延遲 3 天 + 強制 14 天內安裝 |
| **資料管理** | 限制用戶資料流（防止公務資料分享至非受管 App） | macOS / iOS / visionOS | 啟用資料保護隔離 |
| **網頁過濾器 (Web Filter)** | 設定自動內容過濾器以封鎖或允許 Safari 和其他瀏覽器中的特定網站 | iOS / visionOS | 限制或封鎖不安全網站 |
| **應用程式層防火牆** | 「應用程式層防火牆」會因應個別 App 控制連線 | macOS | **啟用**，僅允許合法已簽名軟體 |
| **檔案保險箱 (FileVault)** | 設定並執行「檔案保險箱」全磁碟加密 | macOS | **強制啟用**，自動託管修復金鑰 |
| **證書 (Certificates)** | 將 PEM 編碼的證書加入「系統」鑰匙圈 | macOS / iOS / visionOS | 部署企業 CA 根憑證 |
| **AirDrop** | 限制或完全關閉 AirDrop 密碼分享 | macOS / visionOS | 限制僅限「聯絡人」或高資安禁用 |
| **AirPlay** | 配置 AirPlay 接收與發送設定 | macOS / tvOS | 依會議室與辦公需求配置 |
| **App 取用** | 限制用戶可取用的 App | iOS / tvOS / visionOS | 限制僅能使用指派 App |
| **Apple Intelligence 和 Siri** | 設定 Apple Intelligence 和 Siri 功能的可用性 | iOS / macOS / visionOS | 依企業資安合規政策評估開放 |
| **VPN** | 設定內置 VPN 用戶端以安全連線至機構的虛擬私人網絡伺服器 | macOS / iOS / visionOS | 配置 On-Demand 企業 VPN |

---

### 🌐 2. 網絡設定

進入 Apple 商務點選 **「裝置」>「設定」>「網絡」**，可檢視並配置所有連網相關原則：

<div class="step-image-container">
  <img src="/images/settings_network_grid.png" alt="裝置 > 設定 > 網絡 組態列表" class="step-image" />
</div>

| 設定項目 | 用途說明 | 支援平台 | 實務配置重點 |
| :--- | :--- | :--- | :--- |
| **內容快取 (Content Caching)** | 設定本機 Mac 用作 iCloud 或軟件更新等 Apple 服務的內容快取 | macOS | 減緩辦公室對外頻寬負擔 |
| **應用程式層防火牆** | 因應個別 App 控制連入連線與存取權限 | macOS | 阻擋未授權連入連線 |
| **AirDrop** | 限制或完全關閉 AirDrop 密碼與檔案分享 | macOS / visionOS | 防止未經授權之檔案流出 |
| **AirPrint** | 設定 AirPrint 以使用打印機、確保網絡間可互相發現，並使用 TLS 加密打印連線 | macOS / iOS / visionOS | 預先配置辦公室企業印表機 |
| **VPN** | 設定內置 VPN 用戶端以安全連線至機構的虛擬私人網絡伺服器 | macOS / iOS / visionOS | 自動按需 (On-Demand) 連線 |
| **Wi-Fi** | 配置無線網絡的連線與驗證設定 | macOS / iOS / tvOS / visionOS | 預先配置 802.1X 企業無線網路 |

---

### ⚙️ 3. 個人化與管理設定

| 設定項目 | 用途說明 | 實務配置重點 |
| :--- | :--- | :--- |
| **iCloud** | 控制 iCloud 同步項目與雲端備份 | 僅允許管理式 Apple 帳號同步公務 iCloud Drive |
| **App 取用** | 限制或允許特定 App 的執行與存取 | 允許企業指派 App，限制隨意安裝非工作軟體 |
| **資料管理 (Managed Open In)** | 控制公務資料在 App 之間的分享流向 | 禁止將公務郵件附件透過非受管個人 App 開啟 |
| **鎖定畫面** | 自訂 Mac 鎖定畫面上的資產標籤與聯絡資訊 | 顯示 *「[公司名稱] 資產，拾獲請聯繫 it@company.com」* |

---

## 6.3 M365 環境常見設定組合

針對以 Microsoft 365 為核心辦公生態系之企業，推薦採用的**標準商務 Mac 最佳實踐藍圖**：

```
藍圖：「商務部門-Mac」
├── 🛡️ 保安設定
│   ├── 檔案保險箱 (FileVault)：強制啟用，託管復原金鑰 (PRK)
│   ├── 應用程式層防火牆：啟用
│   ├── 守衛 (Gatekeeper)：App Store + 已識別開發者
│   ├── 密碼和螢幕解鎖：最少 8 位數、含英數字、閒置 5 分鐘鎖定
│   └── 軟件更新 (Software Update)：延遲 3 天、強制 14 天內完成安裝
├── 🌐 網絡設定
│   ├── Wi-Fi：自動連線 802.1X 企業無線網路
│   ├── VPN：自動按需連線 (On-Demand) 至企業 VPN
│   └── 證書 (Certificates)：自動派送企業內部 CA 根憑證
├── ⚙️ 管理與個人化
│   ├── iCloud：僅允許管理式帳號 iCloud Drive（公私資料隔離）
│   ├── AirDrop：僅限「聯絡人」
│   └── App 取用：允許企業指派之 App Store 軟體
└── 📦 應用程式 (Apps)
    ├── Microsoft 365 套件 (Word, Excel, PowerPoint, Outlook)
    ├── Microsoft Teams
    ├── 公司專屬自訂 App / 資安防護 Agent
    └── Apple 商務 App（背景自動靜默安裝）
```

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
