# Lab 1: Microsoft Entra ID 聯合驗證與目錄同步實作

**預估時間：** 20 分鐘  
**實作目標：** 於 Microsoft Entra ID 建立新進員工帳號，透過 SCIM 自動同步至 Apple 商務，並以該帳號完成 SSO 登入驗證。

---

## 🎯 前置準備與座號分配

為避免多位學員在同一個租戶中發生帳號撞名衝突，本實作採用 **「學員專屬座號制 (Seat ID)」**。請根據講師分配的座號（`01` ~ `10`）進行設定：

| 座號 | 學員帳號 (UPN) | 顯示名稱 | 角色 |
| :--- | :--- | :--- | :--- |
| **學員 01** | `student01@mdm.idv.tw` | Student 01 | 一般員工 |
| **學員 02** | `student02@mdm.idv.tw` | Student 02 | 一般員工 |
| **學員 03** | `student03@mdm.idv.tw` | Student 03 | 一般員工 |
| **學員 04** | `student04@mdm.idv.tw` | Student 04 | 一般員工 |
| **學員 05** | `student05@mdm.idv.tw` | Student 05 | 一般員工 |
| **學員 06** | `student06@mdm.idv.tw` | Student 06 | 一般員工 |
| **學員 07** | `student07@mdm.idv.tw` | Student 07 | 一般員工 |
| **學員 08** | `student08@mdm.idv.tw` | Student 08 | 一般員工 |
| **學員 09** | `student09@mdm.idv.tw` | Student 09 | 一般員工 |
| **學員 10** | `student10@mdm.idv.tw` | Student 10 | 一般員工 |

---

## 📝 實作步驟

### 步驟 1：登入 Microsoft Entra 系統管理中心建立使用者
1. 開啟瀏覽器無痕視窗，前往 [entra.microsoft.com](https://entra.microsoft.com)。
2. 使用講師提供的 Entra ID 管理員帳號登入。
3. 依序點選左側選單 **「身分識別 (Identity)」** > **「使用者 (Users)」** > **「所有使用者」**。
4. 點選上方 **「+ 新增使用者」** > **「建立新使用者」**：
   - **使用者主體名稱 (UPN)**：輸入你的座號名稱（例如 `student01`），網域下拉選單選擇 `@mdm.idv.tw`
   - **電子郵件暱稱**：`student01`
   - **顯示名稱**：`Student 01 - Apple at Work`
   - **密碼**：取消勾選「自動產生密碼」，設定自訂密碼並請牢記此密碼。
5. 點選 **「檢閱並建立」** 完成帳號新增。

---

### 步驟 2：觸發「隨選佈建 (Provision on Demand)」即時推送
::: tip 💡 為什麼要使用隨選佈建？
Microsoft Entra ID 的排程目錄同步預設為每 40 分鐘執行一次循環。為了在培訓中即時驗證成果，我們使用「隨選佈建 (Provision on Demand)」功能，實現 5 秒內精準推送單一使用者！
:::

1. 在 Entra 系統管理中心，點選左側選單 **「應用程式 (Applications)」** > **「企業應用程式 (Enterprise applications)」**。
2. 在清單中點選 **「Apple Business Manager / Apple 商務」** 應用程式。
3. 點選左側選單中的 **「佈建 (Provisioning)」**。
4. 點選上方工具列的 **「隨選佈建 (Provision on demand)」**：
   - 在搜尋框中輸入你的帳號：`studentXX@mdm.idv.tw`（例如 `student01@mdm.idv.tw`）
   - 點選選取該使用者，然後點選下方的 **「佈建 (Provision)」** 按鈕。
5. 觀察執行流程：當畫面出現 **4 個綠色打勾（確定動作、匯入使用者、符合使用者、建立使用者完成）**，代表帳號已即時寫入 Apple 商務！

---

### 步驟 3：在 Apple 商務中驗證使用者目錄同步
1. 前往 [business.apple.com](https://business.apple.com) 並登入。
2. 點選左側選單的 **「人員 (Users)」**。
3. 在上方搜尋列輸入你的帳號（例如 `student01`）。
4. **驗證檢核點**：
   - 該使用者已自動出現於人員清單中。
   - 職務自動指派為「員工 (Staff)」。
   - 帳號來源標註為 **「Microsoft Entra ID (已同步)」**。

---

### 步驟 4：SSO 單一登入與身分驗證測試
1. 開啟一個全新的「私密瀏覽視窗 / 無痕分頁」。
2. 前往 Apple 登入入口或企業服務登入頁面。
3. 輸入你的學員帳號：`studentXX@mdm.idv.tw` 並點選繼續。
4. **觀察轉址行為**：
   - 系統會辨識該網域已啟用聯合驗證，並**自動跳轉至 Microsoft 組織登入畫面**。
5. 輸入你在步驟 1 設定的密碼，確認能順利通過驗證並登入！

---

## 🏆 結訓成果檢核

完成上述 4 個步驟後，請前往我們的檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

開啟相機掃描螢幕上顯示的登入帳號（例如 `student01@mdm.idv.tw`）或完成畫面，系統確認通過後將自動為你生成專屬數位結訓證書！
