"use strict";
// tokenを複合するための関数
function getTokenPayload(token) {
    // token化されたもののの前の情報を復元する
    return jwt.verify(token, APP_SECRET);
}
// ユーザーid取得のための関数
function getUserId(req, authToken) {
    if (req) {
        // (認証権限があるかどうか記載がある)ヘッダーを確認する
        const authHeader = req.headers.authorization;
        if (authHeader) {
            // 不要なbearerを削除して、トークンを取得する
            const token = authHeader.replace('Bearer ', '');
            if (!token) {
                throw new Error('No token found');
            }
            // そのtokanを複合する
            const { userId } = getTokenPayload(token);
            return userId;
        }
    }
    else if (authToken) {
        const { userId } = getTokenPayload(authToken);
        return userId;
    }
    throw new Error('Not authenticated');
}
module.exports = {
    APP_SECRET,
    getUserId,
};
