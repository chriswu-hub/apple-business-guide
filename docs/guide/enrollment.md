# 註冊方式與部署

本單元深入剖析 Apple 生態系中的三大裝置註冊架構、MDM 解決方案選型、零接觸自動註冊（Zero-Touch）的完整執行流程，以及如何運用 Apple Configurator 將非經銷商採購的裝置納管至 Apple 商務。

---

### 🎯 學習目標
- 完整理解三種註冊方式及適用情境
- **能為客戶規劃最適合的註冊策略**
- 能操作裝置自動註冊流程
- 理解監管（Supervision）的意義

---

## 5.1 Apple 商務內建 MDM vs 第三方 MDM

在評估企業裝置管理方案時，可依據規模與客製化需求選擇內建管理或第三方 MDM：

| 比較項目 | Apple 商務內建 MDM | 第三方 MDM (Jamf / Intune / Kandji 等) |
| :--- | :--- | :--- |
| **成本** | **Apple 商務已包含**，無額外費用 | 需支付額外訂閱授權費用 |
| **設定複雜度** | **低**（原生開箱即用與整合） | 中高（需設定 APNs 憑證與額外伺服器） |
| **功能深度** | 滿足標準企業日常管理需求 | 提供進階腳本、自訂擴充屬性與工作流程 |
| **Apple 整合度** | **最佳**（官方原生平台支援） | 視各廠商 API 整合能力而定 |
| **適合規模** | **中小企業優先**、輕量部署架構 | 大型跨國企業、複雜混合 IT 環境 |

---

## 5.2 三種註冊方式

根據裝置所有權與使用狀態，Apple 提供三種截然不同的註冊管道：

```
                    ┌─────────────────────────┐
                    │      裝置是誰的？       │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       ┌──────────────────┐            ┌──────────────────┐
       │   員工個人所有   │            │     機構所有     │
       └─────────┬────────┘            └─────────┬────────┘
                 │                               │
                 ▼                               ▼
     ┌──────────────────────┐        ┌───────────────────────┐
     │ 帳號導向式使用者註冊 │        │       裝置狀態？      │
     │       (BYOD)         │        └───┬───────────────┬───┘
     └──────────────────────┘            │               │
                            全新 / 已清除 │               │ 已在使用中
                                         ▼               ▼
                             ┌────────────────┐ ┌────────────────────┐
                             │  裝置自動註冊  │ │ 帳號導向式裝置註冊 │
                             │  (Zero-Touch)  │ │ (現有設備收編納管) │
                             └────────────────┘ └────────────────────┘
```

### 1. 帳號導向式使用者註冊（Account-Driven User Enrollment - BYOD）
- **裝置歸屬**：員工個人所有（Bring Your Own Device）。
- **資料區隔**：以專屬 APFS 獨立加密磁區將**公務資料與個人資料完全隔離**。
- **管理邊界**：管理權限嚴格受限，IT **無權**查看個人相片、訊息、瀏覽紀錄或抹除整台裝置（**不受監管**）。
- **適用情境**：允許員工使用個人 iPhone / iPad / Mac 存取公司信箱與內部系統。

### 2. 帳號導向式裝置註冊（Account-Driven Device Enrollment）
- **裝置歸屬**：機構所有，但先前未走 ADE 流程且**已在使用中**。
- **資料區隔**：有資料區隔防護機制。
- **監管狀態**：**Mac 會受監管 (Supervised)**；iPhone / iPad 不受監管。
- **適用情境**：企業要統一收編納管散落在各部門、已在日常運作中的現有 Mac 設備。

### 3. 裝置自動註冊（Automated Device Enrollment - ADE）
- **裝置歸屬**：機構所有之**全新採購**或**清除重置後**的裝置。
- **零接觸部署**：在「設定輔助程式 (Setup Assistant)」開箱聯網時自動強制註冊。
- **監管狀態**：**完全受監管 (Supervised)**，無法由使用者手動刪除 MDM 描述檔。
- **適用情境**：企業大量採購、統一標準化作業環境部署的首選黃金標準。

---

## 5.3 註冊方式選擇指南

在為客戶或內部團隊規劃註冊策略時，請依循以下決策矩陣：

```
裝置是誰的？
├── 員工個人的 → 帳號導向式使用者註冊（BYOD）
└── 機構的
    ├── 全新 / 清除後 → 裝置自動註冊（Zero-Touch，完全監管）
    └── 已在使用中   → 帳號導向式裝置註冊（現有 Mac 收編）
```

---

## 5.4 裝置自動註冊流程（重點）

以下是零接觸自動註冊（Zero-Touch Deployment）從採購到開箱上線的 8 大標準步驟：

