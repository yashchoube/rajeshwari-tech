# 🔒 Production Security Configuration

## **Critical Environment Variables for Production**

### **Required Variables (MUST be set in Vercel Dashboard):**

```bash
# JWT Security (CRITICAL)
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long

# Admin Credentials (CHANGE FROM DEFAULTS)
ADMIN_USERNAME=your-secure-admin-username
ADMIN_PASSWORD=your-very-strong-password
ADMIN_EMAIL=admin@rajeshwaritech.com

# Database
DATABASE_URL=your-neon-postgresql-connection-string

# Email Configuration
SMTP_USER=rajeshwaritechservice@gmail.com
SMTP_PASS=your-gmail-app-password
```

## **Security Features Implemented:**

### **1. JWT Token Security:**
- ✅ **Issuer/Audience Validation**: Prevents token reuse across different applications
- ✅ **Expiration**: 24-hour token lifetime
- ✅ **Secure Secret**: Must be set via environment variable
- ✅ **No Sensitive Data**: Only user ID, username, email, role in token

### **2. Cookie Security:**
- ✅ **HttpOnly**: Prevents XSS attacks
- ✅ **Secure**: HTTPS only in production
- ✅ **SameSite=Strict**: Prevents CSRF attacks
- ✅ **Domain Restriction**: Production domain only
- ✅ **Path Restriction**: Site-wide access

### **3. Authentication Flow:**
- ✅ **Rate Limiting**: 5 attempts per 15 minutes per IP
- ✅ **Session Management**: Stateless JWT tokens
- ✅ **Secure Logout**: Proper cookie clearing
- ✅ **Admin-Only APIs**: All admin endpoints require authentication

### **4. API Security:**
- ✅ **CORS Protection**: Only allowed origins
- ✅ **Rate Limiting**: Per-endpoint limits
- ✅ **Input Sanitization**: All user inputs sanitized
- ✅ **Authentication Required**: All admin APIs protected

## **Production Deployment Checklist:**

### **Before Deploying to Vercel:**

1. **Set Environment Variables in Vercel Dashboard:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add all required variables from the list above

2. **Generate Strong Secrets:**
   ```bash
   # Generate JWT Secret (32+ characters)
   openssl rand -base64 32
   
   # Generate NextAuth Secret
   openssl rand -base64 32
   ```

3. **Update Admin Credentials:**
   - Change default admin username/password
   - Use strong, unique passwords
   - Consider using a password manager

4. **Database Security:**
   - Ensure Neon database is properly configured
   - Use connection pooling
   - Enable SSL/TLS

5. **Email Configuration:**
   - Set up Gmail App Password
   - Test email functionality
   - Monitor email delivery

## **Security Monitoring:**

### **What to Monitor:**
- Failed login attempts
- JWT token verification failures
- Rate limiting triggers
- Unusual API access patterns

### **Logs to Watch:**
- Authentication failures
- JWT verification errors
- Rate limiting events
- Database connection issues

## **Security Best Practices:**

1. **Never commit secrets to Git**
2. **Use environment variables for all secrets**
3. **Rotate JWT secrets periodically**
4. **Monitor authentication logs**
5. **Use HTTPS in production**
6. **Regular security audits**

## **Emergency Procedures:**

### **If Admin Account is Compromised:**
1. Immediately change admin credentials in Vercel
2. Rotate JWT_SECRET
3. Check access logs for suspicious activity
4. Review all admin actions

### **If JWT Secret is Exposed:**
1. Generate new JWT_SECRET immediately
2. Deploy updated environment variable
3. All existing sessions will be invalidated
4. Users will need to log in again
