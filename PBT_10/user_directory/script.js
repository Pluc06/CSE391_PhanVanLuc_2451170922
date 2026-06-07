// ==========================================
// 1. Tách riêng API layer
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async getUsers() {
        const res = await fetch(`${this.baseURL}/users`);
        if (!res.ok) throw new Error("Lỗi tải danh sách người dùng!");
        return res.json();
    },
    async getUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`);
        if (!res.ok) throw new Error("Lỗi tải chi tiết người dùng!");
        return res.json();
    },
    async createUser(data) {
        const res = await fetch(`${this.baseURL}/users`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!res.ok) throw new Error("Lỗi khi tạo người dùng!");
        return res.json();
    },
    async updateUser(id, data) {
        const res = await fetch(`${this.baseURL}/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        if (!res.ok) throw new Error("Lỗi khi cập nhật người dùng!");
        return res.json();
    },
    async deleteUser(id) {
        const res = await fetch(`${this.baseURL}/users/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error("Lỗi khi xóa người dùng!");
        return true;
    }
};

// ==========================================
// 2. Tách riêng UI layer
// ==========================================
const ui = {
    userList: document.getElementById('userList'),
    toastContainer: document.getElementById('toastContainer'),

    renderUsers(users) {
        this.userList.innerHTML = '';
        if (users.length === 0) {
            this.userList.innerHTML = '<p>Không tìm thấy người dùng nào.</p>';
            return;
        }

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <div>
                    <h3>${user.name}</h3>
                    <p>📧 ${user.email}</p>
                </div>
                <div class="card-actions">
                    <button class="btn-edit" onclick="app.editUser(${user.id})">Edit</button>
                    <button class="btn-delete" onclick="app.deleteUser(${user.id})">Delete</button>
                </div>
            `;
            this.userList.appendChild(card);
        });
    },

    showLoading() {
        // Hiển thị 6 thẻ skeleton làm ví dụ
        this.userList.innerHTML = Array(6).fill(`
            <div class="user-card skeleton-card" style="border: 1px solid #ddd;">
                <div class="skeleton skeleton-text title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 50%; margin-top: 20px;"></div>
            </div>
        `).join('');
    },

    hideLoading() {
        this.userList.innerHTML = '';
    },

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        this.toastContainer.appendChild(toast);
        // Tự động xóa sau 3s
        setTimeout(() => toast.remove(), 3000);
    },

    showError(message) {
        this.showToast(message, 'error');
    },

    showSuccess(message) {
        this.showToast(message, 'success');
    }
};

// ==========================================
// 3. Application Controller (Logic nối API & UI)
// ==========================================
const app = {
    localUsers: [], // Lưu state tại client để search & update UI mượt mà
    
    // DOM Elements
    form: document.getElementById('userForm'),
    idInput: document.getElementById('userId'),
    nameInput: document.getElementById('nameInput'),
    emailInput: document.getElementById('emailInput'),
    submitBtn: document.getElementById('submitBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    searchInput: document.getElementById('searchInput'),

    async init() {
        this.bindEvents();
        ui.showLoading();
        try {
            this.localUsers = await api.getUsers();
            ui.renderUsers(this.localUsers);
        } catch (error) {
            ui.showError(error.message);
            ui.hideLoading();
        }
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.resetForm());
        this.searchInput.addEventListener('input', () => this.handleSearch());
    },

    async handleSubmit(e) {
        e.preventDefault();
        const id = this.idInput.value;
        const userData = {
            name: this.nameInput.value,
            email: this.emailInput.value
        };

        this.setButtonLoading(true);

        try {
            if (id) {
                // [UPDATE]
                await api.updateUser(id, userData);
                // Cập nhật lại mảng local
                const index = this.localUsers.findIndex(u => u.id == id);
                if (index !== -1) this.localUsers[index] = { ...this.localUsers[index], ...userData };
                ui.showSuccess("Cập nhật thành công!");
            } else {
                // [CREATE]
                const newUser = await api.createUser(userData);
                // Fix lỗi của JSONPlaceholder luôn trả về id: 101 cho mọi post request -> sinh id giả lập để render ko lỗi
                newUser.id = Date.now(); 
                this.localUsers.unshift(newUser); // Thêm lên đầu danh sách
                ui.showSuccess("Thêm user thành công!");
            }
            this.resetForm();
            this.handleSearch(); // Render lại danh sách
        } catch (error) {
            ui.showError(error.message);
        } finally {
            this.setButtonLoading(false);
        }
    },

    editUser(id) {
        // Lấy data từ state đẩy lên Form
        const user = this.localUsers.find(u => u.id == id);
        if (!user) return;
        
        this.idInput.value = user.id;
        this.nameInput.value = user.name;
        this.emailInput.value = user.email;
        
        this.submitBtn.textContent = "Cập nhật";
        this.cancelBtn.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu
    },

    async deleteUser(id) {
        if (!confirm("Bạn có chắc chắn muốn xóa user này không?")) return;
        
        try {
            await api.deleteUser(id);
            // Xóa khỏi state local
            this.localUsers = this.localUsers.filter(u => u.id != id);
            this.handleSearch(); // Render lại
            ui.showSuccess("Đã xóa user!");
        } catch (error) {
            ui.showError(error.message);
        }
    },

    handleSearch() {
        const keyword = this.searchInput.value.toLowerCase().trim();
        const filtered = this.localUsers.filter(u => 
            u.name.toLowerCase().includes(keyword) || 
            u.email.toLowerCase().includes(keyword)
        );
        ui.renderUsers(filtered);
    },

    resetForm() {
        this.form.reset();
        this.idInput.value = '';
        this.submitBtn.textContent = "Thêm User";
        this.cancelBtn.classList.add('hidden');
    },

    setButtonLoading(isLoading) {
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = "Đang xử lý...";
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = this.idInput.value ? "Cập nhật" : "Thêm User";
        }
    }
};

// Khởi chạy App
app.init();