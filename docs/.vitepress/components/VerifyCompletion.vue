<script setup>
import { ref, onBeforeUnmount } from 'vue'

const scannedText = ref('')
const isVerified = ref(false)
const studentName = ref('')
const ocrStatus = ref('')
const isProcessing = ref(false)
const recognizedDebugText = ref('')
const isCameraOpen = ref(false)
const cameraError = ref('')
const liveOcrText = ref('')
const isCapturing = ref(false)
const currentFacingMode = ref('environment')

const currentDate = new Date().toLocaleDateString('zh-TW', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

let stream = null
let scanInterval = null

// 核心比對邏輯：比對是否包含 mdm.idv.tw
const verifyContent = (rawText) => {
  if (!rawText) return false
  let text = rawText.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  if (text.includes('mdmidvtw')) return true
  if (text.includes('mdm') && text.includes('idv')) return true
  if (text.includes('mdm') && text.includes('tw')) return true
  if (text.includes('idv') && text.includes('tw')) return true
  if (text.includes('mdm')) return true

  let normalized = text
    .replace(/rn/g, 'm')
    .replace(/nn/g, 'm')
    .replace(/[1l]/g, 'i')
    .replace(/[0]/g, 'o')
    .replace(/vv/g, 'w')
  
  if (normalized.includes('mdmidvtw')) return true
  if (normalized.includes('mdm') || normalized.includes('idv')) return true

  return false
}

// 方案 B：輸入框即時比對
const checkInput = () => {
  if (verifyContent(scannedText.value)) {
    isVerified.value = true
    stopCamera()
  }
}

// ==========================================
// 方案 A：一鍵開啟鏡頭即時辨識 (支援切換前後鏡頭)
// ==========================================
const initCameraStream = async (facing = 'environment') => {
  // 先停止當前串流
  if (stream) {
    stream.getTracks().forEach(t => t.stop())
    stream = null
  }

  const video = document.getElementById('qr-video')
  if (!video) return

  // iOS Safari 相機約束最佳配置
  const constraints = {
    audio: false,
    video: {
      facingMode: facing === 'environment' ? { ideal: 'environment' } : { ideal: 'user' },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  }

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints)
    video.srcObject = stream
    video.setAttribute('playsinline', 'true')
    video.setAttribute('autoplay', 'true')
    video.setAttribute('muted', 'true')
    await video.play()
    currentFacingMode.value = facing
    startLiveScanning(video)
  } catch (err) {
    // 容錯降級嘗試
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true })
      video.srcObject = stream
      await video.play()
      startLiveScanning(video)
    } catch (finalErr) {
      console.error('Camera Fatal Error:', finalErr)
      cameraError.value = '無法啟動相機，請確認已在 Safari 設定中給予相機權限。'
    }
  }
}

const startCamera = async () => {
  cameraError.value = ''
  isCameraOpen.value = true
  liveOcrText.value = '鏡頭已啟動，請對準螢幕上的文字或 QR Code...'

  if (!window.jsQR) {
    const s1 = document.createElement('script')
    s1.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'
    document.head.appendChild(s1)
  }
  if (!window.Tesseract) {
    const s2 = document.createElement('script')
    s2.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
    document.head.appendChild(s2)
  }

  // 稍等 DOM 渲染完成後啟動預設後鏡頭
  setTimeout(() => {
    initCameraStream('environment')
  }, 100)
}

// 手動一鍵切換鏡頭 (前後鏡頭切換)
const toggleCameraFacing = async () => {
  const targetFacing = currentFacingMode.value === 'environment' ? 'user' : 'environment'
  await initCameraStream(targetFacing)
}

const stopCamera = () => {
  if (scanInterval) {
    clearInterval(scanInterval)
    scanInterval = null
  }
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  isCameraOpen.value = false
  liveOcrText.value = ''
}

// 自動循環掃描：QR Code (0.1秒秒讀)
const startLiveScanning = (video) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (scanInterval) clearInterval(scanInterval)

  scanInterval = setInterval(() => {
    if (!video || video.readyState !== video.HAVE_ENOUGH_DATA || isVerified.value) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    // QR Code 掃描
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    if (window.jsQR) {
      const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      })

      if (code && code.data && verifyContent(code.data)) {
        isVerified.value = true
        scannedText.value = code.data
        stopCamera()
      }
    }
  }, 150)
}

