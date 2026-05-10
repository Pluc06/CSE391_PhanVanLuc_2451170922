PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
Câu A1 (5đ) — HTTP & Browser
1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, các bước xảy ra sau đó là:
    B1: Gửi Request: Trình duyệt (Client) tạo một HTTP Request (thường là phương thức GET) để yêu cầu nội dung trang web.
    B2: Truyền tải qua mạng: Yêu cầu đi qua router, nhà mạng (ISP), cáp quang biển để đến máy chủ (Server) của Shopee.
    B3: Server phản hồi: Server tìm kiếm tài nguyên (file index.html), sau đó gửi ngược lại một HTTP Response kèm mã trạng thái và nội dung file.
    B4: Trình duyệt tiếp nhận (Parse): Trình duyệt nhận file và bắt đầu đọc mã HTML từ trên xuống để xây dựng cây cấu trúc DOM.
    B5: Render giao diện: Trình duyệt kết hợp HTML, CSS và thực thi JavaScript để tính toán vị trí (Layout), vẽ điểm ảnh (Paint) và hiển thị trang Shopee hoàn chỉnh.
*(Nguồn tham chiếu: File 01_introduction_html_universe.md — Phần 0 (Opening Hook), Phần 2 (Big Picture) và Phần 3 (Core Technical Truth))

2. Tab Network trong Chrome DevTools là công cụ dùng để giám sát tất cả các hoạt động mạng của trang web. Nó hiển thị danh sách mọi tài nguyên (file HTML, CSS, JS, hình ảnh, video, dữ liệu API) mà trình duyệt đã yêu cầu từ server, kèm theo các thông tin chi tiết về: trạng thái phản hồi, kích thước file, loại file và thời gian tải.
(1) Status Code của request đầu tiên
(2) Tổng thời gian load trang
(3) Một request trả về file CSS
![alt text](<ảnh/Screenshot 2026-04-24 222816.png>)
*(Nguồn tham chiếu: File 01_introduction_html_universe.md — Phần 3 (HTTP — Giao thức giao tiếp), Phần 6 (Hands-on Practice) và Phụ lục.)
Câu A2 (5đ) — Semantic HTML 
*(Nguồn tham chiếu:04_visible_part_html.md - Phần 1 và phần 3)
- Trang web bị đánh giá SEO thấp vì mắc lỗi "Div Soup" (lạm dụng thẻ <div>). Việc sử dụng các thẻ vô nghĩa khiến Google không thể phân biệt được đâu là nội dung chính, đâu là thanh điều hướng, và đâu là các thành phần độc lập của trang.
- Các lỗi semantic(dùng <div>):
    + Lỗi dùng <div class="header"> thay vì <header>
    Lý do chính: Làm mất đi định danh chức năng của phần đầu trang. Trình duyệt và Google không thể xác định đây là khu vực chứa Logo và công cụ tìm kiếm để ưu tiên xử lý.
    + Lỗi dùng <div class="menu"> thay vì <nav>
    Lý do chính: Khiến các công cụ hỗ trợ và Bot tìm kiếm không nhận diện được đây là khu vực điều hướng. Điều này ngăn cản việc thu thập dữ liệu về cấu trúc liên kết của website.
    + Lỗi dùng <div class="main"> thay vì <main>
    Lý do chính: Không xác định được vùng nội dung trọng tâm duy nhất của trang web. Điều này khiến Google khó phân biệt giữa nội dung chính và các thành phần phụ (sidebar, footer).
    + Lỗi dùng <div class="product"> thay vì <article>
    Lí do chính: Vi phạm tính độc lập của nội dung. Thẻ <article> giúp Google hiểu đây là một thực thể sản phẩm hoàn chỉnh, có thể đem đi chia sẻ hoặc nhúng vào trang khác mà vẫn giữ nguyên ý nghĩa.
    + Lỗi dùng <div class="title"> thay vì <h1>
    Lý do chính: Triệt tiêu từ khóa quan trọng nhất của trang web. Google coi thẻ <h1> là tiêu đề chính để xếp hạng nội dung; việc dùng <div> khiến tên sản phẩm "iPhone 16 Pro" bị đối xử như một đoạn văn bản bình thường.
    + Lỗi dùng <div class="footer"> thay vì <footer>
    Lí do chính: Làm mất đi ranh giới kết thúc trang. Việc dùng đúng thẻ <footer> giúp các công cụ tìm kiếm dễ dàng tìm thấy thông tin bản quyền, chính sách và liên hệ để xác minh độ uy tín của website.

