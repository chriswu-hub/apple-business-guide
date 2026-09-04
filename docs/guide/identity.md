# 身分整合與 Managed Apple Account

## 什麼是受管理 Apple 帳號 (Managed Apple Account)呢？

受管理 Apple 帳號由企業組織建立與控管，與一般個人的 Apple 帳號主要差異在於：
- **所有權歸屬企業**：組織可隨時重設密碼或停用存取權。
- **專屬商業功能**：提供企業級 iCloud 儲存空間與協作權限。
- **隱私分離**：將企業公務資料與個人資料嚴格隔離。

---

## 同盟身分驗證 (Federated Authentication)

企業無需在 Apple Business 逐一建立帳號，可直接透過同盟身分驗證串接現有的企業 IdP (Identity Provider)：

- **Microsoft Entra ID (Azure AD)**
- **Google Workspace**

### 優點
- **SSO 單一登入**：員工直接以公司原本的 Email 與密碼登入 Apple 服務。
- **SCIM 自動同步**：新進員工自動建立 Managed Apple Account，離職員工自動註銷。
