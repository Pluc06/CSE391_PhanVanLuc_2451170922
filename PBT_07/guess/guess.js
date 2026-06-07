// file: guess.js

function startGame() {
    // 1. Máy random 1 số từ 1-100
    // Math.random() cho số từ 0 đến <1. Nhân 100, làm tròn xuống bằng floor rồi cộng 1
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    
    let attempts = 0;
    const maxAttempts = 7;
    let guessedNumbers = []; // Mảng lưu các số đã đoán để check trùng

    alert("Chào mừng! Máy tính đã chọn một số bí mật từ 1 đến 100.\nBạn có 7 lần đoán. Bắt đầu nào!");

    // 2. Vòng lặp game
    while (attempts < maxAttempts) {
        let input = prompt(`Lần đoán thứ ${attempts + 1}/${maxAttempts}.\nNhập một số từ 1 đến 100:`);

        // Xử lý trường hợp người chơi bấm Cancel
        if (input === null) {
            alert("Bạn đã thoát trò chơi!");
            return; // Dừng hẳn hàm
        }

        // Validate 1: Kiểm tra xem có phải số không (loại trừ chuỗi rỗng)
        if (input.trim() === "" || isNaN(input)) {
            alert("Lỗi: Vui lòng nhập một CÁC SỐ hợp lệ!");
            continue; // Bỏ qua phần dưới, quay lại đầu vòng lặp (không trừ lượt)
        }

        // Chuyển chuỗi nhập vào thành số
        let guess = Number(input);

        // Validate 2: Chỉ chấp nhận số 1-100
        if (guess < 1 || guess > 100) {
            alert("Lỗi: Số bạn đoán phải nằm trong khoảng từ 1 đến 100!");
            continue;
        }

        // Yêu cầu thêm: Nếu user nhập cùng số 2 lần -> cảnh báo
        if (guessedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi! Hãy suy nghĩ và thử một số khác nhé.");
            continue;
        }

        // Nếu vượt qua hết các bước validate ở trên thì đây là một lượt đoán hợp lệ
        guessedNumbers.push(guess); // Lưu số này vào mảng đã đoán
        attempts++; // Tăng số lần đoán lên 1

        // Kiểm tra kết quả
        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return; // Thắng cuộc nên dừng game luôn
        } else if (guess < targetNumber) {
            alert("Cao hơn! (Số bí mật lớn hơn số bạn vừa đoán)");
        } else {
            alert("Thấp hơn! (Số bí mật nhỏ hơn số bạn vừa đoán)");
        }
    }

    // Nếu chạy hết vòng lặp while (đủ 7 lượt) mà vẫn chưa return, tức là thua
    alert(`Bạn đã hết ${maxAttempts} lượt đoán! Thua cuộc mất rồi.\nĐáp án đúng là: ${targetNumber}`);
}