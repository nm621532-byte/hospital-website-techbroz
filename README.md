# 🏥 Sehat Care Hospital Website — HTML CSS JavaScript Full Project

Ek complete, responsive **Hospital website** jo humne YouTube video mein **zero se** banayi — sirf HTML, CSS aur JavaScript (koi framework nahi).

🎬 **YouTube video (Hindi):** (jaldi aa raha hai)
🌐 **Live demo:** https://nm621532-byte.github.io/hospital-website-techbroz/
💻 **Code khud chala ke dekho (free editor):** https://techbroz-code.sites.tab.bot/?v=hospital-website
⬇️ **Download (zip):** https://github.com/nm621532-byte/hospital-website-techbroz/raw/main/release/sehat-care-hospital-website-v1.0.zip

## ✨ Features
- Header + sticky navigation, hero section, stats
- Departments cards (CSS Grid, hover animation)
- Doctors cards **JavaScript se** (array of objects + `forEach` + template literals)
- Department **filter** + live **search**
- Health packages **cart** + **popup (modal)** with total and remove
- **Appointment form** with validation (name, 10-digit mobile, doctor, date) + booking ID
- **localStorage** (cart, bookings, theme save) with `try...catch`
- 🌙 **Dark mode** (CSS variables)
- 📱 **Responsive** mobile view + hamburger menu
- FAQ accordion + back-to-top button
- 💬 Testimonials **slider** (auto-play `setInterval`) + **WhatsApp button** (`encodeURIComponent`)

## 🐞 Video mein fix kiye 4 real bugs
1. `Cardiology` vs `cardiology` → `toLowerCase()`
2. `"499" + "1499"` = `04991499` (string jud gayi) → `Number()`
3. localStorage `SecurityError` (sandbox) → `try...catch`
4. Slider `slides[3]` undefined → `% modulo`

## ▶️ Kaise chalayein
```bash
git clone https://github.com/nm621532-byte/hospital-website-techbroz.git
cd hospital-website-techbroz
# bas index.html ko browser mein kholo (double click)
```
Ya upar diye editor link pe kholo aur **"🌐 Website live karo"** dabao — apni website ka link mil jayega.

## 📁 Files
- `index.html` — structure (HTML)
- `style.css` — design (CSS)
- `script.js` — features (JavaScript)

---
Made by **Tech Bro Z** — YouTube [@techbrozdeveloper](https://www.youtube.com/@techbrozdeveloper) • Instagram [@tech_bro_z_1](https://www.instagram.com/tech_bro_z_1/)

MIT License — seekho, badlo, apna bana lo. Agar pasand aaya to ⭐ star zaroor do!
