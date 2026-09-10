# App 部署與訂閱管理

本單元探討企業如何在 Apple 商務中透過大量採購（Volume Purchase）取得並分發軟體許可、解析「裝置指派」與「使用者指派」的本質差異、Microsoft 365 混合環境的軟體分發組合，以及企業帳單與付款管理實務。

---

### 🎯 學習目標
- 能大量取得和部署 App
- 理解 App 許可模式（裝置 vs 使用者指派）
- 能設定與管理機構的帳單與付款方式

---

## 7.1 App 及服務

在 Apple 商務的「App 及服務」專區，企業可集中統一採購 App Store 上的免費或付費軟體許可（Volume Purchase / 原 VPP）：

- **大量採購（Volume Purchase）**：  
  即使是免費 App（如 Microsoft Teams、OneDrive、Outlook），企業也需在 Apple 商務後台採購「0 元許可（如購買 500 套）」，以取得合法的批次部署授權權限。
- **兩大核心指派方式**：
  - **裝置指派 (Device-based Assignment)**：  
    將 App 許可直接綁定在特定設備的硬體序號上。**使用者完全不需要登入個人 Apple 帳號，設備即可在背景自動靜默下載並安裝 App**，非常適合企業公發電腦與專職設備。
  - **使用者指派 (User-based Assignment)**：  
    將 App 許可綁定在員工的管理式 Apple 帳號上。App 授權會隨該使用者跨設備漫遊（例如同時在員工的 Mac、iPad 與 iPhone 上使用該許可）。
- **許可可撤銷並重新指派 (Reclaimable Licenses)**：  
  所有採購的軟體許可所有權皆歸屬於**機構**。當員工離職或裝置歸還時，IT 人員可隨時將授權自該裝置/帳號撤銷回收，並立即重新分發給新進員工，保護企業軟體資產。
- **自訂 App (Custom Apps)**：  
  企業內部自行開發或由委外協力廠商客製的 B2B 私有 App，可透過 App Store Connect 專屬分發至企業的 Apple 商務後台，無需公開上架至公共 App Store，兼具隱私與安全性。

---

### 🛒 大量取得與分派 App 圖文步驟

#### 步驟 1：進入「App 及服務」並點選「檢視商店」
登入 Apple 商務後，點選頂部導覽列 **「App 及服務」**，在左側「App」頁面中央會看到「取得 App 和自訂 App」，點選藍色按鈕 **「檢視商店」**：

<div class="step-image-container">
  <img src="/images/vpp_step1_nav.png" alt="點選頂部 App 及服務並進入檢視商店" class="step-image" />
</div>

---

#### 步驟 2：搜尋欲採購之 App 並選擇分派機構單位
在商店左側搜尋列輸入欲採購的軟體名稱（例如輸入 `One` 搜尋 `OneDrive`），選取該 App 後，於右側「購買許可證」的「分派予」下拉選單中**選擇目標機構單位（例如你的公司組織）**：

<div class="step-image-container">
  <img src="/images/vpp_step2_search_assign.png" alt="搜尋 OneDrive 並選擇分派機構單位" class="step-image" />
</div>

---

#### 步驟 3：輸入採購數量並點選「取得」
在「數量」欄位輸入企業預計採購或分發的授權套數（例如輸入 `10` 套，免費 App 總計金額為 NT$0.00），確認無誤後點選右側藍色按鈕 **「取得」**：

<div class="step-image-container">
  <img src="/images/vpp_step3_quantity_get.png" alt="輸入數量並點選取得許可證" class="step-image" />
</div>

::: tip 💡【授權即時入庫】
按下「取得」後，該軟體許可證會即時出現在 Apple 商務後台庫存與 MDM 系統中。接著即可前往「藍圖」將該 App 加入並自動推送至受管裝置！
:::

---

## 7.2 App 安裝設定

透過 Apple 商務與 MDM 協同運作，管理員可自訂軟體在員工端呈現的行為方式：

- **自動安裝 vs 使用者自行下載**：
  - **自動安裝 (Automatic / Silent Push)**：員工開機或連網後，系統在背景無感自動下載安裝，員工一進入桌面即可立即工作。
  - **使用者自行下載 (Self-Service On-Demand)**：將非必要或選裝軟體上架於公司的「自助式服務 (Self-Service)」入口，供使用者依業務需求自行點擊安裝。
- **強制安裝（禁止刪除）**：  
  在受監管（Supervised）的裝置上，管理員可設定讓必要 App 成為系統常駐應用程式，**員工無權私自將其解除安裝或移除**（如公司防毒 Agent、資安監控或通訊工具）。
- **透過預設集 / 藍圖指派 App**：  
  將常用軟體套裝打包進特定部門的「藍圖」中（例如：業務部門藍圖綁定 CRM App；工程部門藍圖綁定開發工具），當裝置或使用者被指派該藍圖時，所屬 App 清單將自動同步推送。

---

## 7.3 常見 M365 環境 App 部署清單

針對以 Microsoft 365 為核心工作生態系之企業，推薦採用的軟體分發策略：

| 應用程式 (App) | 部署方式 | 實務配置重點 |
| :--- | :--- | :--- |
| **Microsoft Outlook** | 透過 Apple 商務 App 許可 | **自動安裝**（預先配置公司 Exchange / M365 信箱設定檔） |
| **Microsoft Teams** | 透過 Apple 商務 App 許可 | **自動安裝**（企業即時通訊與會議標準工具） |
| **Microsoft Word / Excel / PowerPoint** | 透過 Apple 商務 App 許可 | **使用者選裝 / 批次自動安裝**（支援雲端協作編輯） |
| **OneDrive** | 透過 Apple 商務 App 許可 | **自動安裝**（自動同步企業個人雲端硬碟，落實文件備份） |
| **公司入口網站 App (Intune Company Portal)** | 自訂 App 或 App Store 許可 | **視架構需求安裝**（用於裝置合規性回報與條件式存取驗證） |

---

## 7.4 訂閱管理

### 帳單與付款管理

在 Apple 商務中，管理員可集中管理機構的付款方式與歷史採購紀錄：

1. **進入付款與帳單**：登入 Apple 商務，點選右上角帳號選單「設定」> 左側選單「付款與帳單」。
2. **付款方式**：
   - **共享付款方式**：可用於機構內的任何人使用，由機構統一支付 App 或服務購買項目。
   - **個人付款方式**：供管理者個人專用。
3. **購買紀錄**：可切換至「購買紀錄」標籤頁，集中檢視所有 App 採購明細、訂單編號與下載官方發票。

<div class="step-image-container">
  <img src="/images/billing_payment_settings.png" alt="設定 > 付款與帳單 介面截圖" class="step-image" />
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
