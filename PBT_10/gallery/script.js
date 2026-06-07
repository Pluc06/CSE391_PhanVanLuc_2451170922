const gallery = document.getElementById('gallery');
const loadTrigger = document.getElementById('load-trigger');
const loadingIndicator = document.getElementById('loading-indicator');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

let page = 1;
const limit = 20;
let isLoading = false;

// ==========================================
// 1. OBSERVER CHO LAZY LOADING IMAGES
// ==========================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Thay src tạm bằng data-src (link ảnh thật)
            img.src = img.dataset.src; 
            img.removeAttribute('data-src'); // Dọn dẹp DOM
            observer.unobserve(img); // Xong nhiệm vụ thì ngừng theo dõi ảnh này
        }
    });
}, {
    rootMargin: "50px" // Bắt đầu load trước khi user cuộn sát tới ảnh 50px
});

// ==========================================
// 2. FETCH API & RENDER (Lorem Picsum)
// ==========================================
async function fetchPhotos() {
    if (isLoading) return;
    isLoading = true;
    loadingIndicator.classList.remove('hidden');

    try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Lỗi tải API");
        const photos = await res.json();

        renderPhotos(photos);
        page++; // Tăng số trang lên chuẩn bị cho lần cuộn tới
    } catch (error) {
        console.error("Lỗi:", error);
        loadingIndicator.innerHTML = "<p style='color: red;'>Đã xảy ra lỗi khi tải ảnh.</p>";
    } finally {
        isLoading = false;
        loadingIndicator.classList.add('hidden');
    }
}

function renderPhotos(photos) {
    photos.forEach(photo => {
        const img = document.createElement('img');
        img.className = 'gallery-item';
        
        // Picsum cho phép cắt ảnh thông minh bằng cách nối độ phân giải vào sau ID
        const thumbnailUrl = `https://picsum.photos/id/${photo.id}/400/400`; // Ảnh nhẹ cho Grid
        const fullsizeUrl = `https://picsum.photos/id/${photo.id}/1200/800`; // Ảnh chất lượng cao cho Lightbox
        
        // Kỹ thuật Lazy Load:
        // Ban đầu gán src bằng một ảnh trong suốt 1x1 pixel siêu nhẹ để giữ chỗ
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        img.dataset.src = thumbnailUrl; // Cất link thật vào data-attribute
        
        img.alt = `Photo by ${photo.author}`;

        // Mở lightbox khi click
        img.addEventListener('click', () => openLightbox(fullsizeUrl));

        gallery.appendChild(img);
        
        // Đăng ký ảnh này với Image Observer
        imageObserver.observe(img);
    });
}

// ==========================================
// 3. OBSERVER CHO INFINITE SCROLL
// ==========================================
const scrollObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        fetchPhotos();
    }
}, {
    rootMargin: "100px" // Fetch API sớm trước khi user cuộn hẳn xuống kịch đáy 100px
});

// Quan sát thẻ #load-trigger nằm cuối trang
scrollObserver.observe(loadTrigger);

// ==========================================
// 4. CHỨC NĂNG LIGHTBOX (MODAL)
// ==========================================
function openLightbox(imgUrl) {
    lightboxImg.src = imgUrl;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Ngăn trang cuộn khi đang xem ảnh lớn
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    setTimeout(() => {
        lightboxImg.src = ""; // Dọn sạch src sau khi hoàn thành CSS Transition để tránh chớp ảnh cũ
    }, 300); 
    document.body.style.overflow = 'auto'; // Trả lại thanh cuộn
}

closeBtn.addEventListener('click', closeLightbox);

// Đóng khi click ra ngoài ảnh
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Hỗ trợ đóng bằng phím ESC trên Desktop
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
        closeLightbox();
    }
});