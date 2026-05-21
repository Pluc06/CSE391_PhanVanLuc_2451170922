# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — HTTP & Browser
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
## Câu A2 (5đ) — Semantic HTML 
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

## Câu A3 (5đ) — Block vs Inline
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

## Câu A4 (5đ) — Table
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

# PHẦN C — SUY LUẬN (20 điểm)

## Câu C1 (10đ) — Thiết kế cấu trúc
<!DOCTYPE html>
<html lang="vi">

<head>
    <!-- head chứa metadata của trang -->
    
    <meta charset="UTF-8">
    <!-- meta charset dùng để hỗ trợ tiếng Việt và Unicode -->
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- viewport giúp giao diện hiển thị tốt trên thiết bị di động -->
    
    <title>Chi tiết sản phẩm</title>
    <!-- title là tiêu đề hiển thị trên tab trình duyệt -->
</head>

<body>
    <!-- body chứa toàn bộ nội dung hiển thị của trang -->

    <header>
        <!-- header chứa phần đầu trang như logo và menu điều hướng -->

        <a href="/" class="logo">TechShop</a>
        <!-- a được dùng cho logo vì logo thường dẫn về trang chủ -->

        <nav aria-label="Menu chính">
            <!-- nav dùng cho khu vực điều hướng chính của website -->

            <ul>
                <!-- ul dùng vì menu là danh sách các liên kết không có thứ tự -->

                <li><a href="#">Trang chủ</a></li>
                <!-- li là một mục trong danh sách menu -->

                <li><a href="#">Sản phẩm</a></li>

                <li><a href="#">Liên hệ</a></li>
            </ul>
        </nav>
    </header>

    <nav aria-label="breadcrumb">
        <!-- nav dùng cho breadcrumb vì đây là hệ thống điều hướng -->

        <ol>
            <!-- ol dùng vì breadcrumb có thứ tự phân cấp -->

            <li><a href="#">Trang chủ</a></li>

            <li><a href="#">Điện thoại</a></li>

            <li aria-current="page">iPhone 16</li>
            <!-- aria-current giúp xác định trang hiện tại -->
        </ol>
    </nav>

    <main>
        <!-- main chứa nội dung chính duy nhất của trang -->

        <article class="product-detail">
            <!-- article dùng vì đây là nội dung sản phẩm độc lập -->

            <section class="product-overview">
                <!-- section dùng để nhóm phần tổng quan sản phẩm -->

                <section class="product-gallery">
                    <!-- section này chứa khu vực ảnh sản phẩm -->

                    <h2>Hình ảnh sản phẩm</h2>
                    <!-- heading giúp xác định tiêu đề của section -->

                    <figure>
                        <!-- figure dùng để chứa nội dung media -->

                        <img src="#" alt="Ảnh sản phẩm">
                        <!-- img hiển thị hình ảnh sản phẩm -->

                        <figcaption>Ảnh chính sản phẩm</figcaption>
                        <!-- figcaption mô tả cho hình ảnh -->
                    </figure>

                    <img src="#" alt="Ảnh sản phẩm phụ 1">

                    <img src="#" alt="Ảnh sản phẩm phụ 2">

                    <img src="#" alt="Ảnh sản phẩm phụ 3">

                    <img src="#" alt="Ảnh sản phẩm phụ 4">
                </section>

                <section class="product-info">
                    <!-- section chứa thông tin chính của sản phẩm -->

                    <h1>Tên sản phẩm</h1>
                    <!-- h1 là tiêu đề chính quan trọng nhất của trang -->

                    <p class="rating">Đánh giá sao</p>
                    <!-- p dùng cho nội dung văn bản đơn giản -->

                    <p class="price">Giá sản phẩm</p>

                    <section class="description">
                        <!-- section dùng để tách riêng phần mô tả -->

                        <h2>Mô tả sản phẩm</h2>

                        <p>Nội dung mô tả sản phẩm...</p>
                    </section>
                </section>
            </section>

            <section class="specifications">
                <!-- section chứa bảng thông số kỹ thuật -->

                <h2>Thông số kỹ thuật</h2>

                <table>
                    <!-- table dùng để trình bày dữ liệu dạng bảng -->

                    <thead>
                        <!-- thead chứa tiêu đề các cột -->

                        <tr>
                            <!-- tr là một hàng trong bảng -->

                            <th>Thông số</th>
                            <!-- th là ô tiêu đề cột -->

                            <th>Chi tiết</th>
                        </tr>
                    </thead>

                    <tbody>
                        <!-- tbody chứa nội dung chính của bảng -->

                        <tr>
                            <td>Ví dụ thông số</td>
                            <!-- td là ô dữ liệu trong bảng -->

                            <td>Ví dụ chi tiết</td>
                        </tr>

                        <tr>
                            <td>Ví dụ thông số</td>

                            <td>Ví dụ chi tiết</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section class="reviews">
                <!-- section chứa đánh giá và bình luận của khách hàng -->

                <h2>Đánh giá khách hàng</h2>

                <article class="review-item">
                    <!-- article dùng vì mỗi bình luận là một nội dung độc lập -->

                    <header>
                        <!-- header của bình luận chứa thông tin người đánh giá -->

                        <strong>Tên người dùng</strong>
                        <!-- strong nhấn mạnh tên người dùng -->

                        <time datetime="2026-01-01">
                            Ngày đánh giá
                        </time>
                        <!-- time biểu diễn thời gian theo semantic HTML -->
                    </header>

                    <p>Nội dung bình luận...</p>
                    <!-- p dùng cho nội dung văn bản bình luận -->
                </article>
            </section>
        </article>

        <aside class="related-products">
            <!-- aside chứa nội dung phụ liên quan đến sản phẩm chính -->

            <h2>Sản phẩm tương tự</h2>

            <ul>
                <!-- ul dùng cho danh sách sản phẩm liên quan -->

                <li><a href="#">Sản phẩm 1</a></li>

                <li><a href="#">Sản phẩm 2</a></li>

                <li><a href="#">Sản phẩm 3</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <!-- footer chứa thông tin cuối trang -->

        <p>Thông tin bản quyền</p>

        <address>
            <!-- address dùng cho thông tin liên hệ hoặc địa chỉ -->

            Địa chỉ cửa hàng
        </address>
    </footer>

