# 實作檢核與結訓認證

恭喜你完成了 Apple Business、自動裝置註冊 (ADE) 與 MDM 安全管理的完整學習！

本單元設計了 **「Mac 受管書籤 ➜ 手機掃描領取數位證書」** 的雙螢幕跨裝置通關驗證機制：
1. **Mac 端驗證**：在受管 Mac 上打開 Safari，點擊 Apple 商務藍圖派送的 **「Apple Business 實務指南」** 書籤。
2. **生成專屬 QR Code**：Mac 螢幕即時確認 MDM 原則生效，並動態產生該座號專屬的結訓通關 QR Code。
3. **手機端領證**：拿出手機能相機掃描 Mac 螢幕上的 QR Code，立即於手機解鎖個人專屬結訓數位證書！

---

<VerifyCompletion />

---

## 🎮 實作任務：通關金鑰分派解謎遊戲

::: tip 🧩【解謎任務說明】
講師已經在 Apple 商務後台的「設定」中，為全場 10 位學員分別建立了專屬的 **「結訓通關設定」**。
每個設定內都封裝了對應座號的受管書籤（Web Clip），但**尚未指派至任何藍圖**！

請依照你的專屬座號，完成以下解謎任務：
1. **尋找你的專屬金鑰**：前往「裝置」>「設定」> 找到以你的座號命名的自訂設定：`SeatXX_結訓通關書籤`（例如 Seat 01 請找 `Seat01_結訓通關書籤`）。
2. **分派至自己的藍圖**：進入「藍圖」> 點選你在 Lab 2 建立的 **`XX的商務部門-Mac`**（例如 `01的商務部門-Mac`）> 點選「+ 加入設定」，將你的專屬通關書籤加入並儲存！
3. **驗證與領證**：回到你面前的測試 Mac，等待約 30 秒 APNs 推送後，打開 Safari 點開受管書籤，看看螢幕是否順利浮現你的專屬 QR Code！
:::

### 📋 全場學員自訂設定與通關下載對照表

| 座號 | 學員姓名與部門 | 後台自訂設定名稱 | 目標藍圖 | 描述檔下載 (Box 雲端) |
| :---: | :--- | :--- | :---: | :---: |
| <span class="seat-pill">Seat 01</span> | **陳志豪** · 業務部 | `Seat01_結訓通關書籤` | `01的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/9a668aiaqfefpxszlsacbry2knxybe3d) |
| <span class="seat-pill">Seat 02</span> | **林美玲** · 行銷部 | `Seat02_結訓通關書籤` | `02的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/0hli2lyux2xf5k93scpvq32lkrora6zy) |
| <span class="seat-pill">Seat 03</span> | **張家榮** · 研發部 | `Seat03_結訓通關書籤` | `03的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/2imx3k277pthuvae4kg1j1xkcvpphwkt) |
| <span class="seat-pill">Seat 04</span> | **王雅婷** · 人資部 | `Seat04_結訓通關書籤` | `04的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/sxn8yhf4oe3taerx4vg8a22zl8jf0k9q) |
| <span class="seat-pill">Seat 05</span> | **李冠宇** · 業務部 | `Seat05_結訓通關書籤` | `05的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/ufkvoievikcyrryu6ucfdartozfjtw3s) |
| <span class="seat-pill">Seat 06</span> | **吳佩璇** · 行銷部 | `Seat06_結訓通關書籤` | `06的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/ke7r699ac3xyacpp2ics2dticf4qfa35) |
| <span class="seat-pill">Seat 07</span> | **許晉瑋** · 研發部 | `Seat07_結訓通關書籤` | `07的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/3iwyw14louekwlge5lnvzwpsn4mqm3jq) |
| <span class="seat-pill">Seat 08</span> | **黃詩涵** · 財務部 | `Seat08_結訓通關書籤` | `08的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/6pzeyujbt09zgwz2ppwzyt5k12m5sw2d) |
| <span class="seat-pill">Seat 09</span> | **楊承翰** · 營運部 | `Seat09_結訓通關書籤` | `09的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/tq209gltuy90nrocw51wmz4bqmkvwyyt) |
| <span class="seat-pill">Seat 10</span> | **劉怡君** · 資訊部 | `Seat10_結訓通關書籤` | `10的商務部門-Mac` | [下載 .mobileconfig](https://apple.box.com/s/3t1hrx75heo6t083qj9jgg0swo0mdu3g) |

---

## 🛠️ 講師端後台預先配置指南

在實體課程開始前，講師只需依序在 Apple 商務後台完成 10 個自訂設定的建立：
1. 進入 [business.apple.com](https://business.apple.com) > **「裝置」** > **「設定」** > 點選 **「自訂設定」** 的 **「+」**。
2. **名稱** 輸入 `SeatXX_結訓通關書籤`（例如 `Seat01_結訓通關書籤`）。
3. **上傳檔案** 選擇對應的 `Safari-Bookmarks-SeatXX.mobileconfig` 並點選儲存。
4. 重複完成 10 個設定後，即可交由學員在結訓檢核時進行「自主尋找並分派至各自藍圖」的闖關挑戰！