// 點擊「對準文字，立即辨識」按鈕
const captureAndRecognizeText = async () => {
  const video = document.getElementById('qr-video')
  if (!video) return

  isCapturing.value = true
  liveOcrText.value = '🔍 正在分析畫面文字，請保持相機穩定...'

  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9)

  try {
    if (!window.Tesseract) {
      await new Promise(r => setTimeout(r, 1000))
    }
    const result = await window.Tesseract.recognize(dataUrl, 'eng+chi_tra')
    const rawText = result?.data?.text || ''
    console.log('相機文字辨識結果:', rawText)

    if (verifyContent(rawText)) {
      isVerified.value = true
      scannedText.value = 'http://mdm.idv.tw'
      stopCamera()
    } else {
      liveOcrText.value = `未匹配成功。偵測到：「${rawText.trim().slice(0, 40) || '無'}」，請對準「http://mdm.idv.tw」再按一次！`
    }
  } catch (err) {
    liveOcrText.value = '辨識發生異常，請重試或改用下方方案 B。'
  } finally {
    isCapturing.value = false
  }
}

// ==========================================
// 方案 C：相片 OCR 辨識 (備用)
// ==========================================
const optimizePhotoForOCR = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let width = img.width
        let height = img.height
        const maxDim = 1200
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
        resolve(canvas.toDataURL('image/jpeg', 0.9))
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  })
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isProcessing.value = true
  ocrStatus.value = '📸 正在分析照片...'
  recognizedDebugText.value = ''

  try {
    if (!window.Tesseract) {
      ocrStatus.value = '⏳ 正在載入 OCR 模組...'
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const optimizedImage = await optimizePhotoForOCR(file)
    ocrStatus.value = '🔍 正在辨識文字中...'

    const result = await window.Tesseract.recognize(
      optimizedImage,
      'eng+chi_tra',
      {
        logger: m => {
          if (m.status === 'recognizing text') {
            ocrStatus.value = `🔍 辨識進度: ${Math.round(m.progress * 100)}%`
          }
        }
      }
    )

    const rawRecognizedText = result?.data?.text || ''
    recognizedDebugText.value = rawRecognizedText

    if (verifyContent(rawRecognizedText)) {
      isVerified.value = true
      scannedText.value = 'http://mdm.idv.tw'
      ocrStatus.value = ''
    } else {
      ocrStatus.value = ''
      alert(`未能成功辨識網址。\n【辨識到的文字】：\n「${rawRecognizedText.trim() || '未偵測到文字'}」`)
    }
  } catch (err) {
    console.error('OCR Error:', err)
    ocrStatus.value = ''
    alert(`辨識異常：${err.message}`)
  } finally {
    isProcessing.value = false
    event.target.value = ''
  }
}

const resetVerify = () => {
  isVerified.value = false
  scannedText.value = ''
  ocrStatus.value = ''
  isProcessing.value = false
  recognizedDebugText.value = ''
  stopCamera()
}

onBeforeUnmount(() => {
  stopCamera()
})
</script>

