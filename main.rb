require 'sinatra'
require 'sqlite3'
require 'base64'
require 'securerandom'
require 'sinatra/json'

db = SQLite3::Database.new "db/post.db"
db.results_as_hash = true

=begin
CREATE TABLE pictures (
    id           INTEGER PRIMARY KEY,
    title        TEXT,
    src          TEXT,
    author_name  TEXT,
    likes        INTEGER,
    posted_at    DATETIME
);
=end

get '/' do
  erb :index
end

get '/dashboard' do
  posts = db.execute("SELECT * FROM pictures ORDER BY id DESC")
  erb :dashboard, { :locals => { :posts => posts } }
end

get '/draw' do
  erb :draw
end

post '/save' do
  # base64をデコード
  base64 = params["src"]
  img    = Base64.decode64(base64)

  # ファイル名を付ける
  name = SecureRandom.hex + ".png"

  # 画像を保存
  File.open("./public/uploads/" + name, 'wb') do |this_file|
    this_file.write img
  end

  # DBに突っ込む
  stmt = db.prepare("INSERT INTO posts (title, src) VALUES (?, ?)")
  stmt.bind_params(params["title"], name)
  stmt.execute

  # おわったらダッシュボードに戻る
  redirect '/dashboard'
end

get '/like' do
  id = params["id"].to_i
  post = db.execute("SELECT likes FROM pictures WHERE id = ?", id)[0]

  if post.empty?
    return "error"
  end

  likes = post["likes"] + 1
  stmt = db.prepare("UPDATE pictures SET likes = ? WHERE id = ?")
  stmt.bind_params(likes, id)
  stmt.execute

  response = { "likes" => likes }
  json response
end
