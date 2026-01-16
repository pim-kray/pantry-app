require "sinatra"
require "sinatra/json"
require "sequel"

require_relative "./routes/health"
require_relative "../config/database"

class PantryApp < Sinatra::Base
  before do
    content_type :json
  end

  get "/" do
    json name: "Pantry API", status: "ok"
  end
end