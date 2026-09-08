# Lab 2: 裝置自動註冊與零接觸部署模擬

**預估時間：** 20 分鐘  
**實作目標：** 在 Apple 商務後台確認分配到的 Mac 序號，指派管理服務與預設集，接著將 Mac 開機連網，體驗零接觸自動下載描述檔與受監管（Supervised）部署流程。

---

## 🎯 前置準備（學員座號與設備序號對照）

每位學員拿到一台已預先透過 Configurator 加入 Apple 商務的實體 Mac。請先確認外殼底部的 **Mac 序號 (Serial Number)**：

| 座號 | 分配學員帳號 | 目標預設集 | 驗證檢核點 |
| :--- | :--- | :--- | :--- |
| **學員 01** | `student01@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 02** | `student02@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 03** | `student03@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 04** | `student04@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 05** | `student05@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 06** | `student06@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 07** | `student07@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 08** | `student08@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 09** | `student09@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |
| **學員 10** | `student10@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `Supervised: Yes` |

---

## 📝 實作步驟

### 步驟 1：開機前 — 在 Apple 商務確認裝置序號
1. 使用管理員帳號登入 [business.apple.com](https://business.apple.com)。
2. 點選頂部選單 **「裝置」** > 左側側邊欄 **「庫存」**。
3. 在上方搜尋列輸入你手中實體 Mac 底部的 **序號**。
4. **確認結果**：確認該測試 Mac 序號已正確列出於清單中。

---

### 步驟 2：指派裝置至內建裝置管理服務
1. 在清單中勾選你的 Mac 裝置。
2. 點選上方操作列的 **「編輯 MDM 伺服器」** 或 **「指派」**。
3. 選擇 **「內建裝置管理服務」**（或講師指定的測試 MDM 伺服器）。
4. 點選繼續並確認指派成功。

---

### 步驟 3：建立與指派「預設集」
1. 導覽至左側選單 **「預設集 (Blueprints / Presets)」**。
2. 點選「+ 新增預設集」，命名為 **`商務部門-Mac`**。
3. 設定 Wi-Fi 自動連線設定、密碼安全性原則與必要企業 App。
4. 將此預設集指派給你的測試使用者群組（例如：`商務部門` 或你的學員帳號）。

---

### 步驟 4：Mac 開機 — 模擬裝置設定輔助程式
1. 將測試 Mac 開機，進入「設定輔助程式 (Setup Assistant)」。
2. 連線至現場 **Wi-Fi 網路**。
3. **觀察自動偵測到管理服務的神奇時刻**：
   - 聯網後，Mac 自動向 Apple 啟動伺服器查詢。
   - 螢幕自動彈出 **「遠端管理 (Remote Management)」** 畫面，顯示 *「[你的機構名稱] 可自動設定你的電腦」*。
4. 點選繼續，使用測試管理式 Apple 帳號登入（例如 `student01@mdm.idv.tw`）。
5. 等待設定檔與必要 App 在背景自動套用並進入桌面。

---

### 步驟 5：驗證管理狀態（3 大檢核點）

#### 🔍 檢核點 A：Mac 本機終端機檢驗（最推薦、最快速）
在 Mac 上開啟「終端機 (Terminal)」，執行以下指令：
```bash
sudo profiles status -type enrollment
```
**預期輸出**：
```
Enrolled via DEP: Yes
MDM server: https://...
Supervised: Yes
```

#### 🔍 檢核點 B：Mac「系統設定」確認
開啟 Mac「系統設定」>「隱私權與安全性」>「描述檔」，確認已安裝公司管理描述檔，並標註受機構管理。

#### 🔍 檢核點 C：Apple 商務後台確認
回到 Apple 商務「裝置」清單搜尋該序號，確認裝置狀態已更新為 **「已註冊 (Enrolled)」**。

---

## 🏆 結訓成果自動檢核

完成上述步驟後，請前往我們的檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

使用手機相機掃描 Mac 終端機顯示的 **`Enrolled via DEP: Yes`** 或 `Supervised: Yes`，系統確認通過後將立即頒發專屬結訓認證證書！
