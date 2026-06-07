// 1. DỮ LIỆU
const images = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    url: `https://placehold.co/800x500?text=Image+${i + 1}`,
    alt: `Bức ảnh nghệ thuật số ${i + 1}`
}));

const commands = [
    { id: 'dark_mode', label: '🌙 Bật / Tắt Dark Mode', action: () => document.body.classList.toggle('dark-mode') },
    { id: 'play_slideshow', label: '▶️ Bắt đầu Slideshow tự động', action: () => startSlideshow() },
    { id: 'stop_slideshow', label: '⏸️ Dừng Slideshow', action: () => stopSlideshow() },
    { id: 'close_palette', label: '❌ Đóng bảng lệnh', action: () => closeCommandPalette() }
];

// 2. STATE ỨNG DỤNG
const state = {
    currentIndex: 0,
    isLightboxOpen: false,
    isPaletteOpen: false,
    slideshowInterval: null,
    isPlaying: false
};

// 3. KHỞI TẠO GIAO DIỆN GALLERY
function initGallery() {
    const container = document.getElementById('galleryContainer');
    images.forEach((img, index) => {
        // Sử dụng thẻ <button> cho các tương tác click/keyboard chuẩn A11y
        const btn = document.createElement('button');
        btn.className = 'gallery-item';
        btn.setAttribute('aria-label', `Xem chi tiết ${img.alt} (Phím số ${index + 1})`);
        btn.onclick = () => openLightbox(index);

        const imageEl = document.createElement('img');
        imageEl.src = img.url;
        imageEl.alt = img.alt;
        imageEl.loading = 'lazy'; // Tối ưu hiệu suất

        btn.appendChild(imageEl);
        container.appendChild(btn);
    });
}

// 4. LOGIC LIGHTBOX (GALLERY CHI TIẾT)
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxStatus = document.getElementById('lightboxStatus');

function openLightbox(index) {
    state.currentIndex = index;
    state.isLightboxOpen = true;
    updateLightboxImg();
    
    lightboxModal.removeAttribute('hidden');
    // Traps Focus: Chuyển focus vào nút đóng khi mở modal
    document.getElementById('closeLightboxBtn').focus();
}

function closeLightbox() {
    state.isLightboxOpen = false;
    stopSlideshow();
    lightboxModal.setAttribute('hidden', 'true');
    // Trả lại focus cho ảnh vừa được click trong gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems[state.currentIndex]) {
        galleryItems[state.currentIndex].focus();
    }
}

function updateLightboxImg() {
    const currentImg = images[state.currentIndex];
    lightboxImg.src = currentImg.url;
    lightboxImg.alt = currentImg.alt;
    lightboxStatus.textContent = state.isPlaying ? '▶ Đang tự động phát...' : `Ảnh ${state.currentIndex + 1} / ${images.length}`;
}

function nextImage() {
    state.currentIndex = (state.currentIndex + 1) % images.length;
    updateLightboxImg();
}

function prevImage() {
    state.currentIndex = (state.currentIndex - 1 + images.length) % images.length;
    updateLightboxImg();
}

// LOGIC SLIDESHOW
function toggleSlideshow() {
    if (state.isPlaying) stopSlideshow();
    else startSlideshow();
}

function startSlideshow() {
    if (!state.isLightboxOpen) openLightbox(state.currentIndex);
    state.isPlaying = true;
    updateLightboxImg();
    state.slideshowInterval = setInterval(nextImage, 2000);
}

function stopSlideshow() {
    state.isPlaying = false;
    clearInterval(state.slideshowInterval);
    if (state.isLightboxOpen) updateLightboxImg();
}

// 5. LOGIC COMMAND PALETTE (CTRL + K)
const commandPalette = document.getElementById('commandPalette');
const commandInput = document.getElementById('commandInput');
const commandList = document.getElementById('commandList');

function openCommandPalette() {
    state.isPaletteOpen = true;
    commandPalette.removeAttribute('hidden');
    commandInput.value = '';
    renderCommands(commands);
    commandInput.focus(); // Focus ngay vào ô input để gõ
}

function closeCommandPalette() {
    state.isPaletteOpen = false;
    commandPalette.setAttribute('hidden', 'true');
    // Trả focus về body
    document.body.focus();
}

function renderCommands(cmdArray) {
    commandList.innerHTML = '';
    if (cmdArray.length === 0) {
        commandList.innerHTML = '<div style="padding: 15px; color: gray;">Không tìm thấy lệnh...</div>';
        return;
    }
    
    cmdArray.forEach((cmd, index) => {
        const btn = document.createElement('button');
        btn.className = 'command-item';
        btn.role = 'option';
        btn.textContent = cmd.label;
        btn.setAttribute('aria-label', `Lệnh: ${cmd.label}`);
        
        btn.onclick = () => {
            cmd.action();
            closeCommandPalette();
        };
        
        // Khi enter vào command list, execute
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                cmd.action();
                closeCommandPalette();
            }
        });

        commandList.appendChild(btn);
    });
}

// Lọc Command khi gõ
commandInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = commands.filter(cmd => cmd.label.toLowerCase().includes(keyword));
    renderCommands(filtered);
});

// 6. GLOBAL KEYBOARD SHORTCUTS MANAGER
document.addEventListener('keydown', (e) => {
    // Kiểm tra xem user có đang gõ text vào ô input không
    const isTyping = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

    // Shortcut 1: Mở Command Palette (Ctrl + K)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Chặn hành vi focus thanh địa chỉ của trình duyệt
        if (state.isPaletteOpen) closeCommandPalette();
        else openCommandPalette();
        return;
    }

    // Shortcut 2: Nút Escape (Đóng Modal)
    if (e.key === 'Escape') {
        if (state.isPaletteOpen) closeCommandPalette();
        if (state.isLightboxOpen) closeLightbox();
        return;
    }

    // --- Các shortcut dưới đây KHÔNG kích hoạt nếu người dùng đang gõ Text ---
    if (isTyping && e.key !== 'Enter') return; 

    // Shortcut 3: Space (Play/Pause Slideshow)
    if (e.code === 'Space') {
        e.preventDefault(); // Chặn cuộn trang
        toggleSlideshow();
    }

    // Shortcut 4: Mũi tên (Prev / Next)
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();

    // Shortcut 5: Phím số 1-9 (Jump to Image)
    if (/^[1-9]$/.test(e.key)) {
        const index = parseInt(e.key) - 1; // Mảng tính từ 0
        if (index < images.length) {
            openLightbox(index);
        }
    }
});

// Gán sự kiện Click cho nút UI
document.getElementById('closeLightboxBtn').onclick = closeLightbox;
document.getElementById('nextBtn').onclick = nextImage;
document.getElementById('prevBtn').onclick = prevImage;

// Khởi chạy App
initGallery();