</body>
</html>

## Câu C2 (10đ) — So sánh & Tranh luận
Quan điểm "dùng <div> cho mọi thứ" thực chất là một sai lầm kỹ thuật nghiêm trọng, thường được gọi là "Div-itis". Mặc dù thêm class giúp chúng ta định dạng giao diện, nhưng nó hoàn toàn thất bại trong việc giao tiếp với các hệ thống máy tính.Về mặt kỹ thuật, lý do đầu tiên là SEO (Tối ưu hóa tìm kiếm). Google Bot không ưu tiên đọc tên class (vốn mang tính cá nhân của lập trình viên), nó dựa vào các thẻ như <main>, <article>, <h1> để lập chỉ mục. Nếu chỉ dùng <div>, thuật toán sẽ coi trang web là một khối văn bản phẳng, khiến sản phẩm của bạn bị đẩy xuống dưới trên bảng xếp hạng tìm kiếm. Lý do thứ hai là Accessibility (Khả năng tiếp cận). Những người khiếm thị sử dụng Screen Reader dựa vào các thẻ như <nav> hoặc <button> để hiểu cấu trúc trang. Một trang web toàn <div> đối với họ giống như một cuốn sách không có mục lục và tiêu đề, khiến họ không thể điều hướng.Một ví dụ cụ thể: Trên trang sản phẩm, nếu dùng <div class="price-new">25tr</div>, Google chỉ thấy một con số. Nhưng nếu dùng thẻ <ins>25.000.000đ</ins>, trình duyệt và công cụ tìm kiếm hiểu ngay đây là "giá mới sau khi giảm". Điều này giúp hiển thị các thông tin khuyến mãi ngay trên kết quả tìm kiếm (Rich Snippets), giúp tăng tỷ lệ click của khách hàng.Tuy nhiên, <div> không hề bị "khai tử". Nó vẫn là lựa chọn phù hợp nhất trong trường hợp cần các container trung tính để phục vụ mục đích dàn trang (layout) hoặc bọc các phần tử để áp dụng CSS (như Flexbox/Grid) mà bản thân khối đó không mang ý nghĩa nội dung cụ thể nào.Việc học thêm hơn 20 thẻ Semantic không tốn thời gian bằng việc phải đi sửa lỗi SEO hay lỗi hiển thị trên các thiết bị hỗ trợ sau này. Đó là sự khác biệt giữa một thợ gõ code và một Web Developer chuyên nghiệp.

