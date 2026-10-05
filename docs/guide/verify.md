# 實作檢核與結訓認證

恭喜你完成了 Apple Business、自動裝置註冊 (ADE) 與 MDM 安全管理的完整學習！

本頁面整合了 **「受管 Safari 書籤自動認證」** 機制。當你的 Mac 成功接收由 Apple 商務藍圖派送的自訂描述檔（Web Clip）後，只需從 Safari 點擊該書籤，即可自動解鎖專屬數位結訓證書！

---

<script setup>
import { ref, onMounted, computed } from 'vue'

const students = [
  { seat: '01', name: '陳志豪', dept: '業務部', email: 'student01@mdm.idv.tw', device: '實體 Mac #01' },
  { seat: '02', name: '林美玲', dept: '行銷部', email: 'student02@mdm.idv.tw', device: '實體 Mac #02' },
  { seat: '03', name: '張家榮', dept: '研發部', email: 'student03@mdm.idv.tw', device: '實體 Mac #03' },
  { seat: '04', name: '王雅婷', dept: '人資部', email: 'student04@mdm.idv.tw', device: '實體 Mac #04' },
  { seat: '05', name: '李冠宇', dept: '業務部', email: 'student05@mdm.idv.tw', device: '實體 Mac #05' },
  { seat: '06', name: '吳佩璇', dept: '行銷部', email: 'student06@mdm.idv.tw', device: '實體 Mac #06' },
  { seat: '07', name: '許晉瑋', dept: '研發部', email: 'student07@mdm.idv.tw', device: '實體 Mac #07' },
  { seat: '08', name: '黃詩涵', dept: '財務部', email: 'student08@mdm.idv.tw', device: '實體 Mac #08' },
  { seat: '09', name: '楊承翰', dept: '營運部', email: 'student09@mdm.idv.tw', device: '實體 Mac #09' },
  { seat: '10', name: '劉怡君', dept: '資訊部', email: 'student10@mdm.idv.tw', device: '實體 Mac #10' },
]

const isVerified = ref(false)
const selectedSeat = ref('01')
const verifySource = ref('')
const verifyTime = ref('')

const currentStudent = computed(() => {
  return students.find(s => s.seat === selectedSeat.value) || students[0]
})

const verifyCode = computed(() => {
  return `ABM-2026-SEAT${selectedSeat.value}-PASS`
})

onMounted(() => {
  verifyTime.value = new Date().toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const source = params.get('source')
    const seat = params.get('seat')
    const verified = params.get('verified')

    if (seat) {
      const padSeat = seat.toString().padStart(2, '0')
      if (students.some(s => s.seat === padSeat)) {
        selectedSeat.value = padSeat
      }
    }

    // 方案 1: 偵測到來自受管書籤（source 為 mdm / profile / webclip 或 verified=true）
    if (source === 'mdm' || source === 'profile' || source === 'webclip' || verified === 'true') {
      isVerified.value = true
      verifySource.value = 'Apple 商務藍圖 (APNs WebClip Profile)'
    }
  }
})

function manualVerify(seat) {
  selectedSeat.value = seat
  isVerified.value = true
  verifySource.value = '講師快速認證 (Manual Overwrite)'
}

function printCertificate() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<!-- 狀態 1：尚未透過受管書籤連線 -->
<div v-if="!isVerified" class="verify-waiting-card">
  <div class="status-icon-bubble waiting">
    🔒
  </div>
  <div class="waiting-title">等待 Apple 商務受管設備點擊通關</div>
  <p class="waiting-desc">
    系統尚未偵測到來自 Apple 商務藍圖派送的專屬書籤憑證。<br>
    請在已完成藍圖配置的測試 Mac 上，打開 <strong>Safari</strong> 並點選派送的 <strong>「Apple Business 實務指南」</strong> 書籤進站！
  </p>

  <div class="steps-guide">
    <div class="guide-item">
      <span class="step-num">1</span>
      <div>確認藍圖中已加入<strong>自訂設定 (.mobileconfig)</strong></div>
    </div>
    <div class="guide-item">
      <span class="step-num">2</span>
      <div>於測試 Mac 打開 Safari 書籤列點擊連結</div>
    </div>
    <div class="guide-item">
      <span class="step-num">3</span>
      <div>自動識別座號並解鎖個人化結訓證書</div>
    </div>
  </div>

  <div class="demo-bar">
    <span class="demo-label">現場講師 Demo 或備用通關：</span>
    <select v-model="selectedSeat" class="seat-select" @change="manualVerify(selectedSeat)">
      <option v-for="s in students" :key="s.seat" :value="s.seat">
        Seat {{ s.seat }} - {{ s.name }} ({{ s.dept }})
      </option>
    </select>
    <button class="action-btn-manual" @click="manualVerify(selectedSeat)">手動通關解鎖</button>
  </div>
