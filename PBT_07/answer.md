# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 (5đ) — var / let / const

1. Bảng Dự đoán & Kết quả thực tế

| Đoạn code | Dự đoán của mình | Kết quả khi chạy thực tế | Nhận xét |
| :--- | :--- | :--- | :--- |
| **Đoạn 1** | In ra `undefined` | `undefined` | Khá bất ngờ với người mới vì code gọi biến trước khi khai báo nhưng lại không báo lỗi. |
| **Đoạn 2** | Báo lỗi **ReferenceError** | Thấy lỗi: `Cannot access 'y' before initialization` | Đúng logic thông thường. Lỗi sập chương trình ngay tại dòng 1. |
| **Đoạn 3** | Báo lỗi **TypeError** | Thấy lỗi: `Assignment to constant variable.` | Lỗi sập chương trình tại dòng 2 vì cố gán lại giá trị cho hằng số. |
| **Đoạn 4** | In ra mảng `[1, 2, 3, 4]` | `[1, 2, 3, 4]` | Điểm "lừa" nhất của hằng số `const` trong JS. |
| **Đoạn 5** | `Trong block: 2`<br>`Ngoài block: 1` | `Trong block: 2`<br>`Ngoài block: 1` | Hoạt động đúng theo nguyên tắc Block Scope. |

2. Giải thích chi tiết các kết quả (Tại sao lại như vậy?)

- Đoạn 1: Hiện tượng "Hoisting" của `var`
Bạn gọi `console.log(x)` trước khi `var x = 5`. Đáng lẽ nó phải báo lỗi là chưa có biến `x`, nhưng nó lại in ra `undefined`. 
* **Lý do:** JavaScript có một cơ chế gọi là **Hoisting** (Kéo lên). Trình duyệt sẽ ngầm đem phần khai báo biến (`var x;`) lên trên cùng của file code, nhưng phần gán giá trị (`= 5`) thì vẫn nằm lại ở dòng cũ. Do đó, lúc in ra, biến `x` đã tồn tại nhưng chưa có giá trị, dẫn đến kết quả là `undefined`.

- Đoạn 2: Vùng chết tạm thời (Temporal Dead Zone - TDZ) của `let`
Cũng giống Đoạn 1 nhưng dùng `let`, kết quả lại là một cú báo lỗi văng nát trình duyệt.
* **Lý do:** Khác với `var`, mặc dù `let` và `const` cũng bị Hoisting (kéo khai báo lên đầu), nhưng JavaScript đưa chúng vào một trạng thái gọi là **Temporal Dead Zone**. Trạng thái này khóa hoàn toàn việc truy cập vào biến cho đến khi code chạy đúng đến dòng khai báo nó. Khái niệm này sinh ra để ép dev tụi mình phải code cẩn thận: khai báo xong mới được dùng.

- Đoạn 3 & Đoạn 4: Cú lừa "Bất biến" của `const`
Ở Đoạn 3, bạn gán `z = 20` thì bị lỗi thẳng mặt vì `const` (constant) là hằng số, không được phép gán lại. Nhưng sang Đoạn 4, bạn đẩy thêm số 4 vào mảng `const arr = [1, 2, 3]` thì nó lại chạy ngon lành! Tại sao?
* **Lý do:** `const` trong JS chỉ bảo vệ **địa chỉ ô nhớ (reference)**, chứ không bảo vệ **giá trị bên trong (value)** của ô nhớ đó. 
    * Khi bạn khai báo `const arr`, bạn đang khóa cái nhãn `arr` trỏ chặt vào một cái "hộp" trên RAM. Bạn không thể làm hành động đổi hộp (`arr = [5, 6]`), nhưng bạn hoàn toàn có quyền mở cái hộp đó ra và nhét thêm đồ vào (`arr.push(4)`). Đây là điểm cực kỳ hay gây nhầm lẫn lúc mới học!

- Đoạn 5: Phạm vi khối (Block Scope) của `let`
Trong đoạn này có 2 biến `a` cùng tên nhưng lại in ra 2 kết quả khác nhau.
* **Lý do:** Ký hiệu ngoặc nhọn `{ ... }` trong JS tạo ra một **Block Scope** (Phạm vi khối). Khi bạn dùng `let` hoặc `const` bên trong dấu ngoặc nhọn này, nó sẽ tạo ra một biến hoàn toàn mới, độc lập và bị nhốt chặt bên trong đó. Biến `a = 2` chỉ sống và hoạt động trong nội bộ dấu ngoặc nhọn. Khi ra khỏi ngoặc, lệnh `console.log` sẽ chỉ tìm thấy biến `a = 1` ở môi trường bên ngoài mà thôi.

## Câu A2 (5đ) — Data Types & Coercion
* Dự đoán kết quả:
typeof null -> Trả về chuỗi "object". Đây là một lỗi thiết kế được giữ lại từ phiên bản JavaScript đầu tiên để tránh làm hỏng các hệ thống web cũ.

typeof undefined -> Trả về chuỗi "undefined".

typeof NaN -> Trả về chuỗi "number". Dù là "Not a Number" (không phải là số) nhưng về kiểu dữ liệu nó vẫn thuộc kiểu số.

