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
export const linePushTextMessage = async ({ to, massage }) => {
    let data = JSON.stringify({
        to: to,
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
        url: process.env.LINE_PUSH_MESSAGE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
        },
        data: data,
    };

    const response = await axios(config);
    return response.data;
};
