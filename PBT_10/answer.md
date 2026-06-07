# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — Sync vs Async
* Thứ tự output dự đoán:
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms

* Giải thích thông qua cơ chế Event Loop:
Event Loop quản lý việc thực thi mã JavaScript qua 3 vùng chính: Call Stack (chạy code đồng bộ), Microtask Queue (ưu tiên cao - chứa Promise/async), và Macrotask/Task Queue (ưu tiên thấp - chứa setTimeout, setInterval).

- Chạy code đồng bộ (Call Stack):
console.log("1 - Start") chạy ngay lập tức.
setTimeout(..., 0) bị đẩy vào Web APIs, sau đó đẩy callback vào Macrotask Queue.
Promise.resolve().then(...) đẩy callback ("3 - Promise") vào Microtask Queue.
console.log("4 - End") chạy ngay lập tức.
setTimeout(..., 100) đẩy vào Web APIs (chờ 100ms mới đẩy vào Macrotask Queue)
Promise.resolve().then(...) đẩy callback ("6 - Promise 2") vào Microtask Queue.

- Xử lý Microtask Queue (Ưu tiên cao nhất sau khi Call Stack rỗng):
Lấy ("3 - Promise") ra chạy.
Lấy ("6 - Promise 2") ra chạy. Bên trong callback này lại có một setTimeout(..., 0), nên nó đẩy ("7 - Nested timeout") vào Macrotask Queue.

- Xử lý Macrotask Queue (Ưu tiên sau Microtask):
Lấy ("2 - Timeout 0ms") ra chạy (đã nằm sẵn ở đây từ đầu).
Lấy ("7 - Nested timeout") ra chạy (vừa được đẩy vào từ bước trước).
Sau 100ms, lấy ("5 - Timeout 100ms") ra chạy.

## Câu A2 (5đ) — Fetch API
1. await fetch(...) — fetch trả về gì? Tại sao cần await?

Trả về: fetch luôn trả về một Promise. Khi Promise này resolve, nó trả về một object Response đại diện cho HTTP response.
Tại sao cần await: Gửi request mạng mất thời gian. await giúp tạm dừng thực thi hàm getData() cho đến khi nhận được phản hồi từ server (hoặc bị lỗi mạng), thay vì viết .then(). Mã sẽ trông giống đồng bộ và dễ đọc hơn.

2. response.ok — Khi nào false? Liệt kê 3 status codes tương ứng.

Khi nào false: Thuộc tính ok là một boolean, nó chỉ true khi HTTP Status Code nằm trong khoảng thành công từ 200 đến 299. Nó sẽ là false với bất kỳ mã nào nằm ngoài khoảng đó (lỗi client, lỗi server, chuyển hướng).

3 Status codes (false) ví dụ:
404 Not Found (Không tìm thấy tài nguyên).
401 Unauthorized (Không có quyền truy cập/Sai token).
500 Internal Server Error (Lỗi từ phía máy chủ).

3. response.json() — Tại sao cần await lần nữa?

Khi fetch resolve, phần thân (body) của response chưa được tải xuống hoặc parse hoàn toàn (dữ liệu có thể rất lớn và được stream từng phần). Hàm response.json() trả về một Promise khác để thực hiện việc đọc dữ liệu stream này và parse nó thành JavaScript Object. Vì nó trả về Promise, ta phải tiếp tục dùng await để lấy kết quả cuối cùng.

4. try...catch — Catch những lỗi gì?

Network error: Bắt được nếu người dùng mất mạng (offline), sai URL, hoặc bị CORS block (fetch sẽ tự động reject).
404: KHÔNG tự động bắt bằng catch. fetch vẫn coi 404 hoặc 500 là kết nối "thành công" (có phản hồi từ server). Đó là lý do trong code có dòng if (!response.ok) { throw new Error(...) } để ép nó văng vào khối catch.
JSON parse error: Bắt được nếu dữ liệu server trả về không phải là JSON hợp lệ (ví dụ server trả về chuỗi HTML hoặc plain text), hàm response.json() sẽ văng lỗi.

## Câu A3 (5đ) — Promise States
1. Sơ đồ 3 trạng thái của Promise:


                  [ PENDING ] (Đang chờ xử lý)
                 /           \
  (Thành công)  /             \  (Thất bại)
               v               v
    [ FULFILLED ]            [ REJECTED ]
