#!/usr/bin/env node

/**
 * Security Verification Script
 * Checks for hardcoded credentials and sensitive data before deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Security Verification Script');
console.log('================================\n');

let hasIssues = false;

// Patterns to search for
const sensitivePatterns = [
  { pattern: /postgresql:\/\/[^:]+:[^@]+@[^\/]+\/\w+/gi, name: 'Database URL' },
  { pattern: /smtp.*password.*[=:]\s*["'][\w]{10,}["']/gi, name: 'SMTP Password' },
  { pattern: /[a-zA-Z0-9._%+-]+@gmail\.com/gi, name: 'Email Address' },
  { pattern: /password.*[=:]\s*["'][\w]{8,}["']/gi, name: 'Password' },
  { pattern: /api[_-]?key.*[=:]\s*["'][\w-]{20,}["']/gi, name: 'API Key' },
  { pattern: /secret.*[=:]\s*["'][\w-]{20,}["']/gi, name: 'Secret Key' },
];

// Files to check
const filesToCheck = [
  'app',
  'components',
  'lib',
  'pages',
];

// Files to exclude
const excludePatterns = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  '.env',
  '.env.local',
  '.env.example',
  'verify-security.js',
  'DEPLOYMENT.md',
  'README.md',
  'EMAIL-SETUP-INSTRUCTIONS.md',
];

function shouldExclude(filePath) {
  return excludePatterns.some(pattern => filePath.includes(pattern));
}

function checkFile(filePath) {
  if (shouldExclude(filePath)) return;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    sensitivePatterns.forEach(({ pattern, name }) => {
      const matches = content.match(pattern);
      if (matches) {
        console.log(`⚠️  Found ${name} in: ${filePath}`);
        matches.forEach(match => {
          // Mask the sensitive part
          const masked = match.substring(0, 20) + '...';
          console.log(`   ${masked}`);
        });
        hasIssues = true;
      }
    });
  } catch (error) {
    // Ignore read errors
  }
}

function scanDirectory(dir) {
  if (shouldExclude(dir)) return;
  
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx'))) {
        checkFile(filePath);
      }
    });
  } catch (error) {
    // Ignore directory errors
  }
}

// Check .gitignore
console.log('Checking .gitignore...');
if (fs.existsSync('.gitignore')) {
  const gitignore = fs.readFileSync('.gitignore', 'utf8');
  const requiredEntries = ['.env', '.env.local', 'node_modules'];
  
  requiredEntries.forEach(entry => {
    if (!gitignore.includes(entry)) {
      console.log(`⚠️  Missing in .gitignore: ${entry}`);
      hasIssues = true;
    } else {
      console.log(`✅ ${entry} is in .gitignore`);
    }
  });
} else {
  console.log('❌ .gitignore not found!');
  hasIssues = true;
}

console.log('\nScanning source files...\n');

// Scan directories
filesToCheck.forEach(dir => {
  if (fs.existsSync(dir)) {
    scanDirectory(dir);
  }
});

console.log('\n================================');
if (hasIssues) {
  console.log('❌ Security issues found!');
  console.log('   Please remove hardcoded credentials before deploying.');
  console.log('   Use environment variables instead.');
  process.exit(1);
} else {
  console.log('✅ No security issues found!');
  console.log('   Safe to deploy.');
}
console.log('================================\n');