<div class="flowchart-container">
  <div class="flow-step blue">
    <div class="flow-icon">🛒</div>
    <div class="flow-content">
      <div class="flow-num">Step 01</div>
      <div class="flow-title">採購裝置</div>
      <div class="flow-desc">向 Apple 或授權經銷商採購</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step blue">
    <div class="flow-icon">📦</div>
    <div class="flow-content">
      <div class="flow-num">Step 02</div>
      <div class="flow-title">自動入庫</div>
      <div class="flow-desc">序號自動進入 Apple 商務</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step amber">
    <div class="flow-icon">⚙️</div>
    <div class="flow-content">
      <div class="flow-num">Step 03</div>
      <div class="flow-title">指派伺服器</div>
      <div class="flow-desc">指派至內建/第三方 MDM</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step amber">
    <div class="flow-icon">📋</div>
    <div class="flow-content">
      <div class="flow-num">Step 04</div>
      <div class="flow-title">配置預設集</div>
      <div class="flow-desc">建立設定檔並指派群組</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step purple">
    <div class="flow-icon">💻</div>
    <div class="flow-content">
      <div class="flow-num">Step 05</div>
      <div class="flow-title">使用者開箱</div>
      <div class="flow-desc">開機連線 Wi-Fi 網路</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step purple">
    <div class="flow-icon">🔐</div>
    <div class="flow-content">
      <div class="flow-num">Step 06</div>
      <div class="flow-title">身分驗證</div>
      <div class="flow-desc">管理式 Apple 帳號 SSO</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step green">
    <div class="flow-icon">🚀</div>
    <div class="flow-content">
      <div class="flow-num">Step 07</div>
      <div class="flow-title">靜默部署</div>
      <div class="flow-desc">自動套用設定與安裝 App</div>
    </div>
  </div>
  <div class="flow-connector">➔</div>

  <div class="flow-step green-highlight">
    <div class="flow-icon">✅</div>
    <div class="flow-content">
      <div class="flow-num">Step 08</div>
      <div class="flow-title">完成納管</div>
      <div class="flow-desc">裝置完全受企業監管</div>
    </div>
  </div>
</div>

### 📋 詳細步驟拆解：
1. **採購設備**：向 Apple 直營企業團隊或授權經銷商下單採購。
2. **自動入庫**：經銷商出貨掃描，序號即時出現在 Apple 商務「裝置」清單中。
3. **指派服務**：在 Apple 商務後台將該批序號指派至指定裝置管理伺服器（MDM）。
4. **預設集配置**：建立企業設定檔（Wi-Fi、密碼原則、FileVault）並指派給對應人員群組。
5. **開箱聯網**：員工收到全新未拆封 Mac/iPhone，開機連上 Wi-Fi。
6. **身分驗證**：在設定輔助程式中輸入管理式 Apple 帳號（Entra ID SSO 登入）。
7. **靜默部署**：裝置自主向伺服器拉取所有企業組態並背景安裝公司必要 App。
8. **開箱即用**：幾分鐘內完成部署，裝置完全處於企業監管（Supervised）防護下。

---

## 5.5 Apple Configurator 新增裝置（Demo 實戰）

### 💡 什麼時候需要 Apple Configurator？
若企業擁有的 Mac、iPhone 或 iPad **不是直接向 Apple 或授權經銷商採購**（例如：一般零售門市購買、既有舊設備轉移或受贈資產），這些設備預設不會出現在 Apple 商務庫存中。

透過 **iPhone 版 Apple Configurator**，IT 人員只需拿手機對準 Mac 螢幕掃描，就能將設備**補登入** Apple 商務！

::: warning ⚠️ 前置條件
- 目標裝置必須處於**「全新出廠」或「清除所有內容與設定」**後的「哈囉 (Hello)」設定輔助程式畫面。
- 登入 iPhone 版 Apple Configurator 時需具備 Apple 商務的「裝置管理者」或「管理者」權限。
:::

---

### 📱 iPhone 版 Apple Configurator 納管實作流程：

