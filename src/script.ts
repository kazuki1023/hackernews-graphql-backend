// データベースにアクセスするためのクライアントライブラリ
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "タイトル",
      url: "test",
    }
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
.catch((e: unknown) => {
  throw e;
})            
.finally(async () =>{
  // データベースを閉じる
  prisma.$disconnect();
})
// finallyは絶対に最後に通る。絶対に実行されるもの
