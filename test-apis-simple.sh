#!/bin/bash

# =============================================================================
# SIMPLE API TESTING SCRIPT - QUICK VERIFICATION
# =============================================================================
# Run individual curl commands to test specific APIs
# =============================================================================

BASE_URL="https://rajeshwari-tech.vercel.app"

echo "🚀 Testing Rajeshwari Tech APIs"
echo "Base URL: $BASE_URL"
echo "=================================================================================="

echo -e "\n📧 Testing Newsletter Subscription:"
curl -X POST $BASE_URL/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "interests": ["Programming", "Web Development"]
  }'

echo -e "\n\n📊 Testing Newsletter Subscribers:"
curl -X GET $BASE_URL/api/newsletter/subscribers

echo -e "\n\n📅 Testing Demo Booking:"
curl -X POST $BASE_URL/api/demo-booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "course": "React Development",
    "experience": "Beginner",
    "preferredTime": "Morning",
    "message": "Interested in learning React"
  }'

echo -e "\n\n🎓 Testing Course Enrollment:"
curl -X POST $BASE_URL/api/enrollment \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1234567891",
    "courseId": "react-basics",
    "courseName": "React Basics",
    "experience": "Intermediate",
    "goals": "Learn React fundamentals",
    "referral": "Google Search"
  }'

echo -e "\n\n📝 Testing Blog Listing:"
curl -X GET $BASE_URL/api/blogs

echo -e "\n\n🔐 Testing Admin Demo Bookings:"
curl -X GET $BASE_URL/api/admin/demo-bookings

echo -e "\n\n🔐 Testing Admin Enrollments:"
curl -X GET $BASE_URL/api/admin/enrollments

echo -e "\n\n📊 Testing Database Setup:"
curl -X GET $BASE_URL/api/setup-database

echo -e "\n\n✅ API Testing Complete!"
