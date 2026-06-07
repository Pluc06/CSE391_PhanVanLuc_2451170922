// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return (initialValue) => {
        // Dùng reduce để lấy kết quả hàm này truyền tiếp vào hàm sau
        return fns.reduce((value, fn) => fn(value), initialValue);
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"


// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {}; // Object để lưu trữ kết quả đã tính
    return (...args) => {
        const key = JSON.stringify(args); // Tạo key từ tham số đầu vào
        if (cache[key] !== undefined) {
            return cache[key]; // Nếu có rồi thì lấy từ cache
        }
        const result = fn(...args);
        cache[key] = result; // Lưu vào cache để lần sau dùng
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(1000000)); // In ra "Đang tính..."
console.log(expensiveCalc(1000000)); // Không in, lấy từ cache


// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timer;
    return (...args) => {
        // Mỗi lần gọi hàm mới thì xóa timer cũ đi
        clearTimeout(timer);
        // Chỉ chạy khi đã hết thời gian delay
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Test thử:
search("a");
search("ab");
search("abc"); // Chỉ in ra "Searching: abc" sau 500ms


// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let i = 0; i < maxAttempts; i++) {
        try {
            return await fn(); // Thử chạy hàm
        } catch (error) {
            if (i === maxAttempts - 1) throw error; // Nếu hết lần thử thì quăng lỗi
            console.log(`Lỗi, đang thử lại lần thứ ${i + 1}...`);
        }
    }
}