const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherState = document.getElementById('weatherState');
const historyList = document.getElementById('historyList');

// Mã quy đổi icon thời tiết đơn giản từ Open-Meteo WMO code
const getWeatherIcon = (code) => {
    if (code === 0) return "☀️ Trời quang";
    if (code >= 1 && code <= 3) return "⛅ Có mây";
    if (code >= 45 && code <= 48) return "🌫️ Sương mù";
    if (code >= 51 && code <= 67) return "🌧️ Mưa";
    if (code >= 71 && code <= 77) return "❄️ Tuyết";
    if (code >= 95) return "⛈️ Có dông";
    return "☁️ Không xác định";
};

// ==========================================
// [5đ] QUẢN LÝ LỊCH SỬ & LOCALSTORAGE
// ==========================================
function getHistory() {
    return JSON.parse(localStorage.getItem('weatherHistory') || '[]');
}

function saveHistory(city) {
    let history = getHistory();
    // Xóa thành phố nếu đã tồn tại để đẩy lên đầu
    history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
    history.unshift(city); // Thêm vào đầu mảng
    if (history.length > 5) history.pop(); // Giữ tối đa 5 phần tử
    
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const history = getHistory();
    historyList.innerHTML = '';
    history.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        // Click vào lịch sử -> tìm lại
        li.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(li);
    });
}

// ==========================================
// [5đ] HIỂN THỊ 3 TRẠNG THÁI (Loading/Success/Error)
// ==========================================
function renderLoading() {
    weatherState.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Đang tải...</p>
        </div>
    `;
}

function renderError(msg) {
    weatherState.innerHTML = `
        <div class="error-state">
            <p class="error-text">❌ ${msg}</p>
        </div>
    `;
}

function renderSuccess(weatherData, cityName) {
    weatherState.innerHTML = `
        <div class="success-info">
            <h2>${cityName}</h2>
            <p class="temp">${weatherData.temperature}°C</p>
            <p>Sức gió: ${weatherData.windspeed} km/h</p>
            <p>Mô tả: ${getWeatherIcon(weatherData.weathercode)}</p>
        </div>
    `;
}

// ==========================================
// [5đ] GỌI API FETCH + PARSE JSON
// ==========================================
async function fetchWeather(city) {
    if (!city.trim()) return;
    
    renderLoading(); // Gọi State 1: Loading

    try {
        // Bước 1: Dùng Geocoding API để chuyển Tên thành phố -> Tọa độ (Lat/Lng)
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Thành phố không tồn tại!");
        }

        const { latitude, longitude, name } = geoData.results[0];

        // Bước 2: Dùng Tọa độ lấy dữ liệu thời tiết hiện tại
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        
        if (!weatherRes.ok) throw new Error("Lỗi khi tải dữ liệu thời tiết.");
        
        const weatherData = await weatherRes.json(); // Parse JSON

        // Gọi State 2: Success
        renderSuccess(weatherData.current_weather, name);
        saveHistory(name); // Lưu LocalStorage khi thành công

    } catch (error) {
        // Gọi State 3: Error
        // Bắt lỗi mất mạng (Failed to fetch) hoặc lỗi do mình ném ra (Thành phố không tồn tại)
        if (error.message === "Failed to fetch") {
            renderError("Mất mạng hoặc lỗi kết nối.");
        } else {
            renderError(error.message);
        }
    }
}

// Lắng nghe sự kiện nút Tìm kiếm
searchBtn.addEventListener('click', () => {
    fetchWeather(cityInput.value);
});

// Cho phép bấm Enter để tìm
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
});

// Chạy lần đầu để hiển thị lịch sử
renderHistory();