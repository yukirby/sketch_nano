require 'sinatra'
require 'sqlite3'
require 'sinatra/json'

# db = SQLite3::Database.new "db/post.db"
# db.results_as_hash = true

get '/' do
  erb :index
end
