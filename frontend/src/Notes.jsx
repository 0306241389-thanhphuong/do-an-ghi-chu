/**
* ============================================================================
* COMPONENT: GIAO DIỆN QUẢN LÝ GHI CHÚ (Notes.jsx)
* Author: [Bùi Lê Ngọc Ngân]
*
* [CẢNH BÁO TRÁNH XUNG ĐỘT]:
* - Vùng 1 & 2 (State & Logic): Chỉ người phụ trách tích hợp API mới được sửa.
* - Vùng 3 (Render UI): Các bạn phụ trách CSS/HTML có thể tùy chỉnh ở đây.
* ============================================================================
*/
import React, { useState, useEffect } from 'react';

function Notes() {
    /* ========================================================================
    VÙNG 1: KHỞI TẠO STATE (Trạng thái dữ liệu)
    ======================================================================== */
    const [topic, setTopic] = useState('hoc-tap');
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({ id: null, title: '', content: '' });
    
    // 1. Khai báo thêm State lưu từ khóa tìm kiếm
    const [searchTerm, setSearchTerm] = useState('');

    /* ========================================================================
    VÙNG 2: XỬ LÝ LOGIC & GỌI API (Fetch, Save, Delete, Search)
    ======================================================================== */
    const fetchNotes = () => {
        fetch(`http://localhost:5000/api/notes/${topic}`)
            .then(res => res.json())
            .then(data => setNotes(data));
    };

    useEffect(() => { 
        fetchNotes(); 
    }, [topic]);

    const handleSave = () => {
        const method = formData.id ? 'PUT' : 'POST';
        const url = formData.id 
            ? `http://localhost:5000/api/notes/${topic}/${formData.id}` 
            : `http://localhost:5000/api/notes/${topic}`;

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: formData.title, content: formData.content })
        })
            .then(res => res.json())
            .then(() => {
                fetchNotes();
                setFormData({ id: null, title: '', content: '' });
                setSearchTerm(''); // Reset tìm kiếm sau khi lưu
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa ghi chú này?')) {
            fetch(`http://localhost:5000/api/notes/${topic}/${id}`, { method: 'DELETE' })
                .then(() => fetchNotes());
        }
    };

    const handleEdit = (note) => setFormData({
        id: note.id, 
        title: note.title, 
        content: note.content
    });

    // 2. Logic xử lý Tìm kiếm qua Backend API
    const handleSearchChange = (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);

        if (!keyword.trim()) {
            fetchNotes(); // Nếu xóa trắng ô tìm kiếm -> Trả về danh sách thuộc chủ đề đang chọn
            return;
        }

        // Gọi API tìm kiếm tất cả các file JSON chủ đề ở Backend
        fetch(`http://localhost:5000/api/notes-search/all?q=${encodeURIComponent(keyword)}`)
            .then(res => res.json())
            .then(data => setNotes(data));
    };

    // 3. Hàm hoàn chỉnh tô sáng từ khóa khớp trong văn bản
    const highlightText = (text, keyword) => {
        if (!keyword || !keyword.trim() || !text) return text;
        
        const parts = text.split(new RegExp(`(${keyword})`, 'gi'));
        return parts.map((part, index) => 
            part.toLowerCase() === keyword.toLowerCase() ? (
                <mark key={index} style={{ backgroundColor: '#ffe066', padding: '0 2px', borderRadius: '2px' }}>
                    {part}
                </mark>
            ) : (
                part
            )
        );
    };

    // Thêm dòng này để sắp xếp ghi chú mới nhất (ID lớn hơn) lên trên cùng
    const sortedNotes = [...notes].sort((a, b) => b.id - a.id); 

    /* ========================================================================
    VÙNG 3: RENDER GIAO DIỆN (UI/CSS)
    ======================================================================== */
    return (
        <div style={{ padding: '20px' }}>
            <h2>Ghi chú Công khai</h2>
             {/* 3.2. Ô NHẬP TÌM KIẾM */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="🔍 Tìm kiếm từ khóa trên toàn bộ ghi chú..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div> 

            {/* 3.1. Vùng chọn chủ đề */}
            <div style={{ marginBottom: '15px' }}>
                <strong>Chủ đề: </strong>
                <select 
                    value={topic} 
                    onChange={(e) => {
                        setTopic(e.target.value);
                        setSearchTerm(''); // Xóa từ khóa khi chuyển chủ đề
                    }}
                >
                    <option value="hoc-tap">Học tập</option>
                    <option value="cong-viec">Công việc</option>
                    <option value="ca-nhan">Cá nhân</option>
                </select>
            </div>

           

            {/* 3.3. Form Nhập liệu */}
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
                <h3>{formData.id ? 'Sửa ghi chú' : 'Thêm ghi chú mới'}</h3>
                <input
                    placeholder="Tiêu đề" 
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />
                <textarea
                    placeholder="Nội dung" 
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    style={{ display: 'block', width: '100%', height: '80px', marginBottom: '10px' }}
                />
                <button onClick={handleSave}>{formData.id ? 'Cập nhật' : 'Thêm mới'}</button>
                {formData.id && (
                    <button 
                        onClick={() => setFormData({ id: null, title: '', content: '' })}
                        style={{ marginLeft: '10px' }}
                    >
                        Hủy
                    </button>
                )}
            </div>

            {/* 3.4. Danh sách thẻ ghi chú */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {sortedNotes.length === 0 && (
                    <p>{searchTerm ? 'Không tìm thấy ghi chú nào khớp với từ khóa.' : 'Chưa có ghi chú nào.'}</p>
                )}
                {sortedNotes.map(note => (
                    <div key={note.id} style={{ border: '1px solid #007bff', padding: '15px', borderRadius: '5px' }}>
                        {/* Gọi hàm highlightText cho Tiêu đề và Nội dung */}
                        <h4 style={{ margin: '0 0 10px 0' }}>
                            {highlightText(note.title, searchTerm)}
                        </h4>
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                            {highlightText(note.content, searchTerm)}
                        </p>
                        
                        <div style={{ marginTop: '10px' }}>
                            <button onClick={() => handleEdit(note)} style={{ marginRight: '10px' }}>Sửa</button>
                            <button onClick={() => handleDelete(note.id)} style={{ color: 'red' }}>Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;