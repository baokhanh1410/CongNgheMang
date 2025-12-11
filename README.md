# 🎥 Hệ thống Phỏng vấn Trực tuyến (AI Interview System)

> Đồ án môn học: Xây dựng ứng dụng Web Phỏng vấn tự động tích hợp AI & Speech-to-Text.

## 📖 Giới thiệu

Hệ thống cho phép ứng viên thực hiện phỏng vấn video không đồng bộ (Asynchronous Video Interview). Ứng viên sẽ trả lời lần lượt các câu hỏi được hiển thị, hệ thống tự động ghi hình, phân tích hành vi (giả lập AI) và chuyển đổi giọng nói thành văn bản (Speech-to-Text).

Dự án được xây dựng theo kiến trúc Client-Server tách biệt, tuân thủ quy trình **Gitflow** chặt chẽ với đội ngũ 4 thành viên.

---

## 👥 Thành viên & Phân chia công việc

| STT | Thành viên | Vai trò (Role) | Nhiệm vụ chính (Responsibilities) | Branch làm việc |
|:---:|:---:|:---:|:---|:---|
| 1 | **Nguyễn Bảo Khánh** | **Backend Lead** | - Khởi tạo Project, Setup Server.<br>- Xử lý Auth (`verify-token`) & Middleware.<br>- Quản lý Merge Request (MR). | `feature/backend-auth` |
| 2 | **Đào Trung Phúc** | **Backend Logic** | - Xử lý File System (Multer, Path).<br>- Tạo logic lưu Metadata (`meta.json`).<br>- API Upload & Finish Session. | `feature/backend-storage` |
| 3 | **Nguyễn Thị Thuỳ Dương** | **Frontend UI/UX** | - Cắt HTML/CSS/Responsive.<br>- Xử lý hiệu ứng Animation, Popup, Progress Bar.<br>- Thiết kế giao diện báo cáo. | `feature/frontend-ui` |
| 4 | **Nguyễn Phạm Tuân** | **Frontend Core** | - Xử lý Webcam (MediaRecorder) & Mic.<br>- Viết hàm Fetch API kết nối Server. | `feature/frontend-logic` |

---

## 🚀 Tính năng nổi bật (Features)

Dựa trên yêu cầu đồ án:

### 1. Chức năng (Functionality - 60pts)
- [x] **Xác thực (Auth):** Bảo mật phiên phỏng vấn bằng Token (Server-side validation).
- [x] **Ghi hình tuần tự (Sequential Recording):** Quy trình: Đọc câu hỏi -> Ghi hình -> Tự động chuyển câu.
- [x] **Cơ chế Upload mạnh mẽ:** Hỗ trợ **Retry Upload** (tự động thử lại 3 lần nếu mạng lỗi) và báo trạng thái upload từng câu.
- [x] **Lưu trữ & Metadata:** Dữ liệu được tổ chức theo cấu trúc `Time_UserName/`, kèm file `meta.json` chi tiết từng session.

### 2. Kỹ thuật (Technical - 25pts)
- [x] **Kiến trúc rõ ràng:** Tách biệt Frontend (Modular JS) và Backend (MVC pattern).
- [x] **Git Workflow:** Sử dụng mô hình Gitflow (Main -> Develop -> Feature Branches).
- [x] **UX/UI:** Giao diện thân thiện, có thông báo lỗi (Error handling) và hướng dẫn người dùng.

### 3. Bonus (15pts)
- [x] **Automated Pipeline:** Tự động tổng hợp dữ liệu khi kết thúc phiên.

---

## 🛠 Cài đặt & Hướng dẫn sử dụng

### 1. Yêu cầu hệ thống
- Node.js (v14 trở lên)
- Trình duyệt hiện đại (Chrome/Edge) để hỗ trợ WebRTC và Web Speech API.

### 2. Cài đặt Backend
```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt các thư viện (Express, Multer, Cors, Moment...)
npm install

# Khởi chạy server (Port 3000)
node server.js
# Hoặc dùng nodemon nếu có
npm run dev
