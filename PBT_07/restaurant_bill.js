function printBill(items, isWednesday = false, hasTip = false) {
    let tongCong = 0;

    // 1. Tính tổng tiền gốc
    for (let i = 0; i < items.length; i++) {
        tongCong += items[i].price * items[i].qty;
    }

    // 2. Tính phần trăm giảm giá theo quy tắc
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15;
    } else if (tongCong > 500000) {
        phanTramGiam = 10;
    }

    // Nếu là thứ 3 (Wednesday), cộng dồn thêm 5%
    if (isWednesday) {
        phanTramGiam += 5;
    }

    // Tính số tiền giảm
    let tienGiamGia = (tongCong * phanTramGiam) / 100;
    
    // Tiền sau khi giảm (dùng làm mốc tính VAT)
    let tienSauGiam = tongCong - tienGiamGia;

    // 3. Tính VAT và Tip
    let vat = tienSauGiam * 0.08; 
    let tip = hasTip ? (tongCong * 0.05) : 0;

    // 4. Tổng thanh toán cuối cùng
    let thanhToan = tienSauGiam + vat + tip;

    // --- PHẦN IN HÓA ĐƠN RA CONSOLE ---
    
    // Hàm phụ để format số tiền có dấu chấm (VD: 200000 -> "200.000đ")
    const fMoney = (num) => Math.round(num).toLocaleString('vi-VN') + "đ";
    
    // Hàm phụ để căn lề hai bên cho vừa vặn khung 38 ký tự
    const fLine = (leftText, rightText) => {
        let spaceCount = 38 - leftText.length - rightText.length;
        // Nếu chuỗi dài quá thì mặc định để 1 khoảng trắng
        let spaces = " ".repeat(spaceCount > 0 ? spaceCount : 1);
        return "║" + leftText + spaces + rightText + "║";
    };

    console.log("╔══════════════════════════════════════╗");
    console.log("║          HÓA ĐƠN NHÀ HÀNG            ║");
    console.log("╠══════════════════════════════════════╣");

    // In danh sách món ăn
    for (let i = 0; i < items.length; i++) {
        let mon = items[i];
        
        // Format từng thành phần của một dòng món ăn
        let index = ` ${i + 1}. `;
        let name = mon.name.padEnd(11, ' ');
        let qty = `x${mon.qty}`.padEnd(5, ' ');
        let price = `@${mon.price / 1000}k`.padEnd(6, ' ');
        
        let leftStr = index + name + qty + price;
        let rightStr = `= ${mon.price * mon.qty / 1000}k  `; // Thêm 2 dấu cách để lề phải không bị sát vách
        
        console.log(fLine(leftStr, rightStr));
    }

    // In phần tổng kết
    console.log("╠══════════════════════════════════════╣");
    console.log(fLine(" Tổng cộng:", fMoney(tongCong) + "   "));
    console.log(fLine(` Giảm giá (${phanTramGiam}%):`, fMoney(tienGiamGia) + "   "));
    console.log(fLine(" VAT (8%):", fMoney(vat) + "   "));
    console.log(fLine(" Tip (5%):", fMoney(tip) + "   "));
    console.log("╠══════════════════════════════════════╣");
    console.log(fLine(" THANH TOÁN:", fMoney(thanhToan) + "   "));
    console.log("╚══════════════════════════════════════╝");
}

const danhSachMon = [
    { name: "Phở bò", price: 65000, qty: 2 },
    { name: "Trà đá", price: 5000, qty: 3 },
    { name: "Bún chả", price: 55000, qty: 1 }
];

// Giả sử hôm nay không phải Thứ 3 (false) và có bo cho nhân viên (true)
printBill(danhSachMon, false, true);