<template>
  <div class="verify-container">
    <!-- 尚未通過驗證的互動卡片 -->
    <div v-if="!isVerified" class="verify-card">
      <div class="verify-header">
        <div class="verify-icon">📱</div>
        <div>
          <h3 class="verify-title">結訓成果檢核與驗證</h3>
          <p class="verify-subtitle">請使用手機掃描螢幕上的目標網址或 QR Code 完成認證</p>
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

      <!-- 🌟 方案 A：一鍵開啟鏡頭即時文字 / QR 掃描 -->
      <div class="form-group highlight-box">
        <label class="form-label">
          <span>⚡️ 方案 A：一鍵開啟鏡頭掃描 (支援文字與 QR Code)</span>
        </label>
        <p class="tip-text">
          點擊下方按鈕直接喚醒後置鏡頭，對準螢幕上的文字 <code>http://mdm.idv.tw</code> 或 QR Code 即可辨識：
        </p>
        
        <div v-if="!isCameraOpen">
          <button @click="startCamera" class="camera-launch-btn">
            📷 點此開啟相機即時掃描
          </button>
        </div>

        <!-- 即時相機視窗與掃描框 -->
        <div v-else class="camera-viewport-container">
          <div class="camera-box">
            <video id="qr-video" class="video-preview"></video>
            <div class="scanner-laser"></div>
            <div class="scanner-frame"></div>
            <!-- 切換前後鏡頭浮鈕 -->
            <button @click="toggleCameraFacing" class="camera-switch-btn" title="切換鏡頭">
              🔄 切換{{ currentFacingMode === 'environment' ? '前置' : '後置' }}鏡頭
            </button>
          </div>
          
          <div class="camera-action-bar">
            <!-- 專為文字辨識設計的一鍵快拍辨識鈕 -->
            <button 
              @click="captureAndRecognizeText" 
              :disabled="isCapturing"
              class="recognize-text-btn"
            >
              {{ isCapturing ? '🔍 分析文字中...' : '🎯 對準文字，點此立即辨識' }}
            </button>
          </div>

          <p v-if="liveOcrText" class="live-ocr-hint">{{ liveOcrText }}</p>

          <button @click="stopCamera" class="stop-camera-btn">
            ✕ 關閉相機
          </button>
        </div>
        <p v-if="cameraError" class="camera-error">{{ cameraError }}</p>
      </div>

      <!-- 方案 B：iPhone 鍵盤相機原況文字 (Live Text) -->
      <div class="form-group">
        <label class="form-label">
          <span>📷 方案 B：iPhone 鍵盤原況文字 (Live Text) 掃描</span>
        </label>
        <p class="tip-text">
          👉 點擊下方輸入框，在 iPhone 鍵盤點選 <strong>「相機圖示 (掃描文字)」</strong> 對準螢幕上的 <code>http://mdm.idv.tw</code>：
        </p>
        <input 
          v-model="scannedText" 
          @input="checkInput"
          type="text" 
          name="scanned_mdm_url"
          inputmode="text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          placeholder="點此喚起鍵盤並點選相機圖示..." 
          class="form-input scan-input"
        />
      </div>

      <!-- 方案 C：拍照或上傳圖片辨識 -->
      <div class="form-group alt-method">
        <label class="form-label">
          <span>📸 方案 C：拍照或從相簿上傳</span>
        </label>
        <div class="btn-group">
          <label class="upload-btn" :class="{ 'btn-disabled': isProcessing }">
            <span>📷 直接拍照</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              @change="handleImageUpload"
              :disabled="isProcessing"
              class="hidden-file-input"
            />
          </label>
          <label class="upload-btn btn-secondary" :class="{ 'btn-disabled': isProcessing }">
            <span>🖼 從相簿選取</span>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleImageUpload"
              :disabled="isProcessing"
              class="hidden-file-input"
            />
          </label>
        </div>
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

.highlight-box {
  background: rgba(0, 113, 227, 0.04);
  border: 1px solid rgba(0, 113, 227, 0.2);
  border-radius: 12px;
  padding: 1.25rem;
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

.camera-launch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  background-color: #0071e3;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 113, 227, 0.25);
  transition: all 0.2s;
}

.camera-launch-btn:hover {
  background-color: #0077ed;
  transform: translateY(-1px);
}

.camera-viewport-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.camera-box {
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.video-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.camera-switch-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.75rem;
  cursor: pointer;
  z-index: 10;
  backdrop-filter: blur(4px);
}

.scanner-frame {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 2px dashed #0071e3;
  border-radius: 8px;
  pointer-events: none;
}

.scanner-laser {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #0071e3;
  box-shadow: 0 0 8px #0071e3;
  animation: scanning 2s infinite ease-in-out;
}

@keyframes scanning {
  0% { top: 10%; opacity: 0; }
  50% { opacity: 1; }
  100% { top: 90%; opacity: 0; }
}

.camera-action-bar {
  margin-top: 0.75rem;
  width: 100%;
  max-width: 320px;
}

.recognize-text-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  background-color: #10b981;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.25);
  transition: all 0.2s;
}

.recognize-text-btn:hover:not(:disabled) {
  background-color: #059669;
}

.recognize-text-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.live-ocr-hint {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
  text-align: center;
  max-width: 320px;
  line-height: 1.4;
}

.stop-camera-btn {
  margin-top: 0.5rem;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  background: var(--vp-c-bg-mute);
  border: 1px solid var(--vp-c-border);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.camera-error {
  font-size: 0.8rem;
  color: #ef4444;
  margin-top: 0.5rem;
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

.btn-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
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

.btn-secondary {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-border);
  color: var(--vp-c-text-1);
}

.btn-secondary:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
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
