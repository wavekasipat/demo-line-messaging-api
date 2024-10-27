const CryptoJS = require("crypto-js");

export const validateLineSignature = (bodyString, reqSignature) => {
    const channelSecret = process.env.LINE_CHANNEL_SECRET;
    // signature in base64 format
    const signature = CryptoJS.HmacSHA256(bodyString, channelSecret).toString(
        CryptoJS.enc.Base64
    );
    console.log("signature:", signature);

    return signature === reqSignature;
};
