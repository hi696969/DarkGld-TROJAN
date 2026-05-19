const crypto = require('crypto');

// Key and initialization vector
const key = crypto.randomBytes(32); // AES-256 key
const iv = crypto.randomBytes(16);  // AES block size

function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted };
}

function decrypt(encrypted, ivHex) {
  const ivBuffer = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuffer);
  let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}

// Example usage:
const message = "Hello, World!";
const { iv: ivHex, encryptedData } = encrypt(message);
console.log("Encrypted:", encryptedData);

const decrypted = decrypt(encryptedData, ivHex);
console.log("Decrypted:", decrypted);