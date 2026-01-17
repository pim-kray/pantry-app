require "sequel"

DB_PATH = ENV.fetch("DATABASE_URL", "sqlite://db/development.db")
DB = Sequel.connect(DB_PATH)

# Ensure schema exists
DB.create_table? :items do
  primary_key :id
  String :name, null: false
  Integer :quantity, default: 0
  DateTime :created_at
end

DB.create_table? :users do
  primary_key :id
  String :username, null: false, unique: true
  String :password_hash, null: false
  TrueClass :is_admin, default: false
  TrueClass :must_change_password, default: false
  DateTime :created_at
end

# Add column if missing (for existing databases)
unless DB[:users].columns.include?(:must_change_password)
  DB.alter_table(:users) { add_column :must_change_password, TrueClass, default: false }
end

