# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

## Câu A1 (5đ) — Input Types
1. type="text"
→ Giao diện: Ô nhập text thông thường
→ Validation: minlength, maxlength, pattern
→ Use case E-commerce: Tên người dùng, họ tên, địa chỉ chi tiết

2. type="email"
→ Giao diện: Ô nhập text
→ Validation: Tự kiểm tra định dạng có @ và đúng cú pháp email
→ Use case E-commerce: Form đăng ký, đăng nhập, form liên hệ

3. type="password"
→ Giao diện: Ô nhập text nhưng ẩn ký tự
→ Validation: minlength, pattern
→ Use case E-commerce: Form đăng ký, đăng nhập, đổi mật khẩu

4. type="number"
→ Giao diện: Ô nhập số với nút tăng/giảm ± bên cạnh
→ Validation: min, max, step
→ Use case E-commerce: Số lượng sản phẩm, chọn năm sinh, nhập mã chiết khấu

5. type="tel"
→ Giao diện: Ô nhập text
→ Validation: pattern
→ Use case E-commerce: Nhập số điện thoại giao hàng, số điện thoại liên lạc

6. type="date"
→ Giao diện: Date picker
→ Validation: min, max
→ Use case E-commerce: Chọn ngày sinh, ngày giao hàng mong muốn

7. type="range"
→ Giao diện: Slider với nút kéo ngang
→ Validation: min, max, step
→ Use case E-commerce: Lọc sản phẩm theo giá, rating sao

8. type="checkbox"
→ Giao diện: Ô chọn vuông
→ Validation: required
→ Use case E-commerce: Đồng ý điều khoản, chọn phương thức giao hàng, chọn nhiều tùy chọn sản phẩm

9. type="radio"
→ Giao diện: Ô chọn tròn
→ Validation: required
→ Use case E-commerce: Chọn giới tính, chọn phương thức thanh toán, chọn size duy nhất

10. type="file"
→ Giao diện: Nút "Chọn file" → mở file dialog
→ Validation: accept, multiple
→ Use case E-commerce: Upload hóa đơn, upload ảnh đánh giá sản phẩm, upload ảnh chứng minh thư

## Câu A2 (5đ) — Validation Attributes
Trường hợp 1: <input type="text" required value="">
Không submit được.
Tại sao:
- `required` bắt buộc input phải có dữ liệu
- `value=""` nghĩa là ô input đang trống
- Browser sẽ hiện thông báo yêu cầu nhập dữ liệu
- Form sẽ không được submit

Trường hợp 2: <input type="email" value="abc">
Không submit được.
Tại sao:
- `type="email"` tự kiểm tra định dạng email
- `"abc"` không chứa ký tự `@`
- Giá trị này không phải email hợp lệ
- Browser sẽ báo lỗi và không submit form

Trường hợp 3: <input type="number" min="1" max="10" value="15">
Không submit được.
Tại sao:
- `min="1"` và `max="10"` giới hạn giá trị từ 1 đến 10
- `value="15"` vượt quá giá trị tối đa
- Browser sẽ báo lỗi giá trị không hợp lệ
- Form sẽ không submit

Trường hợp 4: <input type="text" pattern="[0-9]{10}" value="abc123">
Không submit được.
Tại sao:
- `pattern="[0-9]{10}"` yêu cầu đúng 10 chữ số
- `"abc123"` chứa chữ cái và không đủ 10 số
- Giá trị không khớp với pattern
- Browser sẽ báo lỗi và chặn submit

Trường hợp 5: <input type="password" minlength="8" value="123">
Không submit được.
Tại sao:
- `minlength="8"` yêu cầu tối thiểu 8 ký tự
- `"123"` chỉ có 3 ký tự
- Không đạt độ dài tối thiểu
- Browser sẽ báo lỗi và form không submit

Kết quả: Tất cả 5 trường hợp đều không submit được

## Câu A3 (5đ) — Accessibility
1. <label for="id"> quan trọng vì:
Kết nối ngữ nghĩa (Semantic Association): Khi for attribute match với id của input, screen reader biết rõ label này thuộc về input nào, từ đó đọc cho người dùng hiểu rõ ý nghĩa của ô nhập liệu đó.

Không có label = không biết nhập gì: Nếu thiếu <label> hoàn toàn hoặc for không match, người dùng screen reader chỉ nghe "edit text" mà không biết cần nhập email, mật khẩu hay tên gì. Kết quả: WCAG yêu cầu tất cả form control phải có label đúng cách.

Tăng vùng click/tap: Trên desktop, click vào label tự động focus vào input. Trên mobile, label cũng là vùng tap target lớn hơn, tăng UX.

2. <fieldset> + <legend> dùng để nhóm các input liên quan lại với nhau, đặc biệt là:
Khi dùng:
Radio buttons — chọn một trong nhiều option (VD: chọn giới tính, phương thức thanh toán)
Checkboxes liên quan — chọn nhiều từ nhiều option (VD: phương thức nhận thông báo)
Nhóm inputs cùng chủ đề — VD: nhóm "Thông tin giao hàng" có các ô nhập địa chỉ

