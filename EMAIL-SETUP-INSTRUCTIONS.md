# Gmail SMTP Setup Instructions

## The email is failing because the Gmail App Password is incorrect.

### Steps to Generate a Gmail App Password:

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/

2. **Enable 2-Step Verification** (Required for App Passwords)
   - Go to Security → 2-Step Verification
   - Follow the steps to enable it

3. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer"
   - Click "Generate"
   - Copy the 16-character password (it will look like: "abcd efgh ijkl mnop")

4. **Update .env file**
   - Remove all spaces from the password
   - Example: "abcdefghijklmnop"
   - Update SMTP_PASSWORD in .env file

5. **Restart the dev server**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

### Current Configuration:
- Email: your-email@gmail.com (update in .env file)
- Password: Use 16-character App Password from Google

### Test Email After Setup:
```bash
node test-email.js
```

You should see: ✅ Email sent successfully!
