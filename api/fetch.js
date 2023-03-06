const axios = require("axios");
const { validateUrl } = require("../helper/validation");
const { updateDataOnNjs2 } = require("./updateDataOnNjs2");

const fetch = async (decryptedData, ipAddress) => {
  try {
    let { url, method, data, headers } = decryptedData.request;
    url = validateUrl(url, ipAddress);

    let { request_count, njs2_encryption } = decryptedData.options;
    data = updateDataOnNjs2(njs2_encryption, data, "encrypt");

    let promiseList = [];
    for (let i = 1; i <= request_count; i++) {
      promiseList.push(
        axios(url, {
          method,
          data,
          headers: headers,
        })
      );
    }
    console.log({ url, method, data, headers: headers });

    let timeForApiCall = Date.now();
    let response = await Promise.all(promiseList);
    timeForApiCall = Date.now() - timeForApiCall;

    response = response.map((res) => {
      return updateDataOnNjs2(njs2_encryption, res.data, "decrypt");
    });

    return {
      data: response,
      code: 1000,
      average_time_for_api_call: timeForApiCall / request_count,
      request_count,
    };
  } catch (error) {
    console.log("ERROR =>", { error });
    return {
      data: error.message,
      code: 1001,
    };
  }
};
exports.fetch = fetch;
