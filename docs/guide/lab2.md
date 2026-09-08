# Lab 2: 裝置自動註冊與零接觸部署模擬

**預估時間：** 20 分鐘  
**實作目標：** 在 Apple 商務後台確認分配到的 Mac 序號，指派管理服務與藍圖，接著將 Mac 開機連網，體驗零接觸自動下載描述檔與受監管（Supervised）部署流程。

---

## 🎯 前置準備（學員座號與設備序號對照）

每位學員拿到一台已預先透過 Configurator 加入 Apple 商務的實體 Mac。請先確認外殼底部的 **Mac 序號 (Serial Number)**：

| 座號 | 分配學員帳號 | 目標藍圖 | 驗證檢核點 |
| :--- | :--- | :--- | :--- |
| **學員 01** | `student01@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 02** | `student02@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 03** | `student03@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 04** | `student04@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 05** | `student05@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 06** | `student06@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 07** | `student07@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 08** | `student08@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 09** | `student09@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |
| **學員 10** | `student10@mdm.idv.tw` | 商務部門-Mac | `Enrolled via DEP: Yes` / `MDM enrollment: Yes (User Approved)` |

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
2. 點選上方操作列的 **「裝置」**。
3. 選擇 **「庫存」**。
4. 點選繼續並確認指派成功。

---

### 步驟 3：建立與指派「藍圖 (Blueprints)」
1. 導覽至左側選單「裝置」>「內置管理」> 點選 **「藍圖」**，點選藍圖旁的 **「+」**（新增藍圖）：
   <div class="step-image-container">
     <img src="/images/blueprint_step1_plus.png" alt="點選藍圖旁的+新增藍圖" class="step-image" />
   </div>

2. 在建立藍圖選單中，選擇 **「用戶裝置藍圖」**（使用建議預設設定來管理用戶裝置），點選「繼續」：
   <div class="step-image-container">
     <img src="/images/blueprint_step2_select_type.png" alt="建立藍圖選擇用戶裝置藍圖" class="step-image" />
   </div>

3. 將藍圖名稱命名為 **`商務部門-Mac`**：
   <div class="step-image-container">
     <img src="/images/blueprint_step3_config.png" alt="藍圖命名商務部門-Mac與設定" class="step-image" />
   </div>

4. **設定藍圖組態與用戶**：
   - 設定 **用户裝置藍圖 Wi-Fi**、**密碼規則 - 強制執行** 與 **軟件更新 - 自動**。
   - **App**：稍後設定即可。
   - **用戶**：點選「+ 加入用戶」，加入自己的帳號（例如：你的學員帳號 `studentXX@mdm.idv.tw`）。
   - 完成後點選右下角 **「建立藍圖」**。

---

### 步驟 4：從建立的藍圖中加入裝置
1. 點選剛剛建立的 **「商務部門-Mac」** 藍圖，切換至 **「裝置」** 標籤頁，點選右側的 **「加入」** 按鈕：
   <div class="step-image-container">
     <img src="/images/lab2_step3_add_device_btn.png" alt="商務部門-Mac藍圖 > 裝置標籤頁 > 點選加入" class="step-image" />
   </div>

2. 在「加入裝置」彈出視窗中，搜尋並勾選**學員手中該台 Mac 序號**的裝置：
   <div class="step-image-container">
     <img src="/images/lab2_step3_select_device_dialog.png" alt="加入裝置視窗中勾選學員Mac裝置" class="step-image" />
   </div>

3. 確認勾選「自動批准已加入此藍圖的裝置的首次註冊」，點選右下角 **「加入」** 完成綁定與儲存！

---

### 步驟 5：Mac 開機 — 模擬裝置設定輔助程式
1. 將測試 Mac 開機，進入「設定輔助程式 (Setup Assistant)」，在「將你的資料移轉到此 Mac 上」的步驟時選擇 **「設定為新裝置即可」**。
2. 連線至現場 **Wi-Fi 網路**。

::: tip ✨【驚奇時刻：自動偵測到裝置管理服務】
聯網後，Mac 會自動向 Apple 啟動伺服器查詢並接收雲端指派！  
螢幕自動彈出 **「裝置管理」** 畫面，顯示 **「[你的機構名稱] 允許此組織管理此 Mac 的設定」**！
:::

3. 點選 **「註冊」**：
   - 🔍 **請觀察！** 此時左下角會顯示 **「正在安裝註冊描述檔」**。
4. **建立 Mac 帳號**：
   - 自行設置全名與密碼，建議設定：
     - **全名**：`studentXX`（例如 `student01`）
     - **密碼**：`admin`
   - 按下「繼續」後，🔍 **請觀察！** 左下角會顯示 **「正在建立帳號」**。
5. **進入系統**：
   - 在「檔案保險箱 (FileVault)」步驟時可選擇 **「稍後再說」**。
   - 等待設定檔與必要 App 在背景自動套用並順利進入桌面！

---

### 步驟 6：驗證管理狀態（3 大檢核點）

#### 🔍 檢核點 A：Mac 本機終端機檢驗（最推薦、最快速）
在 Mac 上開啟「終端機 (Terminal)」，執行以下指令：
```bash
sudo profiles status -type enrollment
```
**預期輸出**：
```
Enrolled via DEP: Yes
MDM enrollment: Yes (User Approved)
MDM server: https://...
```

#### 🔍 檢核點 B：Mac「系統設定」確認
開啟 Mac「系統設定」>「一般」>「裝置管理」，確認已安裝公司管理描述檔，並標註**「此 Mac 是由機構監管與管理」**。

#### 🔍 檢核點 C：Apple 商務後台確認
回到 Apple 商務「裝置」點選「庫存」搜尋該序號，確認裝置狀態已變更：

<div class="step-image-container">
  <img src="/images/lab2_step6_verified_inventory.png" alt="Apple 商務後台確認裝置狀態已變更" class="step-image" />
</div>

::: tip 🔍【請觀察有何變化！】
- 右側面板已顯示該 Mac 的詳細資訊（包含 macOS 版本 `26.6.2`、上次見於時間）。
- 出現了 **「鎖定裝置」**、**「從機構釋出」** 等完整的遠端 MDM 管理控制按鈕！
- 狀態區塊可即時檢視防火牆、檔案保險箱與啟動鎖的配置狀態。
:::

---

## 🏆 結訓成果自動檢核

完成上述步驟後，請前往我們的檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

使用手機相機掃描 Mac 終端機顯示的 **`Enrolled via DEP: Yes`** 或 `Supervised: Yes`，系統確認通過後將立即頒發專屬結訓認證證書！

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
