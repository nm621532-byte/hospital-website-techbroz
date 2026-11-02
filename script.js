// 1. Doctors ka data
const doctors = [
  { name: "Dr. Anjali Sharma", dept: "Cardiology", exp: 12, fee: 800, icon: "👩‍⚕️" },
  { name: "Dr. Rahul Verma", dept: "Neurology", exp: 9, fee: 700, icon: "👨‍⚕️" },
  { name: "Dr. Sana Khan", dept: "Pediatrics", exp: 7, fee: 500, icon: "👩‍⚕️" },
  { name: "Dr. Vikram Singh", dept: "Cardiology", exp: 20, fee: 1200, icon: "👨‍⚕️" },
  { name: "Dr. Priya Mehta", dept: "Dental", exp: 6, fee: 400, icon: "👩‍⚕️" },
  { name: "Dr. Kabir Ali", dept: "Dermatology", exp: 8, fee: 600, icon: "👨‍⚕️" },
  { name: "Dr. Neha Gupta", dept: "Dermatology", exp: 11, fee: 750, icon: "👩‍⚕️" }
];

// 2. Doctors ke cards dikhao
const list = document.getElementById("doctorList");

function showDoctors(items) {
  list.innerHTML = "";
  items.forEach(d => {
    list.innerHTML += `
      <div class="doc">
        <div class="avatar">${d.icon}</div>
        <h3>${d.name}</h3>
        <p>${d.dept} • ${d.exp} yrs exp</p>
        <p class="price">₹${d.fee}</p>
        <button onclick="bookDoctor('${d.name}')">Book</button>
      </div>`;
  });
  if (items.length === 0) {
    list.innerHTML = "<p>No doctor found 😔</p>";
  }
}
showDoctors(doctors);

// 3. Filter + Search
const searchBox = document.getElementById("search");
let currentDept = "all";

function applyFilter() {
  const q = searchBox.value.toLowerCase();
  const result = doctors.filter(d =>
    (currentDept === "all" || d.dept.toLowerCase() === currentDept) &&
    d.name.toLowerCase().includes(q)
  );
  showDoctors(result);
}

document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#filters .active").classList.remove("active");
    btn.classList.add("active");
    currentDept = btn.dataset.dept;
    applyFilter();
  });
});

searchBox.addEventListener("input", applyFilter);

// 4. localStorage helpers
function save(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log("Save blocked:", e.name);
  }
}

function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

// 5. Modal (popup)
const modal = document.getElementById("modal");

function openModal(title, html) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").innerHTML = html;
  modal.classList.add("show");
}

document.getElementById("closeModal").onclick = () => {
  modal.classList.remove("show");
};

// 6. Packages cart
let cart = load("cart") || [];
const cartCount = document.getElementById("cartCount");

function updateCart() {
  cartCount.textContent = cart.length;
  save("cart", cart);
}
updateCart();

document.querySelectorAll(".add").forEach(btn => {
  btn.addEventListener("click", () => {
    cart.push({ name: btn.dataset.name, price: Number(btn.dataset.price) });
    updateCart();
    btn.textContent = "Added ✓";
  });
});

function showCart() {
  let total = 0;
  let html = "";
  cart.forEach((item, i) => {
    total += item.price;
    html += `<p>${item.name} - ₹${item.price}
      <button onclick="removeItem(${i})">❌</button></p>`;
  });
  if (cart.length === 0) html = "<p>Cart is empty</p>";
  openModal("🛒 Your Packages", html + `<h3>Total: ₹${total}</h3>`);
}

document.getElementById("cartBtn").onclick = showCart;

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
  showCart();
}

// 7. Appointment form
const form = document.getElementById("form");
const doctorSelect = document.getElementById("doctor");
const error = document.getElementById("error");
let bookings = load("bookings") || [];

doctors.forEach(d => {
  doctorSelect.innerHTML += `<option>${d.name}</option>`;
});

function bookDoctor(name) {
  doctorSelect.value = name;
  document.getElementById("appointment").scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("pname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;

  if (name.length < 3) {
    error.textContent = "Name must be at least 3 letters";
    return;
  }
  if (phone.length !== 10 || isNaN(phone)) {
    error.textContent = "Enter a valid 10 digit mobile number";
    return;
  }
  if (doctorSelect.value === "" || date === "") {
    error.textContent = "Please select doctor and date";
    return;
  }
  error.textContent = "";

  const id = "SC-" + (101 + bookings.length);
  bookings.push({ id, name, phone, doctor: doctorSelect.value, date });
  save("bookings", bookings);
  openModal("✅ Appointment Booked!", `
    <p>Booking ID: <b>${id}</b></p>
    <p>${name}, your visit with ${doctorSelect.value} on ${date} is confirmed.</p>`);
  form.reset();
});

// 8. Dark mode
const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️" : "🌙";
  save("theme", isDark ? "dark" : "light");
};

if (load("theme") === "dark") themeBtn.click();

// 9. Mobile menu
document.getElementById("menuBtn").onclick = () => {
  document.getElementById("nav").classList.toggle("open");
};

// 10. FAQ accordion
document.querySelectorAll(".faq-q").forEach(q => {
  q.addEventListener("click", () => {
    q.parentElement.classList.toggle("open");
  });
});

// 11. Back to top button
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  topBtn.classList.toggle("show", window.scrollY > 400);
});

topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

// 12. Testimonials slider
const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(n) {
  slides[current].classList.remove("active");
  current = (n + slides.length) % slides.length;
  slides[current].classList.add("active");
}

document.getElementById("nextBtn").onclick = () => showSlide(current + 1);
document.getElementById("prevBtn").onclick = () => showSlide(current - 1);

setInterval(() => showSlide(current + 1), 4000);

// 13. WhatsApp button
const waBtn = document.getElementById("waBtn");
const msg = "Hello Sehat Care, I want to book an appointment";
waBtn.href = "https://wa.me/919876543210?text=" + encodeURIComponent(msg);
console.log(waBtn.href);
