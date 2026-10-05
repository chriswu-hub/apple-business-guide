# 實作檢核與結訓認證

恭喜你完成了 Apple Business、自動裝置註冊 (ADE) 與 MDM 安全管理的完整學習！

本單元設計了 **「Mac 受管書籤 ➜ 手機掃描領取數位證書」** 的雙螢幕跨裝置通關驗證機制：
1. **Mac 端驗證**：在受管 Mac 上打開 Safari，點擊 Apple 商務藍圖派送的 **「Apple Business 實務指南」** 書籤。
2. **生成專屬 QR Code**：Mac 螢幕即時確認 MDM 原則生效，並動態產生該座號專屬的結訓通關 QR Code。
3. **手機端領證**：拿出手機能相機掃描 Mac 螢幕上的 QR Code，立即於手機解鎖個人專屬結訓數位證書！

---

<VerifyCompletion />

---

## 🛠️ Mac 端 Safari 書籤 URL 配置說明

在派送給各座號測試 Mac 的自訂描述檔（Web Clip）中，請將網址設定為帶有 `source=mdm&seat=XX` 的專屬通關網址：

```
https://chriswu-hub.github.io/apple-business-guide/guide/verify.html?source=mdm&seat=XX
```

> **例如 Seat 01**：  
> `https://chriswu-hub.github.io/apple-business-guide/guide/verify.html?source=mdm&seat=01`  
> 當學員在測試 Mac 點擊該書籤時，螢幕就會直接進入 **「Mac 裝置驗證成功」** 並展示 **Seat 01 專屬的結訓 QR Code**！
