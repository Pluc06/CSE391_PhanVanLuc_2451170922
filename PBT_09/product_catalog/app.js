// 1. DỮ LIỆU SẢN PHẨM (Khai báo trong JS)
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "Galaxy S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200?text=S24+Ultra", rating: 4.8, inStock: true },
    { id: 3, name: "Xiaomi 14 Pro", price: 21990000, category: "phone", image: "https://placehold.co/200?text=Xiaomi+14", rating: 4.4, inStock: false },
    { id: 4, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200?text=MacBook", rating: 4.9, inStock: true },
    { id: 5, name: "ThinkPad X1 Carbon", price: 35990000, category: "laptop", image: "https://placehold.co/200?text=ThinkPad", rating: 4.7, inStock: true },
    { id: 6, name: "Dell XPS 15", price: 32000000, category: "laptop", image: "https://placehold.co/200?text=Dell+XPS", rating: 4.6, inStock: true },
    { id: 7, name: "iPad Pro M4", price: 28990000, category: "tablet", image: "https://placehold.co/200?text=iPad+Pro", rating: 4.9, inStock: true },
    { id: 8, name: "Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/200?text=Tab+S9", rating: 4.5, inStock: true },
    { id: 9, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200?text=Pad+6", rating: 4.3, inStock: false },
    { id: 10, name: "AirPods Pro 2", price: 5990000, category: "accessory", image: "https://placehold.co/200?text=AirPods", rating: 4.8, inStock: true },
    { id: 11, name: "Sony WH-1000XM5", price: 8490000, category: "accessory", image: "https://placehold.co/200?text=Sony+XM5", rating: 4.7, inStock: true },
    { id: 12, name: "Logitech MX Master 3S", price: 2490000, category: "accessory", image: "https://placehold.co/200?text=MX+Master", rating: 4.9, inStock: true }
];

// 2. STATE TRẠNG THÁI LỌC
let appState = {
    search: '',
    category: 'all',
    sort: 'default',
    cartCount: 0
};

// 3. KHỞI TẠO BỘ KHUNG GIAO DIỆN
function initApp() {
    const app = document.getElementById('app');
    
    // Header
    const header = document.createElement('div');
    header.className = 'top-bar';
    header.innerHTML = `
        <h2>Cửa Hàng</h2>
        <div>
            <button id="toggleThemeBtn" style="padding: 5px 10px; margin-right: 20px;">🌙 Dark Mode</button>
            <span class="cart">🛒 <span id="cartBadge" class="cart-badge">0</span></span>
        </div>
    `;

    // Thanh điều khiển (Controls)
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <div class="filters" id="categoryFilters">
            <button data-cat="all" class="active">Tất cả</button>
            <button data-cat="phone">Điện thoại</button>
            <button data-cat="laptop">Laptop</button>
            <button data-cat="tablet">Tablet</button>
            <button data-cat="accessory">Phụ kiện</button>
        </div>
        <input type="text" id="searchInput" placeholder="Tìm kiếm sản phẩm...">
        <select id="sortSelect">
            <option value="default">Sắp xếp</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
            <option value="nameAsc">Tên A-Z</option>
            <option value="ratingDesc">Đánh giá cao nhất</option>
        </select>
    `;

    // Lưới hiển thị sản phẩm
    const grid = document.createElement('div');
    grid.id = 'productGrid';
    grid.className = 'grid';

    // Đưa toàn bộ vào DOM
    app.appendChild(header);
    app.appendChild(controls);
    app.appendChild(grid);

    // Ràng buộc sự kiện (Event Listeners)
    bindEvents();
    
    // Render lần đầu tiên
    applyStateAndRender();
}

// 4. HÀM XỬ LÝ CHÍNH
function renderProducts(data) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = ''; // Xóa lưới hiện tại

    if (data.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Không có sản phẩm nào.</p>';
        return;
    }

    // Yêu cầu: Tạo cards bằng createElement
    data.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.addEventListener('click', () => showModal(product)); // Click Card -> Modal

        const img = document.createElement('img');
        img.src = product.image;

        const name = document.createElement('h3');
        name.textContent = product.name;

        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = product.price.toLocaleString('vi-VN') + ' đ';

        const rating = document.createElement('p');
        rating.textContent = `⭐ ${product.rating}`;

        const btn = document.createElement('button');
        btn.textContent = product.inStock ? 'Thêm vào giỏ' : 'Hết hàng';
        btn.disabled = !product.inStock;
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện nổi bọt để không mở Modal khi bấm nút
            addToCart();
        });

        // Append vào thẻ div
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(price);
        card.appendChild(rating);
        card.appendChild(btn);

        grid.appendChild(card);
    });
}

function filterByCategory(category) {
    appState.category = category;
    
    // Xử lý UI nút bấm
    document.querySelectorAll('#categoryFilters button').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.cat === category) btn.classList.add('active');
    });

    applyStateAndRender();
}

function searchProducts(keyword) {
    appState.search = keyword.toLowerCase();
    applyStateAndRender();
}

function sortProducts(sortType) {
    appState.sort = sortType;
    applyStateAndRender();
}

// 5. CÁC HÀM TIỆN ÍCH HỖ TRỢ
function applyStateAndRender() {
    // Pipeline: Lấy dữ liệu -> Lọc -> Sắp xếp -> Render
    let result = products.filter(p => {
        const matchCat = (appState.category === 'all') || (p.category === appState.category);
        const matchSearch = p.name.toLowerCase().includes(appState.search);
        return matchCat && matchSearch;
    });

    if (appState.sort === 'priceAsc') result.sort((a, b) => a.price - b.price);
    if (appState.sort === 'priceDesc') result.sort((a, b) => b.price - a.price);
    if (appState.sort === 'nameAsc') result.sort((a, b) => a.name.localeCompare(b.name));
    if (appState.sort === 'ratingDesc') result.sort((a, b) => b.rating - a.rating);

    renderProducts(result);
}

function addToCart() {
    appState.cartCount++;
    const badge = document.getElementById('cartBadge');
    badge.textContent = appState.cartCount;
    badge.style.display = 'inline-block';
}

function showModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.addEventListener('click', (e) => {
        if(e.target === overlay) document.body.removeChild(overlay);
    });

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = `
        <span class="close-btn">&times;</span>
        <img src="${product.image}" style="width: 100%; height: 200px; object-fit: contain; margin-bottom: 15px;">
        <h2>${product.name}</h2>
        <p style="color: var(--danger); font-size: 1.5rem; font-weight: bold; margin: 15px 0;">
            ${product.price.toLocaleString('vi-VN')} đ
        </p>
        <p>Phân loại: <strong>${product.category.toUpperCase()}</strong></p>
        <p>Tình trạng: ${product.inStock ? '<span style="color: green">Còn hàng</span>' : '<span style="color: red">Hết hàng</span>'}</p>
    `;

    modalContent.querySelector('.close-btn').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    overlay.appendChild(modalContent);
    document.body.appendChild(overlay);
}

// 6. RÀNG BUỘC SỰ KIỆN (Events)
function bindEvents() {
    // Real-time Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });

    // Category Buttons
    document.getElementById('categoryFilters').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            filterByCategory(e.target.dataset.cat);
        }
    });

    // Sort
    document.getElementById('sortSelect').addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });

    // Dark Mode Toggle
    document.getElementById('toggleThemeBtn').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// KHỞI ĐỘNG CHƯƠNG TRÌNH
document.addEventListener('DOMContentLoaded', initApp);