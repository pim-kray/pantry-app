class UserRepository
  def self.find_by_username(username)
    DB[:users].where(username: username).first
  end

  def self.find_by_id(id)
    DB[:users].where(id: id).first
  end

  def self.create_admin_if_missing!
    return if find_by_username("admin")

    DB[:users].insert(
      username: "admin",
      password_hash: BCrypt::Password.create("admin"),
      is_admin: true,
      must_change_password: true,
      created_at: Time.now
    )

    puts "Admin created: username=admin, password=admin (change on first login)"
  end

  def self.change_password(user_id, old_password, new_password)
    user = find_by_id(user_id)
    return { success: false, error: "User not found" } unless user

    unless user[:must_change_password]
      valid = BCrypt::Password.new(user[:password_hash]) == old_password
      return { success: false, error: "Wrong password" } unless valid
    end

    err = validate_password(new_password)
    return { success: false, error: err } if err

    DB[:users].where(id: user_id).update(
      password_hash: BCrypt::Password.create(new_password),
      must_change_password: false
    )

    { success: true }
  end

  def self.first_login_change_password(user_id, new_password)
    user = find_by_id(user_id)
    return { success: false, error: "User not found" } unless user
    return { success: false, error: "Not required" } unless user[:must_change_password]

    err = validate_password(new_password)
    return { success: false, error: err } if err

    DB[:users].where(id: user_id).update(
      password_hash: BCrypt::Password.create(new_password),
      must_change_password: false
    )

    { success: true }
  end

  def self.validate_password(password)
    return "Min 8 characters" if password.length < 8
    return "Needs a number" unless password.match?(/\d/)
    return "Needs a letter" unless password.match?(/[a-zA-Z]/)
    nil
  end
end