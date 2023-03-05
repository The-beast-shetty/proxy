const { encryptNjs2, decryptNjs2 } = require("../helper/njs2");

const updateDataOnNjs2 = ({ isOn, key, iv }, data, type) => {
  if (isOn) {
    switch (type) {
      case "encrypt": {
        data = "data=" + encryptNjs2(data, key, iv);
        break;
      }
      case "decrypt": {
        if (data.responseData)
          data.responseData = decryptNjs2(data.responseData, key, iv);
        break;
      }
    }
  }

  return data;
};

module.exports = { updateDataOnNjs2 };