3. Khi nào dùng aria-label:
Button icon không có text — VD: button icon ❌ hoặc 🛒 mà không có chữ
Element không phải input — VD: close button, icon button
Khi không thể dùng text nhìn thấy — VD: hamburger menu ☰ chỉ có biểu tượng

Không nên dùng aria-label khi đã có <label>:
aria-label bị bỏ qua nếu có <label>: Khi form control có <label> thì screen reader ưu tiên đọc <label> text, bỏ qua aria-label. Kết quả: aria-label thì vô ích.

## Câu A4 (5đ) — Media

1. loading="lazy" cải thiện:
Trang load nhanh hơn — chỉ tải ảnh khi user scroll đến, không tải toàn bộ ảnh lúc đầu
Tiết kiệm bandwidth — ảnh không nhìn thấy được sẽ không được tải, giảm dữ liệu sử dụng
Tối ưu LCP (Largest Contentful Paint) — trang hiển thị nhanh hơn

Khi KHÔNG nên dùng loading="lazy":
Ảnh "above the fold" (ảnh hero, logo, ảnh đầu tiên user thấy khi vào trang) — phải tải ngay để tránh chậm LCP

2. Tại sao cung cấp nhiều <source>:
Các browser hỗ trợ các định dạng video khác nhau — cung cấp nhiều format giúp video có thể chạy trên mọi browser
3 format video web phổ biến:
WebM — định dạng nhẹ nhất, tối ưu hóa cho web
MP4 — định dạng phổ biến nhất, support rộng rãi
Ogg (Theora) — định dạng mở, hỗ trợ bởi một số browser

3. alt dùng để:
Mô tả ảnh cho screen reader (người khiếm thị)
Hiển thị text khi ảnh không tải được

VD alt:
TH1: <img src="iphone16.jpg" alt="iPhone 16 Pro Max 256GB màu Titan Đen">
TH2: <img src="decoration.jpg" alt="">
TH3: <img src="revenue-chart.jpg" alt="Biểu đồ doanh thu Q1/2026: tổng 500 triệu đồng">

## Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
Cách 1:
Dùng khi: Ảnh là nội dung bổ sung hoặc không có caption/chú thích, hoặc ảnh chỉ để trang trí/minh họa ngữ cảnh mà không cần giải thích chi tiết.
Cách 2:
Dùng khi: Ảnh là nội dung chính có caption/chú thích quan trọng để giải thích, hoặc ảnh cần được tham chiếu trong text.

# PHẦN B — THỰC HÀNH CODE (55 điểm)
## Bài B1 (20đ) — Form Đăng ký Tài khoản
- HTML không thể validate được việc Confirm Password vì:
+ Lý do là vì các thuộc tính validation của HTML5 (như pattern, minlength, type, required...) sinh ra để kiểm tra tính hợp lệ của từng trường dữ liệu (input) một cách độc lập.
+ Nó chỉ có thể so sánh giá trị mà người dùng nhập vào với một biểu thức chính quy (regex) cố định hoặc một định dạng đã biết trước bên trong chính input đó. HTML5 hoàn toàn không có cơ chế hay thuộc tính nào hỗ trợ việc lấy giá trị của input này để đem đi so sánh chéo (cross-validation) với giá trị của một input khác.
+ Để làm được việc "bắt" hai ô mật khẩu phải giống hệt nhau, tụi mình bắt buộc phải dùng thêm JavaScript để lấy chuỗi (value) từ cả hai ô ra so sánh (bằng toán tử ===) khi người dùng ấn Submit hoặc khi đang nhập liệu.

# PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Debug Form
Lỗi 1: Dòng 1 — Thẻ <form> thiếu thuộc tính action và method, vi phạm best practice khi thiết lập form thu thập dữ liệu.
Sửa: <form action="#" method="POST">

Lỗi 2: Dòng 2 — Input "Tên" không có <label for="..."> kết nối với id tương ứng, vi phạm accessibility; đồng thời thiếu thuộc tính name để gửi dữ liệu lên server và required để bắt buộc nhập.
Sửa: <label for="fullname">Tên:</label> <input type="text" id="fullname" name="fullname" placeholder="Nhập họ tên" required>

Lỗi 3: Dòng 4 — Input "Email" thiếu hẳn thẻ <label>, thiếu thuộc tính id, name và thiếu thuộc tính required để validate dữ liệu trống.
Sửa: <label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>

Lỗi 4: Dòng 6 — Input "Mật khẩu" thiếu thẻ <label>, thiếu thuộc tính id, name và thiếu thuộc tính required để bắt buộc người dùng nhập mật khẩu.
Sửa: <label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" placeholder="Mật khẩu" required>

Lỗi 5: Dòng 7 — Input "Nhập lại mật khẩu" thiếu thẻ <label>, thiếu thuộc tính id và name để quản lý ô xác nhận mật khẩu.
Sửa: <label for="confirm_password">Nhập lại mật khẩu:</label> <input type="password" id="confirm_password" name="confirm_password" placeholder="Nhập lại mật khẩu" required>

