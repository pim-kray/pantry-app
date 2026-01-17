require_relative "../config/boot"

class PantryApp < Sinatra::Base
  configure do
    set :allow_origin, ENV.fetch("ALLOW_ORIGIN", "http://localhost:3000")
  end

  options "*" do
    response.headers["Access-Control-Allow-Origin"] = settings.allow_origin
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "content-type,authorization"
    halt 204
  end

  before do
    content_type :json
    response.headers["Access-Control-Allow-Origin"] = settings.allow_origin
  end

  get "/" do
    json name: "Pantry API", status: "ok"
  end
end
