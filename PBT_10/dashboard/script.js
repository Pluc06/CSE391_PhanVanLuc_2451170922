// Các phần tử DOM
const btnRefresh = document.getElementById('refreshBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const timeIndicator = document.getElementById('timeIndicator');

// Danh sách URL APIs
const API_URLS = [
    "https://randomuser.me/api/",                  // Index 0: User
    "https://restcountries.com/v3.1/alpha/vn",     // Index 1: Country
    "https://dog.ceo/api/breeds/image/random"      // Index 2: Dog
];

// Hàm khởi tạo trạng thái Loading cho tất cả Widget
function setGlobalLoading() {
    btnRefresh.disabled = true;
    btnText.textContent = "Loading...";
    btnSpinner.classList.remove('hidden');
    timeIndicator.textContent = "Đang tải dữ liệu...";

    document.querySelectorAll('.widget-content').forEach(el => {
        el.innerHTML = `
            <div class="spinner"></div>
            <p style="margin-top: 10px; color: #666;">Đang fetch data...</p>
        `;
    });
}

// ==========================================
// YÊU CẦU BẮT BUỘC: Xử lý Promise.allSettled
// ==========================================
async function loadDashboard() {
    setGlobalLoading(); // Hiện loading tổng thể
    const startTime = Date.now();
    
    // Gọi song song 3 APIs. Thêm block catch() ở mỗi fetch để đảm bảo 
    // network error cũng trả về dạng rejected promise để allSettled bắt được.
    const results = await Promise.allSettled([
        fetch(API_URLS[0]).then(r => { if(!r.ok) throw new Error("API Lỗi!"); return r.json(); }),
        fetch(API_URLS[1]).then(r => { if(!r.ok) throw new Error("API Lỗi!"); return r.json(); }),
        fetch(API_URLS[2]).then(r => { if(!r.ok) throw new Error("API Lỗi!"); return r.json(); })
    ]);
    
    // Xử lý từng kết quả
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message || "Lỗi kết nối");
        }
    });
    
    // Tính toán và hiển thị thời gian
    const loadTime = Date.now() - startTime;
    timeIndicator.textContent = `Data loaded in ${loadTime} ms`;
    console.log(`Loaded in ${loadTime}ms`);

    // Reset nút Refresh
    btnRefresh.disabled = false;
    btnText.textContent = "Refresh All";
    btnSpinner.classList.add('hidden');
}

// ==========================================
// Các hàm Render giao diện
// ==========================================
function renderWidget(index, data) {
    let contentHtml = '';

    switch(index) {
        case 0: // Random User
            const user = data.results[0];
            contentHtml = `
                <img src="${user.picture.large}" class="profile-img" alt="User">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>📧 ${user.email}</p>
                <p>📍 ${user.location.country}</p>
            `;
            document.querySelector('#widget-user .widget-content').innerHTML = contentHtml;
            break;
            
        case 1: // Country Info
            const country = data[0];
            contentHtml = `
                <img src="${country.flags.svg}" class="flag-img" alt="Flag">
                <h3>${country.name.common}</h3>
                <p>Thủ đô: ${country.capital[0]}</p>
                <p>Dân số: ${country.population.toLocaleString()}</p>
            `;
            document.querySelector('#widget-country .widget-content').innerHTML = contentHtml;
            break;
            
        case 2: // Random Dog
            contentHtml = `
                <img src="${data.message}" class="dog-img" alt="Dog">
                <p>Một chú cún ngẫu nhiên!</p>
            `;
            document.querySelector('#widget-dog .widget-content').innerHTML = contentHtml;
            break;
    }
}

function renderWidgetError(index, errorMessage) {
    const errorHtml = `
        <div class="error-state">
            <span style="font-size: 2rem;">⚠️</span>
            <p class="error-text">Không thể tải dữ liệu</p>
            <p style="font-size: 0.8rem; color: #666;">Chi tiết: ${errorMessage}</p>
        </div>
    `;

    switch(index) {
        case 0: document.querySelector('#widget-user .widget-content').innerHTML = errorHtml; break;
        case 1: document.querySelector('#widget-country .widget-content').innerHTML = errorHtml; break;
        case 2: document.querySelector('#widget-dog .widget-content').innerHTML = errorHtml; break;
    }
}

// Gắn sự kiện cho nút Refresh
btnRefresh.addEventListener('click', loadDashboard);

// Chạy lần đầu khi mở trang
loadDashboard();