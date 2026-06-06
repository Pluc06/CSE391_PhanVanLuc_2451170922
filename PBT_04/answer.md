# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (10đ) — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use cases (Ví dụ thực tế) |
| :--- | :--- | :--- | :--- | :--- |
| **static** | Có | Theo thứ tự viết code HTML (Normal flow). | Có | Mặc định của mọi thẻ HTML. Dùng khi cứ để các khối div xếp chồng lên nhau bình thường theo thứ tự tự nhiên. |
| **relative** | Có | Vị trí gốc ban đầu của chính nó. | Có | Dùng để dịch chuyển nhẹ một phần tử (bằng `top`, `left`...) mà không làm ảnh hưởng đến vị trí của các khối xung quanh. Hoặc cực kỳ hay dùng để làm "mỏ neo" (thẻ cha) cho một thẻ con dùng `absolute`. |
| **absolute** | Không (Bị bốc ra khỏi luồng bình thường, các thẻ khác sẽ tràn lên chiếm chỗ). | Thẻ tổ tiên gần nhất có position khác static (Nearest positioned ancestor). | Có (Nó sẽ cuộn theo phần tử cha bọc nó). | Đặt một cái icon "Hot" hoặc nhãn giảm giá đè lên góc của hình ảnh sản phẩm; làm các menu thả xuống (dropdown menu). |
| **fixed** | Không (Bị bốc ra khỏi luồng bình thường). | Viewport (Toàn bộ khung màn hình trình duyệt). | Không (Nó đứng im một chỗ, ghim chết trên màn hình khi cuộn trang). | Làm thanh menu điều hướng luôn nằm ở trên cùng trang web khi cuộn chuột (fixed header), hoặc nút "Quay lại đầu trang" nằm ở góc dưới bên phải. |
| **sticky** | Có (Ban đầu vẫn chiếm chỗ bình thường như relative, cuộn đến mốc mới đổi trạng thái). | Kết hợp giữa vị trí gốc ban đầu và Viewport (khi cuộn màn hình chạm mốc). | Có, khi cuộn qua vị trí của nó thì nó sẽ "dính" vào mốc đã set (ví dụ `top: 0`) giống như fixed, cho đến khi đi hết phạm vi của thẻ cha nó. | Làm thanh tiêu đề của bảng dữ liệu, hoặc thanh mục lục bên hông (sidebar) chạy dọc theo bài viết dài. |


* Trả lời câu hỏi thêm

1. Khi nào absolute tham chiếu body? Khi nào tham chiếu parent?
* **Tham chiếu parent:** Khi phần tử cha (hoặc các cấp cao hơn như ông, bà...) bọc ngoài nó có khai báo thuộc tính `position` là một trong các giá trị: `relative`, `absolute`, `fixed`, hoặc `sticky`. Lúc này nó sẽ lấy khung của thẻ cha đó làm gốc tọa độ.
* **Tham chiếu body:** Khi nó tìm ngược lên tất cả các thẻ bao bọc nó mà không thấy bất kỳ thẻ nào được set thuộc tính `position` cả (tức là mọi thẻ cha, ông... đều đang để mặc định là `static`). Khi không tìm được điểm tựa nào, nó buộc phải lấy khung ngoài cùng của trang web (thành phần chứa gốc, thường tương đương với body/viewport ban đầu) làm mốc tọa độ.

2. Giải thích khái niệm "nearest positioned ancestor"
* Cụm từ này dịch theo cách hiểu của tụi mình là: **"Phần tử tổ tiên gần nhất có thiết lập vị trí (khác static)"**.
* **Cơ chế hoạt động:** Khi một thẻ được đặt là `position: absolute`, trình duyệt cần tìm một hệ quy chiếu (gốc tọa độ) để đo khoảng cách cho các thuộc tính căn lề như `top`, `bottom`, `left`, `right`. Trình duyệt sẽ thực hiện tìm kiếm bằng cách đi ngược lên trên cây phân cấp HTML: đầu tiên là kiểm tra thẻ cha trực tiếp (parent), nếu cha không có position (đang là static) thì tìm tiếp lên thẻ ông (grandparent), rồi cứ thế đi lên tiếp. Thẻ tổ tiên nào **đầu tiên** mà trình duyệt bắt gặp có cấu hình thuộc tính `position` khác `static` thì sẽ bị chọn làm gốc tọa độ. Đó chính là "nearest positioned ancestor".

## Câu A2 (10đ) — Flexbox vs Grid
1. TH1: Dự đoán bố cục: 1 hàng, 4 cột kích thước bằng nhau.
Sơ đồ: 

+-------------------------------------------------------+
| [   Item 1   ] [   Item 2   ] [   Item 3   ] [   Item 4   ] |
+-------------------------------------------------------+

2. TH2: Dự đoán bố cục: 3 hàng, 2 cột.
Sơ đồ:

+-----------------------------------+
| [     Item 1     ] [     Item 2     ] |
| [     Item 3     ] [     Item 4     ] |
| [     Item 5     ] [     Item 6     ] |
+-----------------------------------+

3. TH3: Dự đoán bố cục: 1 hàng, 3 items bị đẩy dãn ra xa nhau, căn giữa theo chiều dọc.
Sơ đồ:

+-------------------------------------------------------+
| [Item 1]                    [Item 2]                   [Item 3] |
+-------------------------------------------------------+

4. TH4: Dự đoán bố cục: 1 hàng, 3 cột với kích thước là "Cố định - Co giãn - Cố định", có khoảng trống ở giữa.
Sơ đồ: 

+-------------------------------------------------------+
| [  200px  ]  [   1fr (Chiếm hết chỗ trống)   ]  [  200px  ] |
+-------------------------------------------------------+

5. TH5: Dự đoán bố cục: 3 hàng, 3 cột. Item cuối (thứ 7) nằm ở cột đầu tiên của hàng thứ 3.
Sơ đồ: 

+-----------------------------------+
| [ Item 1 ]   [ Item 2 ]   [ Item 3 ] |
| [ Item 4 ]   [ Item 5 ]   [ Item 6 ] |
| [ Item 7 ]   [ Trống  ]   [ Trống  ] |
+-----------------------------------+