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