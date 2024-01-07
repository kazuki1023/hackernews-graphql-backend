"use strict";
// 誰によって投稿されたかのリゾルバー
function postedBy(parent, args, context) {
    return context.prisma.link.findUnique({
        where: { id: parent.id }
    }).postedBy();
}
module.exports = {
    postedBy,
};
