# 🌶️ Tillu Tapri — Cloud Kitchen Website

> **Tapri Wala Taste, Dil Se** | A complete, production-ready React + Vite + Tailwind CSS website.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

---

## 🛠️ Tech Stack

| Technology      | Version | Purpose               |
|-----------------|---------|----------------------|
| React           | 18      | UI Framework          |
| Vite            | 8       | Build Tool / Dev Server |
| Tailwind CSS    | 3       | Styling               |
| React Router    | 6       | Client-side Routing   |
| React Icons     | 5       | Icon Library          |
| Context API     | —       | Cart State Management |

---

## 📁 Project Structure

```
tillu-tapri/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Sticky nav + hamburger + cart badge
│   │   ├── Footer.jsx          # Full footer with social links
│   │   ├── FoodCard.jsx        # Reusable food card with cart controls
│   │   ├── CartItem.jsx        # Cart row component
│   │   ├── TestimonialCard.jsx # Customer review card
│   │   └── ServiceCard.jsx     # Service icon card
│   ├── context/
│   │   └── CartContext.jsx     # Global cart state (Context API)
│   ├── data/
│   │   └── menuData.js         # All menu items, categories, testimonials
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Menu.jsx            # Full menu with filters
│   │   ├── Cart.jsx            # Shopping cart + checkout
│   │   ├── Contact.jsx         # Contact form + map
│   │   ├── About.jsx           # Brand story + timeline
│   │   └── Profile.jsx         # User dashboard
│   ├── App.jsx                 # Root component + routing
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles + Tailwind directives
├── index.html                  # HTML shell (SEO meta tags)
├── tailwind.config.js          # Custom theme (brand colors, fonts)
├── postcss.config.js
└── vite.config.js
```

---

## 📄 Pages

| Page     | Route      | Description                              |
|----------|------------|------------------------------------------|
| Home     | `/`        | Hero, popular items, why us, testimonials |
| Menu     | `/menu`    | Category filters, search, all food items  |
| Cart     | `/cart`    | Items, coupon codes, bill summary         |
| Contact  | `/contact` | Contact info, Google Maps, form           |
| About    | `/about`   | Brand story, values, timeline             |
| Profile  | `/profile` | Order history, addresses, payment, settings |

---

## 🏷️ Coupon Codes (Demo)

| Code      | Discount         |
|-----------|-----------------|
| `TILLU10` | 10% OFF          |
| `TAPRI20` | 20% OFF          |
| `FLAT50`  | ₹50 OFF          |
| `NEWUSER` | 30% OFF (new users) |

---

## 🏗️ Build & Deploy

```bash
# Production build
npm run build

# Preview production build locally
npm run preview
```

### Deploy to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: **Vite** (auto-detected)
5. Click **Deploy**

> Vercel will automatically run `npm run build` and serve the `dist/` folder.

**Or use Vercel CLI:**
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
# Build and deploy
npm run build
# Drag & drop the dist/ folder to Netlify Drop
# or connect your GitHub repo at netlify.com
```

---

## 🎨 Theme Colors

```js
brand.orange       = '#FF6B00'   // Primary brand color
brand.orange-light = '#FF8C38'   // Hover state
brand.bg           = '#0D0D0D'   // Page background
brand.card         = '#1A1A1A'   // Card background
brand.border       = '#2A2A2A'   // Border color
brand.text         = '#F5F5F5'   // Primary text
brand.muted        = '#9CA3AF'   // Secondary text
```

---

## 📱 Features

- ✅ **6 complete pages** — Home, Menu, Cart, Contact, About, Profile
- ✅ **Responsive design** — Mobile-first, works on all screen sizes
- ✅ **Cart system** — Add/remove items, quantity controls, persistent cart
- ✅ **Coupon codes** — 4 working demo coupon codes
- ✅ **Free delivery** — Auto-calculated above ₹199
- ✅ **Search & filter** — Real-time search + 8 category filters + veg toggle
- ✅ **Sticky navbar** — Scroll-aware with mobile hamburger menu
- ✅ **SEO ready** — Meta tags, semantic HTML, proper headings
- ✅ **WhatsApp ordering** — Direct WhatsApp order link
- ✅ **Contact form** — Validated form with success state
- ✅ **Google Maps** — Embedded map on contact page
- ✅ **Dark theme** — Full dark mode with orange accents
- ✅ **Animations** — Fade-in, slide-up, hover effects, micro-interactions

---

## 👨‍💻 Development

```bash
# Install
npm install

# Dev server (hot reload)
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

Made with ❤️ for Tillu Tapri
