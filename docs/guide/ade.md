# 監管模式與安全性政策深潛

**監管模式 (Supervision)** 是 Apple 裝置管理體系中最高等級的權限架構。它代表該裝置為「機構完全所有 (Institutionally Owned)」，而非員工私人財產。只有處於監管狀態下的裝置，企業才能解鎖完整的資安防禦與深度控管能力。

---

### 🎯 學習目標
- 理解監管模式（Supervision）的法律與技術邊界
- 掌握受監管 (Supervised) vs 未受監管 (Unsupervised) 的核心能力差異
- **深入理解三大企業級進階防禦**：啟動鎖繞過、DDM 宣告式更新、單一 App 鎖定
- 能在終端機與後台驗證裝置的監管合規狀態

---

## 9.1 取得監管的唯一兩大管道

Apple 在系統底層設有嚴格的隱私與安全邊界，**使用者自行下載或手動安裝描述檔，絕對無法取得完全監管權限**。

目前合法取得監管模式僅有以下兩種途徑：

<div class="supervision-diagram-container">
  <div class="sup-root-box">
    <div class="sup-root-title">如何取得「監管模式」？</div>
  </div>

  <div class="sup-cards-row">
    <!-- 途徑 1 -->
    <div class="sup-card blue">
      <div class="sup-card-header">
        <span class="sup-badge">途徑 1</span>
        <h4>自動裝置註冊 (ADE)</h4>
      </div>
      <div class="sup-card-body">
        <div class="sup-info-item">
          <span class="info-label">採購來源</span>
          <span class="info-text">原廠直營或授權經銷商綁定入庫</span>
        </div>
        <div class="sup-info-item">
          <span class="info-label">部署體驗</span>
          <span class="info-text">開箱聯網自動強制監管，零接觸自動設定</span>
        </div>
        <div class="sup-info-item">
          <span class="info-label">權限特性</span>
          <span class="info-text highlight-blue">永久鎖定，不可移除 MDM 描述檔</span>
        </div>
      </div>
    </div>

    <!-- 途徑 2 -->
    <div class="sup-card purple">
      <div class="sup-card-header">
        <span class="sup-badge purple-badge">途徑 2</span>
        <h4>Apple Configurator</h4>
      </div>
      <div class="sup-card-body">
        <div class="sup-card-img-box">
          <img src="/images/configurator_mac_orb.png" alt="Mac 螢幕出現動態星雲光球配對畫面" class="sup-mini-img" />
        </div>
        <div class="sup-info-item">
          <span class="info-label">採購來源</span>
          <span class="info-text">一般零售門市散買、二手或既有設備收編</span>
        </div>
        <div class="sup-info-item">
          <span class="info-label">部署體驗</span>
          <span class="info-text">需清除重置，以 iPhone 靠近掃描配對光球</span>
        </div>
        <div class="sup-info-item">
          <span class="info-label">權限特性</span>
          <span class="info-text highlight-purple">具備 30 天手動移除寬限期，過後永久鎖定</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.supervision-diagram-container {
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.sup-root-box {
  background: var(--vp-c-bg);
  border: 2px solid #0071e3;
  padding: 0.6rem 1.8rem;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.12);
  text-align: center;
}

.sup-root-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sup-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  width: 100%;
}

@media (max-width: 640px) {
  .sup-cards-row {
    grid-template-columns: 1fr;
  }
}

.sup-card {
  background: var(--vp-c-bg);
  border-radius: 14px;
  padding: 1.25rem;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.sup-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
}

.sup-card.blue {
  border-top: 4px solid #0071e3;
}

.sup-card.purple {
  border-top: 4px solid #a855f7;
}

.sup-card-header {
  margin-bottom: 1rem;
}

.sup-card-header h4 {
  margin: 0.35rem 0 0 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.sup-badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 6px;
  background: #eff6ff;
  color: #0071e3;
}
.dark .sup-badge {
  background: #1e293b;
  color: #60a5fa;
}

.purple-badge {
  background: #faf5ff;
  color: #a855f7;
}
.dark .purple-badge {
  background: #2e1065;
  color: #c084fc;
}

.sup-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.sup-card-img-box {
  width: 100%;
  margin-bottom: 0.75rem;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background: #000;
  display: flex;
  justify-content: center;
}

.sup-mini-img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
}

.sup-info-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.info-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-text {
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
  line-height: 1.45;
}

.highlight-blue {
  color: #0071e3;
  font-weight: 600;
}
.dark .highlight-blue {
  color: #60a5fa;
}

.highlight-purple {
  color: #a855f7;
  font-weight: 600;
}
.dark .highlight-purple {
  color: #c084fc;
}
</style>

---

## 9.2 受監管 vs 未受監管能力全方位對照

在資安治理架構中，「是否受監管」決定了企業能否完全阻斷內部資料外洩風險：

