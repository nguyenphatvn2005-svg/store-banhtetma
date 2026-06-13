// =======================
// DATA SẢN PHẨM
// =======================
const PRODUCTS = [
  {
    id: 1,
    name: "Bánh Tét Chuối (1kg)",
    price: 100000,
    category: "Bánh Tét",
    image: "images/banhtechuoi.jpg",
  },
  {
    id: 2,
    name: "Bánh Tét Chuối Nhỏ",
    price: 30000,
    category: "Bánh Tét",
    image: "images/banhtechuoi.jpg",
  },
  {
    id: 3,
    name: "Bánh Tét Chay",
    price: 100000,
    category: "Bánh Tét",
    image: "images/banhtetchay.jpg",
  },
  {
    id: 4,
    name: "Bánh Tét Chay Nhỏ",
    price: 30000,
    category: "Bánh Tét",
    image: "images/banhtetchay.jpg",
  },
  {
    id: 5,
    name: "Bánh Tét Nếp Tro",
    price: 110000,
    category: "Bánh Tét",
    image: "images/banhteneptro.jpg",
  },
  {
    id: 6,
    name: "Bánh Tét 3 Màu Thịt Mỡ Trứng Muối (1kg3)",
    price: 130000,
    category: "Bánh Tét",
    image: "images/3mau.jpg",
  },
  {
    id: 7,
    name: "Bánh Tét 3 Màu Thịt Mỡ Trứng Muối (1kg5)",
    price: 150000,
    category: "Bánh Tét",
    image: "images/3mau.jpg",
  },
  {
    id: 8,
    name: "Bánh Tét Đậu",
    price: 100000,
    category: "Bánh Tét",
    image: "images/banhdau.jpg",
  },
  {
    id: 9,
    name: "Bánh Tét Mỡ",
    price: 100000,
    category: "Bánh Tét",
    image: "images/banhtetmo1.jpg",
  },
  {
    id: 10,
    name: "Bánh Ú",
    price: 30000,
    category: "Bánh Ú",
    image: "images/banhu.jpg",
  },
  {
    id: 11,
    name: "Bánh Ít",
    price: 8000,
    category: "Bánh Ít",
    image: "images/banhit1.jpg",
  },
  {
    id: 12,
    name: "Bánh Dừa",
    price: 8000,
    category: "Bánh Dừa",
    image: "images/banhdua.jpg",
  },
  {
    id: 13,
    name: 'Combo "3 Bánh Ú Tới Đây"',
    price: 85000,
    category: "Gói Combo Yêu Thương",
    desc: "Tiết kiệm 5k - Bụng no nê, trọn vẹn vị mặn mà",
    image: "images/combo3u.jpg",
  },
  {
    id: 14,
    name: 'Combo "Vỗ Béo"',
    price: 125000,
    category: "Gói Combo Yêu Thương",
    desc: "Dành cho những thực khách đam mê sự béo ngậy, đậm đà từ thịt mỡ",
    image: "images/combovobeo.jpg",
  },
  {
    id: 15,
    name: 'Combo "Chay Mặn"',
    price: 225000,
    category: "Gói Combo Yêu Thương",
    desc: "Dành cho mâm cúng hoặc gia đình nhiều thế hệ, dung hòa mọi khẩu vị",
    image: "images/combochayman.jpg",
  },
];

// =======================
// BIẾN TRẠNG THÁI
// =======================
let cart = [];
let isAudioPlaying = false;
let checkoutStep = "cart"; // cart | form | success
let formData = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

// =======================
// LẤY ELEMENT
// =======================
const welcomeOverlay = document.getElementById("welcomeOverlay");
const enterBtn = document.getElementById("enterBtn");
const bgAudio = document.getElementById("bgAudio");
const audioBtn = document.getElementById("audioBtn");

const searchInput = document.getElementById("searchInput");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const searchResult = document.getElementById("searchResult");
const productsContainer = document.getElementById("productsContainer");

const orderNowBtn = document.getElementById("orderNowBtn");
const logo = document.getElementById("logo");

const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartOverlay = document.getElementById("cartOverlay");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartCount = document.getElementById("cartCount");
const cartTitle = document.getElementById("cartTitle");
const cartBody = document.getElementById("cartBody");
const cartFooter = document.getElementById("cartFooter");