</div>

<!-- 狀態 2：方案 1 + 方案 2 雙重通過（噴出專屬證書） -->
<div v-else class="certificate-wrapper">
  <!-- 成功通關提示 Banner -->
  <div class="success-banner">
    <div class="success-title">
      <span class="check-badge">✓</span>
      MDM 受管裝置通關成功！
    </div>
    <div class="success-meta">
      驗證通道：{{ verifySource }} ｜ 檢核座號：Seat {{ currentStudent.seat }} ｜ 設備：{{ currentStudent.device }}
    </div>
  </div>

  <!-- 官方結訓數位證書 -->
  <div class="certificate-card">
    <div class="cert-border">
      <div class="cert-header">
        <div class="apple-logo"></div>
        <div class="cert-org">Apple at Work Enterprise Training</div>
        <div class="cert-main-title">實務工作坊結訓認證</div>
      </div>

      <div class="cert-body">
        <p class="cert-presents">茲證明</p>
        <h2 class="cert-student-name">{{ currentStudent.name }}</h2>
        <div class="cert-student-info">
          <span class="dept-badge">{{ currentStudent.dept }}</span>
          <span class="seat-badge">Seat {{ currentStudent.seat }}</span>
          <span class="email-badge">{{ currentStudent.email }}</span>
        </div>

        <p class="cert-text">
          已成功完成 <strong>Apple Business 企業部署與管理實務課程</strong>，全數通過以下核心技能實作考核：
        </p>

        <div class="skills-grid">
          <div class="skill-pill">✓ Entra ID 目錄同步 (SCIM)</div>
          <div class="skill-pill">✓ 零接觸自動註冊 (ADE)</div>
          <div class="skill-pill">✓ 企業安全藍圖（防火牆/密碼原則）</div>
          <div class="skill-pill">✓ 免 Apple 帳號 App 大量分派</div>
          <div class="skill-pill">✓ 自訂設定與 APNs 靜默派送</div>
        </div>

        <div class="cert-footer">
          <div class="cert-footer-col">
            <div class="footer-label">指派藍圖</div>
            <div class="footer-val">{{ currentStudent.seat }}的商務部門-Mac</div>
            <div class="footer-label" style="margin-top: 8px;">頒發日期</div>
            <div class="footer-val">{{ verifyTime }}</div>
          </div>

          <div class="cert-seal">
            <div class="seal-inner">
              <span class="seal-star">★ ★ ★</span>
              <span class="seal-text">MDM VERIFIED</span>
              <span class="seal-code">{{ verifyCode }}</span>
            </div>
          </div>

          <div class="cert-footer-col text-right">
            <div class="footer-label">認證單位</div>
            <div class="footer-val">Apple at Work Training Team</div>
            <div class="footer-label" style="margin-top: 8px;">驗證通道</div>
            <div class="footer-val">APNs Managed WebClip</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 操作按鈕列 -->
  <div class="cert-actions">
    <button class="cert-btn primary" @click="printCertificate">
      🖨️ 列印 / 另存為 PDF 證書
    </button>
    <div class="cert-switch">
      <span>切換座號檢視：</span>
      <select v-model="selectedSeat" class="seat-select-inline">
        <option v-for="s in students" :key="s.seat" :value="s.seat">
          Seat {{ s.seat }} - {{ s.name }}
        </option>
      </select>
    </div>
  </div>
</div>

---

## 🛠️ 如何配置專屬通關書籤？

若要讓每位學員從 Mac Safari 點擊書籤時自動帶入自己的座號，只需在準備 `.mobileconfig` 時，將 URL 指向以下格式：

```
https://chriswu-hub.github.io/apple-business-guide/guide/verify?source=mdm&seat=XX
```