| 資安控管能力 | 受監管裝置 (Supervised) 🛡️ | 一般未受監管裝置 (BYOD / 個人) 👤 | 實務資安風險評估 |
| :--- | :---: | :---: | :--- |
| **禁止刪除 MDM 描述檔** | ✅ **強制鎖定**（無移除按鈕） | ❌ 使用者可隨時手動刪除 | 員工可隨時脫管逃避公司監控 |
| **背景靜默安裝 App** | ✅ **無感背景推送**（零提示） | ❌ 需使用者手動點擊同意 | 無法確保防毒/端點防禦 100% 安裝 |
| **強制遠端抹除整機** | ✅ **支援一鍵遠端重置** | ❌ 限制僅能清除公務容器 | 設備遺失或被竊時資料易遭抽取 |
| **強制作業系統更新 (DDM)** | ✅ **強制指定截止日重啟升級** | ❌ 僅能彈窗提醒，使用者可無限略過 | 零日漏洞 (Zero-day) 長期暴露 |
| **停用「啟動鎖 (Activation Lock)」** | ✅ **MDM 雲端繞過代碼 (Bypass Code)** | ❌ 需原員工輸入個人 Apple 帳號密碼 | 員工離職未登出導致設備變磚 |
| **限制外接隨身碟 / 磁碟** | ✅ **支援完全唯讀或禁用 USB 儲存** | ❌ 無法限制外接儲存設備 | 核心原始碼、財務報表透過隨身碟外流 |
| **限制 AirDrop 傳檔** | ✅ **支援全面阻斷或限制僅聯絡人** | ❌ 無法限制個人 AirDrop | 走廊上隔空傳送機密公務文件 |
| **禁止「清除所有內容與設定」** | ✅ **可完全隱藏或禁用此功能** | ❌ 使用者可自由自行洗機重置 | 防止員工私自重置銷毀數位調查證據 |

---

## 9.3 企業三大核心「深潛防禦機制」

### 🛡️ 深潛 A：啟動鎖繞過 (Activation Lock Bypass)

::: danger 💼 企業真實痛點
員工離職時，Mac 登錄了該員工個人的 Apple 帳號並開啟了「尋找我的 Mac (Find My)」，員工繳回電腦後失去聯絡。當 IT 抹除電腦準備重新發放給新員工時，螢幕跳出 **「啟動鎖定」**，要求輸入原離職員工的個人密碼才能開機，導致整台十幾萬的 Mac 變成電子廢鐵！
:::

#### 💡 監管架構下的解法：
- 當受監管裝置完成註冊時，MDM 會自動向 Apple 伺服器託管一組 **「啟動鎖繞過代碼 (Activation Lock Bypass Code)」**。
- 當設備遇到啟動鎖時，IT 管理員**無需員工密碼**，直接在 MDM 後台或終端機輸入這組 Bypass Code，即可一秒強制解除啟動鎖！

---

### 🛡️ 深潛 B：宣告式管理 (DDM) 自主強制升級

傳統 MDM 更新依賴伺服器定時發送 Push 命令，只要使用者蓋上螢幕或離線，更新就會失敗中斷。

**宣告式裝置管理 (Declarative Device Management, DDM)** 帶來了革命性的自主更新：
1. **策略預載**：管理員設定 *「macOS 15.4 必須於週五 17:00 前完成安裝」*。
2. **本機自主排程**：受監管 Mac 的作業系統核心會主動在背景下載安裝檔、驗證電力與頻寬。
3. **強制重啟倒數**：當截止時間接近，系統會顯示醒目倒數計時視窗，時間一到**自動強制重啟完成更新**，徹底消除企業零日漏洞空窗期！

---

### 🛡️ 深潛 C：單一 App 鎖定模式 (Single App Mode / Kiosk)

針對零售門市、展場、櫃檯點餐 POS 或倉庫庫存盤點等專用情境：

- **單一 App 永久常駐**：可將 iPad 或 Mac 鎖死在特定企業 App 畫面。
- **硬體按鍵全面停用**：自動停用觸控手勢、主畫面返回、睡眠/喚醒按鈕、音量鍵及螢幕自動鎖定。
- **當機自動重啟**：若 App 發生閃退或崩潰，macOS / iPadOS 核心會在 0.1 秒內自動重新啟動該 App，防止顧客或未授權人員跳出存取系統底層。

---

## 9.4 本機與後台驗證監管狀態

### 🔍 1. Mac 本機終端機權威驗證
在 Mac 終端機執行：
```bash
sudo profiles status -type enrollment
```
**關鍵合規欄位**：
```text
Enrolled via DEP: Yes
MDM enrollment: Yes (User Approved)
MDM server: https://...
IsSupervised: YES
```
當 `IsSupervised: YES` 出現時，代表本機 macOS 核心防禦能力已全面上線！

---

### 🔍 2. macOS 系統設定介面確認
在 macOS 桌面左上角點選「」>「系統設定」：
- **組織資訊確認**：點入側邊欄頂部的「Apple 帳戶」，點選其中的 **「個人資訊」**，即可檢視所屬的 **機構名稱**。
- **裝置管理描述檔**：前往 **「一般」>「裝置管理」**，點選進去會看到已安裝的企業 MDM 註冊設定檔，且**不會顯示「-」減號或移除按鈕**（受監管狀態下完全鎖定，使用者無法自行手動刪除）。
