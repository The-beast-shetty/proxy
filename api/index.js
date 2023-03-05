const { decryptString, encryptString } = require("../helper/encryption");
const { fetch } = require("./fetch");
const { validateDecyptedData } = require("../helper/validation");

module.exports = async (data) => {
  const decryptedData = decryptString(data);
  const isValidData = validateDecyptedData(decryptedData);
  if (!isValidData)
    return {
      data: " Invalid data",
      code: "1001",
    };
  const response = encryptString(await fetch(decryptedData));
  return response;
};
