# 網域和識別身分

本單元說明企業如何在 Apple 商務中新增並驗證自訂網域，並串接識別身分供應商（IdP）實現同盟身分驗證與目錄同步。

---

### 🎯 學習目標
- 能完成網域新增與驗證
- 理解聯合驗證（同盟身分驗證）的運作原理
- **能設定 Microsoft Entra ID 聯合驗證**
- **能設定從 Entra ID 同步使用者目錄**

---

## 3.1 網域管理

### 新增並驗證網域

在 Apple 商務中建立管理式 Apple 帳戶（Managed Apple Account）或啟用同盟驗證前，必須先證明機構擁有該網域名稱的所有權。

#### 💡 如何驗證網域？
為了證明擁有自訂網域，需要執行下列其中一項操作：

1. **同步已驗證的 IdP 網域**：  
   同步已由任何識別身分供應商（IdP）驗證的自訂網域，且該識別身分供應商支援「Apple 商務」（例如 Google Workspace 或 Microsoft Entra ID）。這可讓「Apple 商務」擷取所有通過使用驗證的網域。成功連線後，所有網域會在「Apple 商務」中顯示為已驗證。
2. **手動新增 TXT 記錄至 DNS**：  
   將文字 (TXT) 記錄手動新增至特定 DNS 伺服器設定。由於此檔案控制網域名稱，因此能夠將一行文字新增至檔案，即證明機構擁有該網域。Apple 提供此 TXT 記錄，其為機構專屬的一連串隨機字母與數字。  
   *例如*：`apple-domain-verification=0RaNdOm1LeTtErS2aNd3NuMbErS4`

---

### 🖼 網域手動驗證圖文步驟

#### 步驟 1：進入設定並點選新增網域
登入 Apple 商務後，依序點選右上角帳號選單「設定」> 左側「網域」，並在網域區塊點選 **「+」** 按鈕新增網域名稱：

<div class="step-image-container">
  <img src="/images/domain_step1_settings.png" alt="設定 > 網域 > 點選 +" class="step-image" />
</div>

---

#### 步驟 2：按下「驗證」按鈕
在已新增的網域名稱清單旁，點選紅框標示的 **「驗證」** 按鈕（請在 14 日內完成驗證）：

<div class="step-image-container">
  <img src="/images/domain_step2_verify_btn.png" alt="點選驗證按鈕" class="step-image" />
</div>

---

#### 步驟 3：在 DNS 新增 TXT 記錄並檢查
系統將彈出驗證視窗並產生專屬 TXT 記錄。前往 DNS 代管服務商（如 Cloudflare, GoDaddy, AWS Route 53 等）新增此 TXT 記錄，完成後點選「檢查記錄」：

<div class="step-image-container">
  <img src="/images/domain_step3_txt_record.png" alt="加入 TXT 記錄與檢查記錄" class="step-image" />
</div>

- **第 1 步 登入**：在瀏覽器新分頁登入你的 DNS 託管供應商，前往管理 DNS 設定。
- **第 2 步 加入 TXT 記錄**：新增 TXT 記錄，名稱填入 `@`，值填入系統提供的 `apple-domain-verification=...` 字串。
- **第 3 步 等待登記變更**：DNS 生效通常需要 15 分鐘（全球快取可能需要數小時），確認後點選「檢查記錄」即可完成驗證。

---

### 🔒 鎖定網域（防止其他機構使用）

鎖定網域後，**只能使用已驗證的網域建立管理式 Apple 帳號**。除非啟動「網域擷取」，否則此網域中無法建立非管理式（個人）Apple 帳號，且在啟用鎖定之前所建立的現有 Apple 帳號會保持原樣。此選項有助於確保日後所有使用該網域的帳號均為機構擁有。

#### 鎖定步驟：
1. 在「Apple 商務」中，以其職務有權檢視、編輯和刪除機構網域的使用者身分登入。
2. 登入 Apple 商務，依序選擇「設定」>「網域」。
3. 選取你要鎖定的網域，點選 **「管理」**：
   <div class="step-image-container">
     <img src="/images/domain_lock_step1_manage.png" alt="網域列表點選管理" class="step-image" />
   </div>
4. 開啟 **「鎖定網域」**（或同時開啟「使用 Microsoft Entra ID 登入」）：
   <div class="step-image-container">
     <img src="/images/domain_lock_step2_toggle.png" alt="開啟鎖定網域開關" class="step-image" />
   </div>

