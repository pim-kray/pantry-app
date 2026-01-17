require "securerandom"

class AuthTokenStore
  @tokens = {}
  EXPIRY = 7 * 24 * 60 * 60

  class << self
    def issue_token(user)
      token = SecureRandom.hex(32)
      @tokens[token] = {
        user_id: user[:id],
        is_admin: user[:is_admin],
        created: Time.now
      }
      token
    end

    def find(token)
      data = @tokens[token]
      return nil unless data

      if Time.now - data[:created] > EXPIRY
        revoke(token)
        return nil
      end

      data
    end

    def revoke(token)
      @tokens.delete(token)
    end

    def cleanup_expired_tokens!
      now = Time.now
      @tokens.delete_if { |_, data| now - data[:created] > EXPIRY }
    end
  end
end

