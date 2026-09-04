# FileVault 與安全防護

## FileVault 全磁碟加密

FileVault 2 提供 XTS-AES 128/256 位元全磁碟加密保護，防止 Mac 遺失或被竊時資料遭到竊取。

### MDM 金鑰託管 (Institutional Recovery Key & Personal Recovery Key)
透過 MDM 可以自動將 FileVault 個人修復密鑰 (PRK) 託管至管理伺服器，使用者忘記密碼時 IT 可協助解鎖。

---

## 宣告式裝置管理 (Declarative Device Management, DDM)

DDM 是 Apple 新一代自主型管理協定：
- **主動狀態回報**：裝置端自主監控狀態（例如：OS 版本、FileVault 狀態）並主動回報給伺服器。
- **自主執行軟體更新**：設定強制更新時間，Mac 端會自主排程在截止日前完成重啟與安裝更新。
