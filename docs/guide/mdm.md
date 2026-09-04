# MDM 管理與設定檔

## MDM 解決方案選擇

Apple 採用統一的原生 MDM 協定，企業可根據既有架構選擇主流的 MDM 產品：

- **Jamf Pro**：Apple 專屬生態系的領導品牌，功能最完整。
- **Microsoft Intune**：適合已有龐大 Microsoft 365 授權與 Windows 混合環境的企業。
- **Kandji / Mosyle / SimpleMDM**：雲原生現代化 Apple 專屬管理平台。

---

## 設定檔 (Configuration Profiles)

設定檔為 `.mobileconfig` 格式的 XML 檔案，用於控管各項系統偏好：
- **Wi-Fi / VPN 設定**：自動發放內部 802.1X 憑證與 VPN 連線。
- **密碼規則**：要求密碼長度、複雜度與定期更新。
- **隱私偏好設定控制 (PPPC)**：預先允許公司資安軟體存取磁碟與螢幕錄製權限。
