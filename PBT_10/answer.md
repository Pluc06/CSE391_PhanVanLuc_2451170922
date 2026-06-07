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