::: warning ⚠️【重要事項】
鎖定網域可**永久防止任何人使用該網域建立非管理式（個人）Apple 帳號**，且除非移除網域，否則無法關閉此功能。
:::

5. 確認後選取 **「完成 / 鎖定網域」**。

---

## 3.2 聯合驗證（同盟身分驗證）

### 概覽
你可以使用聯合驗證將「Apple 商務」連結到下列服務：
- **Google Workspace**
- **Microsoft Entra ID OpenID Connect（OIDC）全球服務**（`login.microsoftonline.com`）
- **任何使用 OIDC 或跨域身分管理系統 (SCIM) 的識別身分供應商 (IdP)**

---

### 聯合驗證搭配目錄同步
你也可以將 Google Workspace、Microsoft Entra ID 或 IdP 上的使用者帳號同步至「Apple 商務」。當你設定目錄同步連線時，你可以新增「Apple 商務」屬性（例如職務）至上述服務所輸入的使用者帳號資料。系統會以**唯讀形式**新增服務的使用者帳號資訊，直到你關閉同步為止。

---

::: tip ⭐️【知識補充】什麼是管理式 Apple 帳號 (Managed Apple Account)？
管理式 Apple 帳號由企業組織建立與控管，與一般個人的 Apple 帳號主要差異在於：
- **所有權歸屬企業**：組織可隨時重設密碼、調整存取權限或停用帳號。
- **企業專屬功能**：提供企業級 iCloud 雲端協作、鑰匙圈管理與裝置設定無縫漫遊。
- **公私資料分離**：公務資料與個人資料嚴格隔離，員工離職時可一鍵清除企業資料，確保資安合規。
:::

---

## 3.3 Microsoft Entra ID 聯合驗證設定（重點）

### 📋 圖文設定步驟：

#### 步驟 1：進入用戶登入與目錄同步並點選「連接」
在 Apple 商務中依序選擇「設定」>「網域」，在「用戶登入和目錄同步」區塊點選 **「連接」**：

<div class="step-image-container">
  <img src="/images/entra_step1_connect.png" alt="設定 > 網域 > 用戶登入和目錄同步 點選連接" class="step-image" />
</div>

---

#### 步驟 2：選擇身分識別供應商
在選擇身分識別供應商清單中，選取 **「Microsoft Entra ID」** 並點選「繼續」：

<div class="step-image-container">
  <img src="/images/entra_step2_select_idp.png" alt="選擇身分識別供應商 Microsoft Entra ID" class="step-image" />
</div>

系統會進入準備連結畫面：

<div class="step-image-container">
  <img src="/images/entra_step3_preparing.png" alt="準備連結 Microsoft Entra ID" class="step-image" />
</div>

點選 **「使用 Microsoft 登入」** 開始進行管理員授權：

<div class="step-image-container">
  <img src="/images/entra_step4_login_btn.png" alt="點選 使用 Microsoft 登入" class="step-image" />
</div>

---

#### 步驟 3：以 Entra ID 全域管理員身分授權並完成連線
在彈出的 Microsoft 登入視窗中，輸入 Entra ID 全域管理員（Global Administrator）認證：

<div class="step-image-container">
  <img src="/images/entra_step5_ms_login.png" alt="Microsoft 登入管理員帳號" class="step-image" />
</div>

檢視並勾選「代表您的組織同意」，點選 **「接受」** 要求的權限：

<div class="step-image-container">
  <img src="/images/entra_step6_permissions.png" alt="同意 Microsoft 要求權限" class="step-image" />
</div>

授權完成後，系統會顯示 **「已連接 Microsoft Entra ID」** 綠色打勾成功畫面，點選「繼續」即可完成網域聯合與目錄設定：

<div class="step-image-container">
  <img src="/images/entra_step7_connected.png" alt="已成功連接 Microsoft Entra ID" class="step-image" />
</div>

---

### 💡 關鍵概念：
- **企業憑證直登**：聯合驗證啟用後，使用者直接使用既有的 Entra ID 帳號密碼登入管理式 Apple 帳號。
- **完整支援 MFA**：原生支援 Microsoft Entra ID 端設定的多重要素驗證（MFA / Authenticator App / 條件式存取原則）。
- **密碼中心化管理**：所有密碼變更、忘記密碼重設均由 Entra ID 端集中管理，Apple 端不儲存企業密碼。

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
