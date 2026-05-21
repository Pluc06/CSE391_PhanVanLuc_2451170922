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