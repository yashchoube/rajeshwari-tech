# 📧 Email Setup Guide - Gmail SMTP (100% FREE)

## 🎯 Overview
This setup allows your contact form to send email notifications to your team when someone submits an enquiry. **It's completely FREE** using Gmail SMTP.

## 🔧 Setup Steps

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** if not already enabled
3. This is required for App Passwords

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **"App passwords"** (under 2-Step Verification)
3. Select **"Mail"** as the app
4. Select **"Other"** as device and name it "RajeshwariTech Contact Form"
5. Click **"Generate"**
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### Step 3: Update Environment Variables
Update your `.env.local` file:

```bash
# Email Configuration (Gmail SMTP - FREE)
SMTP_USER=rajeshwaritechservice@gmail.com
SMTP_PASS=your-16-character-app-password-here
```

**Replace `your-16-character-app-password-here` with the password from Step 2**

### Step 4: Test Email Functionality
1. Restart your development server: `npm run dev`
2. Go to http://localhost:3000/contact
3. Fill out the contact form and submit
4. Check your Gmail inbox for the notification email

## 📧 What Happens When Someone Submits an Enquiry?

### 1. **Team Notification Email** (to rajeshwaritechservice@gmail.com)
- ✅ **Professional HTML email** with enquiry details
- ✅ **Enquiry ID** for tracking
- ✅ **Customer contact information**
- ✅ **Service requested**
- ✅ **Customer message**
- ✅ **Quick action buttons**

### 2. **Customer Welcome Email** (to customer's email)
- ✅ **Professional welcome message**
- ✅ **Confirmation of enquiry received**
- ✅ **Next steps information**
- ✅ **Links to your website**

### 3. **Database Storage**
- ✅ **All enquiry data saved** to Neon database
- ✅ **Available in admin panel**
- ✅ **Backup of all enquiries**

## 💰 Cost: **ZERO** - Completely FREE!

- ✅ **Gmail SMTP**: FREE (unlimited emails)
- ✅ **No third-party services** required
- ✅ **No monthly fees**
- ✅ **No setup costs**

## 🚀 Benefits

1. **Instant Notifications**: Your team gets notified immediately
2. **Professional Communication**: Customers receive welcome emails
3. **No Database Knowledge Required**: Your team just needs to check email
4. **Reliable**: Gmail has 99.9% uptime
5. **Free Forever**: No ongoing costs

## 🔍 Troubleshooting

### If emails don't send:
1. **Check App Password**: Make sure it's the 16-character app password, not your regular Gmail password
2. **Check 2FA**: Ensure 2-Factor Authentication is enabled
3. **Check Environment Variables**: Verify `.env.local` has correct values
4. **Check Logs**: Look at the terminal for error messages

### Common Issues:
- **"Invalid login"**: Wrong app password
- **"Less secure app access"**: Use App Password instead
- **"Authentication failed"**: Check if 2FA is enabled

## 📊 Email Templates

The system sends beautifully formatted HTML emails with:
- **Company branding**
- **Professional layout**
- **All enquiry details**
- **Quick action buttons**
- **Mobile-responsive design**

## 🎉 Ready to Go!

Once you've set up the App Password, your contact form will automatically:
1. ✅ Save enquiries to database
2. ✅ Send notification to your team
3. ✅ Send welcome email to customers
4. ✅ Provide professional communication

**Your operations team will receive instant email notifications for every enquiry!**
