# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)
## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

1. Viết cùng 1 hàm bằng 3 cách
Cách 1: Function Declaration (Khai báo hàm truyền thống)

JavaScript
function tinhThueBaoHiem1(luong) {
    let thue = (luong > 11000000) ? luong * 0.1 : 0;
    let thuc_nhan = luong - thue;
    let thuong = 0; // Đề không cho công thức tính thưởng nên mình để 0
    
    return { thuong, thuc_nhan };
}

Cách 2: Function Expression (Biểu thức hàm)

JavaScript
const tinhThueBaoHiem2 = function(luong) {
    let thue = (luong > 11000000) ? luong * 0.1 : 0;
    let thuc_nhan = luong - thue;
    let thuong = 0;
    
    return { thuong, thuc_nhan };
};

Cách 3: Arrow Function (Hàm mũi tên - ES6)

JavaScript
const tinhThueBaoHiem3 = (luong) => {
    let thue = (luong > 11000000) ? luong * 0.1 : 0;
    let thuc_nhan = luong - thue;
    let thuong = 0;
    
    return { thuong, thuc_nhan };
};

2. Sự khác nhau về Hoisting giữa 3 cách

Function Declaration: Được "kéo" lên toàn bộ (cả tên hàm lẫn nội dung bên trong). Do đó, bạn có thể gọi hàm chạy bình thường trước cả khi viết code khai báo nó.

Function Expression và Arrow Function: Bản chất của 2 cách này là gán một hàm vào một biến (thường dùng const hoặc let). JavaScript sẽ chỉ kéo phần "khai báo biến" lên đầu, chứ không kéo nội dung hàm. Nếu bạn cố tình gọi nó trước khi khai báo, nó sẽ báo lỗi ngay lập tức vì lúc đó biến chưa có dữ liệu hàm nào để chạy cả (bị kẹt trong vùng TDZ - Temporal Dead Zone).

3. Ví dụ cụ thể: 
// 1. THỬ GỌI HÀM TRƯỚC KHI KHAI BÁO
console.log("Test 1: ", cach1(15000000)); // CHẠY BÌNH THƯỜNG! In ra object.

// Nếu bỏ comment dòng dưới, code sẽ chết ngay lập tức và báo lỗi: 
// Uncaught ReferenceError: Cannot access 'cach2' before initialization
// console.log("Test 2: ", cach2(15000000)); 

// Tương tự, nếu bỏ comment dòng dưới cũng sẽ báo lỗi y hệt.
// console.log("Test 3: ", cach3(15000000));


// 2. PHẦN KHAI BÁO NẰM Ở DƯỚI
// Function Declaration
function cach1(luong) {
    return "Cách 1 chạy ngon ơ!";
}

// Function Expression
const cach2 = function(luong) {
    return "Cách 2 chạy được";
};

// Arrow Function
const cach3 = (luong) => {
    return "Cách 3 chạy được";
};

## Câu A2 (5đ) — Scope & Closure
1. Dự đoán output
Đoạn 1:

console.log(c.increment());  // 1 (Hàm chạy ++count, count từ 0 tăng lên 1)
console.log(c.increment());  // 2 (Do cơ chế closure lưu lại môi trường cũ, count từ 1 tăng lên 2)
console.log(c.increment());  // 3 (Tương tự, 2 tăng lên 3)
console.log(c.decrement());  // 2 (Hàm chạy --count, 3 bị trừ xuống 2)
console.log(c.getCount());   // 2 (Chỉ in ra count hiện tại, đang là 2)

Đoạn 2:

// Output sau 200ms: 
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2

2. Giải thích chi tiết: Tại sao var và let cho kết quả khác nhau?
Sự khác biệt này xuất phát từ Phạm vi của biến (Scope) và cách nó kết hợp với cơ chế Closure:

Đối với vòng lặp dùng var i:
Biến khai báo bằng var KHÔNG có phạm vi khối (block scope) mà chỉ có phạm vi toàn cục hoặc hàm. Điều này có nghĩa là trong suốt quá trình chạy vòng lặp, máy tính chỉ tạo ra một biến i duy nhất dùng chung cho mọi nơi.
Vòng lặp for chạy cái vèo rất nhanh, lập tức đẩy giá trị của i lên 3 rồi dừng lại. Trong khi đó, 3 cái hàm setTimeout đang xếp hàng đợi 100ms sau mới được chạy. Khi thời gian đếm ngược kết thúc, 3 hàm này mới thức dậy và đi tìm i để in ra. Vì chỉ có một biến i duy nhất lúc này đã bằng 3, cả 3 hàm đều in ra số 3.

