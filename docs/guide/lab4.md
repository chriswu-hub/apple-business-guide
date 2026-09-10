# Lab 4: App 大量部署實作

**預估時間：** 10 分鐘  
**實作目標：** 接續 Lab 3，在 Apple 商務中透過大量採購取得「Microsoft Outlook」的免費企業許可，將其加入「商務部門-Mac」藍圖中，體驗 Mac 本機免 Apple 帳號背景靜默安裝與開啟驗證。

---

## 🎯 前置準備（延續 Lab 2 & 3 之 Mac）

本實作延續前述 Lab 已納管的實體測試 Mac：

| 實作項目 | 採購軟體 | 指派藍圖 | 預期成果 |
| :--- | :--- | :--- | :--- |
| **Lab 4: App 部署** | Microsoft Outlook | 商務部門-Mac | Mac 自動安裝完成並可正常開啟 |

---

## 📝 實作步驟

### 步驟 1：在 Apple 商務取得 App 許可
1. 使用管理員帳號登入 [business.apple.com](https://business.apple.com)。
2. 點選頂部導覽列 **「App 及服務」** > 點選 **「檢視商店」**。
3. 在左側搜尋列輸入 **`Outlook`** 並選取 **Microsoft Outlook (macOS App)**。
4. 在右側「購買許可證」區塊：
   - **分派予**：確認選擇你的組織機構單位。
   - **數量**：輸入 `10`（NT$0.00 免費授權）。
5. 點選右側藍色按鈕 **「取得」**：

<div class="step-image-container">
  <img src="/images/lab4_step1_buy_outlook.png" alt="在商店搜尋 Outlook、選擇機構單位並取得 10 套許可" class="step-image" />
</div>

---

### 步驟 2：將 App 加入「藍圖」並設定自動安裝
1. 導覽至左側選單「裝置」>「內置管理」> 點選 **「藍圖」**。
2. 點選先前建立的 **「商務部門-Mac」** 藍圖，切換至 **「App」** 標籤頁，點選右側的 **「編輯」** 按鈕：
   <div class="step-image-container">
     <img src="/images/lab4_step2_blueprint_app_tab.png" alt="商務部門-Mac 藍圖 > App 標籤頁 > 點選編輯" class="step-image" />
   </div>

3. 在「編輯 App」彈出視窗中，勾選剛剛取得的 **「Microsoft Outlook」**，點選 **「儲存」**：
   <div class="step-image-container">
     <img src="/images/lab4_step2_select_outlook.png" alt="勾選 Microsoft Outlook 並點選儲存" class="step-image" />
   </div>

4. 前往左側選單「裝置」>「受管理的 App」，點選 **「Microsoft Outlook」** > 切換至 **「設定」** 標籤頁：
   - **注意：安裝方式請務必確認為「自動」**（分派到裝置後立即自動安裝《Microsoft Outlook》），點選右下角 **「儲存」**！
   <div class="step-image-container">
     <img src="/images/lab4_step2_auto_install_setting.png" alt="受管理的 App > 設定 > 確認安裝方式為自動" class="step-image" />
   </div>

---

### 步驟 3：Mac 端觀察背景靜默安裝
回到你面前的測試 Mac（無需重開機、無需開啟 App Store、無需輸入個人密碼）：
1. 保持 Mac 聯網約 1~3 分鐘。
2. **觀察 Dock 欄或啟動台 (Launchpad)**：
   - 系統會在背景默默下載，隨後 **`Microsoft Outlook` 圖示將自動出現在應用程式清單中**！

---

### 步驟 4：驗證與開啟 App
1. 在 Mac 上開啟「訪達 (Finder)」>「應用程式」，點擊啟動 **Microsoft Outlook**。
2. 確認能正常開啟歡迎畫面。

---

## 🏆 結訓成果自動檢核

完成後，請前往我們的結訓檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

使用手機相機掃描 Mac 螢幕上已安裝完成的 **`Microsoft Outlook`** 視窗、圖示或終端機查詢結果，系統確認通過後將立即頒發專屬數位結訓證書！

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
