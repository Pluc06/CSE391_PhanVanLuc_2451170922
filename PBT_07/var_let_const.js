// Đoạn 1: Hoisting với var
console.log("--- Đoạn 1 ---");
console.log(x);
var x = 5;

// Đoạn 2: TDZ với let (Dùng try-catch để không bị sập cả file khi chạy)
console.log("\n--- Đoạn 2 ---");
try {
    console.log(y);
    let y = 10;
} catch (error) {
    console.log("Lỗi xuất hiện đúng như dự đoán:", error.message);
}

// Đoạn 3: Gán lại giá trị cho hằng số const
console.log("\n--- Đoạn 3 ---");
try {
    const z = 15;
    z = 20;
    console.log(z);
} catch (error) {
    console.log("Lỗi xuất hiện đúng như dự đoán:", error.message);
}

// Đoạn 4: Thay đổi phần tử trong mảng const
console.log("\n--- Đoạn 4 ---");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5: Block Scope với let
console.log("\n--- Đoạn 5 ---");
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);