// =======================
// HÀM TIỆN ÍCH
// =======================
function formatVND(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCategories() {
  return [...new Set(PRODUCTS.map((product) => product.category))];
}

function escapeHTML(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// =======================
// BACKGROUND STICKERS
// =======================
function renderStickers() {
  const bgDynamic = document.getElementById("bgDynamic");
  const icons = ["🍃", "🎋", "🥟", "🌾"];

  for (let i = 0; i < 15; i++) {
    const sticker = document.createElement("div");
    sticker.className = "sticker";
    sticker.textContent = icons[Math.floor(Math.random() * icons.length)];

    sticker.style.left = `${Math.random() * 100}vw`;
    sticker.style.animationDuration = `${15 + Math.random() * 20}s`;
    sticker.style.animationDelay = `${Math.random() * 5}s`;
    sticker.style.fontSize = `${1.5 + Math.random() * 1.5}rem`;

    bgDynamic.appendChild(sticker);
  }
}

// =======================
// AUDIO + WELCOME
// =======================
function handleEnterSite() {
  welcomeOverlay.classList.add("hide");

  bgAudio.volume = 0.3;
  bgAudio.currentTime = 0;

  bgAudio
    .play()
    .then(() => {
      isAudioPlaying = true;
      audioBtn.textContent = "🔊";
    })
    .catch((error) => {
      console.log("Audio play failed:", error);
      isAudioPlaying = false;
      audioBtn.textContent = "🔇";
      alert("Trình duyệt chưa phát được nhạc. Bạn bấm nút loa để bật lại.");
    });
}

function toggleAudio() {
  if (isAudioPlaying) {
    bgAudio.pause();
    isAudioPlaying = false;
    audioBtn.textContent = "🔇";
    return;
  }

  bgAudio
    .play()
    .then(() => {
      isAudioPlaying = true;
      audioBtn.textContent = "🔊";
    })
    .catch((error) => {
      console.log("Audio play failed:", error);
      isAudioPlaying = false;
      audioBtn.textContent = "🔇";
      alert(
        "Không phát được nhạc. Kiểm tra lại đường dẫn file audio/music.mp3.",
      );
    });
}

// =======================
// RENDER PRODUCTS
// =======================
function renderProducts(keyword = "") {
  const searchValue = keyword.trim().toLowerCase();

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(searchValue),
  );

  if (searchValue) {
    searchResult.style.display = "block";
    searchResult.textContent = `Kết quả tìm kiếm cho: "${keyword}" (${filteredProducts.length} sản phẩm)`;
  } else {
    searchResult.style.display = "none";
    searchResult.textContent = "";
  }

  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <div class="empty-message">
        Không tìm thấy sản phẩm nào phù hợp.
      </div>
    `;
    return;
  }

  const categories = getCategories();

  productsContainer.innerHTML = categories
    .map((category) => {
      const catProducts = filteredProducts.filter(
        (product) => product.category === category,
      );

      if (catProducts.length === 0) {
        return "";
      }

      const productCards = catProducts
        .map(
          (product) => `
      <article class="product-card">
        <div class="product-img-box">
          <img src="${product.image}" alt="${escapeHTML(product.name)}">
          ${category === "Gói Combo Yêu Thương" ? '<div class="sale-badge">TIẾT KIỆM</div>' : ""}
        </div>

        <div class="product-info">
          <h4>${escapeHTML(product.name)}</h4>
          ${product.desc ? `<p>${escapeHTML(product.desc)}</p>` : ""}

          <div class="product-bottom">
            <span class="price">${formatVND(product.price)}</span>
            <button class="add-cart-btn" onclick="addToCart(${product.id})" title="Thêm vào giỏ hàng">
              🛒
            </button>
          </div>
        </div>
      </article>
    `,
        )
        .join("");

      return `
      <div class="category-block">
        <h3 class="category-title">
          <span>🍃</span>
          ${escapeHTML(category)}
        </h3>

        <div class="product-grid">
          ${productCards}
        </div>
      </div>
    `;
    })
    .join("");
}

// =======================
// CART FUNCTIONS
// =======================
function addToCart(productId) {
  const product = PRODUCTS.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  checkoutStep = "cart";
  openCart();
  renderCart();
}

function updateQuantity(productId, delta) {
  cart = cart
    .map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + delta,
        };
      }

      return item;
    })
    .filter((item) => item.quantity > 0);

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

function openCart() {
  cartOverlay.classList.add("active");
}

function closeCart() {
  cartOverlay.classList.remove("active");
}

function goToCheckoutForm() {
  checkoutStep = "form";
  renderCart();
}

function backToCart() {
  checkoutStep = "cart";
  renderCart();
}

function submitCheckout(event) {
  event.preventDefault();

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const notes = document.getElementById("customerNotes").value.trim();

  formData = {
    name,
    phone,
    address,
    notes,
  };

  checkoutStep = "success";
  cart = [];
  renderCart();
}

function resetAfterSuccess() {
  checkoutStep = "cart";
  formData = {
    name: "",
    phone: "",
    address: "",
    notes: "",
  };

  closeCart();
  renderCart();
}

function renderCart() {
  const count = getCartCount();
  const total = getCartTotal();

  cartCount.textContent = count;

  if (checkoutStep === "cart") {
    cartTitle.innerHTML = `🛒 Giỏ Hàng (${count})`;
  } else if (checkoutStep === "form") {
    cartTitle.textContent = "Thông Tin Đặt Hàng";
  } else {
    cartTitle.textContent = "Đặt Hàng Thành Công";
  }

  if (checkoutStep === "cart") {
    renderCartItems();
  } else if (checkoutStep === "form") {
    renderCheckoutForm();
  } else {
    renderSuccess();
  }

  renderCartFooter(total);
}

function renderCartItems() {
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="big-icon">🛒</div>
        <p>Giỏ hàng của bạn đang trống</p>
        <button class="outline-btn" onclick="closeCart()">Tiếp tục mua sắm</button>
      </div>
    `;
    return;
  }

  cartBody.innerHTML = `
    <div class="cart-items">
      ${cart
        .map(
          (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${escapeHTML(item.name)}">

          <div class="cart-item-info">
            <h4>${escapeHTML(item.name)}</h4>
            <div class="item-price">${formatVND(item.price)}</div>

            <div class="cart-item-actions">
              <div class="quantity-box">
                <button onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, 1)">+</button>
              </div>

              <button class="remove-btn" onclick="removeFromCart(${item.id})">
                Xóa
              </button>
            </div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `;
}

