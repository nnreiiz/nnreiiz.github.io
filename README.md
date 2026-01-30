# 🍽️ Luxe Dining - ระบบสั่งอาหาร Real-time

ระบบสั่งอาหารแบบ Real-time พร้อม Firebase Realtime Database

## ✨ คุณสมบัติ

- ✅ สั่งอาหารผ่านหน้าเว็บ (Mobile-friendly)
- ✅ แสดงคำสั่งซื้อแบบ Real-time ในหน้าครัว
- ✅ เลือกโต๊ะได้
- ✅ แจ้งเตือนเสียงเมื่อมีคำสั่งซื้อใหม่
- ✅ ระบบสถิติยอดขาย
- ✅ รองรับหลายเครื่องพร้อมกัน

## 📁 ไฟล์ในโปรเจกต์

```
├── index.html      # หน้าสั่งอาหารสำหรับลูกค้า
├── kitchen.html    # หน้าแสดงคำสั่งซื้อสำหรับครัว
└── README.md       # คู่มือนี้
```

## 🚀 วิธีใช้งาน

### 1. เตรียม Firebase (ทำแล้ว ✅)

Firebase ของคุณได้ตั้งค่าเรียบร้อยแล้ว!

- Project: `foodfood-26`
- Database URL: `https://foodfood-26-default-rtdb.asia-southeast1.firebasedatabase.app`

### 2. ตั้งค่า Firebase Rules

ไปที่ Firebase Console:
1. เปิด https://console.firebase.google.com/project/foodfood-26/database
2. ไปที่แท็บ "Rules"
3. ใส่โค้ดนี้:

```json
{
  "rules": {
    "orders": {
      ".read": true,
      ".write": true
    }
  }
}
```

4. กด "Publish"

### 3. Deploy บน GitHub Pages

#### วิธีที่ 1: ใช้ GitHub Web Interface (ง่ายที่สุด)

1. ไปที่ https://github.com/new
2. สร้าง repository ใหม่ชื่อ `restaurant-order`
3. อัพโหลดไฟล์ `index.html` และ `kitchen.html`
4. ไปที่ Settings > Pages
5. เลือก Source: "Deploy from a branch"
6. เลือก Branch: `main` หรือ `master`
7. กด Save

#### วิธีที่ 2: ใช้ Git Command Line

```bash
# สร้าง repository
git init
git add .
git commit -m "Initial commit: Restaurant ordering system"

# เชื่อมต่อกับ GitHub (แทน YOUR_USERNAME ด้วยชื่อผู้ใช้ของคุณ)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/restaurant-order.git
git push -u origin main
```

จากนั้นไปที่ Settings > Pages เหมือนวิธีที่ 1

### 4. เข้าใช้งาน

หลังจาก Deploy แล้ว ประมาณ 1-2 นาที จะเข้าถึงได้ที่:

- **หน้าลูกค้า (สั่งอาหาร):**  
  `https://YOUR_USERNAME.github.io/restaurant-order/`

- **หน้าครัว (ดูออเดอร์):**  
  `https://YOUR_USERNAME.github.io/restaurant-order/kitchen.html`

## 📱 วิธีใช้งาน

### สำหรับลูกค้า (index.html)

1. เปิดหน้าเว็บ
2. เลือกอาหารหรือเครื่องดื่ม
3. กดปุ่ม + เพื่อเพิ่มลงตะกร้า
4. กดปุ่ม "ดูตะกร้าสินค้า"
5. เลือกเลขโต๊ะ (ถ้าต้องการ)
6. กด "ยืนยันคำสั่งซื้อ"

### สำหรับครัว (kitchen.html)

1. เปิดหน้าเว็บไว้ตลอดเวลา
2. เมื่อมีคำสั่งซื้อใหม่ จะมีเสียงแจ้งเตือน 🔔
3. ดูรายการอาหารที่ต้องทำ
4. เมื่อทำเสร็จ กดปุ่ม "ทำเสร็จแล้ว" ✅

## 🎨 ปรับแต่ง

### เปลี่ยนรายการอาหาร

แก้ไขในไฟล์ `index.html` ที่บรรทัด:

```javascript
const foodItems = [
  { id: 'f1', name: 'ชื่ออาหาร', desc: 'รายละเอียด', price: 250, emoji: '🍜', tag: 'Popular' },
  // เพิ่มเมนูใหม่ที่นี่...
];

const drinkItems = [
  { id: 'd1', name: 'ชื่อเครื่องดื่ม', desc: 'รายละเอียด', price: 80, emoji: '🍹', tag: '' },
  // เพิ่มเครื่องดื่มใหม่ที่นี่...
];
```

### เปลี่ยนสี

แก้ไขใน CSS:
- `amber-500` = สีทอง (หลัก)
- `slate-900` = สีพื้นหลัง
- `emerald-500` = สีเขียว (ปุ่มยืนยัน)

## 🔧 แก้ปัญหา

### ไม่มีเสียงแจ้งเตือน
- ตรวจสอบว่าเบราว์เซอร์อนุญาตเสียงหรือไม่
- ลองกดที่หน้าเว็บก่อน (บางเบราว์เซอร์ต้องการ user interaction)

### คำสั่งซื้อไม่แสดง
1. ตรวจสอบ Firebase Rules ว่าตั้งค่าถูกต้องแล้ว
2. เปิด Console (F12) ดู error
3. ตรวจสอบว่า Firebase Config ถูกต้อง

### ข้อมูลไม่ Sync
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- Refresh หน้าเว็บ
- เคลียร์ Cache (Ctrl + Shift + Delete)

## 📊 ดูข้อมูลใน Firebase

1. เปิด https://console.firebase.google.com/project/foodfood-26/database
2. คลิกที่ "Realtime Database"
3. จะเห็นข้อมูลคำสั่งซื้อทั้งหมด

โครงสร้างข้อมูล:
```
orders/
  └── 1706612345678/
      ├── id: 1706612345678
      ├── table: "5"
      ├── total: 3250
      ├── status: "pending"
      ├── timestamp: 1706612345678
      └── items: [...]
```

## 🌟 ฟีเจอร์เพิ่มเติมที่แนะนำ

- [ ] เพิ่มการพิมพ์ใบเสร็จ
- [ ] แจ้งเตือนผ่าน Line Notify
- [ ] ระบบจัดการโต๊ะ
- [ ] รายงานยอดขายรายวัน/รายเดือน
- [ ] ระบบสมาชิก/คะแนนสะสม

## 📝 License

MIT License - ใช้งานได้อย่างอิสระ

## 💡 Tips

- แนะนำให้เปิดหน้าครัวบน iPad หรือ Tablet
- ตั้งค่าไม่ให้หน้าจอดับเพื่อดูคำสั่งซื้อตลอดเวลา
- สามารถเปิดหลายหน้าครัวพร้อมกันได้ (จะ Sync กันอัตโนมัติ)

---

Made with ❤️ for Restaurant Business
