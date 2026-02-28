@echo off
REM Medi Estate Deployment Script for Windows
REM This script helps you deploy the application safely

echo.
echo ========================================
echo   Medi Estate Deployment Script
echo ========================================
echo.

REM Check if .env exists
if exist ".env" (
    echo WARNING: .env file found!
    echo Make sure it's in .gitignore before pushing to Git
    echo.
)

REM Check if .env.example exists
if not exist ".env.example" (
    echo ERROR: .env.example not found!
    echo Please create .env.example with template variables
    exit /b 1
)

echo Pre-deployment checks:
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
) else (
    echo Dependencies installed
)

REM Generate Prisma client
echo.
echo Generating Prisma client...
call npx prisma generate

REM Run build test
echo.
echo Testing build...
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   Build successful!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Commit your changes: git add . ^&^& git commit -m "Ready for deployment"
    echo 2. Push to GitHub: git push origin main
    echo 3. Deploy on Vercel: https://vercel.com/new
    echo.
    echo See DEPLOYMENT.md for detailed instructions
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   Build failed! Fix errors before deploying.
    echo ========================================
    exit /b 1
)