(Có data, chạy .then)     (Có error, chạy .catch)

2. Callback Hell là gì?
Callback Hell là tình trạng các hàm callback bất đồng bộ lồng vào nhau quá sâu (thường tạo thành hình kim tự tháp lùi dần sang phải). Điều này làm code cực kỳ khó đọc, khó bảo trì, và đặc biệt khó xử lý lỗi chung (mỗi tầng lại phải viết một cụm if/else để bắt lỗi).

Ví dụ 4 cấp Callback Hell:

// Cấp 1: Lấy thông tin user
getUser(userId, function(err, user) {
    if (err) return console.error(err);
    
    // Cấp 2: Lấy danh sách bài post của user đó
    getPosts(user.id, function(err, posts) {
        if (err) return console.error(err);
        
        // Cấp 3: Lấy comment của bài post đầu tiên
        getComments(posts[0].id, function(err, comments) {
            if (err) return console.error(err);
            
            // Cấp 4: Lấy chi tiết tác giả của comment đầu tiên
            getAuthor(comments[0].authorId, function(err, author) {
                if (err) return console.error(err);
                console.log("Thông tin tác giả comment:", author);
            });
        });
    });
});
Refactor thành async/await:
Việc sử dụng async/await làm phẳng hoàn toàn kim tự tháp, đưa code về dạng đọc từ trên xuống dưới như code đồng bộ và gom xử lý lỗi vào một block try...catch duy nhất.

async function getAuthorInfo(userId) {
    try {
        const user = await getUser(userId);           // Cấp 1
        const posts = await getPosts(user.id);        // Cấp 2
        const comments = await getComments(posts[0].id); // Cấp 3
        const author = await getAuthor(comments[0].authorId); // Cấp 4
        
        console.log("Thông tin tác giả comment:", author);
    } catch (error) {
        // Chỉ cần 1 chỗ để gom toàn bộ lỗi ở bất kỳ bước nào
        console.error("Đã xảy ra lỗi trong chuỗi xử lý:", error);
    }
}

# PHẦN C — PHÂN TÍCH (20 điểm)
## Câu C1 (10đ) — Error Handling Strategy

1. Chiến lược xử lý các loại lỗi
- Network Errors (Mất mạng, DNS không tìm thấy):
+ Đặc điểm: Hàm fetch sẽ tự động quăng lỗi (reject/throw error).
+ Xử lý: Bắt lỗi trong khối catch. Hiển thị thông báo Toast/Snackbar: "Không có kết nối mạng. Vui lòng kiểm tra lại đường truyền."
+ Chiến thuật nâng cao: Sử dụng Service Worker (PWA) để cache lại request (ví dụ: nút "Thêm vào giỏ" sẽ được lưu vào background sync và tự động gửi lại khi có mạng).

- API Errors (Server phản hồi với status lỗi):
+ Đặc điểm: fetch KHÔNG throw error, nó vẫn chạy vào block try. Ta phải tự check if (!response.ok).
+ Xử lý từng loại:

500 Internal Server Error: Lỗi máy chủ. Trả về UI: "Hệ thống đang gặp sự cố, vui lòng thử lại sau". Đăng xuất lỗi này lên các công cụ tracking (Sentry, Datadog).

404 Not Found: Không tìm thấy dữ liệu (ví dụ xem chi tiết 1 sản phẩm đã bị xóa). Điều hướng người dùng về trang "404 - Sản phẩm không tồn tại" hoặc quay lại trang chủ.

429 Too Many Requests: User bấm nút quá nhanh hoặc hệ thống đang quá tải. Trả về UI: "Bạn đang thao tác quá nhanh, vui lòng chờ X giây". Áp dụng cơ chế Throttling/Debouncing ở nút bấm trên Frontend.

2. Timeout (API chậm > 10 giây)
Mặc định fetch của trình duyệt sẽ đợi rất lâu (có thể 1-2 phút) mới timeout. Trong E-Commerce, nếu quá 10s không load được sản phẩm, ta nên ngắt request để hiển thị lỗi.

Sử dụng AbortController để thiết lập thời gian timeout.

JavaScript
/**
 * fetch với cơ chế Timeout
 */
