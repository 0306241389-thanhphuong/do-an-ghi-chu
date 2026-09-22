# ĐỒ ÁN MÔN HỌC: ỨNG DỤNG QUẢN LÝ GHI CHÚ (REACTJS & NODEJS)

**Giảng viên hướng dẫn:** [Tên giảng viên]
**Nhóm thực hiện:** Nhóm [Số nhóm]
**Thành viên:**

1. [Họ tên] - [Mã SV] - Vai trò: PM & QA
2. [Họ tên] - [Mã SV] - Vai trò: Frontend Developer
3. [Họ tên] - [Mã SV] - Vai trò: Backend Developer

## 1. Công nghệ sử dụng

- **Frontend:** ReactJS (Vite), React Router DOM.
- **Backend:** Node.js, Express.js.
- **Cơ sở dữ liệu:** File System (lưu trữ bằng định dạng `.json` để dễ quản lý và
  triển khai).

## 2. Yêu cầu môi trường

- Máy tính cần cài đặt sẵn **Node.js** (phiên bản v16 trở lên).

## 3. Hướng dẫn Cài đặt & Chạy dự án (Rất quan trọng)

Dự án được chia làm 2 phần chạy độc lập. Vui lòng mở 2 cửa sổ Terminal (Command
Prompt) để chạy song song.

### Bước 1: Khởi động Backend (Máy chủ API)

Mở Terminal 1, di chuyển vào thư mục `backend` và chạy lệnh:

````bash
cd backend
npm install
node server.js
Lưu ý: Backend sẽ chạy tại http://localhost:5000. Hệ thống sẽ tự động sinh thư mục
data/ chứa các file JSON. Vui lòng không xóa thư mục này khi đang chạy ứng dụng.
Bước 2: Khởi động Frontend (Giao diện)
Mở Terminal 2, di chuyển vào thư mục frontend và chạy lệnh:
cd frontend
npm install
npm run dev
Lưu ý: Frontend sẽ chạy tại http://localhost:5173 (hoặc cổng khác hiển thị trên
terminal). Mở đường dẫn này trên trình duyệt (Khuyến nghị Google Chrome) để sử dụng
hệ thống.
4. Tài khoản / Mật khẩu Demo
Web không yêu cầu đăng nhập tài khoản.
Để xem khu vực Ghi chú riêng tư, vui lòng vào menu "Cài đặt" để tạo mật khẩu mới.

### 4. Chức năng chính
- **Ghi chú công khai:** Xem danh sách ghi chú, lọc theo chủ đề (Học tập, Công việc...), thêm, sửa và xóa ghi chú.
- **Vùng kín (Ghi chú riêng tư):** Khóa bảo mật bằng mật khẩu, cho phép mở khóa để thêm, sửa, xóa các ghi chú bí mật và khóa lại khi không sử dụng.
- **Cài đặt hệ thống:** Đổi tên hiển thị, đổi giao diện Sáng / Tối (Light/Dark Mode) áp dụng tức thì, thiết lập mật khẩu vùng kín.

### 5. Công nghệ sử dụng
- **Frontend:** ReactJS (Vite), React Router DOM (Single Page Application - SPA).
- **Backend:** Node.js, Express.js (RESTful API).
- **Cơ sở dữ liệu:** File System (lưu trữ bằng các file `.json` trong thư mục `backend/data/`).

### 6. Cấu trúc dự án
```text
do-an-ghi-chu/
├── backend/          # Máy chủ API (Node.js + Express)
│   ├── data/         # Thư mục lưu các file JSON dữ liệu
│   └── server.js     # Entry point backend
└── frontend/         # Giao diện người dùng (React + Vite)
    ├── src/
    │   ├── App.jsx          # Cấu hình Routing & Sidebar
    │   ├── Notes.jsx        # Trang ghi chú công khai
    │   ├── PrivateNotes.jsx # Trang vùng kín bảo mật
    │   └── Settings.jsx     # Trang cài đặt & theme
    └── package.json
````
