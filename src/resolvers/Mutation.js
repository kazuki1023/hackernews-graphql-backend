"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ユーザーの新規登録のリゾルバ
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';
function signup(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // パスワードをハッシュ化する
        const password = yield bcrypt.hash(args.password, 10);
        // ユーザーを作成する
        const user = yield context.prisma.user.create({
            data: Object.assign(Object.assign({}, args), { password }),
        });
        // JWTを作成する
        // APP_SECRETは、暗号化に使う文字列。秘密鍵。なんでもいい
        const token = jwt.sign({ userId: user.id }, APP_SECRET);
        // 作成したJWTを返す
        return {
            token,
            user,
        };
    });
}
// ユーザーのログインのリゾルバ
function login(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // ユーザーを取得する
        const user = yield context.prisma.user.findUnique({
            where: { email: args.email },
        });
        if (!user) {
            throw new Error('No such user found');
        }
        // パスワードが一致するか確認する
        const valid = yield bcrypt.compare(args.password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        // JWTを作成する
        const token = jwt.sign({ userId: user.id }, APP_SECRET);
        // 作成したJWTを返す
        return {
            token,
            user,
        };
    });
}
// 投稿の作成のリゾルバ
function post(parent, args, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId } = context;
        return yield context.prisma.link.create({
            data: {
                url: args.url,
                description: args.description,
                postedBy: { connect: { id: userId } },
            }
        });
    });
}
module.exports = {
    signup,
    login,
    post,
};
