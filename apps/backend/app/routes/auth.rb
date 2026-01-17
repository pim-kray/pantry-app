require "json"

class PantryApp < Sinatra::Base
  post "/api/auth/login" do
    data = JSON.parse(request.body.read)
    username = data["username"]
    password = data["password"]

    halt 400, json(error: "missing credentials") unless username && password

    if LoginAttemptTracker.locked?(username)
      time_left = LoginAttemptTracker.remaining_lockout_time(username)
      halt 429, json(error: "Too many attempts. Try again in #{time_left}s.")
    end

    user = UserRepository.find_by_username(username)

    if !user || BCrypt::Password.new(user[:password_hash]) != password
      LoginAttemptTracker.record_failed_attempt(username)
      halt 401, json(error: "Invalid credentials")
    end

    LoginAttemptTracker.record_successful_attempt(username)
    token = AuthTokenStore.issue_token(user)

    json(
      token: token,
      user: {
        id: user[:id],
        username: user[:username],
        is_admin: user[:is_admin],
        must_change_password: user[:must_change_password] || false
      }
    )
  end

  post "/api/auth/logout" do
    token = request.env["HTTP_AUTHORIZATION"]&.sub(/^Bearer\s+/, "")
    AuthTokenStore.revoke(token) if token
    json(message: "Logged out")
  end
end