# Phần B
## Bài B3 (15đ) — Debug HTML
Lỗi 1: Dòng 1 — Khai báo DOCTYPE sai cú pháp (`<!DOCTYPE>`) — Sửa thành `<!DOCTYPE html>`

Lỗi 2: Dòng 4 — Thẻ `<title>` chưa đóng — Sửa thành: <title>Trang web</title>

Lỗi 3: Dòng 5 — Charset viết sai chuẩn (`utf8`) — Sửa thành: <meta charset="UTF-8">

Lỗi 4: Dòng 9 — Thẻ `<h1>` đóng sai cú pháp (`<h1>` thay vì `</h1>`) — Sửa thành: <h1>Welcome to ShopTLU</h1>

Lỗi 5: Dòng 13 — Thẻ `<a>` đầu tiên chưa đóng đúng — Sửa thành: <a href="home">Trang chủ</a>

Lỗi 6: Dòng 13 — Giá trị `href="home"` không phải đường dẫn hợp lệ/không rõ ràng — Sửa thành: <a href="home.html">

Lỗi 7: Dòng 14 — `href="products"` không phải đường dẫn rõ ràng — Nên sửa thành: <a href="products.html">Sản phẩm</a>

Lỗi 8: Dòng 20 — Thẻ `<img>` thiếu thuộc tính `alt` (lỗi semantic) — Sửa thành: <img src="iphone.jpg" alt="iPhone 16 Pro">

Lỗi 9: Dòng 20 — Giá trị `src=iphone.jpg` không đặt trong dấu ngoặc kép — Sửa thành: <img src="iphone.jpg" alt="iPhone 16 Pro">

Lỗi 10: Dòng 22 — Thẻ `<b>` đóng sai thứ tự với `<p>` — Sửa thành: <p>Giá: <b>25.990.000đ</b></p>

Lỗi 11: Dòng 27–28 — Bảng thiếu phần tiêu đề semantic (`<th>`) — Sửa:
<tr>
    <th>Tên</th>
    <th>Giá</th>
</tr>

Lỗi 12: Dòng 38 — Sử dụng thẻ `<main>` lần thứ hai là sai semantic vì mỗi trang chỉ nên có một `<main>` — Sửa thành:
<aside>
    <p>Sidebar content</p>
</aside>

Lỗi 13: Dòng 43 — Thẻ `<p>` trong footer chưa đóng — Sửa thành: <p>Copyright 2026</p>

Lỗi 14: Toàn bộ tài liệu thiếu thẻ `<html lang="vi">` để khai báo ngôn ngữ trang — Sửa: <html lang="vi">

Lỗi 15: Cấu trúc heading chưa hợp lý về semantic — Trang có `<h1>` rồi nhưng các section dùng `<h3>` trực tiếp, bỏ qua `<h2>` — Sửa:
<h2>Sản phẩm hot</h2>
<h2>Thông tin</h2>