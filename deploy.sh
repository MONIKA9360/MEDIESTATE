#!/bin/bash

# Medi Estate Deployment Script
# This script helps you deploy the application safely

echo "🚀 Medi Estate Deployment Script"
echo "================================="
echo ""

# Check if .env exists
if [ -f ".env" ]; then
    echo "⚠️  WARNING: .env file found!"
    echo "   Make sure it's in .gitignore before pushing to Git"
    echo ""
fi

# Check if .env.example exists
if [ ! -f ".env.example" ]; then
    echo "❌ ERROR: .env.example not found!"
    echo "   Please create .env.example with template variables"
    exit 1
fi

echo "✅ Pre-deployment checks:"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies installed"
fi

# Check if Prisma client is generated
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run build test
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed! Fix errors before deploying."
    exit 1
fi

echo ""
echo "================================="
echo "✅ Pre-deployment checks passed!"
echo ""
echo "Next steps:"
echo "1. Commit your changes: git add . && git commit -m 'Ready for deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. Deploy on Vercel: https://vercel.com/new"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
echo "================================="
