#!/usr/bin/env node

/**
 * Comprehensive Test Runner for RajeshwariTech
 * Runs all test suites with proper reporting and CI integration
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.results = {
      ui: { passed: 0, failed: 0, total: 0 },
      api: { passed: 0, failed: 0, total: 0 },
      newsletter: { passed: 0, failed: 0, total: 0 },
      integration: { passed: 0, failed: 0, total: 0 },
      performance: { passed: 0, failed: 0, total: 0 },
      security: { passed: 0, failed: 0, total: 0 }
    };
    this.startTime = Date.now();
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runCommand(command, options = {}) {
    return new Promise((resolve, reject) => {
      const child = spawn('bash', ['-c', command], {
        stdio: 'inherit',
        ...options
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
    });
  }

  async checkPrerequisites() {
    this.log('Checking prerequisites...');
    
    try {
      // Check Node.js version
      const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
      this.log(`Node.js version: ${nodeVersion}`);
      
      // Check if server is running
      try {
        const response = await fetch('http://localhost:3001');
        if (response.ok) {
          this.log('Development server is running');
        } else {
          throw new Error('Server not responding');
        }
      } catch (error) {
        this.log('Starting development server...', 'warning');
        // Start server in background
        this.runCommand('npm run dev', { detached: true });
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for server to start
      }
      
      // Check if test database exists
      const dbPath = path.join(process.cwd(), 'data', 'rajeshwari-tech.db');
      if (fs.existsSync(dbPath)) {
        this.log('Test database found');
      } else {
        this.log('Test database not found, will be created during tests', 'warning');
      }
      
    } catch (error) {
      this.log(`Prerequisite check failed: ${error.message}`, 'error');
      throw error;
    }
  }

  async runUITests() {
    this.log('Running UI tests with Playwright...');
    
    try {
      await this.runCommand('npx playwright test --reporter=html,json,junit');
      this.results.ui.passed = 1;
      this.results.ui.total = 1;
      this.log('UI tests completed successfully', 'success');
    } catch (error) {
      this.results.ui.failed = 1;
      this.results.ui.total = 1;
      this.log(`UI tests failed: ${error.message}`, 'error');
    }
  }

  async runAPITests() {
    this.log('Running API tests with Jest...');
    
    try {
      await this.runCommand('npx jest tests/api --config=tests/jest.config.js');
      this.results.api.passed = 1;
      this.results.api.total = 1;
      this.log('API tests completed successfully', 'success');
    } catch (error) {
      this.results.api.failed = 1;
      this.results.api.total = 1;
      this.log(`API tests failed: ${error.message}`, 'error');
    }
  }

  async runNewsletterTests() {
    this.log('Running Newsletter tests...');
    
    try {
      await this.runCommand('npx jest tests/newsletter --config=tests/jest.config.js');
      this.results.newsletter.passed = 1;
      this.results.newsletter.total = 1;
      this.log('Newsletter tests completed successfully', 'success');
    } catch (error) {
      this.results.newsletter.failed = 1;
      this.results.newsletter.total = 1;
      this.log(`Newsletter tests failed: ${error.message}`, 'error');
    }
  }

  async runIntegrationTests() {
    this.log('Running Integration tests...');
    
    try {
      await this.runCommand('npx jest tests/integration --config=tests/jest.config.js');
      this.results.integration.passed = 1;
      this.results.integration.total = 1;
      this.log('Integration tests completed successfully', 'success');
    } catch (error) {
      this.results.integration.failed = 1;
      this.results.integration.total = 1;
      this.log(`Integration tests failed: ${error.message}`, 'error');
    }
  }

  async runPerformanceTests() {
    this.log('Running Performance tests with k6...');
    
    try {
      await this.runCommand('k6 run tests/performance/load/load-test.js');
      this.results.performance.passed = 1;
      this.results.performance.total = 1;
      this.log('Performance tests completed successfully', 'success');
    } catch (error) {
      this.results.performance.failed = 1;
      this.results.performance.total = 1;
      this.log(`Performance tests failed: ${error.message}`, 'error');
    }
  }

  async runSecurityTests() {
    this.log('Running Security tests...');
    
    try {
      await this.runCommand('npx jest tests/security --config=tests/jest.config.js');
      this.results.security.passed = 1;
      this.results.security.total = 1;
      this.log('Security tests completed successfully', 'success');
    } catch (error) {
      this.results.security.failed = 1;
      this.results.security.total = 1;
      this.log(`Security tests failed: ${error.message}`, 'error');
    }
  }

  generateReport() {
    const endTime = Date.now();
    const duration = (endTime - this.startTime) / 1000;
    
    const totalPassed = Object.values(this.results).reduce((sum, result) => sum + result.passed, 0);
    const totalFailed = Object.values(this.results).reduce((sum, result) => sum + result.failed, 0);
    const totalTests = totalPassed + totalFailed;
    const successRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) : 0;
    
    const report = {
      summary: {
        totalTests,
        passed: totalPassed,
        failed: totalFailed,
        successRate: `${successRate}%`,
        duration: `${duration}s`
      },
      results: this.results,
      timestamp: new Date().toISOString()
    };
    
    // Save JSON report
    const reportPath = path.join(process.cwd(), 'test-results', 'comprehensive-report.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate HTML report
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(process.cwd(), 'test-results', 'comprehensive-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    
    this.log(`Test report saved to: ${reportPath}`);
    this.log(`HTML report saved to: ${htmlPath}`);
    
    return report;
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprehensive Test Report - RajeshwariTech</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .summary { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .metric { display: inline-block; margin: 10px 20px; text-align: center; }
        .metric-value { font-size: 2em; font-weight: bold; color: #8b5cf6; }
        .metric-label { color: #6b7280; }
        .success { color: #10b981; }
        .error { color: #ef4444; }
        .warning { color: #f59e0b; }
        .test-category { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .test-category h3 { margin-top: 0; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .status-success { background: #dcfce7; color: #166534; }
        .status-error { background: #fee2e2; color: #991b1b; }
        .status-warning { background: #fef3c7; color: #92400e; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Comprehensive Test Report</h1>
            <p>RajeshwariTech Website Testing Results</p>
            <p><strong>Generated:</strong> ${report.timestamp}</p>
        </div>
        
        <div class="content">
            <div class="summary">
                <h2>📊 Executive Summary</h2>
                <div class="metric">
                    <div class="metric-value">${report.summary.totalTests}</div>
                    <div class="metric-label">Total Tests</div>
                </div>
                <div class="metric">
                    <div class="metric-value success">${report.summary.passed}</div>
                    <div class="metric-label">Passed</div>
                </div>
                <div class="metric">
                    <div class="metric-value error">${report.summary.failed}</div>
                    <div class="metric-label">Failed</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${report.summary.successRate}</div>
                    <div class="metric-label">Success Rate</div>
                </div>
                <div class="metric">
                    <div class="metric-value">${report.summary.duration}</div>
                    <div class="metric-label">Duration</div>
                </div>
            </div>
            
            <div class="test-category">
                <h3>🎭 UI Tests (Playwright)</h3>
                <p><strong>Status:</strong> <span class="status-badge ${report.results.ui.failed > 0 ? 'status-error' : 'status-success'}">${report.results.ui.failed > 0 ? 'Failed' : 'Passed'}</span></p>
                <p><strong>Results:</strong> ${report.results.ui.passed} passed, ${report.results.ui.failed} failed</p>
            </div>
            
            <div class="test-category">
                <h3>🔌 API Tests (Jest)</h3>
                <p><strong>Status:</strong> <span class="status-badge ${report.results.api.failed > 0 ? 'status-error' : 'status-success'}">${report.results.api.failed > 0 ? 'Failed' : 'Passed'}</span></p>
                <p><strong>Results:</strong> ${report.results.api.passed} passed, ${report.results.api.failed} failed</p>
            </div>
            
            <div class="test-category">
                <h3>📧 Newsletter Tests</h3>
                <p><strong>Status:</strong> <span class="status-badge ${report.results.newsletter.failed > 0 ? 'status-error' : 'status-success'}">${report.results.newsletter.failed > 0 ? 'Failed' : 'Passed'}</span></p>
                <p><strong>Results:</strong> ${report.results.newsletter.passed} passed, ${report.results.newsletter.failed} failed</p>
            </div>
            
            <div class="test-category">
                <h3>🔗 Integration Tests</h3>
                <p><strong>Status:</strong> <span class="status-badge ${report.results.integration.failed > 0 ? 'status-error' : 'status-success'}">${report.results.integration.failed > 0 ? 'Failed' : 'Passed'}</span></p>
                <p><strong>Results:</strong> ${report.results.integration.passed} passed, ${report.results.integration.failed} failed</p>
            </div>
            
            <div class="test-category">
                <h3>⚡ Performance Tests (k6)</h3>
                <p><strong>Status:</strong> <span class="status-badge ${report.results.performance.failed > 0 ? 'status-error' : 'status-success'}">${report.results.performance.failed > 0 ? 'Failed' : 'Passed'}</span></p>
                <p><strong>Results:</strong> ${report.results.performance.passed} passed, ${report.results.performance.failed} failed</p>
            </div>
            
            <div class="test-category">
                <h3>🔒 Security Tests</h3>
                <p><strong>Status:</strong> <span class="status-badge ${report.results.security.failed > 0 ? 'status-error' : 'status-success'}">${report.results.security.failed > 0 ? 'Failed' : 'Passed'}</span></p>
                <p><strong>Results:</strong> ${report.results.security.passed} passed, ${report.results.security.failed} failed</p>
            </div>
        </div>
    </div>
</body>
</html>
    `;
  }

  async runAllTests() {
    try {
      this.log('🚀 Starting Comprehensive Test Suite for RajeshwariTech');
      
      // Check prerequisites
      await this.checkPrerequisites();
      
      // Run all test suites
      await Promise.all([
        this.runUITests(),
        this.runAPITests(),
        this.runNewsletterTests(),
        this.runIntegrationTests(),
        this.runPerformanceTests(),
        this.runSecurityTests()
      ]);
      
      // Generate report
      const report = this.generateReport();
      
      // Final summary
      const totalPassed = report.summary.passed;
      const totalFailed = report.summary.failed;
      const successRate = report.summary.successRate;
      
      this.log(`\n🎉 Test Suite Complete!`);
      this.log(`📊 Results: ${totalPassed} passed, ${totalFailed} failed (${successRate} success rate)`);
      
      if (totalFailed === 0) {
        this.log('🎉 All tests passed! Your website is ready for production!', 'success');
      } else {
        this.log(`⚠️ ${totalFailed} test(s) failed. Please review the report.`, 'warning');
      }
      
      return report;
      
    } catch (error) {
      this.log(`❌ Test suite failed: ${error.message}`, 'error');
      process.exit(1);
    }
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  const runner = new TestRunner();
  runner.runAllTests().catch(console.error);
}

module.exports = TestRunner;
