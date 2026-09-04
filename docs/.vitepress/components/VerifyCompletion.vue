<script setup>
import { ref } from 'vue'

const scannedText = ref('')
const isVerified = ref(false)
const studentName = ref('')
const currentDate = new Date().toLocaleDateString('zh-TW', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// 驗證邏輯：比對是否包含 mdm.idv.tw (包含 http://, https:// 或純網域名稱)
const checkInput = () => {
  const clean = scannedText.value.trim().toLowerCase()
  if (clean.includes('mdm.idv.tw')) {
    isVerified.value = true
  }
}

// 支援即時照片 OCR 備用上傳 (Tesseract 輕量 CDN 或本地掃描)
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 載入 Tesseract.js 進行照片本機 OCR
  if (!window.Tesseract) {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
    document.head.appendChild(script)
    await new Promise(resolve => script.onload = resolve)
  }

  const statusText = document.getElementById('ocr-status')
  if (statusText) statusText.innerText = '正在本機分析照片文字中...'

  try {
    const result = await window.Tesseract.recognize(file, 'eng')
    const text = result.data.text.toLowerCase()
    if (text.includes('mdm.idv.tw')) {
      isVerified.value = true
      scannedText.value = 'http://mdm.idv.tw'
    } else {
      alert('未在照片中辨識到指定網址，請確認照片清晰或直接使用 iPhone 原況相機掃描！')
    }
  } catch (err) {
    alert('辨識失敗，請改用 iPhone 原況文字輸入框掃描。')
  } finally {
    if (statusText) statusText.innerText = ''
  }
}

const resetVerify = () => {
  isVerified.value = false
  scannedText.value = ''
}
</script>

<template>
  <div class="verify-container">
    <!-- 尚未通過驗證的互動卡片 -->
    <div v-if="!isVerified" class="verify-card">
      <div class="verify-header">
        <div class="verify-icon">📱</div>
        <div>
          <h3 class="verify-title">結訓成果檢核與掃描</h3>
          <p class="verify-subtitle">請使用手機掃描或拍攝 Mac 螢幕上的目標網址以完成認證</p>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">學員姓名 (選填)</label>
        <input 
          v-model="studentName" 
          type="text" 
          placeholder="例如：王小明" 
          class="form-input"
        />
      </div>

      <!-- 核心：iPhone 原況文字 (Live Text) 掃描輸入框 -->
      <div class="form-group">
        <label class="form-label">
          <span>📷 方式一：iPhone 鍵盤相機即時掃描 (推薦)</span>
        </label>
        <p class="tip-text">
          👉 點擊下方輸入框，在 iPhone 鍵盤點選 <strong>「相機圖示 (掃描文字)」</strong> 對準螢幕上的 <code>http://mdm.idv.tw</code>：
        </p>
        <input 
          v-model="scannedText" 
          @input="checkInput"
          type="text" 
          placeholder="點此喚起鍵盤並點選相機圖示..." 
          class="form-input scan-input"
          autofocus
        />
      </div>

      <!-- 備用：拍照上傳 (本機 OCR) -->
      <div class="form-group alt-method">
        <label class="form-label">
          <span>📸 方式二：拍照上傳辨識</span>
        </label>
        <label class="upload-btn">
          <span>拍攝 / 選擇螢幕照片</span>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            @change="handleImageUpload"
            class="hidden-file-input"
          />
        </label>
        <div id="ocr-status" class="ocr-status"></div>
      </div>
    </div>

    <!-- 驗證通過顯示的結訓證書與成功卡片 -->
    <div v-else class="success-card">
      <div class="badge-icon">🎉</div>
      <h2 class="success-title">驗證通過，恭喜完成培訓！</h2>
      <p class="success-desc">
        系統已成功辨識目標實作節點 <code>http://mdm.idv.tw</code>，已完成 Apple Business 企業裝置管理核心培訓所有環節。
      </p>

      <!-- 數位完訓證書卡片 -->
      <div class="certificate">
        <div class="cert-border">
          <div class="cert-badge"> Apple at Work</div>
          <h3 class="cert-title">結訓認證證明</h3>
          <p class="cert-name">{{ studentName || '結訓學員' }}</p>
          <p class="cert-body">
            已成功掌握 Apple Business、自動裝置註冊 (ADE)、MDM 管理配置與安全合規實務技術。
          </p>
          <div class="cert-footer">
            <span>認證日期：{{ currentDate }}</span>
            <span class="cert-status">✓ Verified by MDM System</span>
          </div>
        </div>
      </div>

      <button @click="resetVerify" class="retry-btn">
        重新掃描驗證
      </button>
    </div>
  </div>
</template>

<style scoped>
.verify-container {
  margin: 2rem 0;
}

.verify-card, .success-card {
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  border-radius: 16px;
  padding: 1.75rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.verify-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.verify-icon {
  font-size: 2.2rem;
}

.verify-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.verify-subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.tip-text {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.15);
}

.scan-input {
  font-family: var(--vp-font-family-mono);
  font-weight: 500;
}

.alt-method {
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 1.25rem;
  margin-top: 1.5rem;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-border);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.2s;
}

.upload-btn:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
}

.hidden-file-input {
  display: none;
}

.ocr-status {
  font-size: 0.8rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.5rem;
  font-weight: 500;
}

/* 成功卡片與證書 */
.success-card {
  text-align: center;
  background: linear-gradient(180deg, var(--vp-c-bg-soft) 0%, rgba(0, 113, 227, 0.05) 100%);
  border: 1px solid #10b981;
}

.badge-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  animation: bounce 0.6s ease;
}

.success-title {
  color: #10b981;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.5rem 0;
}

.success-desc {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  max-width: 550px;
  margin: 0 auto 1.5rem auto;
  line-height: 1.6;
}

.certificate {
  background: var(--vp-c-bg);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem auto;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.dark .certificate {
  border-color: #3f3f46;
}

.cert-border {
  border: 1px dashed var(--vp-c-brand-1);
  border-radius: 8px;
  padding: 1.25rem;
}

.cert-badge {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 1px;
}

.cert-title {
  font-size: 1.35rem;
  font-weight: 800;
  margin: 0.5rem 0;
  color: var(--vp-c-text-1);
}

.cert-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  margin: 0.5rem 0;
}

.cert-body {
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0.75rem 0;
}

.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  margin-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 0.75rem;
}

.cert-status {
  color: #10b981;
  font-weight: 600;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-text-2);
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
</style>
