class LoginAttemptTracker
  @attempts = {}
  MAX_TRIES = 5
  LOCKOUT = 15 * 60

  class << self
    def record_failed_attempt(username)
      @attempts[username] ||= { count: 0, locked_until: nil }
      @attempts[username][:count] += 1

      if @attempts[username][:count] >= MAX_TRIES
        @attempts[username][:locked_until] = Time.now + LOCKOUT
      end
    end

    def record_successful_attempt(username)
      @attempts.delete(username)
    end

    def locked?(username)
      return false unless @attempts[username]

      lock_time = @attempts[username][:locked_until]
      return false unless lock_time

      if Time.now < lock_time
        true
      else
        @attempts.delete(username)
        false
      end
    end

    def remaining_lockout_time(username)
      return 0 unless @attempts[username]&.[](:locked_until)

      left = (@attempts[username][:locked_until] - Time.now).to_i
      [left, 0].max
    end
  end
end

