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

### 什麼是管理式 Apple 帳號 (Managed Apple Account)？
受管理 Apple 帳號由企業組織建立與控管，與一般個人的 Apple 帳號主要差異在於：
- **所有權歸屬企業**：組織可隨時重設密碼、調整存取權限或停用帳號。
- **企業專屬功能**：提供企業級 iCloud 雲端協作、鑰匙圈管理與裝置設定無縫漫遊。
- **公私資料分離**：公務資料與個人資料嚴格隔離，離職時可一鍵清除企業資料。

---

### 同盟身分驗證 (Federated Authentication) 原理
企業無需手動在 Apple 商務逐一建立帳號，可直接將 Apple 商務與企業既有的 IdP（Identity Provider）串接：

- **Microsoft Entra ID (Azure AD)**
- **Google Workspace**

#### 優勢與效益：
- **SSO 單一登入**：員工直接以公司原本的 Microsoft 365 / Google 工作信箱與密碼登入 Apple 裝置與服務。
- **SCIM 目錄自動同步**：HR 或 IT 在 Entra ID 新增或停用員工時，Apple 商務會即時自動建立或註銷該帳號。

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
