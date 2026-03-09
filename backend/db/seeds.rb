# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts 'Cleaning database...'
Product.destroy_all

puts 'Creating 10 products...'

products_data = [
  { name: 'Ergonomic Chair', description: 'High-quality ergonomic chair for long working hours.', price: 199.99, stock: 50, sku: 'FUR-CHAIR-001' },
  { name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with cherry MX switches.', price: 120.00, stock: 150, sku: 'TECH-KEY-002' },
  { name: 'Wireless Mouse', description: 'Rechargeable wireless mouse with ergonomic design.', price: 45.99, stock: 200, sku: 'TECH-MOU-003' },
  { name: 'Curved Monitor 27"', description: '27-inch curved monitor with 144Hz refresh rate.', price: 349.50, stock: 30, sku: 'TECH-MON-004' },
  { name: 'Standing Desk', description: 'Adjustable standing desk with memory presets.', price: 499.00, stock: 15, sku: 'FUR-DESK-005' },
  { name: 'Noise Cancelling Headphones', description: 'Over-ear headphones with active noise cancellation.', price: 250.00, stock: 80, sku: 'AUD-HEAD-006' },
  { name: 'Webcam 1080p', description: 'Full HD webcam with built-in microphone.', price: 79.99, stock: 120, sku: 'TECH-WEB-007' },
  { name: 'USB-C Hub', description: '7-in-1 USB-C hub with HDMI, SD card reader, and USB 3.0.', price: 35.00, stock: 300, sku: 'TECH-HUB-008' },
  { name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness and color temperature.', price: 25.50, stock: 100, sku: 'LIG-LAMP-009' },
  { name: 'Coffee Mug', description: 'Insulated coffee mug to keep your drinks hot or cold.', price: 15.00, stock: 500, sku: 'ACC-MUG-010' }
]

Product.create!(products_data)

puts "Successfully created #{Product.count} products."