- Sửa lại:
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1> <p class="price">25.990.000đ</p>
        
        <figure class="image">
            <img src="iphone.jpg" alt="iPhone 15 Pro Max màu Titan" loading="lazy">
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>

Câu A3 (5đ) — Block vs Inline
- Trình duyệt sẽ render đoạn mã như sau:
Hộp 1
Text AText B
Hộp 2
Text CText D ("Text D" in đậm)
Hộp 3

2. Giải thích:
    - <div>Hộp 1</div>: Thẻ <div> là Block element. Trình duyệt đặt nó trên một dòng riêng biệt. Sau khi kết thúc thẻ, dòng tiếp theo sẽ bị cưỡng bức xuống dưới.
    - <span>Text A</span>: Thẻ <span> là Inline element. Nó bắt đầu trên dòng mới (vì div trước đó đã chiếm hết dòng), nhưng nó chỉ chiếm không gian vừa đủ cho chữ "Text A".
    - <span>Text B</span>: Vì cũng là thẻ Inline, nó sẽ nhảy lên đứng cùng dòng với "Text A" vì khoảng trống ở dòng trên vẫn còn. Không có khoảng trắng giữa hai thẻ </span><span> nên chúng sẽ dính sát vào nhau: Text AText B.
    - <div>Hộp 2</div>: Đây là thẻ Block. Nó chỉ đứng trên 1 hàng riêng biệt nên nó tự nhảy xuống dòng tiếp theo và chiếm trọn một dòng cho chữ "Hộp 2".
    - <span>Text C</span>: Là thẻ Inline, nó bắt đầu ở dòng mới.
    - <strong>Text D</strong>: Thẻ <strong> cũng là Inline element. Nó tiếp tục nằm trên cùng một dòng với "Text C". Đồng thời <strong> là thẻ ngữ nghĩa (semantic) nhấn mạnh nội dung văn bản trong thẻ nên nội dung của nó là "Text D" sẽ được in đậm. 
    - <div>Hộp 3</div>: Là thẻ Block, nó tự xuống dòng và chiếm một dòng cuối cùng.

Câu A4 (5đ) — Table
- Đây là ba thẻ dùng để phân nhóm ngữ nghĩa cho các hàng trong một bảng, giúp trình duyệt và các công cụ hỗ trợ hiểu rõ vai trò của từng phần dữ liệu.
    + <thead> (Table Header): Chứa các hàng tiêu đề của cột.
    + <tbody> (Table Body): Chứa nội dung dữ liệu chính của bảng.
    + <tfoot> (Table Footer): Chứa phần tổng kết hoặc ghi chú cuối bảng.
- Việc dùng <table> để chia bố cục trang web (ví dụ chia cột trái, cột phải) là một sai lầm nghiêm trọng. Thay vào đó, cần phải dùng CSS Grid hoặc Flexbox.
- Lý do :
    + Sai lệch về mặt Ngữ nghĩa (Semantics): <table> chỉ dành cho dữ liệu tabular (dữ liệu có hàng và cột có ý nghĩa). Dùng nó cho layout khiến Google Bot không hiểu được cấu trúc nội dung trang web.
    + Hành vi hiển thị không mong muốn: Các thẻ trong bảng có những đặc tính hiển thị riêng (như tự động co giãn) khiến việc kiểm soát giao diện trên các thiết bị khác nhau (Responsive) trở nên cực kỳ khó khăn.
    + Code phức tạp và khó bảo trì: Layout bằng bảng thường có nhiều <tr> và <td> lồng nhau nên gây khó khăn cho việc đọc hiểu và sửa code.
    + Tốc độ render chậm: Trình duyệt phải tải gần xong bảng thì mới render chính xác được nội dung.