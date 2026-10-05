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

const viewMode = ref('waiting')
const selectedSeat = ref('01')
const verifyTime = ref('')
const showDemoBar = ref(false)

const currentStudent = computed(() => {
  return students.find(s => s.seat === selectedSeat.value) || students[0]
})

const verifyCode = computed(() => {
  return 'ABM-2026-SEAT' + selectedSeat.value + '-PASS'
})

const mobileClaimUrl = computed(() => {
  return 'https://chriswu-hub.github.io/apple-business-guide/guide/verify.html?claim=true&seat=' + selectedSeat.value
})

const qrCodeImageUrl = computed(() => {
  const target = encodeURIComponent(mobileClaimUrl.value)
  return 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&ecc=H&data=' + target
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
    const claim = params.get('claim')
    const verified = params.get('verified')

    if (seat) {
      const padSeat = seat.toString().padStart(2, '0')
      if (students.some(s => s.seat === padSeat)) {
        selectedSeat.value = padSeat
      }
    }

    // 只有帶有 demo=true 的特權參數，才會開啟講師快捷切換工具列
    if (params.get('demo') === 'true' || params.get('admin') === 'true') {
      showDemoBar.value = true
    }

    if (claim === 'true' || verified === 'true') {
      viewMode.value = 'mobile_cert'
    } else if (source === 'mdm' || source === 'profile' || source === 'webclip') {
      viewMode.value = 'mac_qrcode'
    } else {
      viewMode.value = 'waiting'
    }
  }
})

function switchToMacQrcode(seat) {
  selectedSeat.value = seat
  viewMode.value = 'mac_qrcode'
}

function switchToMobileCert(seat) {
  selectedSeat.value = seat
  viewMode.value = 'mobile_cert'
}

function printCertificate() {
  if (typeof window !== 'undefined') {
    window.print()
  }
}
</script>

<template>
  <div class="verify-page-root">
    <!-- 模式 1：尚未驗證（等待受管設備點擊） -->
    <div v-if="viewMode === 'waiting'" class="verify-waiting-card">
      <div class="status-icon-bubble waiting">
        🔒
      </div>
      <div class="waiting-title">請於受管 Mac 點擊 Safari 書籤</div>
      <p class="waiting-desc">
        系統尚未偵測到來自受管 Mac 的憑證連線。<br />
        請在完成藍圖派送的測試 Mac 上，打開 <strong>Safari</strong> 並點選 <strong>「Apple Business 實務指南」</strong> 書籤以產出專屬結訓 QR Code！
      </p>

      <div class="flow-steps">
        <div class="flow-step">
          <div class="flow-num">1</div>
          <div class="flow-title">Mac 點擊書籤</div>
          <div class="flow-detail">驗證 MDM 通道並於 Mac 螢幕產出動態 QR Code</div>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step">
          <div class="flow-num">2</div>
          <div class="flow-title">手機相機掃描</div>
          <div class="flow-detail">拿學員手機掃描 Mac 上的專屬 QR Code</div>
        </div>
        <div class="flow-arrow">➔</div>
        <div class="flow-step">
          <div class="flow-num">3</div>
          <div class="flow-title">領取數位證書</div>
          <div class="flow-detail">證書即時載入手機，可直接截圖或存檔</div>
        </div>
      </div>

      <div v-if="showDemoBar" class="demo-bar">
        <span class="demo-label">現場講師 Demo 快捷切換：</span>
        <select v-model="selectedSeat" class="seat-select">
          <option v-for="s in students" :key="s.seat" :value="s.seat">
            Seat {{ s.seat }} - {{ s.name }} ({{ s.dept }})
          </option>
        </select>
        <button class="action-btn-manual secondary" @click="switchToMacQrcode(selectedSeat)">模擬 Mac 顯示 QR Code</button>
        <button class="action-btn-manual" @click="switchToMobileCert(selectedSeat)">模擬手機解鎖證書</button>
      </div>
    </div>

    <!-- 模式 2：Mac 端驗證通過 ➜ 顯示專屬 QR Code -->
    <div v-else-if="viewMode === 'mac_qrcode'" class="mac-qrcode-card">
      <div class="success-pill">
        <span class="dot"></span>
        ✓ Mac 裝置驗證成功！MDM 通道暢通
      </div>

      <h2 class="qrcode-section-title">請拿手機掃描下方 QR Code 領取結訓證書</h2>
      <p class="qrcode-section-desc">
        已確認本機為 <strong>Seat {{ currentStudent.seat }}（{{ currentStudent.name }} · {{ currentStudent.dept }}）</strong> 所屬之受管 Mac。<br />
        請打開手機「相機」App 對準螢幕上的 QR Code 進行掃描：
      </p>

      <div class="qrcode-container">
        <div class="qrcode-box">
          <div class="qrcode-render-wrapper">
            <img
              :src="qrCodeImageUrl"
              :key="currentStudent.seat"
              alt="結訓驗證專屬 QR Code"
              class="qrcode-img"
              loading="eager"
            />
            <div class="qrcode-center-logo">
              <span></span>
            </div>
          </div>
          <div class="qrcode-badge">Seat {{ currentStudent.seat }} 專屬憑證</div>
        </div>
      </div>

      <div class="qrcode-link-tip">
        手機掃描目標：<br />
        <code>{{ mobileClaimUrl }}</code>
      </div>

      <div v-if="showDemoBar" class="switch-seat-bar">
        <span>切換座號預覽：</span>
        <select v-model="selectedSeat" class="seat-select">
          <option v-for="s in students" :key="s.seat" :value="s.seat">
            Seat {{ s.seat }} - {{ s.name }} ({{ s.dept }})
          </option>
        </select>
        <button class="action-btn-manual" style="margin-left: 8px;" @click="switchToMobileCert(selectedSeat)">直接在本機查看證書 ➜</button>
      </div>
    </div>

    <!-- 模式 3：手機端掃描通過 ➜ 呈現結訓證書 -->
    <div v-else-if="viewMode === 'mobile_cert'" class="certificate-wrapper">
      <div class="success-banner">
        <div class="success-title">
          <span class="check-badge">✓</span>
          恭喜！結訓數位證書已解鎖
        </div>
        <div class="success-meta">
          驗證來源：QR Code 掃描通關 ｜ 座號：Seat {{ currentStudent.seat }} ｜ 學員：{{ currentStudent.name }}
        </div>
      </div>

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
                <div class="footer-val">QR Code Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cert-actions">
        <button class="cert-btn primary" @click="printCertificate">
          📸 截圖保存 / 另存為 PDF 證書
        </button>
        <div v-if="showDemoBar" class="cert-switch">
          <span>切換座號：</span>
          <select v-model="selectedSeat" class="seat-select-inline">
            <option v-for="s in students" :key="s.seat" :value="s.seat">
              Seat {{ s.seat }} - {{ s.name }}
            </option>
          </select>
          <button class="back-to-qr-btn" @click="viewMode = 'mac_qrcode'">回 QR Code</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.verify-page-root {
  margin: 1.5rem 0;
}
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
.flow-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  max-width: 720px;
  margin: 1.5rem auto 2rem;
}
@media (max-width: 640px) {
  .flow-steps {
    flex-direction: column;
  }
}
.flow-step {
  flex: 1;
  background: var(--vp-c-bg);
  padding: 1.2rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.flow-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}