async function fetchWithTimeout(url, options = {}, timeLimitMs = 10000) {
    // 1. Tạo một controller để có thể ra lệnh "hủy" request
    const controller = new AbortController();
    const { signal } = controller;

    // 2. Thiết lập hẹn giờ: nếu hết thời gian mà chưa chạy xong thì gọi lệnh hủy
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeLimitMs);

    try {
        // Gắn signal vào options của fetch
        const response = await fetch(url, { ...options, signal });
        
        // 3. Nếu fetch thành công trước thời hạn, xóa hẹn giờ đi
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return await response.json();
        
    } catch (error) {
        // Kiểm tra xem lỗi văng ra có phải do ta chủ động abort hay không
        if (error.name === 'AbortError') {
            throw new Error(`Request timeout: Quá thời gian chờ ${timeLimitMs}ms`);
        }
        throw error;
    }
}
3. Retry Logic (Tự động thử lại)
Thường áp dụng cho các lỗi do mạng chập chờn hoặc do server bị quá tải tạm thời (502, 503, 504).

JavaScript
/**
 * fetch với cơ chế Retry
 */
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    let currentAttempt = 0;

    while (currentAttempt < maxRetries) {
        try {
            const response = await fetch(url, options);
            
            // Nếu gọi thành công (200-299), trả về luôn
            if (response.ok) {
                return await response.json();
            }

            // Nếu server trả lỗi 4xx (lỗi từ phía client, vd 400 sai param, 404 không thấy)
            // thì KHÔNG NÊN thử lại vì có thử lại mấy lần cũng vẫn sai.
            if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                throw new Error(`Client Error ${response.status}, không retry.`);
            }

            // Các lỗi 5xx hoặc 429 thì văng lỗi để nhảy xuống catch và tiến hành retry
            throw new Error(`Server/Rate limit Error: ${response.status}`);
            
        } catch (error) {
            currentAttempt++;
            console.warn(`Lần thử thứ ${currentAttempt} thất bại. Lỗi: ${error.message}`);
            
            // Nếu đã hết số lần retry cho phép thì ném lỗi ra ngoài cho UI xử lý
            if (currentAttempt >= maxRetries) {
                throw new Error(`Call API thất bại sau ${maxRetries} lần thử.`);
            }

            // (Tuỳ chọn: Exponential Backoff) Chờ một lát rồi mới thử lại, lần sau chờ lâu hơn lần trước
            const waitTime = Math.pow(2, currentAttempt) * 1000; // 2s, 4s...
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}

## Câu C2 (10đ) — Promise.all vs Promise.allSettled vs Promise.race

1. Bảng So Sánh Cơ Chế Hoạt Động

| Phương thức | Khi nào resolve? | Khi nào reject? | Use case thực tế |
| :--- | :--- | :--- | :--- |
| **`Promise.all()`** | Khi **TẤT CẢ** các promise thành công. (Trả về mảng kết quả). | Ngay lập tức khi có **MỘT** promise thất bại (Fail-fast). | Load dữ liệu bắt buộc cho một trang (vd: User profile + Quyền truy cập). |
| **`Promise.allSettled()`** | Khi **TẤT CẢ** các promise hoàn thành (dù thành công hay thất bại). | **Không bao giờ reject**. (Trả về mảng object chứa status). | Tải nhiều tài nguyên độc lập (vd: Tải danh sách hình ảnh, lỗi tấm nào bỏ qua tấm đó). |
| **`Promise.race()`** | Bất cứ khi nào có **MỘT** promise thành công nhanh nhất. | Bất cứ khi nào có **MỘT** promise thất bại nhanh nhất. | Xây dựng cơ chế Timeout cho API request. |
| **`Promise.any()`** | Bất cứ khi nào có **MỘT** promise thành công nhanh nhất (bỏ qua các lỗi). | Khi **TẤT CẢ** các promise đều thất bại (Quăng ra `AggregateError`). | Cân bằng tải Client-side (gọi cùng 1 file từ nhiều CDN khác nhau). |

