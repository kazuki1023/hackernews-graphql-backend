function feed(parent: any, args: any, context: any) {
    return context.prisma.link.findMany();
}

module.exports = {
    feed,
};
