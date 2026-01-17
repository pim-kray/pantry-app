#!/usr/bin/env ruby
require_relative '../config/boot'

case ARGV[0]
when 'reset'
  print "Delete database? (y/N): "
  exit unless gets.chomp.downcase == 'y'
  File.delete('db/development.db') if File.exist?('db/development.db')
  puts "Deleted. Restart server to recreate."

when 'show'
  admin = DB[:users].where(username: 'admin').first
  if admin
    puts "Username: #{admin[:username]}"
    puts "Admin: #{admin[:is_admin]}"
    puts "Must change pwd: #{admin[:must_change_password] || false}"
  else
    puts "No admin found"
  end

when 'reset_admin'
  admin = DB[:users].where(username: 'admin').first
  if admin
    DB[:users].where(username: 'admin').update(
      password_hash: BCrypt::Password.create('admin'),
      must_change_password: true
    )
    puts "Reset to admin/admin"
  else
    UserRepository.create_admin_if_missing!
  end

when 'users'
  DB[:users].each do |u|
    puts "#{u[:id]} | #{u[:username]} | admin=#{u[:is_admin]}"
  end

else
  puts "Usage: ruby lib/db_cli.rb <command>"
  puts "  reset       - Delete database"
  puts "  show        - Show admin info"
  puts "  reset_admin - Reset admin password"
  puts "  users       - List all users"
end