2. Ví dụ thực tế cho từng Method
* Promise.all() - Gọi Dữ Liệu Phụ Thuộc (Dashboard)
Tình huống: User vào trang Quản lý đơn hàng. Ta cần gọi API lấy Thông tin User, Danh sách Đơn Hàng, và Lịch sử Giao dịch. Nếu 1 trong 3 API sập, trang sẽ hiển thị lỗi chung vì dữ liệu không đồng nhất.

JavaScript
async function loadDashboard() {
    try {
        const [user, orders, transactions] = await Promise.all([
            fetch('/api/user/me').then(r => r.json()),
            fetch('/api/orders').then(r => r.json()),
            fetch('/api/transactions').then(r => r.json())
        ]);
        renderUI(user, orders, transactions);
    } catch (error) {
        // Chỉ cần 1 API lỗi (vd 500 server error), nó sẽ lập tức nhảy vào đây
        showErrorPage("Không thể tải bảng điều khiển. Vui lòng tải lại trang.");
    }
}
* Promise.allSettled() - Tải Ảnh Thumbnail Độc Lập
Tình huống: Trong trang sản phẩm có phần "Các hình ảnh liên quan". Có 10 tấm ảnh, nếu 1 tấm bị lỗi (link chết), ta vẫn muốn hiển thị 9 tấm còn lại, tấm lỗi sẽ thay bằng placeholder ảnh trống.

JavaScript
async function loadThumbnails(imageUrls) {
    const promises = imageUrls.map(url => fetch(url));
    const results = await Promise.allSettled(promises);

    const validImages = [];
    results.forEach((res, index) => {
        if (res.status === 'fulfilled' && res.value.ok) {
            validImages.push(imageUrls[index]);
        } else {
            // Log lỗi ngầm định, chèn ảnh mặc định
            console.warn(`Ảnh thứ ${index} bị lỗi`);
            validImages.push('/images/placeholder.png');
        }
    });
    renderGallery(validImages);
}
* Promise.race() - Cơ chế Timeout bằng tay
Tình huống: Bạn đang gọi API từ một dịch vụ bên thứ ba (vd: Cổng thanh toán). Bạn chỉ muốn chờ tối đa 5 giây, nếu không phản hồi thì báo "Giao dịch quá lâu".

JavaScript
async function checkout(cartData) {
    const paymentApi = fetch('/api/payment/process', { method: 'POST', body: cartData });
    
    // Một Promise giả tạo sẽ văng lỗi sau 5 giây
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout: Cổng thanh toán phản hồi quá chậm!')), 5000);
    });

    try {
        // Cho 2 promise đua với nhau. Nếu payment chạy xong trước 5s, nó sẽ nhận kết quả payment.
        // Nếu qua 5s payment chưa xong, timeout sẽ reject và quăng lỗi vào catch.
        const result = await Promise.race([paymentApi, timeout]);
        showSuccess(await result.json());
    } catch (error) {
        showErrorPopup(error.message);
    }
}
* Promise.any() - Multi-Server / Cân Bằng Tải Client-Side
Tình huống: Bạn làm web truyện tranh. Bạn có 3 server lưu ảnh truyện (Server VN, Server JP, Server US). Để user đọc truyện nhanh nhất, bạn request đồng thời tới cả 3 server, server nào trả về ảnh đầu tiên và không bị lỗi mạng thì lấy luôn server đó, kệ các server bị sập.

JavaScript
async function fetchComicPage(chapterId, pageId) {
    const serverUrls = [
        `https://vn-cdn.comics.com/${chapterId}/${pageId}.jpg`,
        `https://jp-cdn.comics.com/${chapterId}/${pageId}.jpg`,
        `https://us-cdn.comics.com/${chapterId}/${pageId}.jpg`
    ];

    try {
        // Chỉ cần 1 trong 3 server trả về thành công (ảnh tải được), nó sẽ chốt kết quả ngay.
        // Nó sẽ bỏ qua (ignore) các server chết (reject).
        const fastestResponse = await Promise.any(
            serverUrls.map(url => fetch(url).then(res => {
                if (!res.ok) throw new Error('Bad status');
                return res.blob();
            }))
        );
        
        displayImage(fastestResponse);
    } catch (error) {
        // Chỉ khi CẢ 3 SERVER ĐỀU CHẾT, nó mới lọt vào catch này (AggregateError)
        showError("Mất kết nối toàn bộ máy chủ CDN.");
    }
}