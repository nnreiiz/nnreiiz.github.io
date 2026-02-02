# 🖼️ วิธีใส่รูปภาพในเมนูอาหาร

## วิธีที่ 1: ใช้ Imgur (แนะนำ - ง่ายที่สุด)

### ขั้นตอน:

1. **อัพโหลดรูปไป Imgur**
   - ไปที่ https://imgur.com
   - คลิก "New post"
   - เลือกรูปอาหารของคุณ
   - คลิก "Upload"

2. **คัดลอก URL รูป**
   - คลิกขวาที่รูป → "Copy image address"
   - จะได้ URL แบบนี้: `https://i.imgur.com/abc123.jpg`

3. **แก้ไขโค้ด**

ใน `index.html` หาบรรทัดนี้:

```javascript
const foodItems = [
  { 
    id: 'f1', 
    name: 'ข้าวขาหมู', 
    desc: 'ข้าวราดขาหมูตุ๋นนุ่ม ราดน้ำซอสเข้มข้น', 
    price: 50, 
    image: '🍖',  // <-- แก้ตรงนี้
    tag: 'Popular' 
  },
```

**เปลี่ยนเป็น:**

```javascript
const foodItems = [
  { 
    id: 'f1', 
    name: 'ข้าวขาหมู', 
    desc: 'ข้าวราดขาหมูตุ๋นนุ่ม ราดน้ำซอสเข้มข้น', 
    price: 50, 
    image: 'https://i.imgur.com/YOUR-IMAGE-ID.jpg',  // <-- ใส่ URL รูปที่นี่
    tag: 'Popular' 
  },
```

---

## วิธีที่ 2: ใช้ ImgBB

1. ไปที่ https://imgbb.com
2. คลิก "Start uploading"
3. เลือกรูป
4. คัดลอก "Direct link"
5. แก้ไขในโค้ดเหมือนวิธีที่ 1

---

## วิธีที่ 3: ใช้รูปจาก Google Drive (สำหรับที่มีรูปใน Google Drive)

1. อัพโหลดรูปไป Google Drive
2. คลิกขวาที่รูป → Get link → Anyone with the link
3. คัดลอก link (จะได้แบบนี้: `https://drive.google.com/file/d/ABC123/view`)
4. แปลงเป็น direct link:
   ```
   เดิม: https://drive.google.com/file/d/ABC123/view
   ใหม่: https://drive.google.com/uc?id=ABC123
   ```
5. ใช้ link ใหม่ในโค้ด

---

## ตัวอย่างการแก้ไขเมนูทั้งหมด

```javascript
const foodItems = [
  { 
    id: 'f1', 
    name: 'ข้าวขาหมู', 
    desc: 'ข้าวราดขาหมูตุ๋นนุ่ม ราดน้ำซอสเข้มข้น', 
    price: 50, 
    image: 'https://i.imgur.com/khaokhamu.jpg',
    tag: 'Popular' 
  },
  { 
    id: 'f2', 
    name: 'ข้าวผัดกระเพราหมูกรอบ', 
    desc: 'ข้าวผัดกระเพราเผ็ดร้อน หมูสามชั้นทอดกรอบ', 
    price: 55, 
    image: 'https://i.imgur.com/kaprao.jpg',
    tag: 'Signature' 
  },
  { 
    id: 'f3', 
    name: 'ข้าวผัดกระเพราหมูสับ', 
    desc: 'กระเพราหมูสับคลาสสิค ไข่ดาว', 
    price: 45, 
    image: 'https://i.imgur.com/kaprao2.jpg',
    tag: '' 
  },
  { 
    id: 'f4', 
    name: 'ข้าวผัดไข่', 
    desc: 'ข้าวผัดไข่หอมๆ รสชาติกลมกล่อม', 
    price: 35, 
    image: 'https://i.imgur.com/khaopadkhai.jpg',
    tag: '' 
  },
  { 
    id: 'f5', 
    name: 'ข้าวหมูแดง', 
    desc: 'ข้าวราดหมูแดงหวานมัน ไข่ยางมะตูม', 
    price: 45, 
    image: 'https://i.imgur.com/moodaeng.jpg',
    tag: 'Chef\'s Pick' 
  },
  { 
    id: 'f6', 
    name: 'ข้าวกะเพราทะเลรวมมิตร', 
    desc: 'กะเพราทะเลผัดเผ็ดร้อน กุ้ง ปลาหมึก หอยแมลงภู่', 
    price: 70, 
    image: 'https://i.imgur.com/kapraotalay.jpg',
    tag: '' 
  }
];
```

---

## เคล็ดลับการถ่ายรูปอาหาร 📸

1. **แสงสว่าง**: ถ่ายในที่มีแสงธรรมชาติ
2. **มุมกล้อง**: ถ่ายจากมุม 45 องศา หรือบนลงล่าง
3. **พื้นหลัง**: ใช้พื้นหลังสีเรียบๆ
4. **ขนาดรูป**: แนะนำ 800x800 px หรือ 1000x1000 px
5. **ไฟล์**: บันทึกเป็น .jpg คุณภาพสูง

---

## ขนาดรูปที่แนะนำ

- **สำหรับเมนู**: 800x800 px (สี่เหลี่ยมจัตุรัส)
- **ขนาดไฟล์**: ไม่เกิน 500 KB
- **รูปแบบไฟล์**: .jpg หรือ .png

---

## ถ้ายังไม่มีรูป

ถ้ายังไม่มีรูปอาหารจริง สามารถใช้:

1. **รูปฟรีจาก Unsplash**: https://unsplash.com/s/photos/thai-food
2. **รูปฟรีจาก Pexels**: https://www.pexels.com/search/thai%20food/
3. **AI Generate**: ใช้ AI สร้างรูปอาหาร

**ตัวอย่าง URL รูปฟรี:**
```javascript
image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400'
```

---

## หมายเหตุสำคัญ ⚠️

1. อย่าใช้รูปที่มี copyright โดยไม่ได้รับอนุญาต
2. ถ้ารูปไม่แสดง ให้เช็คว่า URL ถูกต้อง (เปิดใน browser ใหม่ดู)
3. รูปต้องเป็น https:// (มี s) ไม่ใช่ http://

---

## ต้องการความช่วยเหลือ?

ถ้ามีปัญหาหรือต้องการให้ช่วย:
1. อัพโหลดรูปไป Imgur
2. ส่ง URL รูปมาให้ผม
3. ผมจะช่วยแก้ไขโค้ดให้เลย!
