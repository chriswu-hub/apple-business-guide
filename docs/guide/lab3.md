# Lab 3: 建立企業安全性藍圖與組態派送實作

**預估時間：** 20 分鐘  
**實作目標：** 接續 Lab 2，在 Apple 商務後台建立「保安設定」（密碼原則、防火牆）與「個人化設定」（鎖定畫面），打包加入「XX的商務部門-Mac」藍圖中，體驗 Mac 本機即時套用原則與高互動性安全性合規驗證。

---

## 🎯 前置準備（延續 Lab 1 & 2 環境）

::: info 📌【學員環境與設備延續】
本實作延續你在 **[Lab 1 前置準備與學員座號總表](/guide/lab1#🎯-前置準備與學員座號總表)** 所分配的專屬座號：
- **學員帳號**：`studentXX@mdm.idv.tw`（例如 Seat 01 請使用 `student01@mdm.idv.tw`）
- **目標藍圖**：`XX的商務部門-Mac`（例如 Seat 01 為 `01的商務部門-Mac`）
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

1. 登入 [business.apple.com](https://business.apple.com) 進入「裝置」>「設定」>「保安」。
2. **建立「密碼和螢幕解鎖」**：
   - 點選「+」，設定密碼長度最少 **8 位數**、包含英數字元。
   - 閒置 **5 分鐘** 後鎖定螢幕。
   - 密碼嘗試失敗上限：**10 次**。
3. **建立「應用程式層防火牆」**：
   - 點選上方「保安」標籤，在九宮格中找到 **「應用程式層防火牆」**（會因應個別 App 控制連線），點選右上角「+」：
   <div class="step-image-container">
     <img src="/images/lab3_step1_firewall_list.png" alt="設定 > 保安 > 應用程式層防火牆" class="step-image" />
   </div>

   - 設定名稱輸入你的專屬座號識別：`studentxx_防火牆`（例如 `student01_防火牆`）。
   - 選擇平台：勾選 `macOS`。
   - 防火牆狀態：選擇 **「啟用」**，完成後點選右下角「儲存」：
   <div class="step-image-container">
     <img src="/images/lab3_step1_firewall_rule.png" alt="設定應用程式層防火牆為啟用並儲存" class="step-image" />
   </div>

---

### 步驟 2：建立個人化與網絡組態
1. 前往「裝置」>「設定」>「個人化」：
   - 點選「所有設定」，在下方九宮格中找到 **「鎖定畫面」**（管理鎖定畫面和用戶工作階段的顯示方式和功能）：
   <div class="step-image-container">
     <img src="/images/lab3_step2_lockscreen_setting.png" alt="設定 > 個人化 > 鎖定畫面" class="step-image" />
   </div>

   - 點選「+」進入編輯，開啟「外觀」，並在 **「鎖定畫面訊息」** 欄位中輸入你的專屬資產標籤：` Apple at Work - studentXX`（例如 ` Apple at Work - student01`），完成後點選「儲存」：
   <div class="step-image-container">
     <img src="/images/lab3_step2_lockscreen_message.png" alt="鎖定畫面訊息輸入  Apple at Work - student01" class="step-image" />
   </div>

2. 前往「裝置」>「設定」>「網絡」：
   - 點選「+」建立 **「Wi-Fi」**，SSID 設定為 **`CorpWiFi-Test`**（WPA2 企業級）。

---

### 步驟 3：將設定打包加入「藍圖 (Blueprints)」
1. 前往「裝置」>「內置管理」> 點選 **「藍圖」**。
2. 點選在 Lab 2 建立的 **「XX的商務部門-Mac」** 藍圖（例如 `01的商務部門-Mac`）。
3. 在「設定」區塊中，點選「+ 加入設定」，將剛才建立的 **密碼原則**、**防火牆 (`studentxx_防火牆`)**、**鎖定畫面** 與 **Wi-Fi** 全數加入並儲存！

---

### 步驟 4：Mac 端觀察即時原則派送
回到你面前的測試 Mac（**完全無需重開機**）：
1. 保持 Mac 聯網，等待約 30~60 秒，Apple 裝置管理服務將透過 APNs 雲端通道在背景即時推送組態。
2. 螢幕會彈出通知提示系統設定已更新。

---

## 🎮 趣味實作檢核挑戰（動手體驗 MDM 控制力）

完成派送後，請在你的 Mac 上進行以下 3 項體感檢核：

### 挑戰 1：鎖定畫面「專屬資產求助文字」🌟（最直觀）
1. 在 Mac 鍵盤上按下快捷鍵：**`Ctrl + Cmd + Q`** 立即鎖定螢幕。
2. **觀察鎖定畫面正下方**：
   - 畫面正下方已直接浮現一行官方標籤：**` Apple at Work - studentXX`**！
   - 證明個人化與資產標籤原則已即時生效！

---

### 挑戰 2：故意違規！「密碼防禦實戰測試」🔥
1. 解鎖進入 Mac，打開「系統設定」>「Touch ID 與密碼」> 點選「更改密碼」。
2. 故意輸入舊密碼後，新密碼**只輸入簡單的 `1234`**（嘗試違反 8 位數英數規則）。
3. 點選儲存。
4. **觀察系統防禦反應**：
   - macOS 瞬間彈出紅字阻擋：**「密碼不符合機構密碼原則的要求」**！
   - 證明雲端資安原則已牢牢鎖死本機系統，使用者無法私自降級安全強度！

---

### 挑戰 3：Apple 商務後台「合規驗證」儀表板 ☁️
1. 回到 Apple 商務後台「裝置」>「庫存」點選你的 Mac。
2. **觀察健康度狀態面板（與實作前的狀態對照）**：
   - 防火牆：成功轉變為綠色 **✓「開啟」**！
   - 藍圖狀態：顯示為 **「最新 (Up to date)」**！

---

## 🏆 結訓成果自動檢核

完成 Lab 3 後，請前往我們的結訓檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

使用手機相機掃描 Mac 鎖定畫面的 **` Apple at Work - studentXX`**、或終端機 `MDM enrollment: Yes (User Approved)`，系統確認通過後將即時頒發專屬數位結訓證書！

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
