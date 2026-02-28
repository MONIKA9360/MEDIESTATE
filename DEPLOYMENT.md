# Medi Estate - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- A GitHub account
- A Vercel account (sign up at https://vercel.com)
- A Neon database (sign up at https://neon.tech)
- Gmail account with App Password enabled

---

## Step 1: Prepare Environment Variables

### 1.1 Neon Database Setup

1. Go to https://neon.tech and create a new project
2. Copy your connection string (it looks like: `postgresql://user:password@host/dbname?sslmode=require`)
3. Save this as `DATABASE_URL`

### 1.2 Gmail SMTP Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security → App Passwords
3. Generate a new App Password for "Mail"
4. Save the email and app password

### 1.3 Create .env.local (for local development)

Copy `.env.example` to `.env.local` and fill in your actual values:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your credentials.

---

## Step 2: Initialize Git Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Medi Estate application"

# Create GitHub repository and push
git branch -M main
git remote add origin https://github.com/MONIKA9360/MEDIESTATE.git
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository: `MONIKA9360/MEDIESTATE`
3. Configure Project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

4. Add Environment Variables in Vercel:
   - Click "Environment Variables"
   - Add each variable from your `.env` file:
     - `DATABASE_URL` → Your Neon connection string
     - `SMTP_EMAIL` → Your Gmail address
     - `SMTP_PASSWORD` → Your Gmail App Password
     - `ADMIN_PASSWORD` → Your admin password
     - `ADMIN_EMAIL` → Your admin email
     - `NEXT_PUBLIC_ADMIN_PASSWORD` → Your admin password
     - `NEXT_PUBLIC_ADMIN_EMAIL` → Your admin email

5. Click "Deploy"

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

---

## Step 4: Setup Prisma Database

After deployment, you need to push the database schema:

### Option 1: Via Vercel CLI

```bash
# Set environment variable locally for this command
export DATABASE_URL="your-neon-connection-string"

# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### Option 2: Via Vercel Dashboard

1. Go to your Vercel project
2. Navigate to Settings → Functions
3. Add a one-time deployment script or use Vercel's built-in Prisma integration

---

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL (e.g., `https://mediestate.vercel.app`)
2. Test the following:
   - ✅ Home page loads
   - ✅ Properties page displays all 6 properties
   - ✅ Property detail pages work
   - ✅ Contact form submission works
   - ✅ Loan eligibility form submission works
   - ✅ Email notifications are sent

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `SMTP_EMAIL` | Gmail address for sending emails | `your-email@gmail.com` |
| `SMTP_PASSWORD` | Gmail App Password (16 characters) | `abcd efgh ijkl mnop` |
| `ADMIN_PASSWORD` | Admin dashboard password | `your-secure-password` |
| `ADMIN_EMAIL` | Admin email address | `admin@example.com` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Public admin password (for client-side) | `your-secure-password` |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Public admin email (for client-side) | `admin@example.com` |

---

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. Verify your `DATABASE_URL` is correct
2. Ensure it includes `?sslmode=require` at the end
3. Check Neon dashboard to ensure database is active
4. Run `npx prisma db push` to sync schema

### Email Not Sending

If emails are not being sent:

1. Verify Gmail App Password is correct (16 characters, no spaces)
2. Ensure 2FA is enabled on Gmail account
3. Check Vercel logs for email errors
4. Test SMTP credentials locally first

### Build Failures

If deployment fails:

1. Check Vercel build logs
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to test
4. Check for TypeScript errors

---

## Post-Deployment Tasks

1. **Custom Domain** (Optional):
   - Go to Vercel Project Settings → Domains
   - Add your custom domain (e.g., `mediestate.com`)

2. **Analytics** (Optional):
   - Enable Vercel Analytics in project settings
   - Add Google Analytics if needed

3. **Monitoring**:
   - Set up Vercel monitoring
   - Configure error tracking (e.g., Sentry)

4. **Backup**:
   - Regularly backup your Neon database
   - Export data periodically

---

## Security Best Practices

✅ **DO:**
- Use environment variables for all sensitive data
- Enable 2FA on all accounts (GitHub, Vercel, Neon)
- Use strong, unique passwords
- Regularly rotate credentials
- Keep dependencies updated

❌ **DON'T:**
- Never commit `.env` files to Git
- Never hardcode credentials in code
- Never share environment variables publicly
- Never use default passwords in production

---

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Check Neon documentation: https://neon.tech/docs
- Check Next.js documentation: https://nextjs.org/docs

---

## Project Structure

```
mediestate/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── properties/        # Properties pages
│   ├── loan-eligibility/  # Loan eligibility page
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions
├── prisma/               # Database schema
├── public/               # Static assets
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── package.json         # Dependencies

```

---

## Deployment Checklist

Before deploying, ensure:

- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is updated with all variables
- [ ] All credentials are removed from code
- [ ] Database schema is finalized
- [ ] All dependencies are in `package.json`
- [ ] Build succeeds locally (`npm run build`)
- [ ] All tests pass (if any)
- [ ] README.md is updated
- [ ] Git repository is clean

---

**Developed by MONIKA M**
