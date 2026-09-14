# Lab 1: Microsoft Entra ID 聯合驗證與目錄同步實作

**預估時間：** 20 分鐘  
**實作目標：** 於 Microsoft Entra ID 建立新進員工帳號，透過 SCIM 自動同步至 Apple 商務，並以該帳號完成 SSO 登入驗證。

---

## 🎯 前置準備與學員座號總表

為避免多位學員在同一個租戶中發生帳號撞名衝突，整個實體工作坊（Lab 1 至 Lab 5）全面採用 **「學員專屬座號制 (Seat ID)」**。請根據現場講師分配的座號（`01` ~ `10`），核對你專屬的帳號與模擬職務：

<div class="env-info-grid">
  <div class="env-info-card">
    <div class="env-info-label">組織網域 (Domain)</div>
    <div class="env-info-val">mdm.idv.tw</div>
  </div>
  <div class="env-info-card">
    <div class="env-info-label">身分識別核心 (IdP)</div>
    <div class="env-info-val">Microsoft Entra ID</div>
  </div>
  <div class="env-info-card">
    <div class="env-info-label">管理平台 (Console)</div>
    <div class="env-info-val">business.apple.com</div>
  </div>
</div>

| 座號 | 學員帳號 (UPN) | 模擬職位與部門 | 初始密碼 | 目標藍圖 | 實體設備 |
| :---: | :--- | :--- | :---: | :---: | :---: |
| <span class="seat-pill">Seat 01</span> | `student01@mdm.idv.tw` | **陳志豪** · <span class="dept-tag sales">業務部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #01 |
| <span class="seat-pill">Seat 02</span> | `student02@mdm.idv.tw` | **林美玲** · <span class="dept-tag mkt">行銷部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #02 |
| <span class="seat-pill">Seat 03</span> | `student03@mdm.idv.tw` | **張家榮** · <span class="dept-tag dev">研發部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #03 |
| <span class="seat-pill">Seat 04</span> | `student04@mdm.idv.tw` | **王雅婷** · <span class="dept-tag hr">人資部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #04 |
| <span class="seat-pill">Seat 05</span> | `student05@mdm.idv.tw` | **李冠宇** · <span class="dept-tag sales">業務部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #05 |
| <span class="seat-pill">Seat 06</span> | `student06@mdm.idv.tw` | **吳佩璇** · <span class="dept-tag mkt">行銷部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #06 |
| <span class="seat-pill">Seat 07</span> | `student07@mdm.idv.tw` | **許晉瑋** · <span class="dept-tag dev">研發部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #07 |
| <span class="seat-pill">Seat 08</span> | `student08@mdm.idv.tw` | **黃詩涵** · <span class="dept-tag fin">財務部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #08 |
| <span class="seat-pill">Seat 09</span> | `student09@mdm.idv.tw` | **楊承翰** · <span class="dept-tag ops">營運部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #09 |
| <span class="seat-pill">Seat 10</span> | `student10@mdm.idv.tw` | **劉怡君** · <span class="dept-tag it">資訊部</span> | `Apple@2026Lab` | 商務部門-Mac | 實體 Mac #10 |

::: info 💡【全場權威名冊】
本大表為本次實體工作坊之全場權威分配表。後續所有實作任務（Lab 2 自動註冊、Lab 3 安全性藍圖、Lab 4 App 部署與 Lab 5 自訂套件）均直接沿用你在上方分配的專屬座號！
:::

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
   - **密碼**：取消勾選「自動產生密碼」，設定自訂密碼（請牢記此密碼，建議使用表格中的 `Apple@2026Lab`）。
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

## 🏆 結訓成果自動檢核

完成上述 4 個步驟後，請前往我們的檢核專區：

👉 [前往「實作檢核與結訓認證」頁面](/guide/verify)

開啟相機掃描螢幕上顯示的登入帳號（例如 `student01@mdm.idv.tw`）或完成畫面，系統確認通過後將自動為你生成專屬數位結訓證書！

<style>
.env-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.env-info-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}

.env-info-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.env-info-val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: #0071e3;
}
.dark .env-info-val {
  color: #60a5fa;
}

.seat-pill {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 10px;
  background: #eff6ff;
  color: #0071e3;
  font-family: var(--vp-font-family-mono);
}
.dark .seat-pill {
  background: #1e293b;
  color: #60a5fa;
}

.dept-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
}
.dept-tag.sales { background: #fee2e2; color: #b91c1c; }
.dept-tag.mkt { background: #fef3c7; color: #b45309; }
.dept-tag.dev { background: #ede9fe; color: #6d28d9; }
.dept-tag.hr { background: #fce7f3; color: #be185d; }
.dept-tag.fin { background: #ecfccb; color: #4d7c0f; }
.dept-tag.ops { background: #e0f2fe; color: #0369a1; }
.dept-tag.it { background: #dcfce7; color: #15803d; }

.dark .dept-tag.sales { background: #450a0a; color: #fca5a5; }
.dark .dept-tag.mkt { background: #451a03; color: #fcd34d; }
.dark .dept-tag.dev { background: #2e1065; color: #c4b5fd; }
.dark .dept-tag.hr { background: #500724; color: #f472b6; }
.dark .dept-tag.fin { background: #1a2e05; color: #bef264; }
.dark .dept-tag.ops { background: #082f49; color: #7dd3fc; }
.dark .dept-tag.it { background: #052e16; color: #86efac; }
</style>