#### 步驟 1：iPhone 登入 Apple Configurator
在 iPhone 下載開啟 [Apple Configurator (App Store 下載連結)](https://apps.apple.com/app/apple-configurator/id1588794674)，使用具有管理權限的管理式 Apple 帳號登入。

<div class="interactive-demo-card">
  <div class="demo-badge">DEMO STEP 1</div>
  <div class="demo-title">iPhone 啟動 Configurator</div>
  <div class="demo-phone-mockup">
    <div class="phone-screen">
      <div class="phone-header"> Configurator</div>
      <div class="phone-body">
        <div class="viewfinder-circle">
          <div class="radar-scan"></div>
        </div>
        <p class="phone-hint">將相機對準 Mac 上的圓形圖樣</p>
      </div>
    </div>
  </div>
</div>

---

#### 步驟 2：Mac 開機至國家選擇並停留等待配對

::: danger 🚨【關鍵核心步驟】請特別注意！
將待收編的 Mac 清除重置後開機，**在看到「選擇你的國家或地區」窗格時請務必「停止操作」！**  
這一步非常重要，**請絕對不要直接按「繼續」**！在國家選擇頁面請先稍等一下，**將已開啟 Apple Configurator 的 iPhone 靠近 Mac**，Mac 螢幕端就會自動彈出「將此 Mac 加入你的機構 (Add this Mac to Your Organization)」並出現**藍色動態星雲配對光球**！
:::

<div class="step-image-container">
  <img src="/images/configurator_mac_orb.png" alt="Mac 螢幕出現動態星雲光球 (Add this Mac to Your Organization)" class="step-image-laptop" />
</div>

---

#### 步驟 3：iPhone 對準 Mac 螢幕光球掃描
拿起 iPhone，將 Configurator 的相機取景框對準 Mac 螢幕上的**星雲動態光球**。

<div class="interactive-demo-card">
  <div class="demo-badge">DEMO STEP 3</div>
  <div class="demo-title">掃描配對與雲端指派</div>
  <div class="pairing-flow">
    <div class="flow-item">📱 iPhone 掃描光球</div>
    <div class="flow-arrow">➔</div>
    <div class="flow-item">☁️ 上傳序號至 Apple 商務</div>
    <div class="flow-arrow">➔</div>
    <div class="flow-item">💻 Mac 顯示「已加入組織」</div>
  </div>
</div>

---

#### 步驟 4：在 Apple 商務後台完成指派
1. 登入 [business.apple.com](https://business.apple.com) 進入「裝置」。
2. 該台 Mac 會出現在清單中，來源標註為 **「Apple Configurator」**。
3. 勾選裝置，點選「編輯 MDM 伺服器」指派給公司的 MDM 系統。
4. **完成納管**：該裝置即刻享有與一般 ADE 採購裝置同等的**完全監管 (Supervised)** 待遇！

<style>
.step-image-container {
  margin: 1.5rem 0;
  text-align: center;
}
.step-image {
  display: inline-block;
  max-width: 520px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
.step-image-laptop {
  display: inline-block;
  max-width: 640px;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* Demo Mockup Styles */
.interactive-demo-card {
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  text-align: center;
}
.demo-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #0071e3;
  background: rgba(0, 113, 227, 0.1);
  padding: 2px 10px;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}
.demo-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}
.demo-phone-mockup {
  display: inline-block;
  width: 200px;
  height: 320px;
  background: #1e1e24;
  border-radius: 28px;
  border: 4px solid #3f3f46;
  padding: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
.phone-screen {
  background: #000;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  color: #fff;
}
.phone-header {
  font-size: 0.8rem;
  font-weight: 600;
}
.viewfinder-circle {
  width: 120px;
  height: 120px;
  border: 2px dashed #0071e3;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radar-scan {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0,113,227,0.4) 0%, rgba(0,113,227,0) 70%);
  border-radius: 50%;
  animation: pulse 2s infinite ease-in-out;
}
.phone-hint {
  font-size: 0.7rem;
  color: #a1a1aa;
}

/* Mac Mockup */
.demo-mac-mockup {
  display: inline-block;
  width: 100%;
  max-width: 420px;
  background: #18181b;
  border-radius: 12px;
  border: 1px solid #3f3f46;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}
.mac-header {
  background: #27272a;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }
.mac-title {
  font-size: 0.75rem;
  color: #a1a1aa;
  margin-left: 10px;
}
.mac-screen-content {
  padding: 2.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cloud-orb {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%);
  filter: blur(1px);
  box-shadow: 0 0 25px #3b82f6;
  animation: float 3s infinite ease-in-out;
}
.mac-hint {
  font-size: 0.8rem;
  color: #e4e4e7;
  margin-top: 1.5rem;
}

.pairing-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}
.flow-item {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.flow-arrow {
  color: #0071e3;
  font-weight: bold;
}

@keyframes pulse {
  0%, 100% { transform: scale(0.8); opacity: 0.4; }
  50% { transform: scale(1.1); opacity: 0.9; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* 5.4 裝置自動註冊流程圖樣式 */
.flowchart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
}

.flow-step {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 480px;
  padding: 0.9rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid transparent;
  transition: transform 0.2s, box-shadow 0.2s;
}

.flow-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
}

.flow-step.blue {
  background: #eff6ff;
  border-color: #bfdbfe;
}
.dark .flow-step.blue {
  background: #1e293b;
  border-color: #3b82f6;
}

.flow-step.amber {
  background: #fffbeb;
  border-color: #fde68a;
}
.dark .flow-step.amber {
  background: #2d2618;
  border-color: #f59e0b;
}

.flow-step.purple {
  background: #faf5ff;
  border-color: #e9d5ff;
}
.dark .flow-step.purple {
  background: #2c1b4d;
  border-color: #a855f7;
}

.flow-step.green {
  background: #f0fdf4;
  border-color: #bbf7d0;
}
.dark .flow-step.green {
  background: #143522;
  border-color: #22c55e;
}

.flow-step.green-highlight {
  background: #dcfce7;
  border: 2px solid #16a34a;
}
.dark .flow-step.green-highlight {
  background: #154528;
  border: 2px solid #4ade80;
}

.flow-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.flow-content {
  flex: 1;
}

.flow-num {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.75;
}

.flow-title {
  font-size: 1rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.flow-desc {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}

.flow-connector {
  font-size: 1.1rem;
  font-weight: 900;
  color: var(--vp-c-brand-1);
  transform: rotate(90deg);
  margin: -2px 0;
}
</style>