Lỗi 6: Dòng 9 — Input "Phone" dùng sai kiểu dữ liệu type="text" (chuẩn phải là type="tel"), thiếu kết nối <label for="..."> và thiếu id, name, pattern để validate đúng định dạng số điện thoại.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" pattern="[0-9]{10}" placeholder="Nhập 10 chữ số" value="0901234567">

Lỗi 7: Dòng 11 — Thẻ <select> thiếu <label>, thiếu thuộc tính id, name và các thẻ <option> bên trong thiếu thuộc tính value để truyền giá trị đi khi submit form.
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city"> <option value="hanoi">Hà Nội</option> <option value="hcm">TP.HCM</option> </select>

Lỗi 8: Dòng 16 — Khối "Tôi đồng ý điều khoản" mới chỉ có thẻ <label> chứa chữ chứ hoàn toàn thiếu thẻ <input type="checkbox"> để người dùng click chọn, và thiếu thuộc tính required.
Sửa: <input type="checkbox" id="terms" name="terms" required> <label for="terms">Tôi đồng ý điều khoản</label>

## Câu C2 (10đ) — Thiết kế chiến lược Validation
1. Viết pattern regex cho CMND/CCCD và Số tài khoản
Trong thuộc tính pattern của HTML5, dấu ^ và $ tự động được hiểu ngầm nên tụi mình chỉ cần viết biểu thức cốt lõi thôi:

CMND/CCCD (Đúng 12 chữ số): pattern="[0-9]{12}"

Số tài khoản (Từ 10 đến 15 chữ số): pattern="[0-9]{10,15}"

(Đối với mã PIN không hiển thị, tụi mình chỉ cần dùng loại type="password" kết hợp với pattern="[0-9]{6}" nhé).

2. HTML5 validation đã đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
Trả lời: Hoàn toàn CHƯA ĐỦ an toàn.

Tại sao: HTML5 validation thực chất chỉ chạy trên trình duyệt (Frontend). Nó sinh ra để cải thiện trải nghiệm người dùng (UX), giúp họ biết mình nhập sai định dạng ngay lập tức mà không cần đợi tải lại trang.

Về mặt bảo mật, HTML5 rất dễ bị vô hiệu hóa. Bất kỳ ai (hoặc các hacker) đều có thể dễ dàng nhấn F12 (Inspect Element) để xóa phăng các thuộc tính required hay pattern đi, hoặc dùng các công cụ như Postman, cURL để gửi thẳng dữ liệu "bẩn" lên server mà không cần thông qua giao diện form HTML của mình. Vì vậy, đối với ứng dụng nhạy cảm như ngân hàng số, HTML5 chỉ là lớp bảo vệ "vòng ngoài" cho đẹp thôi.

3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
Xác thực phụ thuộc lẫn nhau (Cross-field validation): Ví dụ như so sánh ô "Nhập lại mật khẩu" phải trùng khớp với ô "Mật khẩu", hoặc kiểm tra ngày kết thúc phải lớn hơn ngày bắt đầu.

Kiểm tra dữ liệu thời gian thực với Database (Asynchronous/AJAX validation): Kiểm tra xem Số tài khoản, Số điện thoại hoặc Email này đã tồn tại trong hệ thống của ngân hàng hay chưa mà không cần tải lại toàn bộ trang.

Logic xác thực động phức tạp (Dynamic conditional validation): Thay đổi quy tắc validate dựa theo lựa chọn trước đó. Ví dụ: Nếu người dùng chọn quốc tịch "Việt Nam" thì bắt buộc validate CCCD (12 số), còn nếu chọn quốc tịch "Nước ngoài" thì ẩn ô CCCD và chuyển sang bắt buộc nhập Hộ chiếu (Passport) với định dạng hoàn toàn khác.

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend
Hệ thống bị phá hoại hoặc tràn dữ liệu lỗi (Data Corruption / SQL Injection): Kẻ xấu có thể chèn các đoạn mã độc, ký tự lạ hoặc chuỗi quá dài vào ô "Số tài khoản" hoặc "Mã PIN". Nếu Backend không kiểm tra lại mà bê thẳng đi xử lý, hệ thống có thể bị sập, lỗi logic tính toán, hoặc tệ hơn là bị hack mất dữ liệu database thông qua lỗ hổng SQL Injection.

Bị qua mặt logic nghiệp vụ (Business Logic Bypass) dẫn đến gian lận tài chính: Kẻ tấn công có thể sửa đổi dữ liệu đầu vào thành các giá trị không hợp lệ nhưng có lợi cho họ (ví dụ: đổi số tiền cần chuyển thành một số âm -5.000.000đ hoặc đổi hạn mức giao dịch vượt quá quy định). Nếu Backend tin tưởng hoàn toàn vào Frontend và thực hiện lệnh, ngân hàng sẽ bị tổn thất cực kỳ nghiêm trọng về tài chính và vận hành.