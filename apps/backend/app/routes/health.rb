class PantryApp < Sinatra::Base
  get "/health" do
    json status: "ok"
  end
end