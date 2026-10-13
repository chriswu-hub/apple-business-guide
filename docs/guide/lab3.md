# Lab 3: 建立企業安全性預設集與組態派送實作

**預估時間：** 20 分鐘  
**實作目標：** 接續 Lab 2，在 Apple 商務後台建立「安全性設定」（應用程式層防火牆）與「個人化設定」（鎖定畫面），打包加入「XX的商務部門-Mac」預設集中，體驗 Mac 本機即時套用原則與高互動性安全性合規驗證。

---

## 🎯 前置準備（延續 Lab 1 & 2 環境）

::: info 📌【學員環境與設備延續】
本實作延續你在 **[Lab 1 前置準備與學員座號總表](/guide/lab1#🎯-前置準備與學員座號總表)** 所分配的專屬座號：
- **學員帳號**：`studentXX@mdm.idv.tw`（例如 Seat 01 請使用 `student01@mdm.idv.tw`）
- **目標預設集**：`XX的商務部門-Mac`（例如 Seat 01 為 `01的商務部門-Mac`）
- **鎖定畫面自訂標籤**：` Apple at Work - studentXX`
:::

---

## 📝 實作步驟

### 步驟 1：在 Apple 商務中建立安全性組態

::: tip 🔍【實作前先觀察：Mac 當前資安合規狀態】
在開始建立與派送資安原則前，建議先了解目前設備的原始狀態：
前往 Apple 商務後台「裝置」>「庫存」點選你的 Mac，查看「狀態」面板：
- 此時 **防火牆** 呈現 🔴 驚嘆號 **「關閉」** 狀態（如下圖）。
- 請記下此畫面，待後續完成防火牆原則並套用後，我們將回頭驗證狀態是否順利轉為綠燈合規！
:::

<div class="step-image-container">
  <img src="/images/lab3_pre_status_check.png" alt="實作前觀察：Mac 設備狀態中的防火牆呈現關閉" class="step-image" />
</div>

1. 登入 [business.apple.com](https://business.apple.com) 進入「裝置」>「設定」>「所有設定」>「安全性」。
2. **建立「應用程式層防火牆」**：
   - 點選上方「安全性」標籤，在九宮格中找到 **「應用程式層防火牆」**（應用程式防火牆可控制個別 App 的連線），點選右上角「+」：
   <div class="step-image-container">
     <img src="/images/lab3_step1_firewall_list_v2.png" alt="設定 > 所有設定 > 安全性 > 應用程式層防火牆" class="step-image" />
   </div>

   - 設定名稱輸入你的專屬座號識別：`studentxx_防火牆`（例如 `student01_防火牆`）。
   - 選擇平台：勾選 `macOS`。
   - 防火牆狀態：選擇 **「啟用」**，完成後點選右下角「儲存」：
   <div class="step-image-container">
     <img src="/images/lab3_step1_firewall_rule.png" alt="設定應用程式層防火牆為啟用並儲存" class="step-image" />
   </div>

---

### 步驟 2：建立個人化組態
1. 前往「裝置」>「設定」>「所有設定」>「個人化」：
   - 在下方九宮格中找到 **「鎖定畫面」**（管理鎖定畫面和使用者工作階段的顯示方式和功能）：
   <div class="step-image-container">
     <img src="/images/lab3_step2_lockscreen_setting.png" alt="設定 > 所有設定 > 個人化 > 鎖定畫面" class="step-image" />
   </div>

   - 點選「+」進入編輯，開啟「外觀」，並在 **「鎖定畫面訊息」** 欄位中輸入你的專屬資產標籤：` Apple at Work - studentXX`（例如 ` Apple at Work - student01`），完成後點選「儲存」：
   <div class="step-image-container">
     <img src="/images/lab3_step2_lockscreen_message.png" alt="鎖定畫面訊息輸入  Apple at Work - student01" class="step-image" />
   </div>

---

### 步驟 3：將設定打包加入「預設集 (Blueprints)」
1. 前往「裝置」>「內建管理」> 點選 **「預設集」**。
2. 點選在 Lab 2 建立的 **「XX的商務部門-Mac」** 預設集（例如 `01的商務部門-Mac`）。
3. 在「設定」區塊中，點選「+ 加入設定」，將剛才建立的 **防火牆 (`studentxx_防火牆`)** 與 **鎖定畫面** 加入並儲存！

---

### 步驟 4：Mac 端觀察即時原則派送
回到你面前的測試 Mac（**完全無需重開機**）：
1. 保持 Mac 聯網，等待約 30~60 秒，Apple 裝置管理服務將透過 APNs 雲端通道在背景即時推送組態。
2. 螢幕會彈出通知提示系統設定已更新。

---

## 🎮 趣味實作檢核挑戰（動手體驗 MDM 控制力）

完成派送後，請在你的 Mac 上進行以下 2 項體感檢核：

### 挑戰 1：鎖定畫面「專屬資產求助文字」🌟（最直觀）
1. 在 Mac 鍵盤上按下快捷鍵：**`Ctrl + Cmd + Q`** 立即鎖定螢幕。
2. **觀察鎖定畫面正下方**：
   - 畫面正下方已直接浮現一行官方標籤：**` Apple at Work - studentXX`**！
   - 證明個人化與資產標籤原則已即時生效！

---

### 挑戰 2：Apple 商務後台「合規驗證」儀表板 ☁️
1. 回到 Apple 商務後台「裝置」>「庫存」點選你的 Mac。
2. **觀察健康度狀態面板（與實作前的狀態對照）**：
   - 防火牆：成功轉變為綠色 **✓「開啟」**！
   - 預設集狀態：顯示為 **「最新 (Up to date)」**！

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
