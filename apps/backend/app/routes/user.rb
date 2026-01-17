class PantryApp < Sinatra::Base
  helpers do
    def authenticate!
      token = request.env["HTTP_AUTHORIZATION"]&.sub(/^Bearer\s+/, "")
      halt 401, json(error: "No token") unless token

      @token_data = AuthTokenStore.find(token)
      halt 401, json(error: "Invalid token") unless @token_data

      @user = UserRepository.find_by_id(@token_data[:user_id])
      halt 401, json(error: "User not found") unless @user
    end

    def require_admin!
      authenticate!
      halt 403, json(error: "Admin only") unless @token_data[:is_admin]
    end
  end

  post "/api/auth/change-password" do
    authenticate!
    data = JSON.parse(request.body.read)

    halt 400, json(error: "Missing passwords") unless data["old_password"] && data["new_password"]

    result = UserRepository.change_password(@token_data[:user_id], data["old_password"], data["new_password"])
    halt 400, json(error: result[:error]) unless result[:success]

    json(message: "Password changed")
  end

  post "/api/auth/first-login-change-password" do
    authenticate!
    data = JSON.parse(request.body.read)

    halt 400, json(error: "Password required") unless data["new_password"]

    result = UserRepository.first_login_change_password(@token_data[:user_id], data["new_password"])
    halt 400, json(error: result[:error]) unless result[:success]

    user = UserRepository.find_by_id(@token_data[:user_id])
    json(
      message: "Password changed",
      user: {
        id: user[:id],
        username: user[:username],
        is_admin: user[:is_admin],
        must_change_password: false
      }
    )
  end
end

