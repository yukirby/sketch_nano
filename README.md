# sketch_nano
sketch nano desu

## 手元の環境に持ってくる（cloneする）
`git clone https://github.com/fsubal/sketch_nano.git`

## 使用Gemパッケージ
* sinatra
* sqlite3
* sinatra-contrib
* data_uri

`gem install data_uri` のようなコマンドを打つ。

失敗したら `sudo gem install data_uri` -> 自分のPCのパスワード

## 起動するときは

```sh
cd sketch_nano
ruby main.rb
```

## データベースのスキーマ（構造）

```
CREATE TABLE pictures (
    id           INTEGER PRIMARY KEY,
    title        TEXT,
    src          TEXT,
    author_name  TEXT,
    likes        INTEGER DEFAULT 0,
    posted_at    DATETIME
);
