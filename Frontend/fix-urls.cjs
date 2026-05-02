const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/himan/Desktop/AntiGravity/Blockstay/Frontend/src';

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace "http://localhost:5000/api/..." with `${import.meta.env.VITE_API_URL}/...`
  content = content.replace(/"http:\/\/localhost:5000\/api([^"]*)"/g, '`${import.meta.env.VITE_API_URL}$1`');
  content = content.replace(/'http:\/\/localhost:5000\/api([^']*)'/g, '`${import.meta.env.VITE_API_URL}$1`');
  
  // Handle existing template literals like `http://localhost:5000/api/users/${userId}`
  content = content.replace(/`http:\/\/localhost:5000\/api([^`]*)`/g, '`${import.meta.env.VITE_API_URL}$1`');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  }
}

walk(dir);
