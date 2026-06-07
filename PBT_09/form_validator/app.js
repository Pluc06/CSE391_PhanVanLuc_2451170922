// 1. CHỌN CÁC PHẦN TỬ DOM
const form = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirmPassword');
const phoneInput = document.getElementById('phone');
const submitBtn = document.getElementById('submitBtn');

// Trạng thái hợp lệ của từng trường dữ liệu
const validity = {
    name: false,
    email: false,
    password: false,
    confirm: false,
    phone: false
};

// 2. CÁC HÀM VALIDATION CHI TIẾT

// Validate Tên (2-50 ký tự)
nameInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const icon = document.getElementById('nameIcon');
    
    if (value.length >= 2 && value.length <= 50) {
        icon.textContent = '✅';
        validity.name = true;
    } else {
        icon.textContent = value.length > 0 ? '❌' : '';
        validity.name = false;
    }
    checkFormCompletion();
});

// Validate Email
emailInput.addEventListener('input', (e) => {
    const value = e.target.value.trim();
    const errorBox = document.getElementById('emailError');
    // Regex kiểm tra định dạng email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        errorBox.textContent = '';
        validity.email = false;
    } else if (!emailRegex.test(value)) {
        errorBox.textContent = 'Email không hợp lệ (Vd: abc@gmail.com)';
        validity.email = false;
    } else {
        errorBox.textContent = '';
        validity.email = true;
    }
    checkFormCompletion();
});

// Validate Mật khẩu (Strength Meter)
passwordInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const progress = document.getElementById('passwordProgress');
    const text = document.getElementById('passwordText');
    
    // Reset class
    progress.className = 'progress';
    text.className = 'strength-text';
    validity.password = false;

    if (value.length === 0) {
        text.textContent = '';
        checkFormCompletion();
        checkConfirmPassword(); // Cập nhật lại lỗi confirm nếu pass thay đổi
        return;
    }

    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /[0-9]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    // Kiểm tra các mốc độ mạnh
    if (value.length >= 8 && hasLower && hasUpper && hasNumbers && hasSpecial) {
        progress.classList.add('strong-bg');
        text.classList.add('strong-text');
        text.textContent = 'Mạnh';
        validity.password = true;
    } 
    else if (value.length >= 8 && hasLetters && hasNumbers) {
        progress.classList.add('medium-bg');
        text.classList.add('medium-text');
        text.textContent = 'Trung bình';
        validity.password = true;
    } 
    else {
        progress.classList.add('weak-bg');
        text.classList.add('weak-text');
        text.textContent = 'Yếu (Cần ít nhất 8 ký tự)';
        // Yêu cầu: Yếu < 8 ký tự hoặc chưa đủ điều kiện trung bình -> Form không hợp lệ
        validity.password = false; 
    }

    checkConfirmPassword(); // Kiểm tra lại trường confirm
    checkFormCompletion();
});

// Validate Xác nhận mật khẩu
function checkConfirmPassword() {
    const passValue = passwordInput.value;
    const confirmValue = confirmInput.value;
    const errorBox = document.getElementById('confirmError');

    if (confirmValue === '') {
        errorBox.textContent = '';
        validity.confirm = false;
    } else if (confirmValue !== passValue) {
        errorBox.textContent = 'Mật khẩu không khớp!';
        validity.confirm = false;
    } else {
        errorBox.textContent = '';
        validity.confirm = true;
    }
}
confirmInput.addEventListener('input', () => {
    checkConfirmPassword();
    checkFormCompletion();
});

// Validate Điện thoại & Auto Format (0901-234-567)
phoneInput.addEventListener('input', (e) => {
    // Chỉ giữ lại số
    let numbers = e.target.value.replace(/\D/g, '');
    let formatted = '';
    const errorBox = document.getElementById('phoneError');

    // Chặn nhập quá 10 số
    if (numbers.length > 10) numbers = numbers.substring(0, 10);

    // Format string: xxxx-xxx-xxx
    if (numbers.length > 7) {
        formatted = `${numbers.substring(0, 4)}-${numbers.substring(4, 7)}-${numbers.substring(7)}`;
    } else if (numbers.length > 4) {
        formatted = `${numbers.substring(0, 4)}-${numbers.substring(4)}`;
    } else {
        formatted = numbers;
    }

    // Gán lại value cho input
    e.target.value = formatted;

    // Check validity (phải đủ 10 số)
    if (numbers.length === 0) {
        errorBox.textContent = '';
        validity.phone = false;
    } else if (numbers.length < 10) {
        errorBox.textContent = 'Số điện thoại phải đủ 10 số';
        validity.phone = false;
    } else {
        errorBox.textContent = '';
        validity.phone = true;
    }
    
    checkFormCompletion();
});

// 3. KIỂM TRA TOÀN BỘ FORM
function checkFormCompletion() {
    // Nếu tất cả values trong object 'validity' đều true => Bật nút Submit
    const isValid = Object.values(validity).every(status => status === true);
    submitBtn.disabled = !isValid;
}

// 4. XỬ LÝ SỰ KIỆN SUBMIT FORM
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Chặn load lại trang

    // Lấy thông tin hiển thị lên Modal
    const modalData = document.getElementById('modalData');
    modalData.innerHTML = `
        <p><strong>Tên:</strong> ${nameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>Điện thoại:</strong> ${phoneInput.value}</p>
    `;

    // Hiển thị modal
    document.getElementById('successModal').classList.add('active');
});

// 5. ĐÓNG MODAL & RESET FORM
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('successModal').classList.remove('active');
    
    // Clear toàn bộ input và reset state
    form.reset();
    document.getElementById('nameIcon').textContent = '';
    document.getElementById('passwordProgress').className = 'progress';
    document.getElementById('passwordText').textContent = '';
    
    // Reset object trạng thái
    for(let key in validity) validity[key] = false;
    submitBtn.disabled = true;
});