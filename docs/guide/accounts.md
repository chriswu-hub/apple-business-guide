# 管理式 Apple 帳號與使用者管理

本單元深入探討企業專屬「管理式 Apple 帳號 (Managed Apple Account)」的架構、與個人帳號的本質差異、使用者與群組的管理策略，以及組織內部權限分工體系。

---

### 🎯 學習目標
- 理解管理式 Apple 帳號 vs 個人 Apple 帳號的差異
- 能建立和管理使用者與群組
- 理解職務與權限架構

---

## 4.1 管理式 Apple 帳號

管理式 Apple 帳號（Managed Apple Account）是專為企業、教育機構設計的公務身分：

- **機構專屬所有權**：帳號由機構擁有和管理，企業具備完全的生命週期控制權。
- **標準化格式**：`使用者名稱@公司網域`（例如：`alex.chen@yourcompany.com`）。
- **無縫單一登入 (SSO)**：透過聯合驗證直接使用 Microsoft Entra ID 或 Google Workspace 憑證登入。
- **精細化服務存取控管**：IT 管理員可自訂該帳號是否可使用 FaceTime、iMessage、iCloud 雲碟分享等功能。

---

## 4.2 管理式 vs 個人 Apple 帳號

在推動企業 Apple 部署時，釐清兩種帳號的定位與權限邊界是資安治理的第一步：

| 特性 | 管理式 Apple 帳號 (Managed Apple Account) | 個人 Apple 帳號 (Personal Apple Account) |
| :--- | :--- | :--- |
| **擁有者** | **機構**（公司法人） | **個人**（員工私人） |
| **密碼管理** | 透過企業 IdP (如 Entra ID) 統一管控與重設 | 使用者自行管理與重設 |
| **iCloud 儲存** | 機構統一配置（可達最高 2TB/人） | 個人付費購買或免費 5GB |
| **App Store** | 僅能下載機構透過 MDM / VPP 指派的 App | 完整自由存取與個人購買 |
| **資料管控** | 機構有權遠端清除公務資料與鎖定 | 機構無權存取與清除 |

::: tip ⭐️【資安治理最佳實踐】
透過將公務帳號限制為「管理式 Apple 帳號」，企業可確保所有商業機密、聯絡人與公務文檔均留在企業管理的 iCloud 容器內，離職員工無法將資產帶走。
:::

---

## 4.3 使用者與群組管理

Apple 商務提供彈性的使用者與群組維護方式：

- **手動新增使用者（適合小規模）**：  
  在「人員」頁面手動建立個別使用者，指派角色並寄發登入邀請，適合小型團隊或外部顧問。
- **透過 Entra ID / IdP 同步（適合大規模）**：  
  利用 SCIM 自動目錄同步，當 HR 系統於 Entra ID 建立員工時，Apple 商務自動同步生成帳號，離職時自動停用。
- **使用者群組劃分**：  
  可依**部門**（如業務部、研發部）、**地點**（如台北總部、台中分部）、或**職能/專案**進行彈性分組。
- **群組主要用途**：  
  - 批量指派大量購買的 App 及服務。
  - 套用專屬的裝置預設集與組態設定檔。

---

## 4.4 職務與權限

Apple 商務支援嚴謹的角色型存取控制 (RBAC)，依據管理範疇劃分了完整的官方職務體系，避免單一管理員權限過大：

<div class="step-image-container double-image">
  <img src="/images/role_permissions_part1.png" alt="Apple 商務職務清單：機構管理員、IT 管理員、市場推廣管理員、廣告管理員、職員" class="step-image" />
  <img src="/images/role_permissions_part2.png" alt="Apple 商務職務清單：成員經理、裝置註冊經理、內容經理、職員" class="step-image" />
</div>

| 官方職務 | 權限範圍說明 | 適用角色 |
| :--- | :--- | :--- |
| **機構管理員** | 可管理及分派 Apple Business 的所有功能，包括同意條款及細則。擁有機構全部最高權限。 | IT 總監、系統架構主管 |
| **IT 管理員** | 可以管理成員、裝置，以及 App 和書籍的許可證。如要限制 IT 管理員可以管理的成員和許可證，可將其分派至機構單位。 | 企業系統管理員、IT 維運主管 |
| **市場推廣管理員** | 可以管理已分派的品牌、地點及相關功能；亦可邀請用戶並管理已共享的取用權限。 | 品牌行銷經理、公關主管 |
| **廣告管理員** | 可在「地圖」上為你機構的品牌建立和管理廣告。可邀請和管理其他廣告管理員。 | 行銷企劃、數位廣告專員 |
| **成員經理** | 負責特定機構單位。他們可獲分派至任何機構單位，管理個別人士和內容。 | 部門主管、分部管理員 |
| **裝置註冊經理** | 管理裝置和裝置管理服務。負責硬體庫存納管與指派。 | 桌面端 IT、硬體資產管理員 |
| **內容經理** | 負責特定機構單位的大量採購事宜。他們可獲分派至任何機構單位，管理 App 的許可證。 | 軟體採購專員、資產管理專員 |
| **職員** | 員工可使用由你機構管理的 Apple 裝置和服務，但無法登入 Apple Business 後台。 | 一般企業員工、終端使用者 |

<style>
.step-image-container {
  margin: 1.5rem 0;
  text-align: center;
}
.double-image {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.double-image .step-image {
  max-width: 380px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}
</style>
