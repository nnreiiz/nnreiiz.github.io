
// Menu Data
const menuData = {
  food: [
    { id: 'f1', name: 'ข้าวผัดกุ้ง', price: 89, emoji: '🍤', desc: 'ข้าวผัดกุ้งสดใหม่ หอมกระเทียม' },
    { id: 'f2', name: 'ผัดไทยกุ้งสด', price: 79, emoji: '🍜', desc: 'ผัดไทยรสชาติดั้งเดิม เส้นเหนียวนุ่ม' },
    { id: 'f3', name: 'ต้มยำกุ้ง', price: 129, emoji: '🥘', desc: 'ต้มยำน้ำข้นรสจัดจ้าน กุ้งแม่น้ำ' },
    { id: 'f4', name: 'แกงเขียวหวานไก่', price: 89, emoji: '🍛', desc: 'แกงเขียวหวานหอมมะพร้าว' },
    { id: 'f5', name: 'ส้มตำไทย', price: 59, emoji: '🥗', desc: 'ส้มตำรสเด็ด เปรี้ยวหวานเค็ม' },
    { id: 'f6', name: 'ไก่ทอดกรอบ', price: 99, emoji: '🍗', desc: 'ไก่ทอดกรอบนอกนุ่มใน' }
  ],
  drinks: [
    { id: 'd1', name: 'ชาเย็น', price: 35, emoji: '🧋', desc: 'ชาไทยหวานมัน เย็นชื่นใจ' },
    { id: 'd2', name: 'กาแฟเย็น', price: 45, emoji: '☕', desc: 'กาแฟโบราณ หอมกรุ่น' },
    { id: 'd3', name: 'น้ำมะพร้าว', price: 39, emoji: '🥥', desc: 'น้ำมะพร้าวสดชื่น' },
    { id: 'd4', name: 'น้ำส้มคั้น', price: 49, emoji: '🍊', desc: 'น้ำส้มคั้นสด 100%' },
    { id: 'd5', name: 'สมูทตี้ผลไม้รวม', price: 69, emoji: '🍹', desc: 'สมูทตี้ผลไม้สดหลากชนิด' },
    { id: 'd6', name: 'โกโก้เย็น', price: 55, emoji: '🍫', desc: 'โกโก้เข้มข้น หวานมัน' }
  ]
};

// State
let cart = [];
let currentTab = 'food';

// Chef/Orders Data
let allOrders = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  loadAllOrders();

  // Check which page we are on
  if (document.getElementById('food-menu')) {
    // We are on index.html
    renderMenus();
    updateCartCount();

    // Setup splash screen if it exists
    const splash = document.getElementById('splash-screen');
    if (splash) {
      // Simple splash screen logic
    }
  } else if (document.getElementById('cart-items-container')) {
    // We are on order.html
    renderOrderPage();
  } else if (document.getElementById('chef-orders-container')) {
    // We are on chef.html
    renderChefPage();
    // Auto refresh every 10 seconds
    setInterval(() => {
      loadAllOrders();
      renderChefPage();
    }, 10000);
  }
});

