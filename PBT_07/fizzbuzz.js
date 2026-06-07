// file: fizzbuzz.js

console.log("=== VERSION 1: CLASSIC FIZZBUZZ ===");
// In từ 1 đến 100. Chia hết 3 -> Fizz, 5 -> Buzz, cả hai -> FizzBuzz
for (let i = 1; i <= 100; i++) {
    // Phải kiểm tra trường hợp chia hết cho cả 3 và 5 trước tiên
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

console.log("\n=== VERSION 2: CUSTOM FIZZBUZZ ===");
// Hàm hoạt động với độ dài mảng rules BẤT KỲ
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = ""; // Khởi tạo chuỗi rỗng cho mỗi số
        
        // Duyệt qua từng luật trong mảng rules
        for (let j = 0; j < rules.length; j++) {
            let rule = rules[j];
            
            // Nếu chia hết cho divisor của luật nào thì cộng dồn chữ của luật đó vào
            if (i % rule.divisor === 0) {
                output += rule.word;
            }
        }
        
        // Nếu output vẫn rỗng (tức là không chia hết cho divisor nào) thì in ra số i
        // Ngược lại thì in ra chuỗi output đã được cộng dồn
        if (output === "") {
            console.log(i);
        } else {
            console.log(output);
        }
    }
}

// Chạy test case đề bài yêu cầu (mình test n = 105 để thấy được chữ FizzBuzzJazz luôn)
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);