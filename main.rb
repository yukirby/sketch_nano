require 'sinatra'
require 'sqlite3'
db = SQLite3::Database.new 'db.sqlite'
require 'sinatra/json'
require 'data_uri'
require 'securerandom'
require 'logger'


logger = Logger.new(STDOUT)

# DBの生成
db = SQLite3::Database.new 'db/post.db'
db.results_as_hash = true

get '/' do
  erb :index
end

get '/dashboard' do
  if params['adult'] == "1"
    posts = db.execute("SELECT * FROM pictures ORDER BY likes DESC")

  else
    posts = db.execute("SELECT * FROM pictures Where adult ='false' OR adult=null  ORDER BY likes  DESC")

  end
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
  sql = "INSERT INTO pictures (title, src, posted_at,adult)
  VALUES (:title, :name, :time, :adult)"
  db.execute(sql,
    "title" => params[:title],
    "name" => name,
    "time" => time,
    "adult" => params[:adult]
  )
  redirect '/dashboard'
end

post '/api/like' do
  sql = "UPDATE pictures SET likes = likes+1 Where id = #{params['like']}"
  db.execute_batch(sql)
  return "ok"
end
