function createCart() {
    // Dữ liệu private, bên ngoài không thể truy cập trực tiếp
    let items = [];
    let discount = 0; // Lưu phần trăm giảm (ví dụ: 0.1 cho 10%)
    let fixedDiscount = 0; // Lưu số tiền giảm trực tiếp (ví dụ: 30000 cho freeship)

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },

        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },

        updateQuantity(productId, newQuantity) {
            const item = items.find(item => item.id === productId);
            if (item) item.quantity = newQuantity;
        },

        getTotal() {
            let subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            // Áp dụng giảm % trước, sau đó trừ tiền cố định
            let total = subtotal * (1 - discount) - fixedDiscount;
            return total > 0 ? total : 0; // Không để tổng tiền âm
        },

        applyDiscount(code) {
            if (code === "SALE10") discount = 0.1;
            else if (code === "SALE20") discount = 0.2;
            else if (code === "FREESHIP") fixedDiscount = 30000;
        },

        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },

        clearCart() {
            items = [];
            discount = 0;
            fixedDiscount = 0;
        },

        printCart() {
            const fMoney = (n) => n.toLocaleString('vi-VN');
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            
            items.forEach((item, index) => {
                let row = `│ ${index + 1} │ ${item.name.padEnd(13)} │ ${String(item.quantity).padEnd(2)} │ ${fMoney(item.price).padStart(11)} │ ${fMoney(item.price * item.quantity).padStart(11)} │`;
                console.log(row);
            });

            console.log("├──────────────────────────────────────────────┤");
            console.log(`│ Tổng cộng: ${fMoney(this.getTotal()).padStart(31)}đ │`);
            console.log("└──────────────────────────────────────────────┘");
        }
    };
}

// === TEST ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);

cart.printCart();

cart.applyDiscount("SALE10");
console.log("\nSau khi giảm 10%:");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); 
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount());