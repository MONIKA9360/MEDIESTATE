# 🏥 Medi Estate - Premium Medical Real Estate Platform

A production-ready Next.js 14 application for listing premium medical properties including land, wellness villas, and healthcare estates with integrated CRM and email notifications.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

## ✨ Features

### Core Features
- 🏞️ **Premium Property Listings** - Medical land, wellness villas, and healthcare estates
- 📧 **Lead Capture System** - Automated email notifications for inquiries
- 💰 **Loan Eligibility Page** - Comprehensive loan information for medical professionals
- 💾 **CRM Integration** - Neon PostgreSQL database for lead management
- 📱 **Fully Responsive** - Mobile-first design with smooth animations
- 🎨 **Premium UI/UX** - Professional white theme with gradient accents
- 🔍 **SEO Optimized** - Dynamic metadata, sitemap, and structured data
- ⚡ **Performance** - Lighthouse score > 90, optimized loading

### Property Features
- 6 Premium properties across major Indian cities
- Detailed property information (size, zoning, amenities)
- Dynamic property detail pages
- Gradient backgrounds with animated icons
- Glassmorphism effects

### Loan Eligibility Features
- Home loan information for medical professionals
- MSME loan details and comparison table
- Top lenders showcase
- Eligibility criteria and document requirements
- Contact form with email notifications

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Email**: Nodemailer (Gmail SMTP)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Neon database account
- Gmail account with App Password

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MONIKA9360/MEDIESTATE.git
   cd MEDIESTATE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
   SMTP_EMAIL="your-email@gmail.com"
   SMTP_PASSWORD="your-gmail-app-password"
   ADMIN_PASSWORD="your-admin-password"
   ADMIN_EMAIL="admin@example.com"
   NEXT_PUBLIC_ADMIN_PASSWORD="your-admin-password"
   NEXT_PUBLIC_ADMIN_EMAIL="admin@example.com"
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
mediestate/
├── app/
│   ├── api/
│   │   ├── leads/              # Contact form API
│   │   └── loan-leads/         # Loan inquiry API
│   ├── properties/
│   │   ├── [slug]/            # Dynamic property pages
│   │   ├── page.tsx           # Properties listing
│   │   └── PropertiesContent.tsx
│   ├── loan-eligibility/
│   │   ├── page.tsx
│   │   └── LoanEligibilityClient.tsx
│   ├── contact/
│   ├── about/
│   ├── layout.tsx
│   ├── page.tsx               # Home page
│   └── globals.css
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── PropertyCard.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── lib/
│   ├── prisma.ts              # Prisma client
│   ├── email.ts               # Email functions
│   └── properties.ts          # Property data
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── images/
├── .env.example               # Environment template
├── .gitignore
├── DEPLOYMENT.md              # Deployment guide
└── package.json
```

## 🗄️ Database Schema

### Lead Model
```prisma
model Lead {
  id         String   @id @default(uuid())
  name       String
  email      String
  phone      String
  message    String
  propertyId String?
  createdAt  DateTime @default(now())
}
```

### LoanLead Model
```prisma
model LoanLead {
  id        String   @id @default(uuid())
  name      String
  email     String
  phone     String
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```

## 📧 Email Configuration

### Gmail SMTP Setup

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Go to Google Account → Security → App Passwords
   - Select "Mail" and generate password
   - Copy the 16-character password (remove spaces)
3. Update `SMTP_EMAIL` and `SMTP_PASSWORD` in `.env.local`

For detailed instructions, see [EMAIL-SETUP-INSTRUCTIONS.md](EMAIL-SETUP-INSTRUCTIONS.md)

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy

3. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`

4. **Push Database Schema**
   ```bash
   npx prisma db push
   ```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 🎨 Design Features

### Color Palette
- **Primary**: Emerald (#10b981) to Blue (#3b82f6) gradients
- **Background**: White with subtle gray gradients
- **Text**: Gray-900 for headings, Gray-600 for body
- **Accents**: Purple (#a855f7) for special elements

### Animations
- Smooth fade-in effects on scroll
- Hover scale and lift animations
- Gradient button transitions
- Staggered grid animations
- Glassmorphism effects

### Typography
- **Headings**: Bold, large sizes with gradient text
- **Body**: Clean, readable with proper line height
- **Buttons**: Bold, rounded with shadow effects

## 📊 Performance Optimization

- ✅ Server-side rendering for static content
- ✅ Dynamic imports for heavy components
- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Minimal JavaScript bundle size
- ✅ Optimized CSS with Tailwind purge

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ `.env` files excluded from Git
- ✅ No hardcoded credentials
- ✅ HTTPS enforced on production
- ✅ Input validation on forms
- ✅ SQL injection prevention with Prisma

## 📱 Pages

### Home Page (`/`)
- Hero section with CTA
- Featured properties (3 cards)
- Why Choose Us section
- Call-to-action section

### Properties Page (`/properties`)
- All 6 property listings
- Animated grid layout
- Stats bar (properties, cities, area)
- Bottom CTA section

### Property Detail Page (`/properties/[slug]`)
- Full property information
- Features and amenities
- Nearby facilities
- Contact form

### Loan Eligibility Page (`/loan-eligibility`)
- Top info bar with contact details
- Hero section
- Home loan features
- MSME loans table
- Eligibility criteria
- Documents required
- Contact form

### Contact Page (`/contact`)
- Contact information
- Contact form
- Email integration

### About Page (`/about`)
- Company information
- Mission and vision
- Why choose us

## 🧪 Testing

### Test Email Functionality
```bash
node test-email.js
```

### Test Build
```bash
npm run build
npm start
```

## 📞 Contact Information

- **Email**: info@mediestate.in
- **Phone**: +91 9003252500
- **Locations**: India | USA | Dubai

## 👨‍💻 Developer

**Developed by MONIKA M**

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Changelog

### Version 1.0.0 (Current)
- ✅ Initial release
- ✅ 6 premium property listings
- ✅ Loan eligibility page
- ✅ Contact and lead capture system
- ✅ Email notifications
- ✅ CRM integration with Neon DB
- ✅ Professional white theme with gradients
- ✅ Fully responsive design
- ✅ SEO optimized

## 🐛 Known Issues

None at the moment. Please report issues on GitHub.

## 🔮 Future Enhancements

- [ ] Property search and filter functionality
- [ ] User authentication and saved properties
- [ ] Property comparison feature
- [ ] Virtual property tours
- [ ] Admin dashboard for property management
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Property booking system

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
