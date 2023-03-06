function validateDecyptedData(decryptedData) {
  if (!decryptedData || !decryptedData.request || !decryptedData.options)
    return false;
  const { method, url, data, headers } = decryptedData.request;
  const { njs2_encryption, request_count } = decryptedData.options;
  if (
    !method ||
    !url ||
    !data ||
    !headers ||
    !njs2_encryption ||
    !request_count
  )
    return false;

  return true;
}

function validateUrl(url) {
  const newUrl = new URL(url);

  if (newUrl.hostname === "localhost" || newUrl.hostname === "127.0.0.1") {
    url = ipAddress + ":" + newUrl.port;
  }
  return url;
}

module.exports = { validateDecyptedData, validateUrl };
