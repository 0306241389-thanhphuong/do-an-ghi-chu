// import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Settings from "./Settings";
import Notes from "./Notes";
import PrivateNotes from "./PrivateNotes";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* 1. Thanh Menu Điều hướng bên trái (Sidebar) */}
        <nav
          style={{
            width: "200px",
            padding: "20px",
            borderRight: "1px solid #ccc",
            backgroundColor: "#f8f0f0",
          }}
        >
          <h3>Menu</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/">Ghi chú công khai</Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/private">Vùng Riêng Tư</Link>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <Link to="/settings">Cài đặt</Link>
            </li>
          </ul>
        </nav>

        {/* 2. Nội dung trang thay đổi theo Route */}
        <main style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/private" element={<PrivateNotes />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
