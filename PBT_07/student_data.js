// file: student_data.js

const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

// Khai báo các biến để lưu trữ kết quả thống kê
let countGioi = 0, countKha = 0, countTB = 0, countYeu = 0;

let maxScore = -1; // Đặt số âm để bất kỳ điểm nào cũng lớn hơn ở vòng lặp đầu
let minScore = 11; // Đặt số lớn hơn 10 để bất kỳ điểm nào cũng nhỏ hơn ở vòng lặp đầu
let topStudent = "";
let bottomStudent = "";

let totalMath = 0, totalPhysics = 0, totalCs = 0;

let totalMaleScore = 0, countMale = 0;
let totalFemaleScore = 0, countFemale = 0;

// In Header của bảng trước
console.log("| STT | Tên    | TB   | Xếp loại    |");
console.log("|-----|--------|------|-------------|");

// Sử dụng đúng 1 vòng lặp for để xử lý tất cả yêu cầu
for (let i = 0; i < students.length; i++) {
    let sv = students[i];

    // 1. Tính điểm trung bình (math×0.4 + physics×0.3 + cs×0.3)
    let diemTB = (sv.math * 0.4) + (sv.physics * 0.3) + (sv.cs * 0.3);
    
    // 2 & 5. Xếp loại và đếm số lượng sinh viên mỗi loại
    let xepLoai = "";
    if (diemTB >= 8.0) {
        xepLoai = "Giỏi";
        countGioi++;
    } else if (diemTB >= 6.5) {
        xepLoai = "Khá";
        countKha++;
    } else if (diemTB >= 5.0) {
        xepLoai = "Trung bình";
        countTB++;
    } else {
        xepLoai = "Yếu";
        countYeu++;
    }

    // 3. In bảng kết quả (dùng padEnd để căn lề cột cho đẹp)
    // toFixed(1) để làm tròn 1 chữ số thập phân (VD: 8.0, 7.2)
    let colSTT = String(i + 1).padEnd(3, ' ');
    let colName = sv.name.padEnd(6, ' ');
    let colTB = diemTB.toFixed(1).padEnd(4, ' ');
    let colXL = xepLoai.padEnd(11, ' ');

    console.log(`| ${colSTT} | ${colName} | ${colTB} | ${colXL} |`);

    // 6. Tìm SV có điểm TB cao nhất và thấp nhất
    if (diemTB > maxScore) {
        maxScore = diemTB;
        topStudent = sv.name;
    }
    if (diemTB < minScore) {
        minScore = diemTB;
        bottomStudent = sv.name;
    }

    // 7. Cộng dồn điểm để tí nữa tính TB toàn lớp cho từng môn
    totalMath += sv.math;
    totalPhysics += sv.physics;
    totalCs += sv.cs;

    // 8. Bonus: Cộng dồn điểm TB theo giới tính
    if (sv.gender === "M") {
        totalMaleScore += diemTB;
        countMale++;
    } else if (sv.gender === "F") {
        totalFemaleScore += diemTB;
        countFemale++;
    }
}

// In các kết quả thống kê sau khi vòng lặp kết thúc
let tongSoSV = students.length;

console.log("\n--- THỐNG KÊ KẾT QUẢ ---");
console.log(`Số lượng xếp loại: Giỏi (${countGioi}), Khá (${countKha}), Trung bình (${countTB}), Yếu (${countYeu})`);
console.log(`SV điểm TB cao nhất: ${topStudent} (${maxScore.toFixed(1)} điểm)`);
console.log(`SV điểm TB thấp nhất: ${bottomStudent} (${minScore.toFixed(1)} điểm)`);

console.log("\n--- ĐIỂM TB TOÀN LỚP THEO MÔN ---");
console.log(`Môn Toán (Math): ${(totalMath / tongSoSV).toFixed(1)}`);
console.log(`Môn Lý (Physics): ${(totalPhysics / tongSoSV).toFixed(1)}`);
console.log(`Môn Tin (CS): ${(totalCs / tongSoSV).toFixed(1)}`);

console.log("\n--- BONUS: ĐIỂM TB THEO GIỚI TÍNH ---");
// Kiểm tra count > 0 để tránh chia cho 0 nếu lớp toàn Nam hoặc toàn Nữ
if (countMale > 0) {
    console.log(`Điểm TB của Nam (M): ${(totalMaleScore / countMale).toFixed(1)}`);
}
if (countFemale > 0) {
    console.log(`Điểm TB của Nữ (F): ${(totalFemaleScore / countFemale).toFixed(1)}`);
}