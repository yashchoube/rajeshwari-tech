#!/usr/bin/env node

/**
 * Comprehensive Database Operations Test
 * Tests all database operations and API endpoints
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3001';
const TEST_RESULTS = {
    total: 0,
    passed: 0,
    failed: 0,
    warnings: 0,
    tests: []
};

// Utility functions
function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
}

function addTestResult(testName, status, message, data = null) {
    TEST_RESULTS.total++;
    if (status === 'success') TEST_RESULTS.passed++;
    else if (status === 'error') TEST_RESULTS.failed++;
    else if (status === 'warning') TEST_RESULTS.warnings++;

    const result = {
        name: testName,
        status: status,
        message: message,
        data: data,
        timestamp: new Date().toISOString()
    };
    TEST_RESULTS.tests.push(result);
    log(`${testName}: ${message}`, status);
}

async function testAPI(endpoint, method = 'GET', data = null, expectedStatus = 200) {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);
        const responseData = await response.json();
        
        if (response.status === expectedStatus) {
            return { success: true, data: responseData, status: response.status };
        } else {
            return { success: false, error: `Expected ${expectedStatus}, got ${response.status}`, data: responseData };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

async function testBlogOperations() {
    log('Testing Blog Operations...');
    
    // Test blog creation
    const blogData = {
        title: `Test Blog ${Date.now()}`,
        excerpt: 'This is a test blog excerpt for comprehensive testing.',
        content: '<p>This is test blog content with <strong>HTML formatting</strong> and <em>various elements</em>.</p>',
        author: 'Test Author',
        category: 'Technology',
        featuredImage: '/uploads/blogs/test-image.png'
    };

    const createResult = await testAPI('/api/blogs', 'POST', blogData, 200);
    if (createResult.success) {
        addTestResult('Blog Creation', 'success', 'Blog created successfully', createResult.data);
        
        // Test blog approval
        if (createResult.data.blogId) {
            const approveResult = await testAPI('/api/blogs/approve', 'POST', { id: createResult.data.blogId }, 200);
            if (approveResult.success) {
                addTestResult('Blog Approval', 'success', 'Blog approved successfully', approveResult.data);
            } else {
                addTestResult('Blog Approval', 'error', `Blog approval failed: ${approveResult.error}`);
            }
        }
    } else {
        addTestResult('Blog Creation', 'error', `Blog creation failed: ${createResult.error}`);
    }

    // Test blog retrieval
    const blogsResult = await testAPI('/api/blogs', 'GET', null, 200);
    if (blogsResult.success) {
        addTestResult('Blog Retrieval', 'success', `Retrieved ${blogsResult.data.blogs?.length || 0} blogs`);
    } else {
        addTestResult('Blog Retrieval', 'error', `Blog retrieval failed: ${blogsResult.error}`);
    }

    // Test admin blog retrieval
    const adminBlogsResult = await testAPI('/api/blogs?scope=admin', 'GET', null, 200);
    if (adminBlogsResult.success) {
        addTestResult('Admin Blog Retrieval', 'success', `Retrieved ${adminBlogsResult.data.blogs?.length || 0} admin blogs`);
    } else {
        addTestResult('Admin Blog Retrieval', 'error', `Admin blog retrieval failed: ${adminBlogsResult.error}`);
    }
}

async function testEnrollmentOperations() {
    log('Testing Enrollment Operations...');
    
    const enrollmentData = {
        name: 'Test Student',
        email: 'test@example.com',
        phone: '+1234567890',
        courseId: 'test-course',
        courseName: 'Test Course',
        experience: 'beginner',
        goals: 'Learn new skills',
        referral: 'Website'
    };

    const enrollmentResult = await testAPI('/api/enrollment', 'POST', enrollmentData, 200);
    if (enrollmentResult.success) {
        addTestResult('Course Enrollment', 'success', 'Course enrollment successful', enrollmentResult.data);
    } else {
        addTestResult('Course Enrollment', 'error', `Course enrollment failed: ${enrollmentResult.error}`);
    }
}

async function testEnquiryOperations() {
    log('Testing Enquiry Operations...');
    
    const enquiryData = {
        name: 'Test Company',
        email: 'company@example.com',
        phone: '+1234567890',
        company: 'Test Corp',
        service: 'Corporate Training',
        participants: '25',
        duration: '3 months',
        budget: '$10,000',
        timeline: 'Q1 2024',
        needs: 'Java training for our development team'
    };

    const enquiryResult = await testAPI('/api/enquiry', 'POST', enquiryData, 200);
    if (enquiryResult.success) {
        addTestResult('Enquiry Submission', 'success', 'Enquiry submitted successfully', enquiryResult.data);
    } else {
        addTestResult('Enquiry Submission', 'error', `Enquiry submission failed: ${enquiryResult.error}`);
    }
}

async function testAnalyticsOperations() {
    log('Testing Analytics Operations...');
    
    const analyticsData = {
        page: '/test-page',
        referrer: 'https://google.com',
        userAgent: 'Mozilla/5.0 (Test Browser)',
        timestamp: new Date().toISOString()
    };

    const analyticsResult = await testAPI('/api/analytics/track', 'POST', analyticsData, 200);
    if (analyticsResult.success) {
        addTestResult('Analytics Tracking', 'success', 'Analytics tracking successful', analyticsResult.data);
    } else {
        addTestResult('Analytics Tracking', 'error', `Analytics tracking failed: ${analyticsResult.error}`);
    }
}

async function testNewsletterOperations() {
    log('Testing Newsletter Operations...');
    
    const subscriptionData = {
        email: 'subscriber@example.com',
        name: 'Test Subscriber',
        interests: ['Technology', 'Programming', 'Web Development']
    };

    const subscriptionResult = await testAPI('/api/newsletter/subscribe', 'POST', subscriptionData, 200);
    if (subscriptionResult.success) {
        addTestResult('Newsletter Subscription', 'success', 'Newsletter subscription successful', subscriptionResult.data);
    } else {
        addTestResult('Newsletter Subscription', 'error', `Newsletter subscription failed: ${subscriptionResult.error}`);
    }

    // Test newsletter subscribers retrieval
    const subscribersResult = await testAPI('/api/newsletter/subscribers', 'GET', null, 200);
    if (subscribersResult.success) {
        addTestResult('Newsletter Subscribers Retrieval', 'success', `Retrieved ${subscribersResult.data.subscriptions?.length || 0} newsletter subscriptions`);
    } else {
        addTestResult('Newsletter Subscribers Retrieval', 'error', `Newsletter subscribers retrieval failed: ${subscribersResult.error}`);
    }
}

async function testErrorScenarios() {
    log('Testing Error Scenarios...');
    
    // Test invalid blog data
    const invalidBlogData = {
        title: '', // Empty title should fail
        excerpt: 'Short', // Too short excerpt
        content: '', // Empty content
        author: '', // Empty author
        category: '' // Empty category
    };

    const blogResult = await testAPI('/api/blogs', 'POST', invalidBlogData, 400);
    if (!blogResult.success) {
        addTestResult('Invalid Blog Data Handling', 'success', 'Correctly rejected invalid blog data');
    } else {
        addTestResult('Invalid Blog Data Handling', 'error', 'Should have rejected invalid blog data');
    }

    // Test invalid enrollment data
    const invalidEnrollmentData = {
        name: '', // Empty name
        email: 'invalid-email', // Invalid email format
        phone: '', // Empty phone
        courseId: '', // Empty course ID
    };

    const enrollmentResult = await testAPI('/api/enrollment', 'POST', invalidEnrollmentData, 400);
    if (!enrollmentResult.success) {
        addTestResult('Invalid Enrollment Data Handling', 'success', 'Correctly rejected invalid enrollment data');
    } else {
        addTestResult('Invalid Enrollment Data Handling', 'error', 'Should have rejected invalid enrollment data');
    }

    // Test non-existent endpoints
    const notFoundResult = await testAPI('/api/non-existent-endpoint', 'GET', null, 404);
    if (!notFoundResult.success) {
        addTestResult('404 Error Handling', 'success', 'Correctly returned 404 for non-existent endpoint');
    } else {
        addTestResult('404 Error Handling', 'error', 'Should have returned 404 for non-existent endpoint');
    }
}

async function testDatabaseIntegrity() {
    log('Testing Database Integrity...');
    
    // Check if database file exists
    const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
    if (fs.existsSync(dbPath)) {
        addTestResult('Database File Exists', 'success', `Database file found at ${dbPath}`);
        
        // Check database file size
        const stats = fs.statSync(dbPath);
        addTestResult('Database File Size', 'success', `Database file size: ${stats.size} bytes`);
    } else {
        addTestResult('Database File Exists', 'error', 'Database file not found');
    }
}

async function runAllTests() {
    log('Starting Comprehensive API and Database Testing...');
    
    try {
        await testBlogOperations();
        await testEnrollmentOperations();
        await testEnquiryOperations();
        await testAnalyticsOperations();
        await testNewsletterOperations();
        await testErrorScenarios();
        await testDatabaseIntegrity();
        
        // Generate test report
        generateTestReport();
        
    } catch (error) {
        addTestResult('Test Suite', 'error', `Testing failed: ${error.message}`);
    }
}

function generateTestReport() {
    log('Generating Test Report...');
    
    const report = {
        summary: {
            total: TEST_RESULTS.total,
            passed: TEST_RESULTS.passed,
            failed: TEST_RESULTS.failed,
            warnings: TEST_RESULTS.warnings,
            successRate: TEST_RESULTS.total > 0 ? ((TEST_RESULTS.passed / TEST_RESULTS.total) * 100).toFixed(2) : 0
        },
        tests: TEST_RESULTS.tests,
        timestamp: new Date().toISOString()
    };
    
    // Save report to file
    const reportPath = path.join(process.cwd(), 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    log(`Test Report saved to: ${reportPath}`);
    log(`Test Summary: ${TEST_RESULTS.passed}/${TEST_RESULTS.total} passed (${report.summary.successRate}%)`);
    
    if (TEST_RESULTS.failed > 0) {
        log(`❌ ${TEST_RESULTS.failed} tests failed`, 'error');
    }
    if (TEST_RESULTS.warnings > 0) {
        log(`⚠️ ${TEST_RESULTS.warnings} tests had warnings`, 'warning');
    }
    if (TEST_RESULTS.failed === 0 && TEST_RESULTS.warnings === 0) {
        log('🎉 All tests passed successfully!', 'success');
    }
}

// Run tests if this script is executed directly
if (require.main === module) {
    runAllTests().catch(console.error);
}

module.exports = {
    runAllTests,
    testBlogOperations,
    testEnrollmentOperations,
    testEnquiryOperations,
    testAnalyticsOperations,
    testNewsletterOperations,
    testErrorScenarios,
    testDatabaseIntegrity
};
