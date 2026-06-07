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

# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)
## Câu C1 (8đ) — Debug DOM Code
* Danh sách lỗi:
1. Sai tên sự kiện trong addEventListener: * Sai: addEventListener("onclick", ...)

Sửa: Sự kiện chuẩn của DOM là "click".

2. Gán giá trị sai cho Element (Hằng số DOM): * Sai: countDisplay = count; (trong nút #resetBtn). countDisplay là một biến const chứa thẻ HTML, bạn không thể gán lại cho nó một con số.

Sửa: Phải can thiệp vào nội dung của nó bằng countDisplay.textContent = count;.

3. Xóa innerHTML sai cách: * Sai: historyList.innerHTML = null;. Trình duyệt sẽ ép kiểu null thành chuỗi và có thể hiển thị chữ "null" ra màn hình.

Sửa: Dùng historyList.innerHTML = "";.

4. Thiếu dấu ngoặc đơn khi gọi hàm: * Sai: item.remove; (trong nút #clearHistory). Đây mới chỉ là tham chiếu đến hàm, chưa thực thi.

Sửa: Phải là item.remove();.

5. Lỗi kiểu dữ liệu khi lấy từ LocalStorage: * Sai: count = localStorage.getItem("count");. LocalStorage luôn trả về định dạng String. Nếu giá trị là "1", khi bạn bấm tăng (count++ hoặc count + 1), nó sẽ bị nối chuỗi thành "11".

Sửa: Ép kiểu sang số: parseInt(localStorage.getItem("count")) || 0;.

6. Lỗi giá trị null ở lần load đầu tiên: * Sai: Nếu người dùng vào web lần đầu, LocalStorage trống, count sẽ nhận giá trị null và hiển thị chữ "null" lên giao diện.

Sửa: Cần thêm toán tử logic để fallback về giá trị mặc định || 0.

7. Quên load lại dữ liệu history: * Sai: Hàm beforeunload có lưu "history", nhưng hàm load lại quên không lấy ra để hiển thị lại.

Sửa: Bổ sung historyList.innerHTML = localStorage.getItem("history") || "";.

8. Mất Event Listener khi khôi phục HTML (Lỗi Logic nghiêm trọng):

Sai: Khi bạn lưu cục HTML <li> vào LocalStorage và parse lại bằng innerHTML, tất cả các sự kiện click gắn trên từng thẻ li trước đó sẽ bị biến mất hoàn toàn (không thể bấm để xoá history cũ được nữa).

Sửa: Không gắn sự kiện vào từng thẻ <li>. Thay vào đó, áp dụng kỹ thuật Event Delegation — gắn sự kiện click lên thẻ cha historyList và kiểm tra e.target.

## Câu C2 (7đ) — Performance
1. Tại sao bind event lên 1000 elements riêng lẻ là BAD PRACTICE?
Nếu bạn dùng một vòng lặp for hoặc forEach để gắn addEventListener cho 1000 thẻ div, bạn đang mắc phải 3 lỗi nghiêm trọng về hiệu suất:

Tốn bộ nhớ (Memory Leak): Trình duyệt phải tạo ra 1000 đối tượng function (trình xử lý sự kiện) lưu trong RAM. Điều này làm tăng mức tiêu thụ bộ nhớ một cách lãng phí và có thể gây giật lag (jank) trên các thiết bị yếu.

Chậm quá trình khởi tạo: Việc duyệt qua 1000 phần tử DOM và đính kèm sự kiện cho từng cái sẽ chặn luồng chính (Main Thread) của JavaScript, khiến trang web tải chậm hơn hoặc bị "đơ" trong khoảnh khắc đó.

Bất cập với dữ liệu động (Dynamic Elements): Nếu sau này bạn thêm thẻ div thứ 1001 bằng JavaScript, thẻ mới này sẽ không có sự kiện click. Bạn lại phải viết thêm code để bind event cho riêng nó, rất dễ sinh ra bug.

Cách Event Delegation giải quyết vấn đề
Event Delegation (Ủy quyền sự kiện) dựa trên cơ chế Event Bubbling (Sự kiện nổi bọt) của DOM. Khi bạn click vào một thẻ con, sự kiện đó sẽ "nổi bọt" dần lên các thẻ cha chứa nó.

Thay vì gắn 1000 sự kiện cho 1000 thẻ con, ta chỉ gắn 1 sự kiện duy nhất cho thẻ cha bọc ngoài chúng.

Ví dụ:

// Gắn 1 event duy nhất lên thẻ cha bọc ngoài
document.getElementById('container').addEventListener('click', function(e) {
    // Kiểm tra xem phần tử bị click (e.target) có phải là thẻ div con không
    if (e.target.tagName === 'DIV') {
        console.log('Bạn vừa click vào: ', e.target.textContent);
    }
});
Lợi ích: Chỉ tốn 1 function trong RAM, khởi tạo cực nhanh và khi bạn thêm hàng nghìn thẻ div mới vào container, chúng vẫn tự động nhận diện được cú click mà không cần bind lại.

2. Refactor Code giảm Reflow bằng DocumentFragment
Khái niệm Reflow (tính toán lại bố cục vị trí, kích thước) và Repaint (vẽ lại pixel lên màn hình) là những thao tác "nặng" nhất của trình duyệt. Đoạn code ban đầu của bạn cứ mỗi lần lặp lại chèn 1 thẻ vào body, ép trình duyệt phải thực hiện Reflow/Repaint 1000 lần.

Code Refactor:

// 1. Tạo một DocumentFragment (bộ nhớ tạm ngoài DOM)
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    
    // 2. Gắn phần tử vào fragment thay vì gắn trực tiếp vào DOM
    fragment.appendChild(div); 
}

// 3. Gắn toàn bộ fragment vào DOM trong 1 lần duy nhất
document.body.appendChild(fragment); // ← Chỉ xảy ra ĐÚNG 1 LẦN reflow!
Giải thích tại sao lại nhanh hơn:
DocumentFragment là một DOM Node "ảo" (Off-screen DOM): Nó tồn tại hoàn toàn trong bộ nhớ (RAM) của JavaScript chứ không nằm trên giao diện HTML thực tế.

Thao tác trong bóng tối: Khi bạn dùng fragment.appendChild(div), bạn đang thêm phần tử vào bộ nhớ ảo. Trình duyệt hoàn toàn không quan tâm đến sự thay đổi này, do đó không có bất kỳ đợt Reflow hay Repaint nào xảy ra trong suốt 1000 vòng lặp.

Cập nhật hàng loạt (Batching): Ở dòng code cuối cùng, khi bạn append fragment vào document.body, trình duyệt sẽ chỉ bốc tất cả các thẻ con bên trong fragment đưa lên UI, bản thân cái "vỏ" fragment sẽ biến mất. Kết quả là trình duyệt chỉ phải tính toán lại bố cục và vẽ lại màn hình đúng 1 lần cho cả 1000 phần tử. Hiệu năng được cải thiện rõ rệt.