.flow-title {
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
  margin-bottom: 0.25rem;
}
.flow-detail {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.flow-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  font-size: 1.2rem;
}

.mac-qrcode-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: var(--vp-c-bg-soft);
  margin: 2rem 0;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}
.success-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
  border: 1px solid rgba(34, 197, 94, 0.3);
  padding: 0.35rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
}
.success-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #16a34a;
  box-shadow: 0 0 8px #16a34a;
}
.qrcode-section-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}
.qrcode-section-desc {
  color: var(--vp-c-text-2);
  max-width: 580px;
  margin: 0 auto 1.5rem;
  line-height: 1.6;
}
.qrcode-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}
.qrcode-box {
  background: #ffffff;
  padding: 1.2rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  display: inline-block;
}
.qrcode-render-wrapper {
  position: relative;
  display: inline-block;
  width: 240px;
  height: 240px;
}
.qrcode-img {
  width: 240px;
  height: 240px;
  display: block;
  border-radius: 8px;
}
.qrcode-center-logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 52px;
  height: 52px;
  background: #ffffff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e2e8f0;
}
.qrcode-center-logo span {
  font-size: 1.8rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
  margin-top: -3px;
}
.qrcode-badge {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #1e293b;
  background: #f1f5f9;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}
.qrcode-link-tip {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  margin-top: 1rem;
}
.qrcode-link-tip code {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
}
.switch-seat-bar {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

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
@media (max-width: 600px) {
  .cert-footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
  }
  .cert-footer-col.text-right {
    text-align: center;
  }
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.seat-select-inline {
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
.back-to-qr-btn {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  color: var(--vp-c-text-1);
}

.demo-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.demo-label {
  font-size: 0.88rem;
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
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
}
.action-btn-manual.secondary {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
}

@media print {
  .verify-waiting-card, .mac-qrcode-card, .cert-actions, .success-banner, nav, header, aside, .VPNav, .VPSidebar, .VPDocFooter {
    display: none !important;
  }
  .certificate-card {
    box-shadow: none;
    border: none;
  }
}
</style>
