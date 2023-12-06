## コマンド

### jsファイルの生成
```
npm run build
```

### serverの起動
```
node ./src/server.js
```

### prismaとは
- 次世代オープンソースORM
  - ORMとは
    - 以下のようなメソットでテーブルを作れる
      - create()
      - uodate()
      - delete()
    - sql文を知らなくても、直感的にわかるメソッドを用いてテーブルを作れる

  - RDB(rerational darabase mapping)はsql文を知らないとテーブル作成できない。

- 今回は
  - apolloがサーバー
  - prismaもサーバー
  - RDBはSQLiteとかposgresql,mysql

![参考](./public/img/スクリーンショット%202023-12-06%209.30.21.png)
