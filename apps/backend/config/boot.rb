require "sinatra"
require "sinatra/json"
require "sequel"
require "bcrypt"

require_relative "./database"

require_relative "../app/services/auth_token_store"
require_relative "../app/services/login_attempt_tracker"
require_relative "../app/repositories/user_repository"

UserRepository.create_admin_if_missing!

require_relative "../app/routes/health"
require_relative "../app/routes/auth"
require_relative "../app/routes/user"

# Cleanup expired tokens every hour
Thread.new do
  loop do
    sleep 3600
    AuthTokenStore.cleanup_expired_tokens! rescue nil
  end
end