function loadCart() {
  try {
    const saved = localStorage.getItem('cart');
    if (saved) {
      cart = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load cart', e);
    cart = [];
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadAllOrders() {
  try {
    const saved = localStorage.getItem('allOrders');
    if (saved) {
      allOrders = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load orders', e);
    allOrders = [];
  }
}

function saveAllOrders() {
  localStorage.setItem('allOrders', JSON.stringify(allOrders));
}

function startApp() {
  document.getElementById('splash-screen').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

function renderMenus() {
  renderMenu('food');
  renderMenu('drinks');
}

function renderMenu(type) {
  const container = document.getElementById(`${type}-menu`);
  if (!container) return;

  container.innerHTML = menuData[type].map((item, index) => `
    <div class="menu-card bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in stagger-${index + 1} opacity-0" style="animation-delay: ${index * 0.1}s">
      <div class="h-32 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center text-6xl">
        ${item.emoji}
      </div>
      <div class="p-4">
        <h3 class="font-bold text-gray-800 text-lg">${item.name}</h3>
        <p class="text-gray-400 text-sm mt-1">${item.desc}</p>
        <div class="flex items-center justify-between mt-4">
          <span class="text-xl font-bold text-orange-500">฿${item.price}</span>
          <div class="flex items-center gap-2">
            <button onclick="updateCart('${item.id}', -1)" class="quantity-btn w-8 h-8 rounded-full border-2 border-orange-300 text-orange-500 font-bold flex items-center justify-center">−</button>
            <span id="qty-${item.id}" class="w-8 text-center font-semibold text-gray-700">${getItemQty(item.id)}</span>
            <button onclick="updateCart('${item.id}', 1)" class="quantity-btn w-8 h-8 rounded-full border-2 border-orange-300 text-orange-500 font-bold flex items-center justify-center">+</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function getItemQty(id) {
  const item = cart.find(c => c.id === id);
  return item ? item.qty : 0;
}

function getItemById(id) {
  return [...menuData.food, ...menuData.drinks].find(i => i.id === id);
}

function updateCart(id, delta) {
  const item = getItemById(id);
  if (!item) return;

  let cartItem = cart.find(c => c.id === id);

  if (cartItem) {
    cartItem.qty += delta;
    if (cartItem.qty <= 0) {
      cart = cart.filter(c => c.id !== id);
    }
  } else if (delta > 0) {
    cart.push({ id, qty: 1, ...item });
  }

  saveCart();

  // Update UI Elements
  const qtyEl = document.getElementById(`qty-${id}`);
  if (qtyEl) {
    qtyEl.textContent = getItemQty(id);
  }

  updateCartCount();

  // If on order page, re-render
  if (document.getElementById('cart-items-container')) {
    renderOrderPage();
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartCountEl = document.getElementById('cart-count');

  if (cartCountEl) {
    cartCountEl.textContent = count;
    // Animate cart button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
      cartBtn.classList.add('animate-cart-bounce');
      setTimeout(() => cartBtn.classList.remove('animate-cart-bounce'), 300);
    }
  }
}

function switchTab(tab) {
  currentTab = tab;

  const tabFood = document.getElementById('tab-food');
  const tabDrinks = document.getElementById('tab-drinks');
  const indicator = document.getElementById('tab-indicator');
  const foodMenu = document.getElementById('food-menu');
  const drinksMenu = document.getElementById('drinks-menu');

  if (tab === 'food') {
    tabFood.classList.replace('text-gray-400', 'text-orange-500');
    tabDrinks.classList.replace('text-orange-500', 'text-gray-400');
    indicator.style.transform = 'translateX(0)';
    foodMenu.classList.remove('hidden');
    drinksMenu.classList.add('hidden');
  } else {
    tabDrinks.classList.replace('text-gray-400', 'text-orange-500');
    tabFood.classList.replace('text-orange-500', 'text-gray-400');
    indicator.style.transform = 'translateX(100%)';
    drinksMenu.classList.remove('hidden');
    foodMenu.classList.add('hidden');
  }
}

function goToOrderPage() {
  window.location.href = 'order.html';
}

function renderOrderPage() {
  const container = document.getElementById('cart-items-container');
  const totalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-12">ยังไม่มีรายการในตะกร้า</p>';
    checkoutBtn.disabled = true;
  } else {
    container.innerHTML = cart.map((item, index) => `
          <div class="cart-item bg-white shadow-sm rounded-xl p-4 flex items-center gap-4 animate-fade-in" style="animation-delay: ${index * 0.05}s">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center text-3xl">
              ${item.emoji}
            </div>
            <div class="flex-1">
              <h4 class="font-semibold text-gray-800 text-lg">${item.name}</h4>
              <p class="text-orange-500 font-bold">฿${item.price}</p>
            </div>
            <div class="flex items-center gap-3">
              <button onclick="updateCart('${item.id}', -1)" class="quantity-btn w-8 h-8 rounded-full border-2 border-orange-300 text-orange-500 font-bold flex items-center justify-center hover:bg-orange-500 hover:text-white transition">−</button>
              <span class="w-8 text-center font-bold text-lg">${item.qty}</span>
              <button onclick="updateCart('${item.id}', 1)" class="quantity-btn w-8 h-8 rounded-full border-2 border-orange-300 text-orange-500 font-bold flex items-center justify-center hover:bg-orange-500 hover:text-white transition">+</button>
            </div>
          </div>
        `).join('');
    checkoutBtn.disabled = false;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  if (totalEl) totalEl.textContent = `฿${total.toLocaleString()}`;
}

async function confirmOrder() {
  if (cart.length === 0) return;

  const btn = document.getElementById('checkout-btn');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'กำลังสั่ง...';

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Create New Order
  const newOrder = {
    id: 'ord-' + Date.now(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
    timestamp: new Date().toISOString(),
    status: 'pending' // pending, completed
  };

  loadAllOrders(); // Sync before adding
  allOrders.unshift(newOrder); // Add to top
  saveAllOrders();

  // Clear cart
  cart = [];
  saveCart();

  // Show success
  const successModal = document.getElementById('success-modal');
  if (successModal) {
    successModal.classList.remove('hidden');
  }

  btn.disabled = false;
  btn.textContent = originalText;

  // Re-render
  renderOrderPage();
}

function closeSuccessModal() {
  document.getElementById('success-modal').classList.add('hidden');
  window.location.href = 'index.html';
}

// Chef View Functions
function renderChefPage() {
  const container = document.getElementById('chef-orders-container');
  if (!container) return;

  // Filter out completed? Or just show distinct styles?
  // Let's show pending at top
  const pending = allOrders.filter(o => o.status === 'pending');
  const completed = allOrders.filter(o => o.status === 'completed');

  if (pending.length === 0 && completed.length === 0) {
    container.innerHTML = '<p class="text-gray-400 text-center py-12 text-xl">ยังไม่มีออเดอร์เข้ามา</p>';
    return;
  }

  let html = '';

  if (pending.length > 0) {
    html += `<h2 class="text-2xl font-bold text-orange-600 mb-4 px-2">กำลังรอทำ (${pending.length})</h2>`;
    html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">';
    html += pending.map(order => createOrderCard(order)).join('');
    html += '</div>';
  }

  if (completed.length > 0) {
    html += `<h2 class="text-2xl font-bold text-green-600 mb-4 px-2">เสร็จสิ้นแล้ว (${completed.length})</h2>`;
    html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">';
    html += completed.map(order => createOrderCard(order)).join('');
    html += '</div>';
  }

  container.innerHTML = html;
}

function createOrderCard(order) {
  const isCompleted = order.status === 'completed';
  const date = new Date(order.timestamp);
  const timeStr = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');

  return `
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col ${isCompleted ? 'bg-gray-50' : 'animate-fade-in'}">
        <div class="p-4 ${isCompleted ? 'bg-gray-100' : 'bg-orange-50'} border-b border-gray-100 flex justify-between items-center">
            <div>
                <span class="font-bold text-gray-700">#${order.id.slice(-4)}</span>
                <span class="text-sm text-gray-500 ml-2">🕒 ${timeStr}</span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-bold ${isCompleted ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}">
                ${isCompleted ? 'เสร็จแล้ว' : 'รอทำ'}
            </span>
        </div>
        <div class="p-4 flex-1 space-y-3">
            ${order.items.map(item => `
                <div class="flex justify-between items-center text-sm">
                    <span class="flex items-center gap-2">
                        <span>${item.emoji}</span>
                        <span class="font-medium text-gray-700">${item.name}</span>
                    </span>
                    <span class="font-bold text-gray-900">x${item.qty}</span>
                </div>
            `).join('')}
        </div>
        <div class="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <span class="font-bold text-gray-700">฿${order.total}</span>
            ${!isCompleted ? `
                <button onclick="markOrderComplete('${order.id}')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md">
                    ✅ ทำเสร็จ
                </button>
            ` : ''}
        </div>
    </div>
    `;
}

function markOrderComplete(orderId) {
  const order = allOrders.find(o => o.id === orderId);
  if (order) {
    order.status = 'completed';
    saveAllOrders();
    renderChefPage();
  }
}

