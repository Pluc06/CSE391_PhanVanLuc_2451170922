🅱️ TRACK A — BOOTSTRAP 5
# PHẦN A — ĐỌC HIỂU (20 điểm)
## Câu A1 (10đ) — Grid System

| Kích thước | < 768px | 768px - 991px | ≥ 992px |
| :--- | :--- | :--- | :--- |
| **Số cột** | 1 cột | 2 cột | 4 cột |
| **Box layout** | Xếp chồng 4 hàng dọc (Box 1 -> 4) | Chia 2 hàng, 2 cột cạnh nhau | Dàn ngang 1 hàng (4 Box cạnh nhau) |

* Câu hỏi thêm: col-md-6 nghĩa là gì? Tại sao không cần viết col-sm-12?
- col-md-6
col: Viết tắt của Column (Cột).

md: Viết tắt của Medium (mốc màn hình trung bình, thường từ 768px trở lên - Tablet).

6: Chiếm 6 phần trên tổng số 12 phần của hệ thống lưới (Grid 12).
Kết luận: Class này ra lệnh cho trình duyệt: "Khi màn hình đạt kích thước từ 768px trở lên, hãy cho cái hộp này chiếm 50% (6/12) chiều rộng của không gian chứa nó".

- Không cần viết col-sm-12 vì đã khai báo class gốc là col-12. Trình duyệt sẽ hiểu mặc định cái hộp này luôn chiếm 12 phần ở mọi màn hình (từ siêu nhỏ xs lên nhỏ sm). Nó sẽ giữ nguyên độ rộng 12 phần đó cho tới khi chạm mốc md (768px) thì mới bị lệnh col-md-6 thay đổi. Vì vậy, việc viết thêm col-sm-12 vào là thừa code, không có tác dụng gì thêm cả. 

## Câu A2 (10đ) — Utilities & Components
1. Giải thích class d-none d-md-block. Element này hiển thị khi nào, ẩn khi nào?
- giải thích: 
d-none (Display: none): Lệnh mặc định. Khởi đầu từ màn hình nhỏ nhất (Mobile), phần tử này sẽ bị ẩn hoàn toàn (không chiếm diện tích trên giao diện).

d-md-block (Display: block ở mốc Medium): Khi màn hình kéo rộng ra, đạt đến mốc md (từ 768px trở lên), class này sẽ ghi đè class trước, biến phần tử thành dạng khối (display: block) và hiện lên bình thường.

- Nó ẩn thiết bị Mobile (màn hình nhỏ hơn 768px).
- Nó hiển thị trên thiết bị Tablet và Desktop (màn hình từ 768px trở lên).

2. Liệt kê 5 spacing utilities (margin/padding) và giải thích
mt-3 (Margin Top 3): Tạo khoảng cách đẩy phần tử ra xa khỏi phần tử phía trên nó. Mức độ 3 trong Bootstrap thường tương đương 1rem (khoảng 16px).

px-4 (Padding X-axis 4): Tạo khoảng đệm (padding) ở bên trong phần tử theo trục ngang (cả bên trái ps và bên phải pe). Mức độ 4 tương đương khoảng 24px mỗi bên. Hay dùng để làm nút bấm (button) phình to ra 2 bên.

mb-auto (Margin Bottom Auto): Tự động đẩy toàn bộ không gian thừa xuống dưới cùng. Nếu dùng trong một cột flexbox, nó sẽ đẩy phần tử này sát lên trên.

mx-auto (Margin X-axis Auto): Cái này xài cực nhiều! Dùng để căn giữa một khối (block) theo chiều ngang. Ví dụ bạn có một cái ảnh hoặc một cái box, gán mx-auto (cùng với việc set chiều rộng) là nó tự chạy ra chính giữa màn hình.

py-5 (Padding Y-axis 5): Tạo khoảng đệm bên trong theo trục dọc (cả trên pt và dưới pb) với mức độ lớn nhất là 5 (khoảng 48px). Tụi mình rất hay dùng class này cho các phần section lớn (như phần Giới thiệu, Liên hệ) để nội dung không bị dính sát vào mép màn hình, nhìn cho thoáng.

3. Sự khác nhau giữa .container, .container-fluid, .container-md?

.container (Hộp cố định có điểm ngắt): Nó luôn có một chiều rộng tối đa (max-width) cố định tùy thuộc vào kích thước màn hình và luôn nằm ở chính giữa trang (chừa ra 2 khoảng lề 2 bên).
Ví dụ: Màn laptop nó sẽ cố định rộng 960px hoặc 1140px. Khi bạn kéo màn hình nhỏ lại, lề 2 bên sẽ thu hẹp dần, đến một mốc nhất định hộp nội dung mới nhảy giật lại nhỏ hơn.

.container-fluid (Hộp tràn viền): Đúng như tên gọi (fluid - chất lỏng), class này làm cho container luôn luôn dãn ra chiếm 100% chiều ngang màn hình bất kể bạn đang dùng điện thoại di động bé tí hay cái TV to đùng. Gần như không có lề thừa hai bên.

.container-md (Hộp lai tạp): Đây là loại container thông minh. Ở những màn hình nhỏ hơn mốc md (dưới 768px - tức là Mobile), nó sẽ hoạt động y chang .container-fluid (chiếm full 100% width để tận dụng tối đa diện tích màn hình điện thoại). Nhưng ngay khi màn hình bự hơn 768px, nó sẽ "biến hình" trở lại thành .container bình thường (có lề 2 bên, nội dung gom vào giữa).

