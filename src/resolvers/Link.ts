// 誰によって投稿されたかのリゾルバー
function postedBy(parent: any, args: any, context: any) {
  return context.prisma.link.findUnique({
    where: { id: parent.id }
  }).postedBy();
}

module.exports = {
  postedBy,
}
