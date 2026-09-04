<script setup>
import { ref } from 'vue'

const scannedText = ref('')
const isVerified = ref(false)
const studentName = ref('')
const ocrStatus = ref('')
const isProcessing = ref(false)
const currentDate = new Date().toLocaleDateString('zh-TW', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// 驗證核心函式：模糊比對與常見 OCR 誤判容錯
const verifyContent = (rawText) => {
  if (!rawText) return false
  // 轉小寫並替換常見字符混淆 (例如將 1/l 轉為 i，或移除空格與標點)
  let text = rawText.toLowerCase().replace(/\s+/g, '')
  
  // 1. 精準命中
  if (text.includes('mdm.idv.tw')) return true
  
  // 2. 容錯命中：點號可能被辨識為逗號、下劃線或空格
  if (/mdm[.,_ ]idv[.,_ ]tw/.test(text)) return true

  // 3. 關鍵字同時出現
  if (text.includes('mdm') && text.includes('idv') && text.includes('tw')) return true

  return false
}

// 方式一：輸入框即時比對
const checkInput = () => {
  if (verifyContent(scannedText.value)) {
    isVerified.value = true
  }
}

// 圖片前處理：縮放 + 灰階 + 二值化提高對比度，大幅提升手機照片 OCR 成功率
const preprocessImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // 限制最大寬度為 1600px，避免手機高畫質照片吃光記憶體
        let width = img.width
        let height = img.height
        const maxDim = 1600
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width)
            width = maxDim
          } else {
            width = Math.round((width * maxDim) / height)
            height = maxDim
          }
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        // 取得像素並提高對比度 (Grayscale + Contrast)
        const imgData = ctx.getImageData(0, 0, width, height)
        const d = imgData.data
        for (let i = 0; i < d.length; i += 4) {
          // 灰階亮度
          const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]
          // 簡單二值化增強文字邊緣
          const val = gray > 140 ? 255 : 0
          d[i] = val
          d[i + 1] = val
          d[i + 2] = val
        }
        ctx.putImageData(imgData, 0, 0)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

// 方式二：照片本機 OCR 辨識
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isProcessing.value = true
  ocrStatus.value = '📸 正在優化照片對比度並啟動神經網路模型...'

  try {
    // 1. 動態載入 Tesseract.js (若尚未載入)
    if (!window.Tesseract) {
      ocrStatus.value = '⏳ 正在載入本機 OCR 引擎 (約需數秒)...'
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    // 2. 影像前處理
    ocrStatus.value = '🔍 正在分析照片文字...'
    const processedImageData = await preprocessImage(file)

    // 3. 執行 OCR
    const worker = await window.Tesseract.createWorker('eng')
    const result = await worker.recognize(processedImageData)
    await worker.terminate()

    const rawRecognizedText = result.data.text || ''
    console.log('OCR 辨識結果:', rawRecognizedText)

    if (verifyContent(rawRecognizedText)) {
      isVerified.value = true
      scannedText.value = 'http://mdm.idv.tw'
      ocrStatus.value = ''
    } else {
      // 容錯提示並顯示辨識到的文字
      ocrStatus.value = ''
      alert(
        `未能在照片中清楚識別到「http://mdm.idv.tw」。\n\n【辨識到的文字片段】：\n${rawRecognizedText.slice(0, 100) || '(未偵測到文字)'}\n\n💡 建議：\n1. 拍照時靠近螢幕、避免反光與斜角。\n2. 或直接點擊上方輸入框，使用 iPhone 內建的「原況相機」掃描！`
      )
    }
  } catch (err) {
    console.error('OCR Error:', err)
    ocrStatus.value = ''
    alert('照片處理發生錯誤，建議改用 iPhone 鍵盤自帶的「原況相機掃描」！')
  } finally {
    isProcessing.value = false
    // 重設 input 讓使用者可重複選同一張
    event.target.value = ''
  }
}

const resetVerify = () => {
  isVerified.value = false
  scannedText.value = ''
  ocrStatus.value = ''
  isProcessing.value = false
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
          <span>📷 方式一：iPhone 鍵盤相機即時掃描 (推薦最準確)</span>
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
          <span>📸 方式二：拍照上傳辨識 (加強版 OCR)</span>
        </label>
        <p class="tip-text">
          點擊下方按鈕直接拍照。拍照時請盡量<strong>靠近螢幕、水平正對、避免螢幕反光</strong>：
        </p>
        <label class="upload-btn" :class="{ 'btn-disabled': isProcessing }">
          <span>{{ isProcessing ? '處理中...' : '拍攝 / 選擇螢幕照片' }}</span>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            @change="handleImageUpload"
            :disabled="isProcessing"
            class="hidden-file-input"
          />
        </label>
        <div v-if="ocrStatus" class="ocr-status">{{ ocrStatus }}</div>
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
  background-color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-btn:hover {
  background-color: var(--vp-c-brand-2);
}

.btn-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hidden-file-input {
  display: none;
}

.ocr-status {
  font-size: 0.85rem;
  color: var(--vp-c-brand-1);
  margin-top: 0.75rem;
  font-weight: 600;
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
