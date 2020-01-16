"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data, code = 200) => {
    let sendData = {};
    if (code >= 400 && code <= 451) {
        sendData.success = false;
        sendData.error = true;
    }
    else if (code >= 200 && code <= 226) {
        sendData.success = true;
        sendData.error = false;
    }
    if (typeof data === 'object') {
        sendData = Object.assign(sendData, data);
    }
    res.status(code);
    return res.send(sendData);
};
module.exports = {
    sendResponse,
};
