// Encrypt function
function encryptString(str) {
  if (typeof str != "string") str = JSON.stringify(str);
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) + 1);
  }
  return result;
}

// Decrypt function
function decryptString(str) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result += String.fromCharCode(str.charCodeAt(i) - 1);
  }
  try {
    return JSON.parse(result);
  } catch (error) {
    return result;
  }
}

module.exports = { decryptString, encryptString };
