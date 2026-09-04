# macOS MDM 管理者常用終端機指令

在排查 Mac 部署問題或管理設備時，IT 管理者常用的原生終端機指令：

---

## 檢查 MDM 註冊狀態

```bash
# 檢查目前是否已註冊 MDM 以及是否處於 Supervised 狀態
sudo profiles status -type enrollment
```

---

## 強制更新 MDM 註冊設定檔

當後台變更了 ADE 指派，需要 Mac 重新向 Apple 啟動伺服器請求最新設定：

```bash
# 強制重新向 Apple 取得 ADE 指派
sudo profiles renew -type enrollment
```

---

## 查看已安裝的描述檔

```bash
# 列出系統中目前安裝的所有 Profile
sudo profiles show
```

---

## 磁碟加密 (FileVault) 狀態檢查

```bash
# 檢查 FileVault 加密是否已開啟
fdesetup status

# 查看有哪些使用者有權限解鎖 FileVault
fdesetup list
```
