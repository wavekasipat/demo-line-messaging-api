import crypto from "crypto";

export const validateLineSignature = (body, reqSignature) => {
    const channelSecret = process.env.LINE_CHANNEL_SECRET;
    const signature = crypto
        .createHmac("SHA256", channelSecret)
        .update(body)
        .digest("base64");
    return signature === reqSignature;
};
