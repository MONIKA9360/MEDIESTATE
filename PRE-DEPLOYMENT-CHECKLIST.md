# Pre-Deployment Checklist

## ✅ Security Checks

- [ ] `.env` file is in `.gitignore`
- [ ] No hardcoded credentials in code
- [ ] `.env.example` is updated with all variables
- [ ] All sensitive data uses environment variables
- [ ] Admin passwords are strong and unique
- [ ] Gmail App Password is 16 characters

## ✅ Code Quality

- [ ] All TypeScript errors resolved
- [ ] No console.log statements in production code
- [ ] All imports are correct
- [ ] No unused variables or imports
- [ ] Code is properly formatted

## ✅ Database

- [ ] Prisma schema is finalized
- [ ] Database migrations are ready
- [ ] Neon database is created and accessible
- [ ] Connection string is correct
- [ ] `npx prisma generate` runs successfully
- [ ] `npx prisma db push` runs successfully

## ✅ Email Configuration

- [ ] Gmail 2FA is enabled
- [ ] Gmail App Password is generated
- [ ] SMTP credentials are correct
- [ ] Test email sends successfully (`node test-email.js`)
- [ ] Email templates are tested

## ✅ Build & Testing

- [ ] `npm run build` succeeds locally
- [ ] No build errors or warnings
- [ ] All pages load correctly
- [ ] Forms submit successfully
- [ ] Email notifications work
- [ ] Database operations work
- [ ] Mobile responsive design verified

## ✅ Git Repository

- [ ] Git repository is initialized
- [ ] All files are committed
- [ ] `.gitignore` is properly configured
- [ ] Remote repository is set up
- [ ] README.md is complete
- [ ] DEPLOYMENT.md is available

## ✅ Environment Variables

Verify all these are set in Vercel:

- [ ] `DATABASE_URL`
- [ ] `SMTP_EMAIL`
- [ ] `SMTP_PASSWORD`
- [ ] `ADMIN_PASSWORD`
- [ ] `ADMIN_EMAIL`
- [ ] `NEXT_PUBLIC_ADMIN_PASSWORD`
- [ ] `NEXT_PUBLIC_ADMIN_EMAIL`

## ✅ Vercel Configuration

- [ ] Vercel account is created
- [ ] GitHub repository is connected
- [ ] Framework preset is set to Next.js
- [ ] Build command is `npm run build`
- [ ] Output directory is `.next`
- [ ] Node.js version is 18.x or higher

## ✅ SEO & Performance

- [ ] All pages have proper metadata
- [ ] Sitemap is generated
- [ ] Robots.txt is configured
- [ ] Images are optimized
- [ ] Lighthouse score > 90

## ✅ Content

- [ ] All property data is accurate
- [ ] Contact information is correct
- [ ] Email addresses are updated
- [ ] Phone numbers are correct
- [ ] All links work properly

## ✅ Post-Deployment

- [ ] Deployment URL is accessible
- [ ] All pages load correctly
- [ ] Forms work on production
- [ ] Emails are sent successfully
- [ ] Database operations work
- [ ] No console errors in browser
- [ ] Mobile version works correctly

---

## Quick Commands

### Local Testing
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build project
npm run build

# Start production server
npm start

# Test email
node test-email.js
```

### Git Commands
```bash
# Check status
git status

# Add all files
git add .

# Commit changes
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

### Vercel Deployment
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Troubleshooting

### If build fails:
1. Check Vercel build logs
2. Run `npm run build` locally
3. Fix any TypeScript errors
4. Ensure all dependencies are installed

### If database connection fails:
1. Verify `DATABASE_URL` in Vercel
2. Check Neon database is active
3. Ensure connection string includes `?sslmode=require`
4. Run `npx prisma db push` after deployment

### If emails don't send:
1. Verify Gmail App Password (16 characters)
2. Check SMTP credentials in Vercel
3. Ensure 2FA is enabled on Gmail
4. Check Vercel function logs

---

**Ready to deploy? Follow the steps in DEPLOYMENT.md**
