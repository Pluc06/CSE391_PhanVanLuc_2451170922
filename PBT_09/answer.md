# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)
## Câu A1 (5đ) — DOM Tree
1. Vẽ DOM tree (sơ đồ cây) cho HTML trên

#app
├── header
│   ├── h1
│   └── nav
│       ├── a.active
│       ├── a
│       └── a
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button
    └── ul#todoList
        ├── li.todo-item
        └── li.todo-item.completed

2. Viết querySelector cho mỗi yêu cầu:

Chọn thẻ <h1>:
document.querySelector('h1');

Chọn input trong form:
document.querySelector('#todoForm input');

Chọn tất cả .todo-item:
document.querySelectorAll('.todo-item');

Chọn link đang active:
document.querySelector('a.active');

Chọn <li> đầu tiên trong #todoList:
document.querySelector('#todoList li:first-child');

Chọn tất cả <a> bên trong <nav>:
document.querySelectorAll('nav a');

## Câu A2 (5đ) — innerHTML vs textContent
* Đây là sự khác biệt cơ bản nhất:

textContent: Chỉ lấy hoặc thiết lập nội dung dạng văn bản thuần túy. Nó bỏ qua mọi thẻ HTML. Dùng khi bạn chỉ muốn hiển thị chữ, không muốn render thẻ.

innerHTML: Lấy hoặc thiết lập nội dung bao gồm cả thẻ HTML. Nó sẽ parse (phân tích) chuỗi đó thành các phần tử DOM thực sự.

* Tại sao innerHTML lại gây lỗ hổng XSS?
Vì khi bạn gán innerHTML, trình duyệt sẽ hiểu các thẻ trong chuỗi đó là mã HTML hợp lệ và thực thi chúng. Nếu kẻ xấu nhập vào một đoạn code độc hại (như thẻ <img onerror="..."> hoặc <script>), trình duyệt sẽ chạy đoạn mã đó ngay lập tức, dẫn đến việc bị chiếm quyền điều khiển hoặc ăn cắp dữ liệu.

Cách sửa:
Luôn ưu tiên dùng textContent nếu bạn không cần render thẻ HTML. Nếu bắt buộc phải dùng innerHTML (ví dụ: làm khung soạn thảo văn bản), hãy dùng các thư viện "sanitize" (làm sạch) dữ liệu trước khi gán.

* Ví dụ:
// Thay vì:
// document.querySelector("#result").innerHTML = userInput;

// Hãy dùng:
document.querySelector("#result").textContent = userInput;

## Câu A3 (5đ) — Event Bubbling
Kết quả dự đoán:

1. Khi click vào button (không có stopPropagation):
Thứ tự log sẽ là:
- BUTTON
- INNER
- OUTER

2. Nếu uncomment e.stopPropagation();:
e.stopPropagation() sẽ chặn sự kiện không lan ra các phần tử cha nữa.
Thứ tự log sẽ chỉ còn:
- BUTTON