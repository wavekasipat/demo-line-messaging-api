import { lineIssueToken } from "@/lib/lineIssueToken";

const axios = require("axios");

/**
 * return promise
 *{
 *  "sentMessages": [
 *    {
 *      "id": "461230966842064897",
 *      "quoteToken": "IStG5h1Tz7b..."
 *    }
 *  ]
 *}
 */
export const lineReplyTextMessage = async ({ replyToken, massage }) => {
    let data = JSON.stringify({
        replyToken: replyToken,
        messages: [
            {
                type: "text",
                text: massage,
            },
        ],
    });

    const tokenObj = await lineIssueToken();
    const access_token = tokenObj.access_token;
    console.log("access_token:", access_token);

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.LINE_REPLY_MESSAGE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        data: data,
    };

    const response = await axios(config);
    return response.data;
};