Đối với vòng lặp dùng let j:
Biến let sinh ra sau này nên xịn hơn vì nó CÓ phạm vi khối (block scope). Cứ mỗi một vòng lặp chạy, JavaScript lại âm thầm tạo ra một biến j hoàn toàn mới và độc lập trong bộ nhớ.
Nhờ cơ chế Closure, mỗi cái hàm setTimeout bên trong sẽ "chụp ảnh" và giữ chặt lấy biến j của riêng cái vòng lặp sinh ra nó:

Hàm thứ nhất giữ j = 0

Hàm thứ hai giữ j = 1

Hàm thứ ba giữ j = 2
Nên sau 200ms, khi các hàm này chạy, tụi nó cứ lôi đúng cái giá trị j riêng biệt đã được cất giữ ra để in, tạo ra kết quả chuẩn xác là 0, 1, 2.

## Câu A3 (5đ) — Array Methods

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((total, n) => total + n, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allGreaterThan0 = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const oddEvenArray = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc bằng cách dùng spread operator để copy mảng trước khi reverse)
const reversed = [...nums].reverse();

## Câu A4 (5đ) — Object Destructuring & Spread

1. Phần Destructuring

console.log(name, price, ram, color);  
// Dự đoán: "iPhone 16" 25990000 8 "Titan"

console.log(specs);                     
// Dự đoán: Lỗi (ReferenceError: specs is not defined)
Giải thích lỗi specs: Khi dùng cú pháp specs: { ram, color }, JavaScript hiểu rằng mình đang muốn đi sâu vào bên trong thuộc tính specs để bóc tách lấy ram và color ra làm biến độc lập. Nó sẽ KHÔNG tạo ra biến nào tên là specs ở ngoài cả. Nếu muốn lấy cả biến specs, mình phải khai báo kiểu: const { name, price, specs } = product;.

2. Phần Spread

console.log(updated.price);            
// Dự đoán: 23990000 (Giá trị price đã bị ghi đè bởi giá trị mới khai báo phía sau)

console.log(updated.sale);             
// Dự đoán: true (Thuộc tính mới được thêm vào)

console.log(product.price);            
// Dự đoán: 25990000 (Giá trị gốc của mảng product không bị thay đổi)
3. Phần Spread Gotcha (Bẫy tham chiếu)

console.log(product.specs.ram);        
// Dự đoán: 16 (Bị thay đổi theo biến copy)

* Tại sao lại là 16 mà không phải 8?
Đây là bẫy Shallow Copy (Sao chép nông) kinh điển trong JavaScript!

Khi dùng toán tử Spread (...product) để tạo ra object copy, JS chỉ tạo ra một bản sao hoàn toàn mới cho các thuộc tính ở lớp ngoài cùng (top-level) như name hay price.

Tuy nhiên, với các thuộc tính bị lồng bên trong (nested object) như thuộc tính specs, toán tử Spread sẽ lười biếng và không tạo ra object mới. Nó chỉ copy địa chỉ tham chiếu bộ nhớ của object specs cũ.

Hậu quả là copy.specs và product.specs thực chất đang cùng trỏ về chung một chỗ trong RAM máy tính. Khi mình sửa copy.specs.ram = 16, cái gốc product.specs.ram cũng bị thay đổi theo thành 16.

# PHẦN C — SUY LUẬN (20 điểm)
## Câu C1 (10đ) — Refactor Code
1. Viết lại thành ≤ 10 dòng dùng filter, map, sort, destructuring, arrow functions.
const processOrders = (orders) => orders
  .filter(({ status, total }) => status === "completed" && total > 100000)
  .map(({ id, customer, total }) => ({
    id, customer, total,
    discount: total * 0.1,
    finalTotal: total * 0.9
  }))
  .sort((a, b) => b.finalTotal - a.finalTotal);

## Câu C2 (10đ) — Thiết kế API

const miniArray = {
    // map: duyệt từng phần tử, biến đổi rồi đẩy vào mảng mới
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i]));
        }
        return result;
    },

    // filter: duyệt qua, nếu điều kiện fn(item) là true thì mới giữ lại
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i])) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // reduce: dùng biến accumulator (bộ tích lũy) để cộng dồn giá trị
    reduce(arr, fn, initialValue) {
        let accumulator = initialValue;
        for (let i = 0; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i]);
        }
        return accumulator;
    }
};

// --- Test lại ---
console.log(miniArray.map([1, 2, 3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); // → 10