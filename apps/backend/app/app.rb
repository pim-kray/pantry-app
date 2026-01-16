require "sinatra"
require "sinatra/json"

require_relative "./routes/health"

class PantryApp < Sinatra::Base
  before do
    content_type :json
  end

  get "/" do
    json name: "Pantry API", status: "ok"
  end
end