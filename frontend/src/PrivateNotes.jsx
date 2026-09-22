/**
* ============================================================================
* COMPONENT: VÙNG KÍN & BẢO MẬT (PrivateNotes.jsx)
* Author: [Bùi Lê Ngọc Ngân]
*
* [LƯU Ý]: Sử dụng lại phần lớn UI từ Notes.jsx. Thêm state isUnlocked để làm "cửa
bảo vệ".
* ============================================================================
*/
import React, { useState, useEffect } from "react";

function PrivateNotes() {
  /* ========================================================================
    VÙNG 1: STATE (Trạng thái)
    ======================================================================== */
  const [isUnlocked, setIsUnlocked] = useState(false); // Cờ khóa màn hình
  const [passwordInput, setPasswordInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
  });

  /* ========================================================================
    VÙNG 2: LOGIC (Xác thực & Fetch Data & CRUD)
    ======================================================================== */
  // Kiểm tra mật khẩu
  const handleLogin = () => {
    fetch("http://localhost:5000/api/private/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: passwordInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsUnlocked(true); // Mở khóa
          fetchPrivateNotes(); // Lấy dữ liệu
        } else {
          alert("Sai mật khẩu, vui lòng thử lại!");
          setPasswordInput("");
        }
      })
      .catch(() => alert("Lỗi kết nối máy chủ!"));
  };

  // Khóa lại khu vực bảo mật
  const handleLock = () => {
    setIsUnlocked(false);
    setPasswordInput("");
    setNotes([]);
    setFormData({ id: null, title: "", content: "" });
  };

  // Lấy danh sách ghi chú riêng tư
  const fetchPrivateNotes = () => {
    fetch("http://localhost:5000/api/private/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  };

  // Lưu ghi chú (Tự động phân biệt Thêm mới hoặc Cập nhật theo formData.id)
  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
      return;
    }

    const isEditing = formData.id !== null;
    const url = isEditing
      ? `http://localhost:5000/api/private/notes/${formData.id}`
      : "http://localhost:5000/api/private/notes";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    }).then(() => {
      fetchPrivateNotes();
      setFormData({ id: null, title: "", content: "" });
    });
  };

  // Chuẩn bị dữ liệu ghi chú để sửa
  const handleEdit = (note) => {
    setFormData({ id: note.id, title: note.title, content: note.content });
  };

  // Xóa ghi chú riêng tư
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ghi chú bí mật này?")) {
      fetch(`http://localhost:5000/api/private/notes/${id}`, {
        method: "DELETE",
      }).then(() => {
        fetchPrivateNotes();
        if (formData.id === id) {
          setFormData({ id: null, title: "", content: "" });
        }
      });
    }
  };

  /* ========================================================================
    VÙNG 3: RENDER (Hiển thị)
    ======================================================================== */
  // 3.1. Nếu chưa mở khóa -> Render màn hình nhập Pass
  if (!isUnlocked) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Khu vực Bảo mật</h2>
        <p>Vui lòng nhập mật khẩu để truy cập</p>
        <input
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Nhập mật khẩu..."
        />
        <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
          Mở khóa
        </button>
      </div>
    );
  }

  // 3.2. Nếu đã mở khóa -> Render giao diện Note tương tự Sprint 2
  return (
    <div style={{ padding: "20px", backgroundColor: "#ffebee" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2 style={{ color: "red", margin: 0 }}>Khu vực Ghi chú Riêng tư</h2>
        <button
          onClick={handleLock}
          style={{
            backgroundColor: "#333",
            color: "white",
            padding: "6px 12px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Khóa lại
        </button>
      </div>

      {/* Form nhập liệu */}
      <div
        style={{
          border: "1px solid red",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Tiêu đề bí mật"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <textarea
          placeholder="Nội dung bí mật"
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          style={{
            display: "block",
            width: "100%",
            height: "80px",
            marginBottom: "10px",
          }}
        />
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "6px 12px",
            cursor: "pointer",
          }}
        >
          {formData.id ? "Cập nhật bí mật" : "Lưu bí mật"}
        </button>
        {formData.id && (
          <button
            onClick={() => setFormData({ id: null, title: "", content: "" })}
            style={{
              marginLeft: "10px",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Hủy
          </button>
        )}
      </div>

      {/* Danh sách */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}
      >
        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid red",
              padding: "15px",
              backgroundColor: "#fff",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0" }}>{note.title}</h4>
            <p style={{ margin: "0 0 15px 0" }}>{note.content}</p>
            <div>
              <button
                onClick={() => handleEdit(note)}
                style={{ marginRight: "10px", cursor: "pointer" }}
              >
                Sửa
              </button>
              <button
                onClick={() => handleDelete(note.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "3px 8px",
                  cursor: "pointer",
                }}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrivateNotes;
