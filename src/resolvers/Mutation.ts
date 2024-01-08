// ユーザーの新規登録のリゾルバ
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const APP_SECRET = 'GraphQL-is-aw3some';
async function signup(parent: any, args: any, context:any) {
    // パスワードをハッシュ化する
    const password = await bcrypt.hash(args.password, 10);
    // ユーザーを作成する
    const user = await context.prisma.user.create({
        data: {
            ...args,
            password,
        },
    });
    // JWTを作成する
    // APP_SECRETは、暗号化に使う文字列。秘密鍵。なんでもいい
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    // 作成したJWTを返す
    return {
        token,
        user,
    };
}

// ユーザーのログインのリゾルバ
async function login(parent: any, args: any, context: any) {
    // ユーザーを取得する
    const user = await context.prisma.user.findUnique({
        where: { email: args.email },
    });
    if (!user) {
        throw new Error('No such user found');
    }
    // パスワードが一致するか確認する
    const valid = await bcrypt.compare(args.password, user.password);
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
}

// 投稿の作成のリゾルバ
async function post(parent: any, args: any, context: any) {
  const { userId } = context;
  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  });
}

module.exports = {
    signup,
    login,
    post,
}