> **例如 Seat 01**：  
> `https://chriswu-hub.github.io/apple-business-guide/guide/verify?source=mdm&seat=01`  
> 只要在 Safari 點開此連結，系統就會立即認證通過，並在結訓證書上自動印上 **陳志豪（Seat 01 · 業務部）**！

<style>
.verify-waiting-card {
  border: 2px dashed var(--vp-c-divider);
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  margin: 2rem 0;
}
.status-icon-bubble {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}
.status-icon-bubble.waiting {
  background: rgba(234, 179, 8, 0.15);
  color: #eab308;
}
.waiting-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}
.waiting-desc {
  color: var(--vp-c-text-2);
  max-width: 620px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}
.steps-guide {
  display: flex;
  gap: 1rem;
  max-width: 650px;
  margin: 0 auto 2rem;
  text-align: left;
}
@media (max-width: 640px) {
  .steps-guide {
    flex-direction: column;
  }
}
.guide-item {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  font-size: 0.88rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}
.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.demo-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.demo-label {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.seat-select {
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.action-btn-manual {
  padding: 0.4rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}
.action-btn-manual:hover {
  opacity: 0.9;
}

/* 證書卡片 */
.certificate-wrapper {
  margin: 2rem 0;
}
.success-banner {
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.4);
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
}
.success-title {
  color: #16a34a;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.check-badge {
  background: #16a34a;
  color: #fff;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}
.success-meta {
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
  margin-top: 0.25rem;
}

.certificate-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(226, 232, 240, 0.8);
  color: #1e293b;
}
.dark .certificate-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #f1f5f9;
  border: 1px solid rgba(51, 65, 85, 0.8);
}
.cert-border {
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  padding: 2.5rem 2rem;
  position: relative;
}
.dark .cert-border {
  border-color: #334155;
}
.cert-header {
  text-align: center;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1.5rem;
}
.dark .cert-header {
  border-color: #334155;
}
.apple-logo {
  font-size: 2.8rem;
  line-height: 1;
}
.cert-org {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #64748b;
  margin-top: 0.4rem;
}
.cert-main-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-top: 0.5rem;
  letter-spacing: 1px;
}
.cert-body {
  text-align: center;
  padding: 2rem 0;
}
.cert-presents {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}
.cert-student-name {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 0.25rem 0 1rem;
  color: #0f172a;
}
.dark .cert-student-name {
  color: #38bdf8;
}
.cert-student-info {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.dept-badge, .seat-badge, .email-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}
.dept-badge {
  background: #e0f2fe;
  color: #0369a1;
}
.seat-badge {
  background: #fef3c7;
  color: #b45309;
}
.email-badge {
  background: #f1f5f9;
  color: #475569;
}
.dark .email-badge {
  background: #334155;
  color: #cbd5e1;
}
.cert-text {
  max-width: 580px;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
  color: #475569;
}
.dark .cert-text {
  color: #94a3b8;
}
.skills-grid {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  max-width: 680px;
  margin: 0 auto 2.5rem;
}
.skill-pill {
  background: rgba(34, 197, 94, 0.1);
  color: #15803d;
  font-size: 0.82rem;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-weight: 600;
}
.dark .skill-pill {
  color: #4ade80;
}

.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px dashed #cbd5e1;
  padding-top: 1.5rem;
  text-align: left;
}
.dark .cert-footer {
  border-color: #334155;
}
.cert-footer-col {
  flex: 1;
}
.footer-label {
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
}
.footer-val {
  font-size: 0.9rem;
  font-weight: 700;
}
.cert-seal {
  width: 100px;
  height: 100px;
  border: 3px double #b45309;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 1rem;
}
.seal-inner {
  text-align: center;
  color: #b45309;
}
.seal-star {
  font-size: 0.65rem;
  display: block;
}
.seal-text {
  font-size: 0.68rem;
  font-weight: 800;
  display: block;
}
.seal-code {
  font-size: 0.6rem;
  display: block;
  font-family: monospace;
}
.text-right {
  text-align: right;
}

.cert-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.cert-btn.primary {
  background: var(--vp-c-brand-1);
  color: #fff;
  padding: 0.6rem 1.4rem;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.cert-switch {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
.seat-select-inline {
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

@media print {
  .verify-waiting-card, .cert-actions, .success-banner, nav, header, aside, .VPNav, .VPSidebar, .VPDocFooter {
    display: none !important;
  }
  .certificate-card {
    box-shadow: none;
    border: none;
  }
}
</style>
