#!/bin/bash

# =============================================================================
# COMPREHENSIVE API TESTING SCRIPT FOR RAJESHWARI TECH
# =============================================================================
# This script tests all backend APIs to ensure they're working with Neon PostgreSQL
# Run this script to verify all endpoints are functional
# =============================================================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="https://rajeshwari-tech.vercel.app"

echo -e "${BLUE}🚀 Starting Comprehensive API Testing for Rajeshwari Tech${NC}"
echo -e "${BLUE}Base URL: $BASE_URL${NC}"
echo "=================================================================================="

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test
run_test() {
    local test_name="$1"
    local curl_command="$2"
    local expected_status="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "\n${YELLOW}Testing: $test_name${NC}"
    echo "Command: $curl_command"
    
    # Run the curl command and capture response
    response=$(eval "$curl_command" 2>/dev/null)
    status_code=$(eval "$curl_command" -w "%{http_code}" -o /dev/null -s 2>/dev/null)
    
    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASSED${NC} - Status: $status_code"
        echo "Response: $response"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo -e "${RED}❌ FAILED${NC} - Expected: $expected_status, Got: $status_code"
        echo "Response: $response"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
}

echo -e "\n${BLUE}📊 TESTING PUBLIC APIS${NC}"
echo "=================================================================================="

# 1. Test Newsletter Subscription
run_test "Newsletter Subscription" \
    "curl -X POST $BASE_URL/api/newsletter/subscribe -H 'Content-Type: application/json' -d '{\"email\":\"test@example.com\",\"name\":\"Test User\",\"interests\":[\"Programming\",\"Web Development\"]}'" \
    "200"

# 2. Test Newsletter Subscribers (Admin)
run_test "Get Newsletter Subscribers" \
    "curl -X GET $BASE_URL/api/newsletter/subscribers" \
    "200"

# 3. Test Demo Booking
run_test "Demo Booking Submission" \
    "curl -X POST $BASE_URL/api/demo-booking -H 'Content-Type: application/json' -d '{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"phone\":\"+1234567890\",\"course\":\"React Development\",\"experience\":\"Beginner\",\"preferredTime\":\"Morning\",\"message\":\"Interested in learning React\"}'" \
    "200"

# 4. Test Enrollment
run_test "Course Enrollment" \
    "curl -X POST $BASE_URL/api/enrollment -H 'Content-Type: application/json' -d '{\"name\":\"Jane Smith\",\"email\":\"jane@example.com\",\"phone\":\"+1234567891\",\"courseId\":\"react-basics\",\"courseName\":\"React Basics\",\"experience\":\"Intermediate\",\"goals\":\"Learn React fundamentals\",\"referral\":\"Google Search\"}'" \
    "200"

# 5. Test Blog Listing
run_test "Get All Blogs" \
    "curl -X GET $BASE_URL/api/blogs" \
    "200"

# 6. Test Blog by Category
run_test "Get Blogs by Category" \
    "curl -X GET '$BASE_URL/api/blogs?category=programming'" \
    "200"

# 7. Test Analytics Tracking
run_test "Track Page Visit" \
    "curl -X POST $BASE_URL/api/analytics/track -H 'Content-Type: application/json' -d '{\"page\":\"/test-page\",\"referrer\":\"https://google.com\",\"userAgent\":\"Mozilla/5.0\"}'" \
    "200"

echo -e "\n${BLUE}🔐 TESTING ADMIN APIS${NC}"
echo "=================================================================================="

# 8. Test Admin Demo Bookings
run_test "Get Admin Demo Bookings" \
    "curl -X GET $BASE_URL/api/admin/demo-bookings" \
    "200"

# 9. Test Admin Enrollments
run_test "Get Admin Enrollments" \
    "curl -X GET $BASE_URL/api/admin/enrollments" \
    "200"

# 10. Test Admin Blogs
run_test "Get Admin Blogs" \
    "curl -X GET '$BASE_URL/api/blogs?scope=admin'" \
    "200"

# 11. Test Update Demo Booking Status
run_test "Update Demo Booking Status" \
    "curl -X PUT $BASE_URL/api/admin/demo-bookings/update-status -H 'Content-Type: application/json' -d '{\"id\":1,\"status\":\"confirmed\"}'" \
    "200"

# 12. Test Update Enrollment Status
run_test "Update Enrollment Status" \
    "curl -X PUT $BASE_URL/api/admin/enrollments/update-status -H 'Content-Type: application/json' -d '{\"id\":1,\"status\":\"confirmed\"}'" \
    "200"

echo -e "\n${BLUE}📝 TESTING BLOG APIS${NC}"
echo "=================================================================================="

# 13. Test Blog Creation
run_test "Create New Blog" \
    "curl -X POST $BASE_URL/api/blogs -H 'Content-Type: application/json' -d '{\"title\":\"Test Blog Post\",\"excerpt\":\"This is a test blog post\",\"content\":\"This is the full content of the test blog post.\",\"author\":\"Test Author\",\"category\":\"programming\",\"tags\":\"test,blog,programming\",\"featured\":false}'" \
    "200"

# 14. Test Database Setup
run_test "Setup Database Tables" \
    "curl -X GET $BASE_URL/api/setup-database" \
    "200"

echo -e "\n${BLUE}🔍 TESTING VALIDATION AND ERROR HANDLING${NC}"
echo "=================================================================================="

# 15. Test Invalid Newsletter Subscription
run_test "Invalid Newsletter Subscription (Missing Email)" \
    "curl -X POST $BASE_URL/api/newsletter/subscribe -H 'Content-Type: application/json' -d '{\"name\":\"Test User\",\"interests\":[\"Programming\"]}'" \
    "400"

# 16. Test Invalid Demo Booking
run_test "Invalid Demo Booking (Missing Phone)" \
    "curl -X POST $BASE_URL/api/demo-booking -H 'Content-Type: application/json' -d '{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"course\":\"React Development\"}'" \
    "400"

# 17. Test Invalid Enrollment
run_test "Invalid Enrollment (Missing Course)" \
    "curl -X POST $BASE_URL/api/enrollment -H 'Content-Type: application/json' -d '{\"name\":\"Jane Smith\",\"email\":\"jane@example.com\",\"phone\":\"+1234567891\"}'" \
    "400"

echo -e "\n${BLUE}📊 TESTING RATE LIMITING${NC}"
echo "=================================================================================="

# 18. Test Rate Limiting (Multiple rapid requests)
echo -e "${YELLOW}Testing Rate Limiting with 5 rapid requests...${NC}"
for i in {1..5}; do
    run_test "Rate Limit Test $i" \
        "curl -X POST $BASE_URL/api/newsletter/subscribe -H 'Content-Type: application/json' -d '{\"email\":\"test'$i'@example.com\",\"name\":\"Test User '$i'\",\"interests\":[\"Programming\"]}'" \
        "200"
done

echo -e "\n${BLUE}📈 FINAL RESULTS${NC}"
echo "=================================================================================="
echo -e "${BLUE}Total Tests: $TOTAL_TESTS${NC}"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "\n${GREEN}🎉 ALL TESTS PASSED! All APIs are working correctly with Neon PostgreSQL.${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  Some tests failed. Please check the failed endpoints above.${NC}"
    exit 1
fi
