# 註冊與機構設定

本單元說明企業申請 Apple 商務的必備條件、審核註冊流程以及多機構單位管理與經銷商採購綁定實務。

---

## 📋 申請 Apple 商務前置需求

在開始申請 Apple 商務組織帳號前，請務必先備齊以下核心資訊：

- **D-U-N-S 編號**：鄧白氏環球編碼（D&B D-U-N-S Number），用於確認企業法人的合法註冊身分。
- **具法律約束力之聯絡人**：需提供具備代表公司簽署具約束力合約主管（如 IT 總監、法務或執行主管）的姓名與公務電子郵件。
- **組織官方網域名稱 (Domain)**：例如 `yourcompany.com`，供後續驗證網域所有權並建立管理式 Apple 帳號（Managed Apple Account）。
- **Apple 帳號**：尚未綁定任何個人 iCloud 服務的全新公務 Apple 帳號作為初始管理員。

---

## 🔄 註冊流程

```
business.apple.com → 填寫資訊 → 驗證機構(兩種方式，最多5天) → 審核完成 → 開始設定
```

### 步驟 1：前往官網與點選註冊
瀏覽 [business.apple.com](https://business.apple.com)，在登入畫面下方點選 **「立即註冊」**：

<div class="step-image-container">
  <img src="/images/step1_landing.png" alt="Apple Business 登入與立即註冊" class="step-image" />
</div>

---

### 步驟 2：加入機構詳細資料
填寫組織的基本登記資訊（包含機構名稱、商戶電郵、網站、國家/地區及登記地址）：

<div class="step-image-container">
  <img src="/images/step2_organization.png" alt="加入機構詳細資料" class="step-image" />
</div>

---

### 步驟 3：建立管理式 Apple 帳戶
點選「下一步」後，建立首位管理員的 **管理式 Apple 帳戶**（填寫姓名、公務電郵、密碼以及接收驗證碼的手機號碼）：

<div class="step-image-container">
  <img src="/images/step3_account.png" alt="建立管理式 Apple 帳戶" class="step-image" />
</div>

---

### 步驟 4：驗證你的機構
你有 **60 天** 的時間向 Apple 驗證機構。驗證方式有兩種，**都需要進行**；完成驗證程序最多可能需要 **5 個工作天**。在案件量高的時期，可能需要更長的時間。

1. 登入 Apple 商務中，依序選擇「設定」>「機構」。
   <div class="step-image-container">
     <img src="/images/step4_verify_org.png" alt="Apple 商務設定與機構驗證" class="step-image" />
   </div>
2. 選取**「立即驗證」**。
3. 選擇第一種驗證方式：
   - **企業 ID**：D‑U‑N‑S 編號或雇主識別號碼（EIN）。請參閱〈接受的企業 ID 類型〉。
   - **網域驗證**：新增 TXT 記錄至你的 DNS 伺服器。請參閱〈新增並驗證網域〉。
   - **App Store Connect**（不適用於第三方合作夥伴或代理機構）：選擇與你機構相關聯的 App。
   - **請上傳下列其中一種官方文件**：
     - 營業執照
     - 銷售稅許可證
     - 食品、衛生或酒類營業許可
     - 租賃或財產協議
     - 水電瓦斯帳單
     - 其他
4. 請重複此流程，**執行另一種驗證方式**。
5. 選取**「提交審核」**。

---

## 🏢 機構單位（Locations）

**機構單位** 允許企業依**部門**或**地理地點**劃分管理範圍：

- **彈性授權**：為不同辦公室（例如：台北總部、台中分部）或部門建立獨立機構單位。
- **分散式管理**：為特定地點指派「地點管理員 (Location Manager)」，使其僅能管理該地點的 App 授權庫存與裝置。
- **資產隔離**：不同機構單位可獨立採購專屬的 Apps 與內容。

---

## 🔗 經銷商綁定 (Reseller ID)

為了讓未來採購的 Mac、iPad、iPhone 能在出貨時自動同步進入 Apple 商務庫存：

1. **取得經銷商編號**：向合作的 Apple 授權經銷商索取其 **Reseller ID（經銷商編號）** 或 **Apple 顧客編號 (Apple Customer Number)**。
2. **後台新增綁定**：在 Apple 商務後台進入「偏好設定」>「MDM 伺服器指派 / 裝置管理設定」，加入經銷商編號。
3. **提供組織識別碼**：提供企業的 **Organization ID（組織 ID）** 給經銷商以完成雙向認證。
4. **自動同步**：後續每筆採購訂單只要經銷商完成入庫，序號將即時同步至 Apple 商務。

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
</style>
