require "sequel"

DB_PATH = ENV.fetch("DATABASE_URL", "sqlite://db/development.db")

DB = Sequel.connect(DB_PATH)