function renderCheckoutForm() {
  cartBody.innerHTML = `
    <form id="checkoutForm" onsubmit="submitCheckout(event)">
      <div class="form-group">
        <label>Họ và tên *</label>
        <input id="customerName" required type="text" value="${escapeHTML(formData.name)}" placeholder="Nhập họ tên người nhận">
      </div>

      <div class="form-group">
        <label>Số điện thoại *</label>
        <input id="customerPhone" required type="tel" value="${escapeHTML(formData.phone)}" placeholder="Nhập số điện thoại liên hệ">
      </div>

      <div class="form-group">
        <label>Địa chỉ giao hàng *</label>
        <textarea id="customerAddress" required rows="3" placeholder="Số nhà, đường, phường/xã, quận/huyện...">${escapeHTML(formData.address)}</textarea>
      </div>

      <div class="form-group">
        <label>Ghi chú thêm</label>
        <textarea id="customerNotes" rows="2" placeholder="Yêu cầu về thời gian giao, cách gói hàng...">${escapeHTML(formData.notes)}</textarea>
      </div>

      <div class="note-box">
        📍 Phí giao hàng sẽ được nhân viên liên hệ báo lại dựa trên địa chỉ của quý khách.
      </div>
    </form>
  `;
}

function renderSuccess() {
  cartBody.innerHTML = `
    <div class="success-box">
      <div class="success-icon">✅</div>
      <h3>Đặt hàng thành công!</h3>
      <p>
        Cảm ơn <strong>${escapeHTML(formData.name)}</strong> đã chọn Bánh Tét Mẹ Anh.<br>
        Chúng tôi sẽ sớm liên hệ qua số ${escapeHTML(formData.phone)} để xác nhận đơn hàng.
      </p>

      <button class="full-btn" onclick="resetAfterSuccess()">
        Về Trang Chủ
      </button>
    </div>
  `;
}

function renderCartFooter(total) {
  if (cart.length === 0 || checkoutStep === "success") {
    cartFooter.classList.remove("active");
    cartFooter.innerHTML = "";
    return;
  }

  cartFooter.classList.add("active");

  if (checkoutStep === "cart") {
    cartFooter.innerHTML = `
      <div class="total-row">
        <span>Tổng tạm tính:</span>
        <span class="total-price">${formatVND(total)}</span>
      </div>

      <button class="full-btn" onclick="goToCheckoutForm()">
        Tiến hành đặt hàng ›
      </button>
    `;
  } else {
    cartFooter.innerHTML = `
      <div class="total-row">
        <span>Tổng tạm tính:</span>
        <span class="total-price">${formatVND(total)}</span>
      </div>

      <div class="footer-actions">
        <button class="back-btn" onclick="backToCart()">Quay lại</button>
        <button class="confirm-btn" form="checkoutForm" type="submit">Xác nhận đặt</button>
      </div>
    `;
  }
}

// =======================
// SEARCH SYNC
// =======================
function handleSearch(value, source) {
  if (source === "desktop") {
    mobileSearchInput.value = value;
  } else {
    searchInput.value = value;
  }

  renderProducts(value);
}

// =======================
// EVENTS
// =======================
enterBtn.addEventListener("click", handleEnterSite);
audioBtn.addEventListener("click", toggleAudio);

logo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

orderNowBtn.addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth",
  });
});

searchInput.addEventListener("input", (event) => {
  handleSearch(event.target.value, "desktop");
});

mobileSearchInput.addEventListener("input", (event) => {
  handleSearch(event.target.value, "mobile");
});

openCartBtn.addEventListener("click", () => {
  checkoutStep = "cart";
  openCart();
  renderCart();
});

closeCartBtn.addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

// =======================
// INIT
// =======================
renderStickers();
renderProducts();
renderCart();

// Cho phép HTML gọi các hàm này bằng onclick
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.closeCart = closeCart;
window.goToCheckoutForm = goToCheckoutForm;
window.backToCart = backToCart;
window.submitCheckout = submitCheckout;
window.resetAfterSuccess = resetAfterSuccess;
