require 'sinatra'
require 'sqlite3'
require 'sinatra/json'
require 'data_uri'
require 'securerandom'
require 'logger'

require './sql_helper.rb'

logger = Logger.new(STDOUT)

# DBの生成
db = SQLite3::Database.new 'db/post.db'
db.results_as_hash = true
if !has_table(db, "pictures")
  sql = <<SQL
CREATE TABLE pictures (
    id           INTEGER PRIMARY KEY,
    title        TEXT,
    src          TEXT,
    author_name  TEXT,
    likes        INTEGER DEFAULT 0,
    posted_at    DATETIME
);
SQL
  db.execute(sql);
  logger.info("create pictures table")
else
  logger.info("exists pictures table")
end

get '/' do
  erb :index
end

get '/dashboard' do
  posts = db.execute("SELECT * FROM pictures ORDER BY id DESC")
  erb :dashboard, {:locals => {:posts => posts}}
end

get '/draw' do
  erb :draw
end

post '/draw' do
  datauri = params['src']
  img = URI::Data.new(datauri).data

  # ファイル名をつける
  name = SecureRandom.hex + '.png'

  # 画像を保存
  File.open("./public/uploads/" + name, "wb") do |file|
    file.write img
  end

  # DBに登録する
  time = Time.now.strftime('%Y-%m-%d %H:%M:%S')
  sql = "INSERT INTO pictures (title, src, posted_at) VALUES ('#{params['title']}', '#{name}', '#{time}')"
  db.execute(sql)

  # 終わったらダッシュボードに戻る
  redirect '/dashboard'
end

get '/api/like' do
end