"5" + 3 -> Trả về chuỗi "53".

"5" - 3 -> Trả về số 2.

"5" * "3" -> Trả về số 15. Cả hai chuỗi đều biến thành số để thực hiện phép nhân.

true + true -> Trả về số 2. Giá trị true khi đưa vào phép cộng số học sẽ chuyển thành số 1.

[] + [] -> Trả về chuỗi rỗng "". Mảng rỗng khi chuyển sang dạng nguyên thủy sẽ thành chuỗi rỗng.

[] + {} -> Trả về chuỗi "[object Object]". Mảng rỗng biến thành chuỗi rỗng "", object biến thành "[object Object]".

{} + [] -> Trả về chuỗi "[object Object]". Vì nằm bên trong hàm console.log(), cặp ngoặc {} được hiểu là một đối tượng (Object literal) chứ không phải khối lệnh (Block), nên kết quả tương tự như phép toán phía trên.

* Giải thích tại sao "5" + 3 và "5" - 3 cho kết quả khác nhau
Sự khác biệt này xuất phát từ cơ chế Tự động ép kiểu (Implicit Coercion) của JavaScript đối với từng toán tử khác nhau:

Đối với phép toán "5" + 3:

Toán tử + trong JavaScript là một toán tử đặc biệt vì nó "đa năng": vừa dùng cho phép cộng số học, vừa dùng cho phép nối chuỗi.

Quy tắc mã nguồn của JavaScript quy định rằng: Nếu một trong hai vế của toán tử + là một Chuỗi (String), nó sẽ ưu tiên thực hiện việc nối chuỗi.

Do đó, JavaScript sẽ tự động ép kiểu số 3 thành chuỗi "3". Phép toán trở thành "5" + "3", và kết quả thu được là chuỗi "53".

Đối với phép toán "5" - 3:

Khác với toán tử +, toán tử - (trừ) chỉ có duy nhất một nhiệm vụ trong JavaScript là phép toán số học (trừ số này cho số kia). Nó hoàn toàn không có định nghĩa nào liên quan đến thao tác trên chuỗi.

Vì vậy, khi gặp toán tử -, JavaScript bắt buộc phải tìm cách đưa cả hai vế về dạng Số (Number) để tính toán.

Lúc này, chuỗi "5" sẽ bị tự động ép kiểu thành số 5. Phép toán trở thành 5 - 3, và kết quả trả về là số 2.

## Câu A3 (5đ) — So sánh == vs ===

console.log(5 == "5");                // true 
console.log(5 === "5");               // false 
console.log(null == undefined);       // true 
console.log(null === undefined);      // false 
console.log(NaN == NaN);              // false 
console.log(0 == false);              // true 
console.log(0 === false);             // false 
console.log("" == false);             // true

Từ giờ trở đi chúng ta nên luôn luôn sử dụng === (so sánh nghiêm ngặt).
Lý do là vì:
Toán tử === sẽ kiểm tra cả giá trị lẫn kiểu dữ liệu. Nếu kiểu dữ liệu của hai vế khác nhau, nó sẽ trả về false ngay lập tức mà không cố gắng biến đổi chúng.

Trong khi đó, toán tử == (so sánh lỏng lẻo) sẽ tự động ngầm "ép kiểu" (implicit coercion) hai vế về cùng một kiểu rồi mới so sánh. Chính sự ép kiểu ngầm này tạo ra những kết quả rất "ảo" và khó lường (như ở trên 0 == false hay "" == false lại ra kết quả là true).

## Câu A4 (5đ) — Truthy & Falsy
1. Tất cả các giá trị Falsy trong JavaScript
- false (tất nhiên rồi)
- 0 (số không)
- -0 (số không âm)
- 0n (số không trong kiểu BigInt)
- "", '', hoặc `` (chuỗi rỗng, hoàn toàn không có ký tự nào)
- null
- undefined
- NaN (Not a Number)

2. Dự đoán kết quả:
if ("0") console.log("A");  // In ra "A" (Vì "0" là một chuỗi có chứa ký tự số 0, không phải chuỗi rỗng nên nó là Truthy)

if ("") console.log("B");   // Không in (Vì "" là chuỗi rỗng -> Falsy)

if ([]) console.log("C");   // In ra "C" (Vì [] là một mảng/object, không nằm trong danh sách Falsy -> Truthy)

if ({}) console.log("D");   // In ra "D" (Vì {} là một object, không nằm trong danh sách Falsy -> Truthy)

if (null) console.log("E"); // Không in (Vì null thuộc danh sách Falsy)

if (0) console.log("F");    // Không in (Vì 0 thuộc danh sách Falsy)

if (-1) console.log("G");   // In ra "G" (Vì -1 là một số khác 0 -> Truthy)

if (" ") console.log("H");  // In ra "H" (Vì " " là một chuỗi chứa dấu cách, tức là có độ dài bằng 1, không phải chuỗi rỗng -> Truthy)

## Câu A5 (5đ) — Template Literals
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3: 
// Với template literal, mình có thể xuống dòng thoải mái và dùng luôn ngoặc kép "" bên trong mà không cần thêm dấu \ nữa.
var html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

