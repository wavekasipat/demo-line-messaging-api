const axios = require("axios");
const qs = require("qs");

/**
 * return
 * {
 *   "token_type": "Bearer",
 *   "access_token": "ey....",
 *   "expires_in": 900
 * }
 */
export const lineIssueToken = async () => {
    let data = qs.stringify({
        grant_type: "client_credentials",
        client_id: process.env.LINE_CHANNEL_ID,
        client_secret: process.env.LINE_CHANNEL_SECRET,
    });

    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: process.env.LINE_ISSUE_TOKEN_URL,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
    };

    const response = await axios(config);
    return response.data;
};
