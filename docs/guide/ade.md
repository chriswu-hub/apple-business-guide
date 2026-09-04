# 自動裝置註冊 (Automated Device Enrollment)

**自動裝置註冊 (ADE)** 是 Apple 生態系中實現「零接觸部署 (Zero-Touch Deployment)」的核心機制。

---

## 零接觸部署運作流程

```
[採購設備] 
   └── 經銷商自動上傳序號至 Apple Business
          └── Apple Business 指派至 MDM Server
                 └── 員工開箱聯網 (Wi-Fi)
                        └── 自動從 Apple 啟動伺服器下載 MDM Profile
                               └── 部署完成，設備受企業監管 (Supervised)
```

---

## 監管模式 (Supervised) 的優勢

透過 ADE 註冊的設備具備完整的 **監管權限 (Supervision)**：
1. **不可移除 MDM Profile**：使用者無法在「系統設定」中私自刪除管理描述檔。
2. **無痛升級與遠端重置**：IT 可隨時透過遠端指令觸發 OS 更新或清除所有內容與設定 (Erase All Content and Settings)。
3. **更強大的限制策略**：例如禁用未授權的外部儲存設備、禁用 AirDrop、強制設定密碼複雜度等。
