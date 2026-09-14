# Lab 5: macOS 套件建立與部署實作

**預估時間：** 15 分鐘  
**實作目標：** 接續 Lab 4，學習如何為非 Mac App Store 上架的軟體（以 Box 為例）提取套裝 ID 與 SHA-256 雜湊值，在 Apple 商務中建立自訂套件並加入「藍圖」，實現企業專屬軟體的自動化背景派送。

---

## 🎯 實作前置資訊準備

講師已為各位學員準備好實作套件的伺服器存放位置與相關參數（點擊右上角即可直接複製）：

- **套件網絡伺服器 URL**：
  ```
  https://apple.box.com/shared/static/my1q4f12uw88uaybixx2mee2qnukz1y8.pkg
  ```
- **套裝 ID**：
  ```
  com.box.desktop
  ```
- **SHA-256 雜湊加密碼**：
  ```
  527dce43865032d4dfb9a68790ff52f4e108f48e24b016985a86e8824fa2fa89
  ```
- **版本編號**：
  ```
  1.0
  ```
- **套件名稱命名規則**：`Box-XX`（請依學員座號命名，例如學員 01 請命名為 `Box-01`）

---

## 🔍 前置任務：如何提取套件必要資訊？

在日常 IT 運維中，如果你拿到一個未知的 `.pkg` 或 App，請依照以下步驟提取「套裝 ID」與「雜湊值」：

### 任務 A：取得套裝 ID
1. 在 Finder 的「應用程式」資料夾中找到該 App（例如 Box）。按住 **Control** 並按一下 App 圖示，在快顯功能表中選擇 **「顯示套裝內容」**：
   <div class="step-image-container">
     <img src="/images/lab5_step1_show_package_menu.png" alt="右鍵選擇顯示套裝內容" class="step-image" />
   </div>
   <div class="step-image-container">
     <img src="/images/lab5_step1_pkg_contents.png" alt="Contents 資料夾中的 Info.plist" class="step-image" />
   </div>

2. 開啟 **「Contents」** 資料夾，找到 **`Info.plist`** 檔案。
3. 在文字編輯器（TextEdit）或 Xcode 中開啟 `Info.plist`，使用「尋找」功能搜尋 **`CFBundleIdentifier`**，複製其下方的字串（本練習為 `com.box.desktop`）：
   <div class="step-image-container">
     <img src="/images/lab5_step1_infoplist_bundleid.png" alt="Info.plist 中尋找 CFBundleIdentifier" class="step-image" />
   </div>

---

### 任務 B：計算套件 SHA-256 雜湊碼 (Hash)
為了確保套件在派送過程中的完整性與安全性，Apple 商務要求提供 64 個字元的 SHA-256 雜湊碼：

1. 開啟 Mac「終端機 (Terminal)」。
2. 輸入指令 `shasum -a 256 `（注意 256 後方有一個空格）。
3. 從 Finder 視窗中將 `.pkg` 檔案直接拖入終端機視窗中，自動帶出路徑：
   ```bash
   shasum -a 256 /Users/chriswu/Library/CloudStorage/Box-Box/App/LMStudio-OneClick-Installer.pkg
   ```
4. 按下 **Return** 鍵，終端機即刻計算出 64 碼字母數字雜湊值：
   <div class="step-image-container">
     <img src="/images/lab5_step2_shasum_terminal.png" alt="Terminal 終端機計算 SHA-256 雜湊" class="step-image" />
   </div>

*(本實作請直接複製上方準備好的雜湊值)*

---

## 📝 實作步驟

### 步驟 1：在 Apple 商務建立新程式套件
1. 使用管理員帳號登入 [business.apple.com](https://business.apple.com)。
2. 進入頂部導覽列 **「裝置」** > 左側選單 **「內置管理」** > 點選 **「macOS 套裝」**：
   <div class="step-image-container">
     <img src="/images/lab5_step1_packages_list.png" alt="裝置 > 內置管理 > macOS 套裝 列表畫面" class="step-image" />
   </div>

3. 點選「你的 macOS 套件」旁的 **「+」**（加入新程式套件）：
4. 依序填入從前置資訊中獲得的必要欄位：
   - **套件名稱**：輸入 `Box-XX`（例如學員 01 輸入 `Box-01`）
   - **macOS 套件 URL**：`https://apple.box.com/shared/static/my1q4f12uw88uaybixx2mee2qnukz1y8.pkg`
   - **SHA-256 雜湊**：`527dce43865032d4dfb9a68790ff52f4e108f48e24b016985a86e8824fa2fa89`
   - **套裝 ID**：`com.box.desktop`
   - **版本編號**：`1.0`
5. *(選填項目)*：可選擇上傳 App 圖示（不超過 1024×1024、小於 10MB 的 png/jpeg/icns）或填寫說明描述。
6. 確認無誤後，點選下方藍色按鈕 **「儲存」**：

<div class="step-image-container">
  <img src="/images/lab5_step1_add_package_form.png" alt="加入新程式套件表單填寫" class="step-image" />
</div>

儲存後，該套件將正式顯示在你的 macOS 套裝清單中！

---

### 步驟 2：將套件加入「藍圖」進行派送
1. 導覽至左側選單「裝置」>「內置管理」> 點選 **「藍圖」**。
2. 點選在 Lab 2 建立的 **「商務部門-Mac」** 藍圖。
3. 切換至 **「App」** 標籤頁，點選右側紅框的 **「編輯」** 按鈕，彈出「編輯 App」視窗：
   <div class="step-image-container">
     <img src="/images/lab5_step2_blueprint_app_edit.png" alt="編輯 App 彈出視窗並勾選 Box-01 套件" class="step-image" />
   </div>

4. 在彈出清單中，勾選剛剛建立的套件 **「Box-XX」**（例如 `Box-01`），點選 **「儲存」**。
5. 確認藍圖 App 清單中已成功包含 Microsoft Outlook、OneDrive 以及 **Box-XX**，點選右下角 **「儲存」** 完成藍圖更新！
   <div class="step-image-container">
     <img src="/images/lab5_step2_package_added.png" alt="藍圖中已成功加入 Box-01 套件" class="step-image" />
   </div>

---

### 步驟 3：Mac 端觀察背景靜默安裝
回到你面前的測試 Mac：
1. 保持 Mac 聯網約 1~3 分鐘。
2. **觀察「應用程式」資料夾或啟動台 (Launchpad)**：
   - 系統會在背景由 MDM 自動下載並無感安裝，隨後 **`Box.app`** 圖示將自動出現在「應用程式」清單中！

---

## 🏆 結訓成果自動檢核

完成後，請前往我們的結訓檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

使用手機相機掃描 Mac 螢幕上已安裝完成的 **`Box`** 圖示、視窗或應用程式清單，系統確認通過後將立即頒發專屬數位結訓證書！

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
